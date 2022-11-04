import { Form, Input, Button, Modal, message, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'umi';
import { showUserInfo, updateUserInfo } from '../../../../services/user';
import { decryptByDES } from '../../../../utils/crypto';
const InfoModal = ({ visiable, close, dispatch, userlog, title, user }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(user);
  useEffect(() => {
    setIsModalVisible(visiable);
    if (!sessionStorage.getItem('id')) return;
    showUserInfo({
      id: user?.id || decryptByDES(sessionStorage.getItem('id'), '123'),
    }).then((res) => {
      console.log(res.data);
      if (res?.code === 0) {
        form.setFieldsValue({
          username: res?.data?.username,
          password: res?.data?.password,
          email: res?.data?.email,
          ifEmail: res?.data?.ifEmail ?? true,
        });
      }
    });
  }, [visiable]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        updateUserInfo({ ...values, id: user?.id }).then((res) => {
          if (res?.code === 0) {
            form.resetFields();
            message.success('修改成功~');
            setIsModalVisible(false);
            close();
          } else {
            if (res) {
              message.info(res?.message);
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    // setIsModalVisible(false);
    close();
  };

  return (
    <Modal
      visible={isModalVisible}
      title={'修改个人信息'}
      //   onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      footer={[
        <Button
          type="primary"
          onClick={() => handleOk()}
          key="change"
          size={window.screen.width < 500 ? 'small' : 'middle'}
        >
          修改
        </Button>,
      ]}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 14,
        }}
        autoComplete="off"
      >
        <>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '输入个名字哈!',
              },
            ]}
          >
            <Input placeholder="起个名呗~" disabled />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '想个密码呗!',
              },
            ]}
          >
            <Input placeholder="想个密码呗~" />
          </Form.Item>
          <Form.Item
            label="注册邮箱"
            name="email"
            rules={[
              {
                required: false,
                message: '输入个邮箱嘞!',
              },
            ]}
          >
            <Input placeholder="可以输入个邮箱注册~" />
          </Form.Item>
          <Form.Item
            label="是否发送邮件"
            name="ifEmail"
            rules={[
              {
                required: false,
                message: '输入个邮箱嘞!',
              },
            ]}
          >
            <Radio.Group>
              <Radio value={true}> 发送 </Radio>
              <Radio value={false}> 不发送 </Radio>
            </Radio.Group>
          </Form.Item>
        </>
      </Form>
    </Modal>
  );
};

export default connect(({ food, user }) => ({
  food,
  user,
}))(InfoModal);
