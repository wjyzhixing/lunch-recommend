import { Form, Input, Button, Modal, InputNumber, message } from 'antd';
import { useEffect, useState } from 'react';
import { getRandomFoodList, updateRandomFoodList } from '@/services/example';
import { connect } from 'umi';

const RandomModal = ({ visiable, close, obj, title, example, userlog }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsModalVisible(visiable);
  }, [visiable]);

  const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  console.log(example.list);

  const handleCancel = () => {
    // setIsModalVisible(false);
    close();
  };

  const randomList = () => {
    const res = example?.list[rand(0, example?.list?.length || 0) || 0];
    message.success({
      content: `今天试试来吃${res?.food || '鸡腿'}!`,
      key: 'randomList',
      duration: 2,
    });
  };

  const choose = () => {
    form.validateFields().then((res) => {
      console.log(res);
      if (res?.food?.includes('，') && String(res?.food).trim() !== '') {
        const list = res?.food?.split('，');
        console.log(res);
        console.log(list);
        const result = list[rand(0, list?.length || 0) || 0];
        message.success({
          content: `今天试试来吃${result || '鸡腿'}!`,
          key: 'randomList',
          duration: 2,
        });
      } else {
        if (res) {
          message.info({
            content: `是不是忘了打逗号啊!`,
            key: 'error',
            duration: 2,
          });
        }
      }
    });
  };

  const getRandomFoodListFunc = () => {
    getRandomFoodList({ user: userlog }).then((res) => {
      console.log(res);
      if (res?.result === 'success') {
        setShow(true);
        form.setFieldsValue({
          food: res?.data?.value,
        });
      }
    });
  };

  const changeList = () => {
    const food = form.getFieldsValue()?.food;
    if (food?.includes('，') && String(food).trim() !== '') {
      updateRandomFoodList({ ...form.getFieldsValue(), user: userlog }).then(
        (res) => {
          if (res?.result === 'success') {
            message.success('修改成功！');
          }
        },
      );
    } else {
      message.info('请检查食物列表的格式哈');
    }
  };
  return (
    <Modal
      visible={isModalVisible}
      title={title}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <div style={{ display: 'flex' }}>
        <Button style={{ marginRight: 20 }} onClick={randomList}>
          真·随机选一个！
        </Button>
        <Button onClick={() => getRandomFoodListFunc()}>我要重新筛！</Button>
      </div>
      <div style={{ margin: '20px 0px' }}>
        {show && (
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 6,
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
              label="打个食物列表吧"
              name="food"
              rules={[
                {
                  required: true,
                  message: '打个加入的食物哈!',
                },
              ]}
            >
              <Input.TextArea placeholder="打个食物列表，中文逗号隔开~" />
            </Form.Item>
            <Button
              type="primary"
              onClick={choose}
              style={{ marginRight: '30px' }}
            >
              选！
            </Button>
            <Button type="primary" onClick={changeList}>
              修改一下备用列表！
            </Button>
          </Form>
        )}
      </div>
    </Modal>
  );
};

export default connect(({ example }) => ({
  example,
}))(RandomModal);
