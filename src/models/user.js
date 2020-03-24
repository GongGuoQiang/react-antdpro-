import {
  queryCurrent,
  getEnum,
  getRuletypeNames,
  getDataList,
  removeRuletypes,
  createRuletypes,
  editRuletypes,
  query as queryUsers,
} from '@/services/user';
import { message } from 'antd';
const UserModel = {
  namespace: 'user',
  state: {
    // currentUser: {},
    currentEnum: {},
    ruleData: [],
    DataList: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // *fetchCurrent(_, { call, put }) {
    //   const response = yield call(queryCurrent);
    //   yield put({
    //     type: 'saveCurrentUser',
    //     payload: response,
    //   });
    // },

    *fetchEnum({ _, callback }, { call, put }) {
      const response = yield call(getEnum);
      // yield put({
      //   type: 'getFetchEnum',
      //   payload: response,
      // });
      if (response.status) {
        yield put({
          type: 'show',
          payload: response,
        });
        let enums = response.data;
        localStorage.setItem('enum', JSON.stringify(enums));
      } else {
        message.warning(response.message);
      }
      if (callback) callback(response);
    },
    *fetchRule(_, { call, put }) {
      const response = yield call(getRuletypeNames);
      yield put({
        type: 'getRules',
        payload: response,
      });
    },
    *fetchDataList({ payload, callback }, { call, put }) {
      const res = yield call(getDataList, payload);
      console.log(res);
      if (res.status) {
        yield put({
          type: 'show',
          payload: {
            DataList: res.data.items,
            meta: res.data.meta,
          },
        });
      } else {
        message.warning(res.message);
      }
      if (callback) callback();
    },
    *fetchremove({ payload }, { call, put }) {
      const res = yield call(removeRuletypes, payload);
      if (res.status) {
        yield put({
          type: 'show',
          payload: res,
        });
        message.success('删除成功');
      } else {
        message.warning(res.message);
      }
    },
    *fetchCreate({ payload, callback }, { call, put }) {
      const res = yield call(createRuletypes, payload);
      if (res.status) {
        yield put({
          type: 'show',
          payload: res,
        });
        message.success('新增成功');
      } else {
        message.warning(res.message);
      }
      if (callback) callback(res);
    },
    *fetchEdit({ payload, callback }, { call, put }) {
      const res = yield call(editRuletypes, payload);
      if (res.status) {
        yield put({
          type: 'show',
          payload: res,
        });
        message.success('编辑成功');
      } else {
        message.warning(res.message);
      }
      if (callback) callback(res);
    },
  },
  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    // saveCurrentUser(state, action) {
    //   return { ...state, currentUser: action.payload || {} };
    // },
    getRules(state, action) {
      return { ...state, ruleData: action.payload || {} };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        // currentUser: {
        //   ...state.currentUser,
        //   notifyCount: action.payload.totalCount,
        //   unreadCount: action.payload.unreadCount,
        // },
        currentEnum: {
          ...state.currentEnum,
        },
        ruleData: {
          ...state.ruleData,
        },
      };
    },
  },
};
export default UserModel;
