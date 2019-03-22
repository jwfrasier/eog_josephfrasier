import * as actions from "../actions";

const initialState = {
  loading: false,
  data: []
};

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const receiveDroneData = (state, action) => {
  const data = action.data || []; // just in case we get back invalid data
  const thirtyMinutesAgo = new Date().getTime() - 180000;

  let filteredData = [];

  data.forEach(datum => {
    if (datum.timestamp < thirtyMinutesAgo) {
      datum.date = new Date(datum.timestamp).toLocaleTimeString("en-US");
      filteredData.push(datum);
    }
  });

  return {
    ...state,
    data: filteredData
  };
};

const handlers = {
  [actions.FETCH_DRONE_DATA]: startLoading,
  [actions.RECEIVE_DRONE_DATA]: receiveDroneData
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
