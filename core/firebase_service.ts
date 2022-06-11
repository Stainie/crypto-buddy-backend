import { createRequire } from "../deps.ts";

const require = createRequire(import.meta.url);
const serviceAccount = require("./service_account_key.json");
const firebaseToken = "";

const firebaseAdmin = require("firebase-admin");
// const firebaseFunctions = require("firebase-functions");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cred(serviceAccount),
});

const payload = {};
const options = { priority: "high", timeToLive: 60 * 60 * 24 };

const fcm = firebaseAdmin.messaging();

fcm.sendToDevice(firebaseToken, payload, options);
