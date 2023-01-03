import { ReactElement, useEffect, useState } from 'react';
import { Button, message, Layout, Menu } from 'antd';
import { Dispatch, useDispatch } from 'umi';
import {
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import InfoModal from '@/components/InfoModal';
import LoginModal from '@/components/loginModal';
import { decryptByDES } from '@/utils/crypto';

import styles from './index.less';

const { Header, Content } = Layout;

const items = [
  { label: '首页', key: '首页' }, // 菜单项务必填写 key
  // { label: '菜单项二', key: 'item-2' },
  // {
  //   label: '子菜单',
  //   key: 'submenu',
  //   children: [{ label: '子菜单项', key: 'submenu-item-1' }],
  // },
];

interface IProps {
  children: ReactElement;
}

export default function BasicLayout({ children }: IProps) {
  const [loginVisiable, setLoginVisiable] = useState(true);
  const [infoVisiable, setInfoVisiable] = useState(false);
  const [userlog, setUserlog] = useState<string | null>(null);

  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
      setLoginVisiable(false);
      setUserlog(sessionStorage.getItem('user') || null);
      dispatch({
        type: 'user/update',
        username: sessionStorage.getItem('username'),
        id: decryptByDES(sessionStorage.getItem('id') || undefined, '123'),
      });
    }
    return () => {
      sessionStorage.clear();
    };
  }, []);

  const log = () => {
    sessionStorage.clear();
    setLoginVisiable(true);
    setUserlog(null);
    dispatch({
      type: 'user/update',
      username: '',
      id: '',
    });
    userlog ? message.success('退出成功') : null;
  };

  return (
    <Layout className={styles.basicLayout}>
      <Header style={{ padding: '0px 5px 0 10px', zIndex: 10 }}>
        {/* <div className={styles.title}> */}
        {/* <div className={styles.titleEffect}>今天吃什么</div> */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <div className={styles.titleAll}>今天吃什么?</div>
            {/* </div> */}
            {window.screen.width < 500 ? null : (
              <div>
                <Menu
                  style={{
                    maxWidth: 200,
                    minWidth: 100,
                    marginLeft: 20,
                    background: '#ffc718',
                    color: 'black',
                  }}
                  // theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['首页']}
                  items={items}
                />
              </div>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: '#000', alignItems: 'center', fontSize: 18 }}>
              {userlog && `${userlog}您好`}
            </span>
            {userlog && (
              <Button
                type="link"
                style={{ color: '#000', alignItems: 'center', marginRight: 5 }}
                shape="circle"
                onClick={() => setInfoVisiable(true)}
              >
                <SettingOutlined style={{ fontSize: 20 }} />
              </Button>
            )}
            <Button
              type="link"
              style={{ color: '#000', alignItems: 'center', marginRight: 5 }}
              shape="circle"
              onClick={() => log()}
            >
              {userlog ? (
                <LogoutOutlined style={{ fontSize: 20 }} />
              ) : (
                <LoginOutlined style={{ fontSize: 20 }} />
              )}
            </Button>
          </div>
        </div>
      </Header>
      <Content>{children}</Content>
      <div className={styles.fix}>
        版权所有 &copy;2022 wjy. All rights reserved.
      </div>
      {loginVisiable && (
        <LoginModal
          visible={loginVisiable}
          onCancel={() => setLoginVisiable(false)}
          onOk={setUserlog}
        />
      )}
      {infoVisiable && (
        <InfoModal
          visible={infoVisiable}
          close={() => setInfoVisiable(false)}
        />
      )}
    </Layout>
  );
}
