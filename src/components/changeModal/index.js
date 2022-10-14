import { Form, Input, Button, Modal, InputNumber, Rate } from 'antd';
import { useEffect, useState } from 'react';
import solarLunar from 'solarLunar';
import moment from 'moment';
import { connect } from 'umi';

const ChangeModal = ({
  visiable,
  close,
  obj,
  dispatch,
  initQuery,
  userlog,
}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsModalVisible(visiable);
    console.log(obj);
  }, [visiable]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        dispatch({
          type: 'example/updateMyWifeFood',
          payload: {
            ...values,
            id: obj?._id,
          },
        }).then(() => {
          initQuery(userlog);
          setIsModalVisible(false);
          close();
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // onSubmit(values);
  };

  const handleCancel = () => {
    // setIsModalVisible(false);
    close();
  };

  return (
    <Modal
      visible={isModalVisible}
      title="修改信息"
      //   onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      footer={[
        <Button type="primary" onClick={() => handleOk()} key="change">
          修改
        </Button>,
      ]}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        initialValues={{
          ...obj,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="食物"
          name="food"
          rules={[
            {
              required: true,
              message: '打个加入的食物哈!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="次数"
          name="times"
          rules={[
            {
              required: true,
              message: '敲个吃的次数哈!',
            },
          ]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="喜爱程度"
          name="love"
          rules={[
            {
              required: true,
              message: '说说有多喜欢!',
            },
          ]}
        >
          <Rate />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ example }) => ({
  example,
}))(ChangeModal);
