import { Kafka } from "kafkajs";
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

await producer.connect();

const producerSned = (messages = { value: "Hello KafkaJS user!" }) =>
  producer.send({
    topic: "test-topic",
    messages,
  });

// await producer.disconnect()

const consumer = kafka.consumer({ groupId: "test-group" });

const consumerConnect = async (
  options = { topic: "test-topic", fromBeginning: true },
  messageCallback
) => {
  await consumer.connect();
  await consumer.subscribe(options);
  await consumer.run({
    eachMessage: messageCallback,
  });
};

export default {
  producerSned,
  consumerConnect,
};
