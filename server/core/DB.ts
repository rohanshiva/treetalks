import admin = require("firebase-admin");
import secretKey = require("../config/key.json");


admin.initializeApp({
    credential: admin.credential.cert(secretKey as admin.ServiceAccount)
});

export const firestore = admin.firestore;
export const users = firestore().collection("users");
