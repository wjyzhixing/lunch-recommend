import {
  Form,
  Input,
  Button,
  Modal,
  InputNumber,
  Rate,
  message,
  Select,
} from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'umi';
import { addTagIfExpensive } from '../../services/example';
const { Option } = Select;
const ChangeModal = ({
  visiable,
  close,
  obj,
  dispatch,
  initQuery,
  userlog,
  title,
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
        if (title === '添加一个') {
          dispatch({
            type: 'example/addMyWifeFood',
            payload: {
              ...values,
              user: userlog,
            },
          }).then((res) => {
            console.log(res);
            if (res?.code === 0) {
              form.resetFields();
              message.success('添加成功~');
              initQuery(userlog);
              setIsModalVisible(false);
              close();
            } else {
              if (res) {
                message.info(res?.message);
              }
            }
          });
        } else if (title === '打标签') {
          addTagIfExpensive({ id: obj?._id, ...values }).then((res) => {
            if (res?.result === 'success') {
              message.success('修改成功！');
              initQuery(userlog);
              setIsModalVisible(false);
              close();
            }
          });
        } else {
          dispatch({
            type: 'example/updateMyWifeFood',
            payload: {
              ...values,
              id: obj?._id,
            },
          }).then((res) => {
            if (res?.result === 'success' && res?.code === 0) {
              message.success('修改成功~');
              initQuery(userlog);
              setIsModalVisible(false);
              close();
            } else {
              message.error('修改失败，请稍后再试');
            }
          });
        }
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
      title={title || '修改信息'}
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
          {title ? '添加' : '修改'}
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
        initialValues={{
          ...obj,
        }}
        autoComplete="off"
      >
        {title === '修改' || title === '添加一个' ? (
          <>
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
              label="哪餐"
              name="whichTime"
              rules={[
                {
                  required: true,
                  message: '选择哪一顿吃哈!',
                },
              ]}
            >
              <Select>
                <Option value="早餐">早餐</Option>
                <Option value="午餐">午餐</Option>
                <Option value="晚餐">晚餐</Option>
                <Option value="全部">全部</Option>
              </Select>
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
          </>
        ) : (
          <>
            <Form.Item
              label="打标签"
              name="ifExpensive"
              rules={[
                {
                  required: true,
                  message: '打个标签!',
                },
              ]}
            >
              <Select>
                <Option value="很便宜">很便宜</Option>
                <Option value="贵但可接受">贵但可接受</Option>
                <Option value="便宜不想吃">便宜不想吃</Option>
                <Option value="太贵">太贵</Option>
                <Option value="下次一定">下次一定</Option>
              </Select>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default connect(({ example }) => ({
  example,
}))(ChangeModal);
