import { Button,  Select, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
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
    console.log(role);
    navigate(`/chatroom/${role}`);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setRole(value);
  };

  return (
    <div>
      <h1>欢迎你来到 沙沙水馆</h1>
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
