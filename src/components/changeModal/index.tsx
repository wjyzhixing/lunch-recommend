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
import { Dispatch, useDispatch } from 'umi';
import { addTagIfExpensive } from '@/services/example';
import { HttpResult } from '@/types/HttpResult';

const { Option } = Select;

interface IProps {
  visiable: boolean;
  obj?: Record<string, any>;
  userlog: string | null;
  title: string;
  close: () => void;
  initQuery: Function;
}

export default function ChangeModal({
  visiable,
  close,
  obj,
  initQuery,
  userlog,
  title,
}: IProps) {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    setIsModalVisible(visiable);
  }, [visiable]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (title === '添加一个') {
          dispatch({
            type: 'example/addMyWifeFood',
            payload: {
              ...values,
              user: userlog,
            },
          }).then((res: HttpResult) => {
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
          }).then((res: HttpResult) => {
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
      .catch((err) => {});
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
          {title === '添加一个' ? '添加' : '修改'}
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
}
