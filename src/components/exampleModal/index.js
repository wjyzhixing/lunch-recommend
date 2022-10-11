import {
  Form,
  Input,
  Button,
  Row,
  Col,
  InputNumber,
  Rate,
  message,
} from 'antd';

const ExampleModal = ({ onSubmit, onRandom, openModal }) => {
  const onFinish = (values) => {
    console.log('Success:', values);
    onSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const random = () => {
    onRandom();
    // message.success({ content: '来个鸡腿!', key: 'key！', duration: 2 });
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row>
        <Col span={6}>
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
        </Col>
        <Col span={6}>
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
        </Col>
        <Col span={5}>
          <Form.Item
            label="喜爱程度"
            name="love"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 14,
            }}
            rules={[
              {
                required: true,
                message: '说说有多喜欢!',
              },
            ]}
          >
            <Rate />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
          // wrapperCol={{
          //   offset: 0,
          //   span: 1,
          // }}
          >
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              style={{ marginRight: 10 }}
            >
              加一个！
            </Button>
            <Button
              type="primary"
              danger
              shape="round"
              onClick={random}
              style={{ marginRight: 10 }}
            >
              推荐一个!
            </Button>
            <Button type="primary" danger shape="round" onClick={openModal}>
              随机一个!
            </Button>
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
      </Row>
    </Form>
  );
};

export default ExampleModal;
