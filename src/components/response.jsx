import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Button, Table, Tag, Space } from "antd";

import SimpleMap from "./map";

const { Option } = Select;

// {this.state.data.fields.map((item) => {
//     col.push({
//       title: item.title,
//       dataIndex: item.name,
//       key: item.name,
//       render: (text) => <a>{text}</a>,
//     });
//   })}

const Response = (props) => {
  const [data, setData] = useState([]);
  let col = [];

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "http://localhost:8000/controlCenter/forms/" + props.match.params.id
      );
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {data.fields &&
        data.fields.map((item) => {
          col.push({
            title: item.title,
            dataIndex: item.name,
            key: item.name,

            render: (tags) => (
              <>
                {typeof tags == "object"
                  ? tags.map((tag) => {
                      let color = tags.length % 2 == 1 ? "green" : "red";

                      return (
                        <Tag color={color} key={tag}>
                          {tag.toUpperCase()}
                        </Tag>
                      );
                    })
                  : tags}
              </>
            ),
          });
        })}

      <Table columns={col} dataSource={data.response} />
    </div>
  );
};

export default Response;
