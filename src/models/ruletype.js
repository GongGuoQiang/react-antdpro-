import { getRuletypeNames as queryRule } from '@/services/rule';
const RuleModel = {
  namespace: 'rule',
  state: {
    ruletypes: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryRule);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchRuletype(_, { call, put }) {
      const response = yield call(getRuletypeNames);
      yield put({
        type: 'getFetchRule',
        payload: response,
      });
    },
  },
  reducers: {
    getFetchRule(state, action) {
      return { ...state, ruletypes: action.payload || {} };
    },
    changeNotifyCount(
      state = {
        ruletypes: {},
      },
      action,
    ) {
      return {
        ...state,
        ruletypes: {
          ...state.ruletypes,
        },
      };
    },
  },
};
export default RuleModel;
