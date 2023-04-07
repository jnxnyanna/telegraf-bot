import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import express from "express";

dotenv.config();
if (!process.env.BOT_TOKEN) throw "Missing BOT_TOKEN";

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
const env = process.env.NODE_ENV;
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

bot.on("message", (ctx) => {
    ctx.reply("aloo " + ctx.from.first_name + "!", { reply_to_message_id: ctx.message.message_id });
});

if (env == "PRODUCTION") {
    app.post("/mybots", (req, res) => {
        bot.handleUpdate(req.body, res);
        res.status(200).json({ result: true });
    });


} else {
    bot.launch().then(console.log("Bot was running on local"));
}

app.listen(port, () => console.log("App was running on port" + port));
