import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import express from "express";

dotenv.config();
if (!process.env.BOT_TOKEN) throw "Missing BOT_TOKEN";

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

bot.on("message", (ctx) => {
    ctx.reply("aloo " + ctx.from.first_name + "!", { reply_to_message_id: ctx.message.message_id });
});

if (process.env.NODE_ENV && process.env.NODE_ENV == "PRODUCTION") {
    app.post("/mybots", (req, res) => {
        bot.handleUpdate(req.body, res);
        res.status(200).json(req.body);
    });
} else {
    bot.launch().then(console.log("Bot was running on local"));
}

app.all("*", (req, res) => res.status(200).json({ message: "Hello from zhenni!" }));

app.listen(port, () => console.log("App was running on port " + port));
