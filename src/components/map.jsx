import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Background from "./location-2.gif";

const keyMap = process.env.REACT_APP_KEY_MAP;

class SimpleMap extends Component {
  state = { point: {} };

  onChange = (lat, lng) => {
    this.props.point({ value: { lat, lng }, name: this.props.name });
    this.setState({ point: { lat, lng } });
  };

  render() {
    const defaultValue = {
      center: {
        lat: 35.58212419,
        lng: 53.3768433,
      },
      zoom: 13,
    };

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "50vh", width: "50%" }}>
        <GoogleMapReact
          onClick={({ lat, lng }) => this.onChange(lat, lng)}
          bootstrapURLKeys={{ key: keyMap }}
          defaultCenter={defaultValue.center}
          defaultZoom={defaultValue.zoom}
        >
          {
            <div
              style={{
                height: 30,
                width: 30,
                backgroundImage: `url(${Background})`,
              }}
              lat={this.state.point.lat}
              lng={this.state.point.lng}
            />
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
