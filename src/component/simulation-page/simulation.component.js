import {
  CaretRightOutlined,
  PauseOutlined,
  RedoOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Layout, Spin, Tabs } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { HeaderComp } from '../common/header.component';
import './style.scss';
import { useEffect, useState } from 'react';
import { imageUrls } from '../constant';
import { getItem, useInterval } from '../../utils';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { simulate } from '../../service/api';
import addNotification, { NOTIFICATION_TYPE } from '../notification';

const Simulation = (props) => {
  const { id } = props.match.params;
  const { inputXml, setInputXMl } = props;
  const [activeKey, setActiveKey] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(true);
  const history = useHistory();
  const [panes, setPanes] = useState([]);
  const [first, setFirst] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!inputXml || !inputXml.xml || !inputXml.projectName) {
      history.push('/edit');
      return;
    }
    const user = getItem('user');
    if (!user) history.push('/login');
    var formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('project_name', inputXml.projectName);
    formData.append('xmlfile', new File([inputXml.xml], 'input.xml'));
    simulate(formData)
      .then((res) => {
        console.log(res.data);
        const urls = res.data.urls || [];
        const paneList = (inputXml?.outputList || []).filter((item) =>
          urls.find((url) => url.includes(item.name)),
        );
        if (!paneList[0]) {
          addNotification('Empty output simulation!', NOTIFICATION_TYPE.ERROR);
          // setTimeout(() => history.push('/edit'), 2000);
          return;
        }
        setPanes(paneList);
        const tabs = {};
        inputXml?.outputList.map((item) => {
          tabs[item.name] = urls.filter((url) => url.includes(item.name));
        });
        setImageUrl(tabs);
      })
      .catch((err) => {
        console.log(err);
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
    let maxStep = 0;
    inputXml?.outputList.map((item) => {
      if (item?.framerate && item?.framerate > maxStep)
        maxStep = item?.framerate;
    });
    if (step < maxStep && play) {
      setStep(step + 1);
    }
    if (step >= maxStep) clearInterval();
  }, 1000);
  const onChange = () => {};
  return (
    <>
      <Spin spinning={isLoading}>
        <Layout style={{ height: '100vh' }}>
          <HeaderComp></HeaderComp>
          <Content style={{ padding: '0 0px' }}>
            <Layout
              className="site-layout-background"
              style={{ height: '90vh' }}
            >
              <Content
                style={{
                  padding: '10px 24px 10px 24px',
                  minHeight: 280,
                  position: 'relative',
                }}
              >
                {!isLoading && (
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
                      onClick={() => {
                        setPlay(false);
                        setTimeout(() => setStep(0), 0);
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
                    else if (imageUrl[pane.name].length > step) index = step;
                    else index = imageUrl[pane.name].length;
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
      </Spin>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInputXMl: (value) => dispatch({ type: 'CREATE_INPUT_XML', value }),
  };
};
const mapStateToProps = (state) => {
  return {
    inputXml: state.inputXml,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Simulation);
