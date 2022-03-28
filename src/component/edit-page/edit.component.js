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
import { getItem } from '../../utils';
import { createPj } from '../../service/api';
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
  const [projectTree, setProjectTree] = useState(projectTreeConst);
  const [dataColumn, setDataColumn] = useState([]);
  const [modal, setModal] = useState({ type: null, isOpen: false, id: null });
  const history = useHistory();

  const onSearch = () => {};

  useEffect(() => {
    const paneList = [].map((item) => ({ ...item, isUpdate: false }));
    setPanes(paneList);
    setActiveKey(paneList[0]?.id);
    setDataColumn(dataSource);
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
      console.log(panes);
      return panes;
    });
  };

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === 'remove') onRemoveTab(targetKey);
  };

  const onRemoveTab = (targetKey) => {
    const paneTmp = panes.filter((item) => item.id !== targetKey);
    setPanes(paneTmp);
    setActiveKey(paneTmp[0]?.id);
  };

  const onAddTabs = (targetKey) => {
    const pane = panes.find((item) => item.id === targetKey);
    if (!pane) {
      const addProject = projectTree.find(
        (item) =>
          item.includes.find((include) => include.id === targetKey) ||
          item.models.find((model) => model.id === targetKey),
      );
      const file =
        addProject.includes.find((include) => include.id === targetKey) ||
        addProject.models.find((model) => model.id === targetKey);
      setPanes([
        ...panes,
        {
          name: file.name,
          id: targetKey,
          content: 'this is pane ' + file.id,
          isUpdate: false,
        },
      ]);
    }
    setActiveKey(targetKey);
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
    setProjectTree((data) => data.filter((item) => item.id !== id));
    handleCloseModal();
  };

  const handleUploadProject = (data) => {
    handleCloseModal();
  };

  const handleSimulation = (data) => {
    const model = {
      id: modal.id,
      sourcePath: './predatorPrey/predatorPrey.gaml',
      finalStep: data.finalStep,
      until: modal.until,
      experiment: data.experiment,
    };
    const outputList = data.outputList.map((item, index) => ({
      ...item,
      id: index,
    }));
    const xml = XMLGenerator(model, data.parameterList, outputList);
    setInputXMl({ model, parameterList: data.parameterList || [], outputList });
    const id = modal.id;
    handleCloseModal();
    history.push('/simulation/' + id);
  };
  return (
    <>
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
          <Layout className="site-layout-background" style={{ height: '90vh' }}>
            <Col>
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{
                    height: '100%',
                    maxHeight: 600,
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
                        style={{ width: 180 }}
                      />
                    </Col>
                    <Col>
                      <Tooltip title="Create new project">
                        <Button
                          type="text"
                          shape="circle"
                          icon={<FolderAddOutlined />}
                          onClick={() =>
                            setModal({ type: 'CREATE', isOpen: true, id: null })
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Upload file">
                        <Button
                          type="text"
                          shape="circle"
                          icon={<CloudUploadOutlined />}
                          onClick={() =>
                            setModal({ type: 'UPLOAD', isOpen: true, id: null })
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button
                          type="text"
                          shape="circle"
                          icon={<DeleteOutlined />}
                          onClick={() =>
                            setModal({ type: 'DELETE', isOpen: true, id: null })
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
                              {include.name}
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
                              {model.name}
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
