"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_logger = require("logger");

// src/server.ts
var import_body_parser = require("body-parser");
var import_express = __toESM(require("express"));
var import_morgan = __toESM(require("morgan"));
var import_cors = __toESM(require("cors"));
var import_mongodb = require("mongodb");
var url = "mongodb://localhost:27017/";
var client = new import_mongodb.MongoClient(url);
(async () => await client.connect())().catch((error) => console.log(error));
var createServer = () => {
  const app = (0, import_express.default)();
  app.disable("x-powered-by").use((0, import_morgan.default)("dev")).use((0, import_body_parser.urlencoded)({ extended: true })).use((0, import_body_parser.json)()).use((0, import_cors.default)()).get("/healthcheck", (_, res) => {
    return res.json({ ok: true });
  }).get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  }).get("/mongo", async (req, res) => {
    await client.db("admin").command({ ping: 1 });
    const adminClient = client.db().admin();
    const dbInfo = await adminClient.listDatabases();
    return res.json({ dbInfo });
  }).get("/", (_, res) => {
    return res.send("hello");
  });
  return app;
};

// src/index.ts
var port = process.env.PORT || 5001;
var server = createServer();
server.listen(port, () => {
  (0, import_logger.log)(`api running on ${port}`);
});
