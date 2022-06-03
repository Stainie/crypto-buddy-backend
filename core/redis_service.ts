import { connect } from "../deps.ts";

const redisClient = await connect({
  hostname: "127.0.0.1",
  port: 6379,
  tls: false,
  db: 1,
  //   password: Deno.env.get("JWT_SECRET_KEY"),
  //   name: Deno.env.get("REDIS_APP"),
  maxRetryCount: 10,
  retryInterval: 100000,
});
console.log(await redisClient.ping());

export { redisClient };
