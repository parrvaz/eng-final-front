import React from "react";
import GoogleMapReact from "google-map-react";
import { Modal, Button, Descriptions } from "antd";

class Record extends React.Component {
  state = {};

  handleCancle = () => {
    this.props.cancle(false);
  };
  render() {
    console.log(this.props.data);
    return (
      <Modal
        title=""
        visible={this.props.visible}
        onOk={this.handleCancle}
        onCancel={this.handleCancle}
      >
        <Descriptions title="Details">
          {Object.keys(this.props.data).map((item) => (
            <Descriptions.Item label={item}>
              {this.props.data[item]}
            </Descriptions.Item>
          ))}
        </Descriptions>
        ,
      </Modal>
    );
  }
}
export default Record;
