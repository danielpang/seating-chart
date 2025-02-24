import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();
const router = Router();

router.get("/health_check", (req, res) => res.send("Healthy!"));

api.use("/api/", router);

export const handler = serverless(api);