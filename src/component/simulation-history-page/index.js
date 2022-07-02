import {
  CaretRightOutlined,
  DownloadOutlined,
  FormOutlined,
  ForwardOutlined,
  PauseOutlined,
  RedoOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Input, Layout, Modal, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import HeaderComp from '../common/header.component';
import './style.scss';
import { useEffect, useState } from 'react';
import { DEFAULT_COUNTER } from '../constant';
import { getItem, useInterval } from '../../utils';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { downloadSimulation, simulateLastest } from '../../service/api';
import addNotification, { NOTIFICATION_TYPE } from '../notification';
import InnerImageZoom from 'react-inner-image-zoom';

const SimulationHistory = (props) => {
  const { id } = props.match.params;
  const { inputXml, setInputXMl, setLoading, isLoading } = props;
  const [activeKey, setActiveKey] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [step, setStep] = useState(1);
  const [play, setPlay] = useState(true);
  const history = useHistory();
  const [panes, setPanes] = useState([]);
  const [first, setFirst] = useState(true);
  const [maxStep, setMaxStep] = useState(0);
  const [counter, setCounter] = useState(DEFAULT_COUNTER);
  const [isFail, setFail] = useState(false);
  const [isShow, setShow] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: '' });
  const [jump, setJump] = useState(1);
  const [fps, setFPS] = useState(1);

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
        const data = res?.data?.data || [];
        const paneList = data?.map((item, index) => ({
          id: index,
          name: item?.name,
        }));
        if (!paneList[0]) {
          addNotification(
            'This model has not been simulated!',
            NOTIFICATION_TYPE.ERROR,
          );
          setFail(true);
          return;
        }
        setPanes(paneList);
        var tabs = {};
        data.map((item) => {
          tabs[item?.name] = item?.urls;
          if ((item?.urls || []).length > max) max = item?.urls?.length;
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
    if (isFail) setCounter(counter - 1);
    if (step < maxStep && play) {
      setStep(step + 1);
    }
    if (step >= maxStep) clearInterval();
  }, 1000);
  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };
  const handleDownload = () => {
    setLoading(true);
    setModal({ isOpen: false, type: '' });
    downloadSimulation({ id, fps })
      .then((res) => {
        const a = window.document.createElement('a');
        const url = window.URL.createObjectURL(res.data);
        a.style.display = 'none';
        a.href = url;
        a.download = id + '.zip';
        a.click();
        a.remove();
      })
      .catch((err) => {
        if (err.response)
          addNotification(
            err.response.data.message || 'Something wrong!',
            NOTIFICATION_TYPE.ERROR,
          );
        else
          addNotification(err || 'Something wrong!', NOTIFICATION_TYPE.ERROR);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onJumpSubmit = () => {
    setStep(jump, () => setJump(1));
    setModal({ isOpen: false, type: '' });
  };
  return (
    <>
      <Modal
        visible={modal.isOpen && modal.type === 'Jump'}
        title="Jump step"
        okText="Submit"
        style={{ top: 100 }}
        onCancel={() => setModal({ isOpen: false, type: '' })}
        onOk={onJumpSubmit}
        width={300}
      >
        <Input
          type="number"
          max={maxStep}
          value={jump}
          min={1}
          step={1}
          onChange={(e) => {
            //remove . and -
            [45, 46].includes(e.charCode) && e.preventDefault();
            setJump(
              parseInt(e.target.value > maxStep ? maxStep : e.target.value),
            );
          }}
        />
      </Modal>
      <Modal
        visible={modal.isOpen && modal.type === 'Download'}
        title="Enter FPS (frame per second)"
        okText="Submit"
        style={{ top: 100 }}
        onCancel={() => setModal({ isOpen: false, type: '' })}
        onOk={handleDownload}
        width={300}
      >
        <Input
          type="number"
          max={maxStep}
          value={fps}
          min={1}
          step={1}
          onChange={(e) => {
            //remove . and -
            [45, 46].includes(e.charCode) && e.preventDefault();
            setFPS(
              parseInt(e.target.value > maxStep ? maxStep : e.target.value),
            );
          }}
        />
      </Modal>
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
              {!isLoading && !panes[0] && !first && (
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
                  <span
                    className="step_text"
                    style={{ display: 'block', width: '60px' }}
                  >
                    Step: {step}{' '}
                  </span>
                  <Button
                    shape="circle"
                    icon={play ? <PauseOutlined /> : <CaretRightOutlined />}
                    onClick={() => setPlay(!play)}
                    style={{ marginRight: 5, marginLeft: 5 }}
                  />
                  <Button
                    shape="circle"
                    icon={<ForwardOutlined />}
                    style={{ marginRight: 5 }}
                    onClick={() => {
                      setModal({ isOpen: true, type: 'Jump' });
                    }}
                  />
                  <Button
                    shape="circle"
                    icon={<RedoOutlined />}
                    style={{ marginRight: 5 }}
                    onClick={() => {
                      setPlay(false);
                      setTimeout(() => setStep(1), 0);
                    }}
                  />
                  <Button
                    shape="circle"
                    icon={<DownloadOutlined />}
                    style={{ marginRight: 5 }}
                    onClick={() => setModal({ isOpen: true, type: 'Download' })}
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
                  if (!imageUrl[pane.name] || step === 0) index = 0;
                  else if (imageUrl[pane.name].length >= step) index = step - 1;
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
                          position: 'relative',
                        }}
                      >
                        <div className="main-content_1">
                          <InnerImageZoom
                            src={(imageUrl[pane.name] || [])[index]}
                            width={500}
                            height={500}
                            zoomSrc={(imageUrl[pane.name] || [])[index]}
                            zoomType="drag"
                            zoomScale={4}
                          />
                        </div>
                        <div className="step">
                          Step {index + 1} / {maxStep}
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
