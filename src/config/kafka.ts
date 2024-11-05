import { Consumer, Kafka, Producer } from "kafkajs";

class KafkaClient {
    private readonly kafkaProducer: Kafka;
    public readonly kafka: Producer;
    public readonly kafkaConsumer: Consumer;

    constructor() {
        this.kafkaProducer = new Kafka({
            clientId: 'user-service',
            brokers: ['kafka-broker.railway.internal:9092']
        })
        this.kafka = this.kafkaProducer.producer();
        this.kafkaConsumer = this.kafkaProducer.consumer({
            groupId: "test-group"
        });
        this.kafkaConsumer.subscribe({topic: 'kafka_adam_betest'});
        this.kafkaConnect();
        this.kafkaConsume();
    }

    async kafkaConsume() {
        await this.kafkaConsumer.run(({
            eachMessage: async ({ topic, partition, message}) => {
                console.log(`Order received! : ${message.value.toString()}`)
            }
        }))
    }

    async kafkaConnect() {
        try {
            await this.kafka.connect()
            console.log("Kafka connected successfully!")
        } catch (error) {
            console.log("Failed to connect kafka producer: ", error)
        }
    }
}

export default KafkaClient;