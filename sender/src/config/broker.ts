export default {
  vhosts: {
    "/": {
      connection: {
        url: "amqp://localhost:5672",
        heartbeat: 1,
        socketOptions: {
          timeout: 1000,
        },
      },
      exchanges: ["return_immediately_exchange", "republish_queue_exchange"],
      queues: ["return_immediately", "republish_queue"],
      bindings: [
        "return_immediately_exchange[return.immediately.key] -> return_immediately",
        "republish_queue_exchange[republish.queue.key] -> republish_queue",
      ],
      publications: {
        return_immediately_pub: {
          exchange: "return_immediately_exchange",
          routingKey: "return.immediately.key",
        },
        republish_queue_pub: {
          exchange: "republish_queue_exchange",
          routingKey: "republish.queue.key",
        },
      },
      // subscriptions: {
      //   return_immediately_sub: {
      //     queue: "return_immediately",
      //   },
      // },
    },
  },
};
