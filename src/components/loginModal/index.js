import { Form, Input, Button, Modal, InputNumber, message } from 'antd';
import { useEffect, useState } from 'react';
import { login, registry } from '@/services/user';
import { connect } from 'umi';
import { encryptByDES } from '../../utils/crypto';
const LoginModal = ({
  visiable,
  close,
  obj,
  initQuery,
  setUserlog,
  dispatch,
}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [log, setLog] = useState(true);

  useEffect(() => {
    setIsModalVisible(visiable);
  }, [visiable]);

  const handleCancel = () => {
    // setIsModalVisible(false);
    close();
  };

  const choose = () => {
    form.validateFields().then((res) => {
      console.log(res);
      login(res).then((r) => {
        console.log(r);
        if (r?.code !== 0 && r) {
          message.info({
            content: r?.message,
            key: 'login',
            duration: 2,
          });
        } else {
          message.success({
            content: '登录成功',
            key: 'loginSuccess',
            duration: 2,
          });
          dispatch({
            type: 'user/update',
            username: res?.username,
            id: r?.data?.id,
          });
          console.log(r);
          sessionStorage.setItem('token', r?.data?.token);
          sessionStorage.setItem('user', res?.username);
          sessionStorage.setItem('id', encryptByDES(r?.data?.id, '123'));
          initQuery(res?.username);
          setUserlog(res?.username);
          handleCancel();
        }
      });
    });
  };

  const chooseRegistry = () => {
    form.validateFields().then((res) => {
      console.log(res);
      registry(res).then((r) => {
        console.log(r);
        if (r?.code !== 0 && r) {
          message.info({
            content: r?.data,
            key: 'registry',
            duration: 2,
          });
        } else {
          message.success({
            content: '注册成功',
            key: 'registrySuccess',
            duration: 2,
          });
        }
      });
    });
  };

  return (
    <Modal
      visible={isModalVisible}
      title={log ? '登录' : '注册'}
      onCancel={handleCancel}
      maskClosable={false}
      footer={null}
      closable={false}
      closeIcon={null}
      destroyOnClose
    >
      <div style={{ margin: '20px 0px' }}>
        {login && (
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 17,
            }}
            initialValues={{
              ...obj,
            }}
            autoComplete="off"
          >
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
              <Input placeholder="起个名呗~" />
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
            <div style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                onClick={choose}
                style={{ marginRight: '30px' }}
                size={window.screen.width < 500 ? 'small' : 'middle'}
              >
                登录！
              </Button>
              <Button
                type="primary"
                onClick={chooseRegistry}
                style={{ marginRight: '30px' }}
                size={window.screen.width < 500 ? 'small' : 'middle'}
              >
                直接注册！
              </Button>
            </div>
          </Form>
        )}
      </div>
    </Modal>
  );
};

export default connect(({ user }) => ({
  user,
}))(LoginModal);
