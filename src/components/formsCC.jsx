import React, { Component } from "react";
import { List, Divider } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

class FormsCC extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const { data } = await axios.get(
      "https://eng-final-back.herokuapp.com/controlCenter/forms/"
    );
    this.setState({ data });
  }

  render() {
    return (
      <div>
        <Divider orientation="left">
          <h1>Forms</h1>
        </Divider>
        <List
          size="large"
          bordered
          dataSource={this.state.data}
          renderItem={(item) => (
            <List.Item>
              {" "}
              <Link to={`/controlCenter/forms/${item.id}`}>{item.title}</Link>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default FormsCC;
