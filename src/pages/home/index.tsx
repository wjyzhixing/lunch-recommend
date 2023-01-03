import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Rate, Tag } from 'antd';
import QRCode from 'qrcode.react';
import * as echarts from 'echarts/core';
import { Dispatch, useDispatch, UserState, useSelector } from 'umi';
import ExampleModal from '@/components/exampleModal';
import RandomModal from '@/components/randomModal';
import LineChart from '@/components/lineChart';
import ChangeModal from '@/components/changeModal';
import { dataURLtoFile, urlToBase64 } from '@/utils';

import styles from './index.less';
import { HttpResult } from '@/types/HttpResult';

export default function Home() {
  const [dataSource, setDataSource] = useState([]);
  const [changeVisiable, setChangeVisiable] = useState(false);
  const [randomVisiable, setRandomVisiable] = useState(false);
  const [obj, setObj] = useState({});
  const [title, setTitle] = useState('');
  const [key, setKey] = useState(1);
  const [base, setBase] = useState('');

  const dispatch: Dispatch = useDispatch();
  const user = useSelector((state: any) => state.user as UserState);

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
      // width: 300,
      onFilter: (value: any, record: any) => record.food.indexOf(value) === 0,
      filters: dataSource.map((i: any) => {
        return {
          text: i.food,
          value: i.food,
        };
      }),
      render: (text: any, record: any) => (
        <div>
          <div style={{ display: 'inline-block', marginRight: 10 }}>{text}</div>
          {record?.ifExpensive ? (
            <Tag color="#fd8c55">{record?.ifExpensive}</Tag>
          ) : null}
        </div>
      ),
    },
    {
      title: '已吃次数',
      dataIndex: 'times',
      key: 'times',
      width: 300,
      sorter: (a: any, b: any) => a.times - b.times,
    },
    {
      title: '喜爱程度',
      dataIndex: 'love',
      key: 'love',
      width: 300,
      sorter: (a: any, b: any) => a.love - b.love,
      render: (text: any) => <Rate value={text} disabled />,
    },
    {
      title: '哪餐',
      dataIndex: 'whichTime',
      key: 'whichTime',
      width: 200,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 400,
      render: (_: any, record: any) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setChangeVisiable(true);
              setObj(record);
              setTitle('修改');
            }}
            size={window.screen.width < 500 ? 'small' : 'middle'}
          >
            修改
          </Button>
          <Button
            type="link"
            onClick={() => {
              setChangeVisiable(true);
              setObj(record);
              setTitle('打标签');
            }}
            size={window.screen.width < 500 ? 'small' : 'middle'}
          >
            打标签
          </Button>
          <Popconfirm
            title="是否确认删除?"
            onConfirm={() => {
              dispatch({
                type: 'example/deleteTag',
                payload: {
                  id: record?._id,
                },
              }).then((res: HttpResult) => {
                if (res?.result === 'success' && res?.code === 0) {
                  message.success('删除成功~');
                  initQuery();
                } else {
                  message.error('删除失败，请稍后再试');
                }
              });
            }}
            okText="是"
            cancelText="否"
          >
            <Button
              type="link"
              size={window.screen.width < 500 ? 'small' : 'middle'}
            >
              删除标签
            </Button>
          </Popconfirm>
          <Popconfirm
            title="是否确认删除?"
            onConfirm={() => {
              dispatch({
                type: 'example/deleteMyWifeFood',
                payload: {
                  id: record?._id,
                  username: user.username,
                },
              }).then((res: HttpResult) => {
                if (res?.result === 'success' && res?.code === 0) {
                  message.success('删除成功~');
                  initQuery(String(user.username));
                } else {
                  message.error('删除失败，请稍后再试');
                }
              });
            }}
            okText="是"
            cancelText="否"
          >
            <Button
              type="link"
              size={window.screen.width < 500 ? 'small' : 'middle'}
            >
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
      initQuery(sessionStorage.getItem('user') || undefined);
    }
  }, []);

  const initQuery = (username: string = '') => {
    dispatch({
      type: 'example/getMyWifeFood',
      payload: {
        username: username,
      },
    }).then((res: any) => {
      setKey(key + 1);
      setDataSource(res?.data || []);
      let curEchart = echarts.getInstanceByDom(
        document.getElementById('foodLine')!,
      );
      let temp = curEchart!.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff',
      });
      const blob = dataURLtoFile(temp, 'file');
      const url = window.URL.createObjectURL(blob);
      urlToBase64(url).then((res: string) => {
        setBase(res);
      });
    });
  };

  const onSubmit = (values: any) => {
    dispatch({
      type: 'example/getMyWifeFood',
      payload: {
        ...values,
        username: user.username,
      },
    }).then((res: any) => {
      if (res?.code === 0) {
        message.success('查询成功~');
        setDataSource(res?.data || []);
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
        user: user.username,
      },
    }).then((res: HttpResult) => {
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
    let canvas = document.getElementById(
      'share_qr_code_url',
    ) as HTMLCanvasElement;
    let base64Img = canvas?.toDataURL();
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

  return (
    <div>
      <div
        style={{
          background: '#ff9a01',
          height: window.screen.width < 500 ? 100 : 150,
          position: 'sticky',
          zIndex: 2,
        }}
      >
        {/* <div className={styles.pic}>为了解决吃什么的困扰</div> */}
        <div
          className={styles.pic}
          style={{ bottom: window.screen.width < 500 ? 30 : 40 }}
        ></div>
      </div>
      <div
        style={{
          border: '1px solid #efefef',
          width: '80%',
          margin: '0 auto',
          background: '#fff',
          borderRadius: 20,
          position: 'relative',
          top: -40,
          zIndex: 3,
        }}
      >
        <ExampleModal
          onSubmit={onSubmit}
          onRandom={onRandom}
          openModal={openModal}
          initQuery={initQuery}
          userlog={user.username}
        />
        <div className={styles.table}>
          <Table
            locale={{
              cancelSort: '点击取消排序',
              triggerAsc: '点击升序',
              triggerDesc: '点击降序',
            }}
            dataSource={dataSource}
            key={key}
            columns={columns}
            rowKey="_id"
            scroll={{
              x: 1500,
            }}
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
              fgColor="#ffbf04" //二维码的颜色
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

        {randomVisiable && (
          <RandomModal
            visible={randomVisiable}
            title={title}
            userlog={user.username}
            onClose={() => setRandomVisiable(false)}
          />
        )}
        {changeVisiable && (
          <ChangeModal
            visiable={changeVisiable}
            close={() => setChangeVisiable(false)}
            obj={obj}
            initQuery={initQuery}
            title={title}
            userlog={user.username}
          />
        )}
      </div>
    </div>
  );
}
