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
  const [form] = Form.useForm();
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
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row>
        <Col xs={12} sm={8} md={8} lg={4} xl={4}>
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
        <Col xs={12} sm={8} md={8} lg={4} xl={4}>
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
        <Col xs={24} sm={8} md={8} lg={5} xl={5}>
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
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={10}
          xl={10}
          style={{ textAlign: 'center' }}
        >
          <Form.Item
            labelCol={{
              span: 24,
            }}
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
