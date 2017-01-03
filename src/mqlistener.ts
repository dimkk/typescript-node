import * as amqp from "amqplib";
import { IMqConfiguration } from "./configurations";
import * as nconf from "nconf";
import { WrapperAction } from "./common/WrapperAction";
import * as Configs from "./configurations";

export class RPCServer {
    configs: any;
    connectionUrl: string;
    open: any;
    q: string;
    /**
     * RPC mq server
     */
    constructor() {
        this.configs = Configs.getCfg().get("mq");
        this.connectionUrl = `amqp://${this.configs.RABBITMQ_LOGIN}:${this.configs.RABBITMQ_PASS}@${this.configs.RABBITMQ_ADDRESS}`;
        this.open = amqp.connect(this.connectionUrl);
        this.q = this.configs.RABBITMQ_QUEUE;
    }

    start(action: WrapperAction) {
        this.open
            .then((conn) => {
                return conn.createChannel();
            })
            .then((ch) => {
                ch.assertQueue(this.q, { durable: false });
                ch.prefetch(1);
                console.log(' [x] Awaiting RPC requests ' + this.configs.RABBITMQ_QUEUE + ' for ' + action.getActionName());
                ch.consume(this.q, function reply(msg: amqp.Message) {
                    var n = msg.content.toString();
                    var nToShow = n.length > 100 ? nToShow = n.substring(0, 100) : n;
                    console.log(" [.] recieved", nToShow);
                    var response = action.doRealWork(n);
                    ch.sendToQueue(
                        msg.properties.replyTo || "",
                        new Buffer(response),
                        { correlationId: msg.properties.correlationId || "" }
                    );
                    ch.ack(msg);
                });
                // let obj = {
                //     section:"statsRnd",
                //     method:"test",
                //     args:["arg1", "arg2"],
                //     hash:{hasKey1:"hashVal1", hashKey2:"hashVal2"}
                // };
                // ch.sendToQueue(this.q, new Buffer(JSON.stringify(obj)));
            });
    }
}
