import { Form, Input, Button, Modal, InputNumber, message } from 'antd';
import { useEffect, useState } from 'react';
import {
  getRandomFoodList,
  updateRandomFoodList,
  recommendMyWifeFood,
} from '@/services/example';
import { ExampleState, useSelector } from 'umi';

interface IProps {
  visible: boolean;
  title: string;
  userlog: string | null;
  onClose: () => void;
}

const rand = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default function RandomModal({
  visible,
  onClose,
  title,
  userlog,
}: IProps) {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [areaShow, setAreaShow] = useState(false);
  const [changeTrue, setChangeTrue] = useState(true);
  const example = useSelector((state: any) => state.example as ExampleState);

  useEffect(() => {
    setIsModalVisible(visible);
  }, [visible]);

  const handleCancel = () => {
    // setIsModalVisible(false);
    onClose();
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
      if (res?.food?.includes('，') && String(res?.food).trim() !== '') {
        const list = res?.food?.split('，');
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
    setAreaShow(false);
    getRandomFoodList({ user: userlog }).then((res) => {
      if (res?.result === 'success') {
        setShow(true);
        form.setFieldsValue({
          food: res?.data?.value,
        });
      }
    });
  };

  const changeRule = () => {
    setShow(false);
    setAreaShow(true);
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

  const changeTest = () => {
    const rule = form.getFieldsValue()?.rule;
    try {
      new Function('return ' + rule)()(0, 0);
      message.success('函数合法');
      setChangeTrue(false);
    } catch (e) {
      message.error('函数有误');
      setChangeTrue(true);
    }
  };

  const recommendTest = () => {
    const rule = form.getFieldsValue()?.rule;
    recommendMyWifeFood({ user: userlog, rule }).then((res) => {
      if (res?.code === 0) {
        message.success({
          content: `今天推荐来吃${res?.data || '鸡腿'}!`,
          key: 'key！',
          duration: 2,
        });
      }
    });
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
        <Button
          style={{ marginRight: 20 }}
          onClick={randomList}
          size={window.screen.width < 500 ? 'small' : 'middle'}
        >
          真·随机选一个！
        </Button>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => getRandomFoodListFunc()}
          size={window.screen.width < 500 ? 'small' : 'middle'}
        >
          我要重新筛！
        </Button>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => changeRule()}
          size={window.screen.width < 500 ? 'small' : 'middle'}
        >
          修改规则选一个！
        </Button>
      </div>
      <div style={{ margin: '10px 0px' }}>
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
            autoComplete="off"
            size={window.screen.width < 500 ? 'small' : 'middle'}
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
              size={window.screen.width < 500 ? 'small' : 'middle'}
            >
              选！
            </Button>
            <Button
              type="primary"
              onClick={changeList}
              size={window.screen.width < 500 ? 'small' : 'middle'}
            >
              修改一下备用列表！
            </Button>
          </Form>
        )}
        {areaShow && (
          <Form
            name="basic"
            form={form}
            onChange={(e) => setChangeTrue(true)}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              rule: `
/**
 * @param Number {times} 吃的次数
 * @param Number {love} 喜爱程度
 * @return Number 数值越大越为推荐食物
 * 提交时候删除注释
 */
computedValue = (time, love) => {
  return (Math.pow(2, love) / (1 + time));
}
              `,
            }}
            autoComplete="off"
            size={window.screen.width < 500 ? 'small' : 'middle'}
          >
            <div style={{ margin: '0 5px 10px', color: ' #acacac' }}>
              注意time和love形参顺序不可改变，记得提交测试删除注释
            </div>
            <Form.Item
              label="输入规则函数"
              name="rule"
              rules={[
                {
                  required: true,
                  message: '打个输入规则函数哈!',
                },
              ]}
            >
              <Input.TextArea placeholder="输入规则函数~" rows={12} />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="primary"
                onClick={() => changeTest()}
                style={{ marginRight: '30px' }}
                size={window.screen.width < 500 ? 'small' : 'middle'}
              >
                修改语句测试！
              </Button>
              <Button
                type="primary"
                onClick={() => recommendTest()}
                style={{ marginRight: '30px' }}
                disabled={changeTrue}
                size={window.screen.width < 500 ? 'small' : 'middle'}
              >
                推荐！
              </Button>
            </div>
          </Form>
        )}
      </div>
    </Modal>
  );
}
