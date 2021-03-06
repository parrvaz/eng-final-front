import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Tag } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Record from "./record";

const Response = (props) => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState({});
  let col = [];
  let downloadLink =
    "https://eng-final-back.herokuapp.com/controlCenter/forms/" +
    props.match.params.id +
    "/csv";

  const showRecord = (record) => {
    console.log(record);
    setRecord(record);
    setModalVisible(true);
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://eng-final-back.herokuapp.com/controlCenter/forms/" +
          props.match.params.id
      );
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {data.fields &&
        data.fields.map((item, index) => {
          col.push({
            title: item.title,
            dataIndex: item.name,
            key: item.name,

            render: (tags) => (
              <>
                {tags != null
                  ? typeof tags == "object"
                    ? tags.map((tag) => {
                        let color = tags.length % 2 == 1 ? "green" : "red";

                        return (
                          <Tag color={color} key={tag}>
                            {tag}
                          </Tag>
                        );
                      })
                    : tags
                  : null}
              </>
            ),
          });
        })}

      <Table
        columns={col}
        dataSource={data.response}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              showRecord(record);
            },
          };
        }}
      />
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        size={"large"}
      >
        <a href={downloadLink} style={{ color: "#FFF" }}>
          Download
        </a>
      </Button>
      <Record
        visible={modalVisible}
        cancle={(key) => setModalVisible(key)}
        data={record}
        formId={props.match.params.id}
      />
    </div>
  );
};

export default Response;
