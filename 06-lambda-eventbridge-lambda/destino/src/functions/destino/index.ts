import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        eventBus: "EventBusCurso06",
        pattern: {
          source: ["appointment"],
          "detail-type": ["appointment-cancelled"],
        },
      },
    },
  ],
};
