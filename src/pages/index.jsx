import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Rate } from 'antd';
import ExampleModal from '@/components/exampleModal/index';
import ChangeModal from '@/components/changeModal/index';
import RandomModal from '@/components/randomModal/index';
import LoginModal from '@/components/loginModal/index';
import LineChart from '@/components/lineChart/index';
import QRCode from 'qrcode.react';
import * as echarts from 'echarts/core';

import { connect } from 'umi';
import styles from './index.less';
// import solarLunar from 'solarLunar';
// import moment from 'moment';

function IndexPage(props) {
  const [dataSource, setDataSource] = useState([]);
  const [changeVisiable, setChangeVisiable] = useState(false);
  const [randomVisiable, setRandomVisiable] = useState(false);
  const [loginVisiable, setLoginVisiable] = useState(true);
  const [obj, setObj] = useState({});
  const [title, setTitle] = useState('');
  const [userlog, setUserlog] = useState(null);
  const [key, setKey] = useState(1);
  const [base, setBase] = useState('');

  const { dispatch, user } = props;
  const columns = [
    // {
    //   title: 'id',
    //   dataIndex: '_id',
    //   key: 'id',
    // },
    {
      title: '吃饭名称',
      dataIndex: 'food',
      key: 'food',
      onFilter: (value, record) => record.food.indexOf(value) === 0,
      filters: dataSource.map((i) => {
        return {
          text: i.food,
          value: i.food,
        };
      }),
    },
    {
      title: '已吃次数',
      dataIndex: 'times',
      key: 'times',
      sorter: (a, b) => a.times - b.times,
    },
    {
      title: '喜爱程度',
      dataIndex: 'love',
      key: 'love',
      sorter: (a, b) => a.love - b.love,
      render: (text) => <Rate value={text} disabled />,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setChangeVisiable(true);
              setObj(record);
            }}
          >
            修改
          </Button>
          <Popconfirm
            title="是否确认删除?"
            onConfirm={() => {
              dispatch({
                type: 'example/deleteMyWifeFood',
                payload: {
                  id: record?._id,
                  username: userlog,
                },
              }).then((res) => {
                initQuery(String(userlog));
              });
            }}
            okText="是"
            cancelText="否"
          >
            {' '}
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    // initQuery();
    return () => {
      console.log(1);
      sessionStorage.clear();
    };
  }, []);

  const initQuery = (username) => {
    dispatch({
      type: 'example/getMyWifeFood',
      payload: {
        username: username || userlog,
      },
    }).then((res) => {
      setKey(key + 1);
      setDataSource(res?.data || []);
      let curEchart = echarts.getInstanceByDom(
        document.getElementById('foodLine'),
      );
      let temp = curEchart.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff',
      });
      const blob = dataURLtoFile(temp, 'file');
      const url = window.URL.createObjectURL(blob);
      urlToBase64(url).then((res) => {
        // console.log(res);
        setBase(res);
      });
    });
  };

  function dataURLtoFile(dataUrl, fileName) {
    var arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  }

  function urlToBase64(url) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        // 将图片插入画布并开始绘制
        canvas.getContext('2d').drawImage(image, 0, 0);
        // result
        let result = canvas.toDataURL('image/png');
        resolve(result);
      };
      // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
      image.setAttribute('crossOrigin', 'Anonymous');
      image.src = url;
      // 图片加载失败的错误处理
      image.onerror = () => {
        reject(new Error('转换失败'));
      };
    });
  }

  const onSubmit = (values) => {
    dispatch({
      type: 'example/addMyWifeFood',
      payload: {
        ...values,
        user: userlog,
      },
    }).then((res) => {
      console.log(res);
      if (res?.code === 0) {
        initQuery(user?.username);
      } else {
        if (res) {
          message.info(res?.message);
        }
      }
    });
  };

  const onRandom = () => {
    dispatch({
      type: 'example/recommendMyWifeFood',
      payload: {
        user: userlog,
      },
    }).then((res) => {
      console.log(res);
      if (res?.code === 0) {
        message.success({
          content: `今天推荐来吃${res?.data || '鸡腿'}!`,
          key: 'key！',
          duration: 2,
        });
      } else {
        if (res) {
          message.info(res?.message);
        }
      }
    });
  };

  const openModal = () => {
    setRandomVisiable(true);
    setTitle('选一个随机种类');
  };

  const download = () => {
    let canvas = document.getElementById('share_qr_code_url');
    let base64Img = canvas.toDataURL();
    let link = document.createElement('a');
    link.href = base64Img;
    link.download = 'code' + Date.now();
    let event = document.createEvent('MouseEvents');
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null,
    );
    link.dispatchEvent(event);
  };
  // const getconclusion = () => {
  // };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div className={styles.titleEffect}>今天吃什么</div>
      </div>
      <ExampleModal
        onSubmit={onSubmit}
        onRandom={onRandom}
        openModal={openModal}
      />
      <div className={styles.table}>
        <Table
          dataSource={dataSource}
          key={key}
          columns={columns}
          rowKey="_id"
        />
      </div>
      <div style={{ paddingBottom: 10 }}>
        <div className={styles.title}>已有餐饮类型分析图</div>
        <LineChart id={'foodLine'} data={dataSource} />
      </div>
      <div style={{ paddingBottom: 50, margin: '0 auto' }}>
        <div className={styles.title} onClick={() => download()}>
          保存我们的二维码
        </div>
        <div style={{ textAlign: 'center' }}>
          <QRCode
            id="share_qr_code_url"
            value={'http://43.143.38.230:8080/dist/#/'} //value参数为生成二维码的链接 我这里是由后端返回
            size={200} //二维码的宽高尺寸
            fgColor="skyblue" //二维码的颜色
          />
          {/* <a href={base}>download</a> */}
          {/* <QRCode
            id="conclusion_qr_code_url"
            value={base} //value参数为生成二维码的链接 我这里是由后端返回
            size={200} //二维码的宽高尺寸
            fgColor="skyblue" //二维码的颜色
          /> */}
        </div>
      </div>
      <div className={styles.fix}>
        版权所有 &copy;2022 wjy. All rights reserved.
      </div>
      {changeVisiable && (
        <ChangeModal
          visiable={changeVisiable}
          close={() => setChangeVisiable(false)}
          obj={obj}
          initQuery={initQuery}
          title={title}
          userlog={userlog}
        />
      )}
      {randomVisiable && (
        <RandomModal
          visiable={randomVisiable}
          close={() => setRandomVisiable(false)}
          title={title}
          userlog={userlog}
        />
      )}
      {loginVisiable && (
        <LoginModal
          visiable={loginVisiable}
          close={() => setLoginVisiable(false)}
          initQuery={initQuery}
          setUserlog={setUserlog}
        />
      )}
    </div>
  );
}

export default connect(({ example, user }) => ({
  example,
  user,
}))(IndexPage);
