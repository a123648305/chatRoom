import { Button, Select, Space, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const options = [
    {
      value: "lady",
      label: "小香子",
    },
    {
      value: "jack",
      label: "Loppy",
    },
  ];

  const [role, setRole] = useState("");

  const jump = () => {
    if (role) {
      navigate(`/chatroom/${role}`);
    } else {
      messageApi.open({
        type: "error",
        content: "请先选择你的角色!!!!",
      });
    }
  };

  const handleChange = (value: string) => {
    setRole(value);
  };

  return (
    <div>
      {contextHolder}
      <h1>欢迎来到 沙沙水馆</h1>
      <Space>
        角色:
        <Select
          placeholder="请选择你的角色"
          options={options}
          onChange={handleChange}
        ></Select>
      </Space>
      <div className="mt-4">
        <Button onClick={() => jump()} type="primary">
          我选好啦！
        </Button>
      </div>
    </div>
  );
};

export default Home;
