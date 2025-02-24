import express, { Router } from "express";
import serverless from "serverless-http";
import auth from "./auth";

const api = express();
const router = Router();

router.get("/health_check", (req, res) => res.send("Healthy!"));
router.post("/auth", auth);

api.use("/api/", router);

export const handler = serverless(api);