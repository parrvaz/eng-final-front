import React from "react";
import axios from "axios";
import SimpleMap from "./map";
import { Modal, Button, Descriptions } from "antd";
import { Link } from "react-router-dom";

class Record extends React.Component {
  state = {};

  onArea = async (id) => {
    const { data: newRecords } = await axios.get(
      `https://eng-final-back.herokuapp.com/controlCenter/forms/${this.props.formId}/${id}`
    );
    this.props.records(newRecords);
  };

  handleCancle = () => {
    this.props.cancle(false);
  };
  render() {
    return (
      <Modal
        title=""
        visible={this.props.visible}
        onOk={this.handleCancle}
        onCancel={this.handleCancle}
      >
        <Descriptions title="Details">
          {Object.keys(this.props.data).map((item) =>
            item != "area" ? (
              <Descriptions.Item label={item}>
                {this.props.data[item]}
              </Descriptions.Item>
            ) : (
              ""
            )
          )}
          <br></br>
        </Descriptions>
        {this.props.data.area &&
          this.props.data.area.map((item) => (
            <Button
              // onClick={() => this.onArea(item.id)}
              type="primary"
              shape="round"
            >
              <Link to={`/controlCenter/forms/${this.props.formId}/${item.id}`}>
                {item.properties.name}
              </Link>
            </Button>
          ))}
      </Modal>
    );
  }
}
export default Record;
