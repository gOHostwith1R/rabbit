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
      queues: ["return_immediately", "republish_queue"],
      subscriptions: {
        return_immediately_sub: {
          queue: "return_immediately",
        },
        republish_queue_sub: {
          queue: "republish_queue",
        },
      },
    },
  },
};
