import * as amqp from "amqplib";
import { IMqConfiguration } from "./configurations";
import * as nconf from "nconf";

const configs = nconf.get("mq");
const connectionUrl = `amqp://${configs.RABBITMQ_LOGIN}:${configs.RABBITMQ_PASS}@${configs.RABBITMQ_ADDRESS}`;
const open = amqp.connect(connectionUrl);
const q = configs.RABBITMQ_QUEUE;

export function init(configs: IMqConfiguration) {
    open
        .then((conn) => {
            return conn.createChannel();
        })
        .then((ch) => {
            ch.assertQueue(q, { durable: false });
            ch.prefetch(1);
            console.log(' [x] Awaiting RPC requests ' + configs.RABBITMQ_QUEUE);
            ch.consume(q, function reply(msg: amqp.Message) {
                var n = msg.content.toString();
                var nToShow = n.length > 100 ? nToShow = n.substring(0, 100) : n;
                console.log(" [.] recieved", nToShow);
                var response = doRealWork(n);
                ch.sendToQueue(msg.properties.replyTo || "", new Buffer(response), { correlationId: msg.properties.correlationId || "" });

                ch.ack(msg);
            });
            ch.sendToQueue(q, new Buffer('something to do'));
        });
}


function doRealWork(n) {
    return "!n " + n;
}
