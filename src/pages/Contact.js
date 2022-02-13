import React, { useState, useEffect } from 'react'
import { Layout, Menu, Table, Space, Button, Popover, Image, Row, Col, notification } from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContacts, resetNotif } from '../redux/action/contactAction';
import AddContact from '../components/Modal/AddContact';

const { Header, Content, Sider } = Layout;

function Contact() {

  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalId, setModalId] = useState('')
  const [loading, setLoading] = useState(false)
  const { contacts, notif } = useSelector((state) => state.ContactReducer);

  useEffect(() => {
    if (contacts.length === 0) dispatch(getContacts());
    return () => { };
  }, [contacts]);

  useEffect(() => {
    if (notif?.message) {
      if (notif.type === 'success') {
        setModal(false)
        setModalId('')
      }
      setLoading(false)
      notification[notif.type]({
        message: notif.message,
        description: notif.description,
      });
      setTimeout(() => {
        dispatch(resetNotif())
      }, 4500);
    }
    return () => { };
  }, [notif]);

  const toggle = () => {
    setCollapsed(!collapsed)
  };


  const showModal = () => {
    setModal(true)
  };

  const hideModal = () => {
    setModal(false)
    setModalId('')
  };

  const handleDelete = (id, data) => {
    setLoading(true)
    setModalId(id)
    dispatch(deleteContact(id, data))
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'User',
      dataIndex: 'photo',
      render: text => <Image
        width={60}
        height={60}
        src={text === "N/A" ? "error" : text}
        fallback="data:image/png;base64,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"
      />
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      sorter: true,
      render: text => <a>{text}</a>,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      sorter: true,
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      className: 'column-money',
      dataIndex: 'age',
      sorter: true,
      align: 'right',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <Popover content={
            <Space size={100}>
              <div>Delete</div>
              <Button type="primary" danger onClick={() => handleDelete(text.id, text)} loading={modalId === text.id && loading}>Now</Button>
            </Space>
          } title="Contact">
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
          </Popover>
          <>
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {
              showModal()
              setModalId(text.id)
            }} />
            {
              modalId === text.id && <AddContact key={text.id} modal={modal} cbHideModal={hideModal} contact={text} id={text.id} />
            }
          </>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Layout style={{ overflowY: 'hidden', maxHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo"
            style={{ height: 60, color: 'white', padding: 14, fontWeight: 700, fontSize: 20 }} >
            {collapsed ? '' : "Contact Book"}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Contact
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Chat
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Upload
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, color: 'white' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '80vh',
            }}
          >
            <Table
              pagination={{ pageSize: 50 }}
              scroll={{ y: 470 }}
              columns={columns}
              dataSource={contacts}
              bordered
              tableLayout='fixed'
              title={() => <Row justify='space-between' >
                <Col span={8}>
                  <h2>List contacts</h2>
                </Col>
                <Col span={3}>
                  <Space align='end'>
                    <Button type='primary' size='large' icon={<PlusCircleOutlined />} onClick={() => setModal(true)}>Add Contact</Button>
                    {modal && !modalId && <AddContact modal={modal} cbHideModal={hideModal} />}
                  </Space>
                </Col>
              </Row>
              }
            />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Contact