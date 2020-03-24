import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { stringify } from 'querystring';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { getPageQuery } from '@/utils/utils';

@connect(login => ({ login, loading }) => ({
  //这行是把返回的数据test.data给了test
  login,
  loading: loading.models.list,
}))
class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      // const { dispatch } = this.props;

      // if (dispatch) {
      //   dispatch({
      //     type: 'login/logout',
      //   });
      // }
      localStorage.setItem('userInfo', '');
      window.location.href = '/user/login';
      return;
    }

    router.push(`/account/${key}`);
  };

  render() {
    const { menu } = this.props;
    let currentUser = '';
    if (localStorage.getItem('userInfo')) {
      currentUser = JSON.parse(localStorage.getItem('userInfo'));
    }
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <Icon type="user" />
            <FormattedMessage id="menu.account.center" defaultMessage="account center" />
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <Icon type="setting" />
            <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default AvatarDropdown;
// export default connect(({ user }) => ({
//   currentUser: user.currentUser,
// }))(AvatarDropdown);
