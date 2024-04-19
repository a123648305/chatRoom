import { Avatar, Button, Input, Space } from "antd";
import "../assets/css/chatRoom.less";
import React, { memo, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

type PropsType = {
  data: {
    name: string;
    id: number;
    connectUrl: string;
    avatar?: string;
    [key: string]: unknown;
  };
};

type MessageType = {
  user: string;
  timestr: string;
  content: string;
  isRead: boolean;
  avatar?: string;
  isSender: boolean;
  isEmit?: boolean;
};

const ChatRoom: React.FC<PropsType> = ({ data }) => {
  const { name, connectUrl, avatar } = data;

  const [messages, setMessages] = useState<MessageType[]>([]);

  const chatId = useRef();

  // socket 实例
  const socketInstance = useRef<Socket>();
  const connectChat = () => {
    console.log(`${name} joinChat`);
    setconnectLoading(true);
    socketInstance.current = io(connectUrl, {
      auth: {
        token: "nnn",
      },
    });
    socketInstance.current.on("connect", () => {
      console.log("Connected to server");
      setIsOnline(true);
      setconnectLoading(false);
    });
    socketInstance.current.on("disconnect", () => {
      console.log(`${name} closeChat`);
      setIsOnline(false);
      setconnectLoading(false);
    });

    // 连接到服务器
    socketInstance.current.on("userConnect", (message) => {
      console.log(message);
      chatId.current = message.userId;
      setMessages((data) => [
        ...data,
        {
          user: message.user,
          timestr: message.timeStr,
          content: message.data,
          isRead: false,
          isSender: message.user === name,
          isEmit: true,
        },
      ]);
    });

    socketInstance.current.on("message", (message) => {
      //   const msg = `收到消息：${message}`;
      console.log(message);
      setMessages((data) => [
        ...data,
        {
          user: message.user,
          timestr: message.timeStr,
          content: message.data,
          isRead: false,
          avatar: message.avatar,
          isSender: message.user === name,
        },
      ]);
    });
  };

  const closeChat = () => {
    setconnectLoading(true);
    socketInstance.current?.disconnect();
  };

  const sendMessage = () => {
    const objStr = {
      name,
      timestr: new Date().toLocaleString(),
      content: inputMessage,
      avatar,
    };
    socketInstance.current && socketInstance.current.emit("message", objStr);
  };

  const [connectLoading, setconnectLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    return () => {
      socketInstance.current?.disconnect();
    };
  }, []);

  return (
    <div className="chat-wraper">
      <div className="title pt-2 pb-2">
        当前用户：{name}
        <Space className="ml-6">
          <Button
            type="primary"
            loading={connectLoading}
            onClick={() => connectChat()}
            disabled={isOnline}
          >
            连接
          </Button>
          <Button
            type="primary"
            loading={connectLoading}
            danger
            onClick={() => closeChat()}
            disabled={!isOnline}
          >
            断开
          </Button>
        </Space>
      </div>
      <div className="chat-box">
        <div className="min-h-md flex flex-col chat-content">
          {messages.map((message, index) => (
            <MessageCard info={message} key={index} />
          ))}
        </div>
        <div className="chat-footer">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="请输入内容"
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <Button
              type="primary"
              onClick={() => sendMessage()}
              disabled={!isOnline}
            >
              发送
            </Button>
          </Space.Compact>
        </div>
      </div>
    </div>
  );
};

const MessageCard: React.FC<{ info: MessageType }> = ({ info }) => {
  return info.isEmit ? (
    <div className="chat-message-emit">{info.content}</div>
  ) : (
    <div
      className={`chat-message ${!info.isSender && "justify-end "}`}
      key={info.timestr}
    >
      <Avatar src={info.avatar} />
      <div className="chat-message-content">{info.content}</div>
    </div>
  );
};

export default memo(ChatRoom);
