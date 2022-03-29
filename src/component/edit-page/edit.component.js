import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Col,
  Table,
  Input,
  Divider,
  Tooltip,
  Row,
  Spin,
} from 'antd';
import {
  UserOutlined,
  ProfileOutlined,
  FolderOpenOutlined,
  FileTextOutlined,
  CaretRightOutlined,
  SaveOutlined,
  LogoutOutlined,
  FolderAddOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { uniqueId, isEqual } from 'lodash';
import { Tabs, Button } from 'antd';
import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import './style.scss';
import { dataSource, projectTreeConst } from '../constant';
import { EditableCell, EditableRow } from './editablecell';
import { CreateProjectModal } from './modal/createProject.component';
import { DeleteProjectModal } from './modal/delete.component';
import { UploadProjectModal } from './modal/uploadProject.component';
import { XMLGenerator } from '../common/XML-generator';
import { ParameterModal } from './modal/parameterModal.component';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { HeaderComp } from '../common/header.component';
import { getItem, transformTree } from '../../utils';
import { createPj, deletePj, getFile, list, upload } from '../../service/api';
import addNotification, { NOTIFICATION_TYPE } from '../notification';
import { connect } from 'react-redux';

const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;

const columns = [
  {
    title: '#',
    width: 60,
    render: (param, row, index) => index + 1,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    editable: true,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 100,
    editable: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 100,
    editable: true,
  },
];

const Edit = (props) => {
  const { setInputXMl } = props;
  const edtiableColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const [panes, setPanes] = useState([]);
  const [activeKey, setActiveKey] = useState([]);
  const [projectTree, setProjectTree] = useState([]);
  const [filePathList, setFilePathList] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [modal, setModal] = useState({ type: null, isOpen: false, id: null });
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const onSearch = () => {};

  useEffect(() => {
    setDataColumn(dataSource);
    const user = getItem('user');
    if (!user) history.push('/login');
    setUser(user);
    list({ user_id: user.id })
      .then((res) => {
        const data = res.data.data;
        setProjectTree(data);
        const transform = transformTree(data);
        setFilePathList(transform);
      })
      .catch((err) =>
        addNotification(err?.response?.data?.message, NOTIFICATION_TYPE.ERROR),
      )
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (row) => {
    const newData = [...dataColumn];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    if (isEqual(row, item)) return;
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataColumn(newData);
    const paneIndex = panes.findIndex((item) => item.id === activeKey);
    setPanes((panes) => {
      panes.splice(paneIndex, 1, {
        ...panes[paneIndex],
        ...{
          ...panes[paneIndex],
          isUpdate: true,
        },
      });
      return panes;
    });
  };

  useEffect(() => console.log(typeof activeKey), [activeKey]);

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === 'remove') onRemoveTab(Number(targetKey));
  };

  const onRemoveTab = (targetKey) => {
    const paneTmp = panes.filter((item) => item.id !== targetKey);
    setPanes(paneTmp);
    setActiveKey(String(paneTmp[0]?.id));
  };

  const onAddTabs = (id) => {
    const targetKey = Number(id);
    const pane = panes.find((item) => item.id === targetKey);
    if (!pane) {
      setLoading(true);
      const addProject = projectTree.find(
        (item) =>
          item.includes.find((include) => include.id === targetKey) ||
          item.models.find((model) => model.id === targetKey),
      );
      const file =
        addProject.includes.find((include) => include.id === targetKey) ||
        addProject.models.find((model) => model.id === targetKey);
      const path = filePathList.find((file) => file.id === targetKey);
      getFile({ path: path.path, user_id: user.id })
        .then((res) => {
          const content = res.data.file.original;
          setPanes([
            ...panes,
            {
              name: file.filename,
              id: targetKey,
              content: content,
              isUpdate: false,
            },
          ]);
        })
        .catch((err) => {
          setPanes([
            ...panes,
            {
              name: file.filename,
              id: targetKey,
              content: 'This file is not supported!',
              isUpdate: false,
            },
          ]);
        })
        .finally(() => {
          setActiveKey(String(targetKey));
          setLoading(false);
        });
    }
  };

  const handleCloseModal = () => {
    setModal({ type: null, isOpen: false, id: null });
  };

  const handleCreateProject = (name) => {
    // const newProject = {
    //   id: uniqueId(),
    //   name,
    //   includes: [],
    //   models: [],
    // };
    // setProjectTree((data) => [...data, newProject]);
    const user = getItem('user');
    createPj({ user_id: user.id, name })
      .then((res) => {
        handleCloseModal();
        addNotification('Create project successful', NOTIFICATION_TYPE.SUCCESS);
      })
      .catch((err) =>
        addNotification(err?.response?.data?.message, NOTIFICATION_TYPE.ERROR),
      );
  };

  const handleDeleteProject = (id) => {
    setLoading(true);
    deletePj({ user_id: user.id, project_id: id })
      .then((res) => {
        addNotification('Delete successfully', NOTIFICATION_TYPE.SUCCESS);
        list({ user_id: user.id })
          .then((res) => {
            const data = res.data.data;
            setProjectTree(data);
            const transform = transformTree(data);
            setFilePathList(transform);
          })
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        addNotification(err?.response?.data?.message, NOTIFICATION_TYPE.ERROR);
        setLoading(false);
      });
    handleCloseModal();
  };

  const handleUploadProject = (data, file) => {
    setLoading(true);
    var formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('payload', file);
    upload(formData)
      .then((response) => {
        console.log(response.data);
        list({ user_id: user.id })
          .then((res) => {
            const data = res.data.data;
            setProjectTree(data);
            const transform = transformTree(data);
            setFilePathList(transform);
          })
          .finally(() => setLoading(false));
        addNotification('Upload file successfully', NOTIFICATION_TYPE.SUCCESS);
        handleCloseModal();
      })
      .catch((err) => {
        addNotification(err?.response?.data?.message, NOTIFICATION_TYPE.ERROR);
        setLoading(false);
      });
  };

  const handleSimulation = (data) => {
    const model = {
      id: modal.id,
      finalStep: data.finalStep,
      until: data.until,
      experiment: data.experiment,
    };
    const outputList = data.outputList.map((item, index) => ({
      ...item,
      id: index,
    }));
    const pj = projectTree.find((item) =>
      item.models.find((model) => model.id === modal.id),
    );
    if (!pj) return;
    const path = filePathList.find((item) => item.id === modal.id).path;
    const xml = XMLGenerator(
      model,
      data.parameterList,
      outputList,
      `userProjects/${user.id}/` + path,
    );
    setInputXMl({
      model,
      parameterList: data.parameterList || [],
      outputList,
      xml,
      projectName: pj?.name,
    });
    handleCloseModal();
    history.push('/simulation/' + data.id);
  };
  return (
    <>
      <Spin spinning={loading}>
        <Layout style={{ height: '100vh' }}>
          {modal.type === 'CREATE' && modal.isOpen && (
            <CreateProjectModal
              isShow={modal.isOpen}
              onCancel={() => setModal({ type: null, isOpen: false, id: null })}
              onCreate={handleCreateProject}
            />
          )}
          {modal.type === 'UPLOAD' && modal.isOpen && (
            <UploadProjectModal
              isShow={modal.isOpen}
              onCancel={() => setModal({ type: null, isOpen: false, id: null })}
              onUpload={handleUploadProject}
              data={projectTree}
            />
          )}
          {modal.type === 'DELETE' && modal.isOpen && (
            <DeleteProjectModal
              isShow={modal.isOpen}
              onCancel={() => setModal({ type: null, isOpen: false, id: null })}
              onDelete={handleDeleteProject}
              data={projectTree}
            />
          )}
          {modal.type === 'PARAMETER' && modal.isOpen && (
            <ParameterModal
              isShow={modal.isOpen}
              onCancel={() => setModal({ type: null, isOpen: false, id: null })}
              onSimulate={handleSimulation}
            />
          )}
          <HeaderComp />
          <Content style={{ padding: '0 0px' }}>
            <Layout
              className="site-layout-background"
              style={{ height: '90vh' }}
            >
              <Col>
                <Sider className="site-layout-background" width={200}>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{
                      height: '100%',
                      maxHeight: '100vh',
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                      width: 300,
                    }}
                  >
                    <Row>
                      <Col>
                        <Search
                          placeholder="input search text"
                          allowClear
                          onSearch={onSearch}
                          style={{ width: 210 }}
                        />
                      </Col>
                      <Col>
                        {/* <Tooltip title="Create new project">
                        <Button
                          type="text"
                          shape="circle"
                          icon={<FolderAddOutlined />}
                          onClick={() =>
                            setModal({ type: 'CREATE', isOpen: true, id: null })
                          }
                        />
                      </Tooltip> */}
                        <Tooltip title="Upload Project">
                          <Button
                            type="text"
                            shape="circle"
                            icon={<CloudUploadOutlined />}
                            onClick={() =>
                              setModal({
                                type: 'UPLOAD',
                                isOpen: true,
                                id: null,
                              })
                            }
                          />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <Button
                            type="text"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() =>
                              setModal({
                                type: 'DELETE',
                                isOpen: true,
                                id: null,
                              })
                            }
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                    {projectTree.map((item, index) => {
                      return (
                        <SubMenu
                          key={item.id}
                          icon={<ProfileOutlined />}
                          title={item.name}
                        >
                          <SubMenu
                            key={'includes' + item.id}
                            icon={<FolderOpenOutlined />}
                            title="includes"
                          >
                            {item.includes.map((include) => (
                              <Menu.Item
                                key={include.id}
                                icon={<FileTextOutlined />}
                                onClick={() => onAddTabs(include.id)}
                              >
                                {include.filename}
                              </Menu.Item>
                            ))}
                          </SubMenu>
                          <SubMenu
                            key={'models' + item.id}
                            icon={<FolderOpenOutlined />}
                            title="models"
                          >
                            {item.models.map((model) => (
                              <Menu.Item
                                key={model.id}
                                icon={<FileTextOutlined />}
                                onClick={() => onAddTabs(model.id)}
                              >
                                {model.filename}
                              </Menu.Item>
                            ))}
                          </SubMenu>
                        </SubMenu>
                      );
                    })}
                  </Menu>
                </Sider>
              </Col>

              <Content style={{ padding: '0 24px 0 100px', minHeight: 280 }}>
                <Tabs
                  hideAdd
                  onChange={onChange}
                  activeKey={activeKey}
                  type="editable-card"
                  onEdit={onEdit}
                >
                  {panes.map((pane) => (
                    <TabPane
                      key={pane.id}
                      tab={pane.name}
                      style={{ margin: 0, width: '100%' }}
                    >
                      <div
                        style={{
                          height: '80vh',
                          width: '80vw',
                          backgroundColor: '#fff',
                        }}
                      >
                        {pane.name.includes('gaml') && (
                          <Button
                            type="primary"
                            style={{
                              margin: '15px 10px',
                              backgroundColor: '#58c282',
                            }}
                            icon={
                              <CaretRightOutlined
                                color="#fff"
                                style={{ fontSize: 15 }}
                              />
                            }
                            onClick={() =>
                              setModal({
                                isOpen: true,
                                type: 'PARAMETER',
                                id: pane.id,
                              })
                            }
                          >
                            Exp
                          </Button>
                        )}
                        {pane.isUpdate && (
                          <Button
                            type="success"
                            style={{
                              margin: '15px 10px',
                            }}
                            icon={<SaveOutlined style={{ fontSize: 15 }} />}
                            onClick={() => {
                              const paneTemp = panes.map((item) =>
                                item.id === pane.id
                                  ? {
                                      ...item,
                                      isUpdate: false,
                                    }
                                  : item,
                              );
                              setPanes(paneTemp);
                            }}
                          >
                            Save
                          </Button>
                        )}
                        <div className="main-content">
                          {pane.name.includes('csv') ? (
                            <Table
                              components={{
                                body: {
                                  cell: EditableCell,
                                  row: EditableRow,
                                },
                              }}
                              size="small"
                              pagination={false}
                              rowClassName={() => 'editable-row'}
                              bordered
                              dataSource={dataColumn}
                              columns={edtiableColumns}
                              scroll={{ y: '74vh' }}
                            />
                          ) : (
                            <CodeMirror
                              value={pane.content}
                              height="80vh"
                              onChange={(value) => {
                                const paneTemp = panes.map((item) =>
                                  item.id === pane.id
                                    ? {
                                        ...item,
                                        isUpdate: !isEqual(value, pane.content),
                                      }
                                    : item,
                                );
                                setPanes(paneTemp);
                              }}
                              style={{ userSelect: 'none' }}
                            />
                          )}
                        </div>
                      </div>
                    </TabPane>
                  ))}
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
const mapStateToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
