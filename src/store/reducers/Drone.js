import * as actions from "../actions";

const initialState = {
  loading: false,
  data: []
};

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const receiveDroneData = (state, action) => {
  const datum = action.data;
  const thirtyMinutesAgo = new Date().getTime() - 180000;
  const byIsOlderThan30Minutes = datum => datum.timestamp < thirtyMinutesAgo;

  const filteredData = datum.filter(byIsOlderThan30Minutes);

  filteredData.forEach(
    data =>
      (data.timestamp = new Date(data.timestamp).toLocaleTimeString("en-US"))
  );

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
