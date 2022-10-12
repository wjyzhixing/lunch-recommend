import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import ExampleModal from '@/components/exampleModal/index';
import ChangeModal from '@/components/changeModal/index';
import RandomModal from '@/components/randomModal/index';
import LoginModal from '@/components/loginModal/index';

import { connect } from 'umi';
import styles from './index.less';
// import solarLunar from 'solarLunar';
// import moment from 'moment';

function IndexPage(props: any) {
  const [dataSource, setDataSource] = useState([]);
  const [changeVisiable, setChangeVisiable] = useState(false);
  const [randomVisiable, setRandomVisiable] = useState(false);
  const [loginVisiable, setLoginVisiable] = useState(true);
  const [obj, setObj] = useState({});
  const [title, setTitle] = useState('');
  const [userlog, setUserlog] = useState(null);
  const { dispatch, user } = props;
  console.log(user, 'user')
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
      filters: dataSource.map(i => {
        return {
          text: i.food,
          value: i.food
        }
      })
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
              }).then(res => {
                initQuery(String(userlog));
              });
            }}
            okText="是"
            cancelText="否"
          > <a
          >
              删除
            </a>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    // initQuery();
    return () => {
      console.log(1)
      sessionStorage.clear();
    }
  }, []);

  const initQuery = (username: String) => {
    dispatch({
      type: 'example/getMyWifeFood',
      payload: {
        username: username || userlog
      }
    }).then((res: { data: any }) => {
      const { data } = res;
      setDataSource(data);
    });
  };

  const onSubmit = (values: any) => {
    dispatch({
      type: 'example/addMyWifeFood',
      payload: {
        ...values,
        user: userlog,
      },
    }).then((res: any) => {
      console.log(res);
      if (res?.code === 0) {
        initQuery(user?.username);
      } else {
        if (res) {
          message.info(res?.message)
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
    }).then((res: any) => {
      console.log(res);
      if (res?.code === 0) {
        message.success({ content: `今天推荐来吃${res?.data || '鸡腿'}!`, key: 'key！', duration: 2 });
      } else {
        if (res) {
          message.info(res?.message)
        }
      }
    });
  }

  const openModal = () => {
    setRandomVisiable(true);
    setTitle('选一个随机种类')
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div className={styles.titleEffect}>
          今天吃什么
        </div>
      </div>
      <ExampleModal onSubmit={onSubmit} onRandom={onRandom} openModal={openModal} />
      <div className={styles.table}>
        <Table dataSource={dataSource} columns={columns} rowKey="_id" />
      </div>
      {changeVisiable && (
        <ChangeModal
          visiable={changeVisiable}
          close={() => setChangeVisiable(false)}
          obj={obj}
          initQuery={initQuery}
          title={title}
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
