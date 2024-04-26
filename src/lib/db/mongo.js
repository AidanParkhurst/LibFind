import { MongoClient } from "mongodb";
import { MONGO_URI, NODE_ENV } from "$env/static/private";

const client = new MongoClient(MONGO_URI);
export let client_promise = client.connect();

export default client.db(NODE_ENV);