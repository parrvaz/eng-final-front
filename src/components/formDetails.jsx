import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Select, Form, Button } from "antd";

import SimpleMap from "./map";

const { Option } = Select;

const FormDetails = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const result = {};

  const handleSave = () => {
    axios.put(
      "https://eng-final-back.herokuapp.com/fieldAgent/forms/" +
        props.match.params.id,
      result
    );
    props.history.push("/fieldAgent/forms");
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://eng-final-back.herokuapp.com/fieldAgent/forms/" +
          props.match.params.id
      );
      setData(data);
    }
    fetchData();
  }, []);

  const onPoint = (point) => {
    result[point.name] = point.value;
  };

  const onChange = (name, value) => {
    result[name] = JSON.parse(value);
  };

  return (
    <div>
      <Form form={form} name="control-hooks" onFinish={handleSave}>
        {data.fields &&
          data.fields.map((item) => (
            <Form.Item
              key={item.name}
              name={item.name}
              label={item.title}
              rules={[{ required: item.required }]}
            >
              {item.options != null ? (
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={(e) => onChange(item.name, e)}
                  allowClear
                >
                  {item.options.map((opt) => (
                    <Option key={opt.label} value={JSON.stringify(opt.value)}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              ) : item.type === "Location" ? (
                <SimpleMap point={onPoint} name={item.name}></SimpleMap>
              ) : (
                <Input
                  placeholder={item.title}
                  name={item.name}
                  type={item.type}
                  onChange={(e) =>
                    onChange(item.name, JSON.stringify(e.target.value))
                  }
                />
              )}
            </Form.Item>
          ))}

        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default FormDetails;
