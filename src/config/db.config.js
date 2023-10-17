import { connect } from "mongoose";

import { DB_URL } from "./env.config.js";

const options = { useNewUrlParser: true, useUnifiedTopology: true };

export async function setupDB() {
    try {
        await connect(DB_URL, options);
        console.log("DB Conectada");
    } catch (error) {
        console.log('./db.config.js -> setupDB',error);
    }
}