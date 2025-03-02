import express, { Router } from "express";
import serverless from "serverless-http";
import auth from "./auth";
import saveSeatingData from "./save_seating_data";
import readSeatingData from "./read_seating_data";

const api = express();
const router = Router();

router.get("/health_check", (req, res) => res.send("Healthy!"));
router.post("/auth", auth);
router.post("/save_seating_data", saveSeatingData);
router.post("/get_seating_data", readSeatingData);

api.use("/api/", router);

export const handler = serverless(api);