import { Application, every15Minute, oakCors } from "./deps.ts";
import exchangeController from "./controllers/exchange_controller.ts";

import router from "./router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
app.use(
  oakCors(),
);

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on ${secure ? "https://" : "http://"}${
      hostname || "localhost"
    }:${port}`,
  );
});

app.addEventListener("error", (e) => console.log(e.error));

every15Minute(() => {
  exchangeController.getHistoricalData();
});

await app.listen({ port: 3000 });
