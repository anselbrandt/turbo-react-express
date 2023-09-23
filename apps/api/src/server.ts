import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

const dbName = "dev";

(async () => await client.connect())().catch((error) => console.log(error));

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/healthcheck", (_, res) => {
      return res.json({ ok: true });
    })
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/mongo", async (req, res) => {
      await client.db("admin").command({ ping: 1 });
      const adminClient = client.db().admin();
      const dbInfo = await adminClient.listDatabases();
      return res.json({ dbInfo });
    })
    .get("/", (_, res) => {
      return res.send("hello");
    });

  return app;
};
