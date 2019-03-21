import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label
} from "recharts";
import ReactMapGL, { Marker } from "react-map-gl";
const token =
  "pk.eyJ1IjoiandmcmFzaWVyIiwiYSI6ImNqdGozNGt1ajBqZXA0YW54MmxseDZ1MmgifQ._CbRKwZpdD8UaNM25abJyg";

class Drone extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    let data = this.props.data;
    let lat = data.map(map => {
      if (!map.latitude) {
        return 0;
      } else {
        return map.latitude;
      }
    });

    let long = data.map(map => {
      if (!map.longitude) {
        return 0;
      } else {
        return map.longitude;
      }
    });

    console.log("this is lat boi", long);
    let mapData = {
      width: 1000,
      height: 300,
      latitude: lat[lat.length - 1],
      longitude: long[long.length - 1],
      zoom: 4
    };
    return (
      <div>
        <LineChart width={1000} height={400} data={data}>
          <Line dot={false} type="monotone" dataKey="metric" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="timestamp" interval={60} />
          <YAxis
            domain={[200, 400]}
            label={{
              value: "Drone Temp (F)",
              angle: -90,
              position: "insideLeft",
              fontSize: "20px"
            }}
          />
          <Tooltip />
        </LineChart>
        <ReactMapGL mapboxApiAccessToken={token} {...mapData}>
          <Marker
            latitude={mapData.latitude ? mapData.latitude : 28.397594380557074}
            longitude={
              mapData.longitude ? mapData.longitude : -90.75563183077658
            }
          >
            <div>💩</div>
          </Marker>
        </ReactMapGL>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  console.log(state);
  return {
    data: state.drone.data
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.POLL_DRONE_DATA
    })
});

export default connect(
  mapState,
  mapDispatch
)(Drone);
