const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { mouse, left, right, up, down, Button } = require("@nut-tree/nut-js");
const { Command } = require("./command.js");
const screenshot = require('screenshot-desktop');
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/mouse", async (req, res) => {
    res.json({ server: "ok" });
    if (req.body.action === "up") {
        await mouse.move(up(20));
    } else if (req.body.action === "down") {
        await mouse.move(down(20));
    } else if (req.body.action === "left") {
        await mouse.move(left(20));
    } else if (req.body.action === "right") {
        await mouse.move(right(20));
    } else if (req.body.action === "click") {
        await mouse.click(Button.LEFT);
    } else if (req.body.action === "double-click") {
        await mouse.doubleClick(Button.LEFT);
    } else if (req.body.action === "scroll-up") {
        await mouse.scrollUp(40);
    } else if (req.body.action === "scroll-down") {
        await mouse.scrollDown(40);
    } else if (req.body.action === "p-button") {
        await mouse.pressButton(Button.LEFT);
    } else if (req.body.action === "r-button") {
        await mouse.releaseButton(Button.LEFT);
    }
    res.end();
});

app.post("/terminal", async (req, res) => {
    const output = await Command(req.body.command);
    res.send({ output: output });
    res.end();
});

app.get("/screenshot", (req, res) => {
    screenshot().then((img) => {
        fs.writeFileSync("screenshot.jpg", img);
        res.json({status: "success"});
      }).catch((err) => {
        console.log(err);
        res.json({status: "failure"});
      })
      res.end();
})

app.listen(80, () => {
    console.log("server listening");
});
