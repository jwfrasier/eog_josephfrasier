import { takeEvery, take, call, put, race } from "redux-saga/effects";
import { delay } from "redux-saga";

import API from "../api";
import * as actions from "../actions";

function* pollFetchDroneWorker(action) {
  while (true) {
    yield put({ type: actions.FETCH_DRONE_DATA });
    yield delay(3000);
  }
}

function* watchFetchDroneData(action) {
  try {
    const { data: response } = yield call(API.getDroneData);
    const { data } = response;

    console.log("watchFetchDroneData");

    yield put({ type: actions.RECEIVE_DRONE_DATA, data: data });
  } catch (error) {
    yield put({ type: actions.API_ERROR, code: error.code });
  }
}

function* watchAppLoad() {
  yield takeEvery(actions.FETCH_DRONE_DATA, watchFetchDroneData);

  while (true) {
    yield take(actions.START_POLL_DRONE_DATA);
    yield race([
      call(pollFetchDroneWorker),
      take(actions.STOP_POLL_DRONE_DATA)
    ]);
  }
}

export default [watchAppLoad];
