import {
  CaretRightOutlined,
  FormOutlined,
  PauseOutlined,
  RedoOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Layout, Spin, Tabs } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import HeaderComp from '../common/header.component';
import './style.scss';
import { useEffect, useState } from 'react';
import { DEFAULT_COUNTER, imageUrls } from '../constant';
import { getItem, useInterval } from '../../utils';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { simulate, simulateLastest } from '../../service/api';
import addNotification, { NOTIFICATION_TYPE } from '../notification';
import { useParams } from 'react-router-dom';

const SimulationHistory = (props) => {
  const { id } = props.match.params;
  const { inputXml, setInputXMl, setLoading, isLoading } = props;
  const [activeKey, setActiveKey] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(true);
  const history = useHistory();
  const [panes, setPanes] = useState([]);
  const [first, setFirst] = useState(true);
  const [maxStep, setMaxStep] = useState(0);
  const [counter, setCounter] = useState(DEFAULT_COUNTER);
  const [isFail, setFail] = useState(false);

  useEffect(() => {
    if (counter === 0) {
      history.push('/edit');
    }
  }, [counter]);

  useEffect(() => {
    const user = getItem('user');
    if (!user) history.push('/');
    setLoading(true);
    var max = 0;
    simulateLastest(id)
      .then((res) => {
        const data = res?.data?.urls || [];
        const paneList = data?.map((item, index) => ({
          id: index,
          name: item?.name,
        }));
        if (!paneList[0]) {
          addNotification(
            'This model has not been simulated!',
            NOTIFICATION_TYPE.ERROR,
          );
          return;
        }
        setPanes(paneList);
        const tabs = {};
        data.map((item) => {
          tabs[item?.name] = item?.urls;
          if ((item?.url || []).length > max) max = item?.url?.length;
        });
        setMaxStep(max);
        setImageUrl(tabs);
      })
      .catch((err) => {
        if (err.response)
          addNotification(
            err.response.data.message || 'Something wrong!',
            NOTIFICATION_TYPE.ERROR,
          );
        else
          addNotification(err || 'Something wrong!', NOTIFICATION_TYPE.ERROR);
        setFail(true);
      })
      .finally(() => {
        setFirst(false);
        setLoading(false);
      });
    return () => {
      clearInterval();
    };
  }, []);

  useInterval(() => {
    if (first || isLoading) return;
    // if (isFail) setCounter(counter - 1);
    if (step < maxStep && play) {
      setStep(step + 1);
    }
    if (step >= maxStep) clearInterval();
  }, 1000);
  const onChange = () => {};
  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <HeaderComp></HeaderComp>
        <Content style={{ padding: '0 0px' }}>
          <Layout className="site-layout-background" style={{ height: '90vh' }}>
            <Content
              style={{
                padding: '10px 24px 10px 24px',
                minHeight: 280,
                position: 'relative',
              }}
            >
              {!isLoading && !panes[0] && (
                <div className="fail-container">
                  <div className="description">
                    <span className="text">Simulation fails.</span>
                    <span className="text">
                      Back to edit page in {counter}...
                    </span>
                  </div>
                </div>
              )}
              {!isLoading && panes[0] && (
                <div className="media_comp">
                  <span className="step_text">Step: {step}</span>
                  <Button
                    shape="circle"
                    icon={<PauseOutlined />}
                    onClick={() => setPlay(false)}
                    style={{ marginRight: 5 }}
                  />
                  <Button
                    shape="circle"
                    icon={<CaretRightOutlined />}
                    onClick={() => setPlay(true)}
                    style={{ marginRight: 5 }}
                  />
                  <Button
                    shape="circle"
                    icon={<RedoOutlined />}
                    style={{ marginRight: 5 }}
                    onClick={() => {
                      setPlay(false);
                      setTimeout(() => setStep(0), 0);
                    }}
                  />
                  <Button
                    shape="circle"
                    icon={<FormOutlined />}
                    onClick={() => {
                      history.push('/edit');
                    }}
                  />
                </div>
              )}
              <Tabs
                hideAdd
                onChange={onChange}
                activeKey={activeKey}
                type="card"
              >
                {panes.map((pane) => {
                  let index;
                  if (!imageUrl[pane.name]) index = 0;
                  else if (imageUrl[pane.name].length - 1 > step) index = step;
                  else index = imageUrl[pane.name].length - 1;
                  return (
                    <Tabs.TabPane
                      key={pane.id}
                      tab={pane.name}
                      style={{ margin: 0, width: '100%' }}
                    >
                      <div
                        style={{
                          height: '80vh',
                          width: '100vw',
                          backgroundColor: '#fff',
                        }}
                      >
                        <div className="main-content_1">
                          <img src={(imageUrl[pane.name] || [])[index]} />
                        </div>
                      </div>
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInputXMl: (value) => dispatch({ type: 'CREATE_INPUT_XML', value }),
    setLoading: (value) => dispatch({ type: 'SPIN_LOADING', value }),
  };
};
const mapStateToProps = (state) => {
  return {
    inputXml: state.inputXml,
    setLoading: state.setLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimulationHistory);
