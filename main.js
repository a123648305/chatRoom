const serve = Bun.serve({
  port: 3000,
  fetch(req, server) {
    // use a library to parse cookies
    const cookies = req.headers.get("Cookie"); // parseCookies(req.headers.get("Cookie"));
    server.upgrade(req, {
      // this object must conform to WebSocketData
      data: {
        createdAt: Date.now(),
        // channelId: new URL(req.url).searchParams.get("channelId"),
        authToken: "X-Token",
      },
    });

    return undefined;
  },
  websocket: {
    open(ws) {
      console.log("ws open");
      const msg = `${ws.data.createdAt}已加入聊天`;
      ws.subscribe("chatRoom1");
      ws.publish("chatRoom1", msg);
    },
    message(ws, message) {
      //   const user = getUserFromToken(ws.data.authToken);
      console.log(ws, message);
      // 广播
      ws.publish("chatRoom1", {id:1});
    },
    close(ws) {
      const msg = `${ws.data.createdAt}已离开聊天`;
      ws.unsubscribe("chatRoom1");
      ws.publish("chatRoom1", msg);
    },
  },
});

console.log(`serve is living on ${serve.port}`);

// io.on("connection", (socket) => {
//   const userId = socket.id;
//   socket.join(userId);
//   socket.on("message", (msg) => {
//     console.log(msg);
//     sendMsg({ data: `${userId}发送了消息:${msg}` });

//     fetch("https://cat-node-server.onrender.com/test/getData").then(res=>res.json()).then((res) => {
//       kafkaInstance.producerSned([
//         {
//           value: `收到 kfafaf ${msg} 请求的结果为 ${res}`,
//         },
//       ]);
//     });
//   });
//   sendMsg({ data: `hello ${userId}` });
// });

// io.on("disconnect", () => {
//   console.log("user disconnected");
// });

// function sendMsg(data, room) {
//   console.log("sendMsg");
//   const sendData = {
//     ...data,
//     timeStr: new Date().toLocaleString(),
//   };
//   if (room) {
//     io.to(room).emit("message", sendData);
//   } else {
//     io.emit("message", sendData);
//   }
// }

// kafkaInstance.consumerConnect(
//   { topic: "test-topic", fromBeginning: true },
//   ({ topic, partition, message }) => {
//     console.log(`kafka ${topic} ${partition} ${message.value}`);
//     sendMsg({
//       data: `kafka ${topic} ${partition} ${message.value}`,
//     });
//   }
// );
