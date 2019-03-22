import { takeEvery, call } from "redux-saga/effects";
import * as actions from "../actions";
import { toast } from "react-toastify";

function* apiErrorReceived(action) {
  let message = "Error Received";

  if (action.code) {
    message += `: ${action.code}`;
  }

  if (action.message) {
    message += `: ${action.message}`;
  }

  yield call(toast.error, message);
}

function* watchApiError() {
  yield takeEvery(actions.API_ERROR, apiErrorReceived);
}

export default [watchApiError];
