import { Consumer, Kafka, Producer } from "kafkajs";

class KafkaClient {
    private readonly kafkaSetup: Kafka;
    public readonly kafkaProducer: Producer;
    public readonly kafkaConsumer: Consumer;

    constructor() {
        this.kafkaSetup = new Kafka({
            clientId: 'user-service',
            brokers: ['kafka-broker.railway.internal:9092']
        })
        this.kafkaProducer = this.kafkaSetup.producer();
        this.kafkaConsumer = this.kafkaSetup.consumer({
            groupId: "test-group"
        });
        this.kafkaConsumer.subscribe({
            topic: 'kafka_adam_betest'
        });
        this.kafkaConnect();
        this.kafkaConsume();
    }

    // for test only
    async kafkaConsume() {
        await this.kafkaConsumer.run(({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`received! : ${message.value.toString()}`)
            }
        }))
    }

    async kafkaConnect() {
        try {
            await this.kafkaProducer.connect()
            console.log("Kafka connected successfully!")
        } catch (error) {
            console.log("Failed to connect kafka producer: ", error)
        }
    }
}

export default KafkaClient;