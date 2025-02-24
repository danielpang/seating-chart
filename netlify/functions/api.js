import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();
const router = Router();

router.get("/health_check", (req, res) => res.send("Healthy!"));

router.get("/api/roueter");

api.use("/api/", router);

app.post('/api/credentials', (req, res) => {
    const spreadsheetPassword = process.env.REACT_APP_SPREADSHEET_PASSWORD;

    req.body.password === spreadsheetPassword ? res.status(200).send("success") : res.status(403).send("Forbidden");
});

export const handler = serverless(api);