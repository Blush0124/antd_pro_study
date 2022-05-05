import { getPerson } from '@/services/person';

export default {
  namespace: 'person',
  state: {
    personList: [],
  },
  effects: {
    *fetchPersons(_, { call, put }) {
      const data = yield call(getPerson);

      yield put({
        type: 'setPersons',
        payload: data,
      });
    },
  },
  reducers: {
    setPersons(state, action) {
      return {
        ...state,
        personList: action.payload,
      };
    },
  },
};
