import { takeEvery, call, put, all, take, race } from "redux-saga/effects";
import { delay } from "redux-saga";
import API from "../api";
import * as actions from "../actions";

function* watchPollDroneFetch(action) {
  while (true) {
    try {
      const { data: response } = yield call(API.getDroneData);
      const { data } = response;

      yield put({ type: actions.RECEIVE_DRONE_DATA, data: data });
      yield delay(3000);
    } catch (error) {
      yield put({ type: actions.API_ERROR, code: error.code });
    }
  }
}

function* workPollDroneFetch() {
  while (true) {
    yield take(actions.POLL_START);
    yield race([call(watchPollDroneFetch), take(actions.POLL_STOP)]);
  }
}

function* watchAppLoad() {
  yield all([takeEvery(actions.POLL_DRONE_DATA, watchPollDroneFetch)]);
}
export default [watchAppLoad];
