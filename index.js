import { Server } from "socket.io";
import { createServer } from "http";
import { readFile } from "node:fs/promises";
// import kafkaInstance from "./kafka.js";

const httpServer = createServer({}, async (req, res) => {
  const content = await readFile("./test.html");
  res.writeHead(200, {
    "content-type": "text/html",
  });
  res.write(content);
  res.end();
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const userId = socket.id;
  socket.join(userId);
  socket.on("message", (data) => {
    console.log(`收到客户端消息:${data}`, typeof data);
    sendMsg({
      data: data.content,
      userId,
      user: data.name,
      avatar: data.avatar,
      timeStr: data.timestr,
    });

    // fetch("https://cat-node-server.onrender.com/test/getData").then(res=>res.json()).then((res) => {
    //   kafkaInstance.producerSned([
    //     {
    //       value: `收到 kfafaf ${msg} 请求的结果为 ${res}`,
    //     },
    //   ]);
    // });
  });
  socket.broadcast.emit("userConnect", {
    data: `欢迎 ${userId} 加入`,
    userId,
    time: new Date().toLocaleString(),
  });
});

io.on("disconnect", (socket) => {
  const userId = socket.id;
  console.log("user disconnected");
  socket.broadcast.emit("userConnect", {
    data: `${userId} 已断开链接`,
    userId,
    time: new Date().toLocaleString(),
  });
});

function sendMsg(data, room) {
  console.log("sendMsg", data);
  const sendData = {
    ...data,
    time: new Date().toLocaleString(),
  };
  if (room) {
    io.to(room).emit("message", sendData);
  } else {
    io.emit("message", sendData);
  }
}

// kafkaInstance.consumerConnect(
//   { topic: "test-topic", fromBeginning: true },
//   ({ topic, partition, message }) => {
//     console.log(`kafka ${topic} ${partition} ${message.value}`);
//     sendMsg({
//       data: `kafka ${topic} ${partition} ${message.value}`,
//     });
//   }
// );

httpServer.listen(3000, () => {
  console.log("listening on port 3000");
});
