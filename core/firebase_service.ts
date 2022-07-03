import { createRequire } from "../deps.ts";

const require = createRequire(import.meta.url);
const serviceAccount = require("./service_account_key.json");

const firebaseAdmin = require("firebase-admin");
// const firebaseFunctions = require("firebase-functions");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cred(serviceAccount),
});

const fcm = firebaseAdmin.messaging();

export default fcm;
