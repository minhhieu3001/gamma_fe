import { Layout, Menu, Col, Table, Input, Tooltip, Row, Form } from 'antd';
import {
  ProfileOutlined,
  FolderOpenOutlined,
  FileTextOutlined,
  CaretRightOutlined,
  SaveOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import { isEqual, cloneDeep } from 'lodash';
import { Tabs, Button } from 'antd';
import { useEffect, useState, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import './style.scss';
import { allowImgExts, editableListExt } from '../constant';
import { EditableCell, EditableRow } from './editablecell';
import { UploadFileModal } from './modal/uploadFile.component';
import { DeleteProjectModal } from './modal/delete.component';
import { UploadProjectModal } from './modal/uploadProject.component';
import { XMLGenerator } from '../common/XML-generator';
import { ParameterModal } from './modal/parameterModal.component';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import HeaderComp from '../common/header.component';
import { getItem, setItem, transformTree } from '../../utils';
import {
  createPj,
  deleteFile,
  deletePj,
  getFile,
  list,
  update,
  upload,
  uploadFile,
} from '../../service/api';
import addNotification, { NOTIFICATION_TYPE } from '../notification';
import { connect } from 'react-redux';
import Popup from '../common/PopUp';
import { ConfirmModal } from '../common/ConfirmModal';

const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Search } = Input;
const { Content, Sider } = Layout;

const Edit = (props) => {
  const { setInputXMl, setLoading } = props;
  const [panes, setPanes] = useState([]);
  const [activeKey, setActiveKey] = useState();
  const [projectTree, setProjectTree] = useState([]);
  const [filePathList, setFilePathList] = useState([]);
  const [modal, setModal] = useState({ type: null, isOpen: false, id: null });
  const [user, setUser] = useState();
  const [form] = Form.useForm();
  const [currentContent, setCurrentContent] = useState('');
  const history = useHistory();
  const paneRef = useRef();
  const pathRef = useRef();
  const [popup, setPopup] = useState({ visible: false, x: 0, y: 0 });
  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    title: '',
    text: '',
    onCancel: () => {},
    onSubmit: () => {},
    id: null,
  });

  const onSearch = (data) => {
    refreshData(user.id, data);
  };

  useEffect(() => {
    paneRef.current = panes;
  }, [panes]);
  useEffect(() => (pathRef.current = filePathList), [filePathList]);

  const saveTab = () => {
    const tabs = {
      ids: panes.map((item) => item.id),
      activeKey,
    };
    setItem('tabs', tabs);
  };

  const refreshData = (id, name) => {
    setLoading(true);
    const payload = {
      user_id: id,
    };
    if (name) payload['project_name'] = name;
    list(payload)
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
  };

  useEffect(() => {
    localStorage.removeItem('tabs');
    const tempUser = getItem('user');
    if (!tempUser) history.push('/');
    setUser(tempUser);
    refreshData(tempUser.id);
  }, []);

  const handleSave = (row, key) => {
    const paneList = cloneDeep(paneRef.current);
    const pane = paneList.find((item) => item.id === key);
    pane.data = pane.data.map((item) => {
      return item.id === row.id ? row : item;
    });
    pane.isUpdate = true;
    const panes = paneList.map((item) => (item.id === pane.id ? pane : item));
    setPanes(panes);
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
    setActiveKey(String(paneTmp[0]?.id));
  };

  const onAddTabs = (id) => {
    const targetKey = id;
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
      const isImage = allowImgExts.includes(file.filename.split('.').pop());
      getFile({ path: path.path, user_id: user.id }, isImage ? 'blob' : '')
        .then((res) => {
          var content = res.data || '';
          if (isImage) {
            const imageBlob = res.data;
            content = window.URL.createObjectURL(imageBlob);
            setPanes([
              ...panes,
              {
                name: file.filename,
                id: targetKey,
                content: content,
                isUpdate: false,
                isOpen: true,
                tempContent: content,
                type: 'image',
              },
            ]);
          } else if (path.path.includes('.csv')) {
            const rows = content.split('\n');
            const columns = rows[0].split(',').map((txt) => ({
              title: txt,
              dataIndex: txt.replaceAll(' ', '').toLowerCase(),
              key: txt.replaceAll(' ', '').toLowerCase(),
              editable: true,
            }));
            columns.unshift({
              title: '#',
              width: 60,
              render: (param, row, index) => index + 1,
            });
            const data = [];
            for (let i = 1; i < rows.length - 1; i++) {
              const obj = {};
              rows[i].split(',').map((txt, index) => {
                obj[
                  rows[0].split(',')[index].replaceAll(' ', '').toLowerCase()
                ] = txt;
              });
              obj.id = i - 1;
              data.push(obj);
            }
            console.log(columns);
            var edtiableColumns = columns.map((col) => {
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
                  handleSave: (row) => handleSave(row, targetKey),
                }),
              };
            });
            setPanes([
              ...panes,
              {
                name: file.filename,
                id: targetKey,
                columns: edtiableColumns,
                data,
                isUpdate: false,
              },
            ]);
          } else
            setPanes([
              ...panes,
              {
                name: file.filename,
                id: targetKey,
                content: content,
                isUpdate: false,
                isOpen: true,
                tempContent: content,
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
          setActiveKey(targetKey);
          setLoading(false);
        });
    } else setActiveKey(id);
  };

  const handleCloseModal = () => {
    setModal({ type: null, isOpen: false, id: null });
  };

  const handleCreateProject = (name) => {
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

  const handleUploadProject = (file) => {
    handleCloseModal();
    setLoading(true);
    var formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('payload', file);
    upload(formData)
      .then((response) => {
        list({ user_id: user.id })
          .then((res) => {
            const data = res.data.data;
            setProjectTree(data);
            const transform = transformTree(data);
            setFilePathList(transform);
          })
          .finally(() => setLoading(false));
        addNotification('Upload file successfully', NOTIFICATION_TYPE.SUCCESS);
      })
      .catch((err) => {
        addNotification(err?.response?.data?.message, NOTIFICATION_TYPE.ERROR);
        setModal({
          type: 'UPLOAD_PROJECT',
          isOpen: true,
          id: null,
        });
        setLoading(false);
      });
  };

  const handleLastestSimulation = () => {
    history.push('/simulation/' + activeKey + '/history');
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
    var maxStep = 0;
    outputList.map((item) => {
      const temp = Math.floor(
        Number(model?.finalStep) / Number(item?.framerate) || 0,
      );
      if (temp > maxStep) maxStep = temp;
    });
    setInputXMl({
      model,
      parameterList: data.parameterList || [],
      outputList,
      xml,
      projectName: pj?.name,
      maxStep,
    });
    handleCloseModal();
    saveTab();
    history.push('/simulation/' + modal.id);
  };

  const handleOpenParameter = (id, content) => {
    setCurrentContent(content);
    setModal({
      isOpen: true,
      type: 'PARAMETER',
      id,
    });
  };

  const handleUploadFile = (data, file) => {
    handleCloseModal();
    setLoading(true);
    var formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('file', file);
    formData.append('type', data.type);
    formData.append('project_id', data.projectId);
    formData.append('path', data.path + '/' + file.name);
    uploadFile(formData)
      .then((res) => {
        refreshData(user.id);
        addNotification('Upload file successfully', NOTIFICATION_TYPE.SUCCESS);
      })
      .catch((err) => {
        addNotification(err?.response?.data?.message, NOTIFICATION_TYPE.ERROR);
        setModal({
          type: 'UPLOAD_FILE',
          isOpen: true,
          id: null,
        });
        setLoading(false);
      });
  };

  const handleSaveFile = (pane) => {
    const paneTemp = panes.map((item) =>
      item.id === pane.id
        ? {
            ...item,
            isUpdate: false,
            content: pane.tempContent,
          }
        : item,
    );
    setPanes(paneTemp);
    const path = filePathList.find((item) => item.id === pane.id).path;
    let csvContent = '';
    if (pane.data && pane.columns) {
      csvContent =
        pane.columns
          .filter((item) => item.dataIndex)
          .map((item) => item.title)
          .join(',') + '\r\n';
      const columnIndexes = pane.columns
        .filter((item) => item.dataIndex)
        .map((item) => item.dataIndex);
      csvContent += pane.data
        .map((item) => {
          var res = '';
          res = columnIndexes.map((key) => item[key]).join(',');
          return res + '\r\n';
        })
        .join('');
    }
    const content = pane.name.includes('.gaml') ? pane.tempContent : csvContent;
    var formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('file', new File([content], pane.name));
    formData.append('path', path);
    update(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleRightClickFile = (e, id) => {
    e.preventDefault();
    setPopup({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      handleClick: () => {
        setConfirmModal({
          visible: true,
          title: 'Delete',
          text: 'Do you want to delete this file?',
          onCancel: closeConfirmModal,
          onSubmit: () => handleDeleteFile(id),
        });
      },
    });
  };

  const closeConfirmModal = () => {
    setPopup({ visible: false, x: 0, y: 0 });
    setConfirmModal({
      visible: false,
      title: '',
      text: '',
      onCancel: () => {},
      onSubmit: () => {},
      id: null,
    });
  };

  const handleDeleteFile = (id) => {
    closeConfirmModal();
    setLoading(true);
    onRemoveTab(id);
    deleteFile(id)
      .then((res) => {
        refreshData(user.id);
        addNotification('Delete file successfully', NOTIFICATION_TYPE.SUCCESS);
      })
      .catch((err) =>
        addNotification(err?.response?.data?.message, NOTIFICATION_TYPE.ERROR),
      );
  };
  return (
    <>
      <Layout
        style={{ height: '100vh' }}
        onClick={() => setPopup({ visible: false, x: 0, y: 0 })}
      >
        <ConfirmModal {...confirmModal} />
        <Popup {...popup} />
        {modal.type === 'UPLOAD_PROJECT' && modal.isOpen && (
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
        {modal.type === 'UPLOAD_FILE' && modal.isOpen && (
          <UploadFileModal
            isShow={modal.isOpen}
            onCancel={() => setModal({ type: null, isOpen: false, id: null })}
            onUploadFile={handleUploadFile}
            data={projectTree}
          />
        )}
        {modal.type === 'PARAMETER' && modal.isOpen && (
          <ParameterModal
            isShow={modal.isOpen}
            onCancel={() => {
              setModal({ type: null, isOpen: false, id: null });
              setCurrentContent('');
            }}
            onSimulate={handleSimulation}
            form={form}
            content={currentContent}
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
                  className={'scroll-bar'}
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
                        style={{ width: 190 }}
                      />
                    </Col>
                    <Col>
                      <Tooltip title="Upload Project">
                        <Button
                          type="text"
                          shape="circle"
                          icon={<CloudUploadOutlined />}
                          onClick={() =>
                            setModal({
                              type: 'UPLOAD_PROJECT',
                              isOpen: true,
                              id: null,
                            })
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Upload File">
                        <Button
                          type="text"
                          shape="circle"
                          icon={<FileAddOutlined />}
                          onClick={() =>
                            setModal({
                              type: 'UPLOAD_FILE',
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
                              onContextMenu={(e) =>
                                handleRightClickFile(e, include.id)
                              }
                            >
                              <Tooltip
                                style={{ width: 'auto' }}
                                title={include.filename}
                              >
                                {include.filename}
                              </Tooltip>
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
                              onContextMenu={(e) =>
                                handleRightClickFile(e, model.id)
                              }
                            >
                              <Tooltip
                                style={{ width: 'auto' }}
                                title={model.filename}
                              >
                                {model.filename}
                              </Tooltip>
                            </Menu.Item>
                          ))}
                        </SubMenu>
                      </SubMenu>
                    );
                  })}
                </Menu>
              </Sider>
            </Col>

            <Content style={{ padding: '0 20px 0 100px', minHeight: 280 }}>
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
                        height: '85vh',
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
                            handleOpenParameter(pane.id, pane.content)
                          }
                        >
                          Exp
                        </Button>
                      )}
                      {pane.name.includes('gaml') && (
                        <Button
                          type="primary"
                          style={{
                            margin: '15px 10px',
                            backgroundColor: '#3ea1ff',
                          }}
                          icon={
                            <FileTextOutlined
                              color="#fff"
                              style={{ fontSize: 15 }}
                            />
                          }
                          onClick={handleLastestSimulation}
                        >
                          Lastest Result
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
                            handleSaveFile(pane);
                          }}
                        >
                          Save
                        </Button>
                      )}
                      <div className="main-content">
                        {pane.name.includes('csv') ? (
                          pane.columns && pane.data ? (
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
                              dataSource={pane.data}
                              columns={pane.columns}
                              scroll={{ y: '74vh' }}
                            />
                          ) : (
                            <CodeMirror
                              value={'Data not found'}
                              height="80vh"
                              style={{ userSelect: 'none' }}
                              editable={false}
                            />
                          )
                        ) : pane.type === 'image' ? (
                          <div
                            className="image-container"
                            style={{
                              height: '100%',
                              display: 'flex',
                            }}
                          >
                            <img src={pane.content} alt={pane.name} />
                          </div>
                        ) : (
                          <CodeMirror
                            value={pane.content || ''}
                            height="80vh"
                            editable={editableListExt.includes(
                              pane.name.split('.').pop(),
                            )}
                            onChange={(value, viewUpdate) => {
                              const isChange =
                                !pane.isOpen && !isEqual(value, pane.content);
                              const paneTemp = panes.map((item) =>
                                item.id === pane.id
                                  ? {
                                      ...item,
                                      isUpdate: isChange,
                                      isOpen: false,
                                      tempContent: isChange
                                        ? value
                                        : pane.content,
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
    setLoading: (value) => dispatch({ type: 'SPIN_LOADING', value }),
  };
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
