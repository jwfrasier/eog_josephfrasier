import * as actions from "../actions";

const initialState = {
  loading: false,
  temperature: "",
  latitude: null,
  longitude: null,
  data: {}
};

const toF = c => (c * 9) / 5 + 32;

const startLoading = (state, action) => {
  return { ...state, loading: true };
};
