import {
  Form,
  Input,
  Button,
  Row,
  Col,
  InputNumber,
  Rate,
  Select,
  message,
  Divider,
} from 'antd';
import ChangeModal from '../changeModal/index';
import { useEffect, useState } from 'react';
import styles from './index.less';
const { Option } = Select;
const ExampleModal = ({
  onSubmit,
  onRandom,
  openModal,
  initQuery,
  userlog,
}) => {
  const [form] = Form.useForm();
  const [changeVisiable, setChangeVisiable] = useState(false);
  // useEffect(() => {
  //   form.setFieldsValue({
  //     whitch
  //   })
  // },[])
  const onFinish = (values) => {
    console.log('Success:', values);
    onSubmit(values, form);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const random = () => {
    onRandom();
    // message.success({ content: '来个鸡腿!', key: 'key！', duration: 2 });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '50%',
          margin: '20px auto 0px',
        }}
      >
        <Button
          // type="danger"
          shape="round"
          onClick={() => setChangeVisiable(true)}
          style={{
            border: 'none',
            fontSize: window.screen.width < 500 ? 13 : 20,
          }}
          className={styles.blink}
          size={window.screen.width < 500 ? 'small' : 'middle'}
        >
          加一个！
        </Button>
        <Divider type="vertical" />
        <Button
          // type="primary"
          shape="round"
          onClick={random}
          className={styles.blink}
          style={{
            border: 'none',
            fontSize: window.screen.width < 500 ? 13 : 20,
          }}
          size={window.screen.width < 500 ? 'small' : 'middle'}
        >
          推荐一个!
        </Button>
        <Divider type="vertical" />
        <Button
          // type="primary"
          shape="round"
          onClick={openModal}
          className={styles.blink}
          style={{
            border: 'none',
            fontSize: window.screen.width < 500 ? 13 : 20,
          }}
          size={window.screen.width < 500 ? 'small' : 'middle'}
        >
          随机一个!
        </Button>
      </div>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        // initialValues={{
        //   whichTime: '全部',
        // }}
        style={{
          marginTop: 20,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size={window.screen.width < 500 ? 'small' : 'middle'}
      >
        <Row>
          <Col xs={12} sm={6} md={6} lg={4} xl={5}>
            <Form.Item
              label="食物"
              name="food"
              // rules={[
              //   {
              //     required: true,
              //     message: '打个加入的食物哈!',
              //   },
              // ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={6} lg={4} xl={5}>
            <Form.Item
              label="次数"
              name="times"
              // rules={[
              //   {
              //     required: true,
              //     message: '敲个吃的次数哈!',
              //   },
              // ]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="请输入"
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={6} lg={4} xl={5}>
            <Form.Item
              label="哪餐"
              name="whichTime"
              // rules={[
              //   {
              //     required: true,
              //     message: '选择哪一顿吃哈!',
              //   },
              // ]}
            >
              <Select allowClear placeholder="请选择">
                <Option value="早餐">早餐</Option>
                <Option value="午餐">午餐</Option>
                <Option value="晚餐">晚餐</Option>
                <Option value="全部">全部</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={6} md={6} lg={4} xl={5}>
            <Form.Item
              label="喜爱程度"
              name="love"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              // rules={[
              //   {
              //     required: true,
              //     message: '说说有多喜欢!',
              //   },
              // ]}
            >
              <Select placeholder="请选择">
                <Option value="0">不喜欢</Option>
                <Option value="1">一点点</Option>
                <Option value="2">一般</Option>
                <Option value="3">较喜欢</Option>
                <Option value="4">很喜欢</Option>
                <Option value="5">非常喜欢</Option>
              </Select>
            </Form.Item>
          </Col>
          {/* <Col span={2}>
          <Button type="primary" danger shape="round" onClick={random}>
            推荐一个!
          </Button>
        </Col>
        <Col span={1}>
          <Button type="primary" danger shape="round" onClick={random}>
            随机一个!
          </Button>
        </Col> */}
          <Col
            xs={24}
            sm={2}
            md={2}
            lg={4}
            xl={4}
            style={{ textAlign: 'right' }}
          >
            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                style={{ marginRight: 10 }}
                size={window.screen.width < 500 ? 'small' : 'middle'}
              >
                {/* window.screen */}
                查询
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {changeVisiable && (
        <ChangeModal
          visiable={changeVisiable}
          close={() => setChangeVisiable(false)}
          initQuery={initQuery}
          userlog={userlog}
          title={'添加一个'}
        />
      )}
    </>
  );
};

export default ExampleModal;
