import { useEffect } from "react";
import { Col, Row } from "antd";
import "./assets/css/index.less";

import ChatRoom from "./components/ChatRoom";

function App() {
  const room = [
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

  useEffect(() => {
    console.log("mounted");
  }, []);

  return (
    <div>
      <Row>
        {room.map((item) => (
          <Col span={8} offset={2} key={item.id}>
            <ChatRoom data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;
