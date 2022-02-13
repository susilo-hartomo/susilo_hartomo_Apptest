import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Button, Space, Form, Input, InputNumber } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getContactById, postContact, putContact } from '../../redux/action/contactAction';
import { useDispatch, useSelector } from 'react-redux';

function AddContact({ modal, cbHideModal, contact, id }) {
  console.log('contact: ', contact);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { contactDetail } = useSelector((state) => state.ContactReducer);

  useEffect(() => {
    if (id && !contact) dispatch(getContactById(id))
    return () => { };
  }, []);

  useEffect(() => {
    return () => { };
  }, [contactDetail]);

  const onSubmit = useCallback((values) => {
    if (values.photo && values.firstName && values.lastName && values.age) {
      if (id) {
        dispatch(putContact(id, values))
      } else {
        dispatch(postContact(values))
      }
    }
  }, []);

  return (
    <Modal
      title={<Space size={100}>
        <div>Form {id ? 'Edit' : 'Add'} Contact</div>
      </Space>}
      visible={modal}
      onOk={form.submit}
      onCancel={cbHideModal}
      okText="Submit"
      cancelText="Cancel"
    >
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onSubmit}
        initialValues={id ? contact || contactDetail : ''}
      >
        <Form.Item label="Photo" name="photo"
          rules={[{ required: true, message: 'Please input your url photo!' }, { type: 'url', warningOnly: true }]}
        >
          <Input
            placeholder="image url photo"
            defaultValue={contact?.photo || contactDetail?.photo}
            value={contact?.photo || contactDetail?.photo}
            allowClear
          />
        </Form.Item>
        <Form.Item label="First Name" name='firstName'
          rules={[{ required: true, message: 'Please input your first name!' }]}>
          <Input
            placeholder="Susilo"
            allowClear
            required
          />
        </Form.Item>
        <Form.Item label="Last Name" name='lastName'
          rules={[{ required: true, message: 'Please input your last name!' }]}>
          <Input
            placeholder="Hartomo"
            allowClear
            required
          />
        </Form.Item>
        <Form.Item label="Age" name='age'
          rules={[{ required: true, message: 'Please input your age' }, { type: 'number', min: 1, message: 'Age must be grate than 1' }]}>
          <InputNumber
            min={1}
            max={90}
            defaultValue={1}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddContact