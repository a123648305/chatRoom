import { useEffect, useMemo } from "react";
import { Col, Row } from "antd";
import "./assets/css/index.less";

import ChatRoom from "./components/ChatRoom";
import { useParams } from "react-router-dom";

function App() {
  const { uId } = useParams();
  const roomList = [
    {
      id: 1,
      name: "lady",
      connectUrl: "ws://localhost:3000",
      users: [],
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    },
    {
      id: 2,
      name: "jack",
      connectUrl: "ws://localhost:3000",
      users: [],
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
    },
  ];

  const room = useMemo(() => {
    return roomList.filter((item) => item.name == uId) || roomList[0];
  }, [uId]);

  useEffect(() => {
    console.log("mounted");
  }, []);

  return (
    <div>
      <Row>
        {room.map((item) => (
          <Col span={room.length>1?10:24} key={item.id}>
            <ChatRoom data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;
