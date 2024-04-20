import { Avatar, Button, Input, Space, Tooltip } from "antd";
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
  const messageDom = useRef<HTMLDivElement>(null);
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
      const newData = [
        {
          user: "系统",
          timestr: "",
          content: `欢迎你的加入,enjoy yourself。😀😀`,
          isRead: false,
          isSender: false,
          isEmit: true,
        },
      ];
      updateMessageRead(newData);
    });
    socketInstance.current.on("disconnect", () => {
      console.log(`${name} closeChat`);
      setIsOnline(false);
      setconnectLoading(false);
      const newData = [
        {
          user: "系统",
          timestr: "",
          content: `see you again!😘😘`,
          isRead: false,
          isSender: false,
          isEmit: true,
        },
      ];
      updateMessageRead(newData);
    });

    // 连接到服务器
    socketInstance.current.on("userConnect", (message) => {
      console.log(message);
      chatId.current = message.userId;

      const historyMessage = localStorage.getItem("chatData")
        ? JSON.parse(localStorage.getItem("chatData") as string)
        : [];
      const newData = [
        ...historyMessage,
        {
          user: message.user,
          timestr: message.timeStr,
          content: message.data,
          isRead: false,
          isSender: false,
          isEmit: true,
        },
      ];
      updateMessageRead(newData);
    });

    socketInstance.current.on("message", (message) => {
      //   const msg = `收到消息：${message}`;
      console.log(message);
      const newData = [
        {
          user: message.user,
          timestr: message.timeStr,
          content: message.data,
          isRead: false,
          avatar: message.avatar,
          isSender: message.userId === socketInstance.current?.id,
        },
      ];
      updateMessageRead(newData);
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
    setInputMessage("");
  };

  const updateMessageRead = (newData: MessageType[]) => {
    setMessages((data) => [...data, ...newData]);
  };

  const [connectLoading, setconnectLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    return () => {
      socketInstance.current?.disconnect();
      localStorage.setItem("chatData", JSON.stringify(messages));
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
        <div
          className="h-md flex flex-col overflow-y-auto chat-content"
          ref={messageDom}
        >
          {messages.map((message, index) => (
            <MessageCard info={message} key={index} />
          ))}
        </div>
        <div className="chat-footer">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="请输入内容"
              onChange={(e) => setInputMessage(e.target.value)}
              value={inputMessage}
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
      className={`chat-message ${
        info.isSender ? "justify-start flex-row-reverse" : ""
      }`}
      key={info.timestr}
    >
      <Tooltip placement="left" title={info.content} color="#87d068" open>
        <Avatar src={info.avatar} />
      </Tooltip>
    </div>
  );
};

export default memo(ChatRoom);
