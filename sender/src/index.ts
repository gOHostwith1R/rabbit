import express, { Application, Request, Response, NextFunction } from "express";

import { getBrokerConnection } from "./broker";

let broker: any;

(async () => {
  broker = await getBrokerConnection();
})();

const app: Application = express();
const port = 5000;

app.get(
  "/send/queue1",
  async (req: Request, res: Response, next: NextFunction) => {
    const publication = await broker.publish("return_immediately_pub", {
      id: 0,
      message: "first queue",
    });
    publication.on("error", console.error);
    res.status(200).send({ data: "First queue" });
  }
);

app.get(
  "/send/queue2",
  async (req: Request, res: Response, next: NextFunction) => {
    const publication = await broker.publish("republish_queue_pub", {
      id: 1,
      message: "second queue",
    });
    publication.on("error", console.error);
    res.status(200).send({ data: "Second queue" });
  }
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("404 not found.");
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));

// module.exports = (async () => {
//   try {
//     broker = await getBrokerConnection();
//     const subscription = await broker.subscribe("return_immediately_sub");
//     subscription.on(
//       "message",
//       async (message: any, content: any, ackOrNack: any) => {
//         console.log(message, content);
//       }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// })();
