import { Kafka, Producer } from "kafkajs";

class KafkaClient {
    private readonly kafkaProducer: Kafka;
    public readonly kafka: Producer;

    constructor() {
        this.kafkaProducer = new Kafka({
            clientId: 'user-service',
            brokers: ['kafka-broker.railway.internal:9092']
        })
        this.kafka = this.kafkaProducer.producer();
        this.kafkaConnect();
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