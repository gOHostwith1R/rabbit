import { AckOrNack } from "rascal";

import { getBrokerConnection } from "./broker";

let broker: any;

module.exports = (async () => {
  try {
    broker = await getBrokerConnection();
    const subscriptionImmediately = await broker.subscribe(
      "return_immediately_sub"
    );
    const subscriptionRepublish = await broker.subscribe("republish_queue_sub");
    subscriptionImmediately.on(
      "message",
      async (message: any, content: any, ackOrNack: AckOrNack) => {
        console.log(content);
        ackOrNack();
      }
    );
    subscriptionRepublish.on(
      "message",
      async (message: any, content: any, ackOrNack: AckOrNack) => {
        console.log(content);

        ackOrNack(content, [
          { strategy: "republish", defer: 1000, attempts: 4 },
        ]);
      }
    );
  } catch (error) {
    console.error(error);
  }
})();
