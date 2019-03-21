import { takeEvery, call, put, all } from "redux-saga/effects";
import { delay } from "redux-saga";
import API from "../api";
import * as actions from "../actions";

function* workPollDroneFetch(action) {
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

// function* workPollDroneFetch() {
//   while (true) {
//     yield take(actions.POLL_START);
//     yield race([call(workPollDroneFetch), take(actions.POLL_STOP)]);
//   }
// }

function* watchAppLoad() {
  while (true) {
    // yield take(actions.POLL_START);
    yield all([takeEvery(actions.POLL_DRONE_DATA, workPollDroneFetch)]);
  }
}
export default [watchAppLoad];
