import { MongoClient } from "../deps.ts";
const client = new MongoClient();

// Connecting to a Local Database - pass: DgiAkFcMZ63mR0iv
await client.connect(
  Deno.env.get("MONGO_CONNECTION_STRING")!,
);

const db = client.database("crypto_buddy");

export default db;
