import { MongoClient } from "../deps.ts";
const client = new MongoClient();

// Connecting to a Local Database - pass: DgiAkFcMZ63mR0iv
await client.connect(
  "mongodb+srv://crypto_buddy_backend:DgiAkFcMZ63mR0iv@cryptobuddycluster.iarko.mongodb.net/crypto_buddy?authMechanism=SCRAM-SHA-1",
);

const db = client.database("crypto_buddy");

export default db;
