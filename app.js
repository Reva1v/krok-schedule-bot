const {Telegraf} = require('telegraf');
const {scheduleKeyboard, backKeyboard} = require('./app-details/keyBoards');
require('dotenv').config();

console.log(process.env.KROK_API_KEY);

const scheduleTodayHandler = require("./app-details/Handlers/scheduleTodayHandler");
const scheduleTomorrowHandler = require("./app-details/Handlers/scheduleTomorrowHandler");
const {openCalendarHandler, callbackQueryHandler} = require('./app-details/Handlers/calendarHandlers');
const backButtonHandler = require('./app-details/Handlers/backButtonHandler');
const withErrorHandling = require('./app-details/withErrorHandling');

const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new Telegraf(BOT_TOKEN);

bot.start((msg) => msg.reply('Welcome'));

bot.command("schedule", (msg) => {
    msg.reply("На який день?", {
        reply_markup: scheduleKeyboard
    });
});

bot.action("schedule-today", withErrorHandling(scheduleTodayHandler));

bot.action("schedule-tomorrow", withErrorHandling(scheduleTomorrowHandler));

bot.action("open-calendar", withErrorHandling(openCalendarHandler));

bot.action("back", withErrorHandling(backButtonHandler));

bot.on("callback_query", withErrorHandling(callbackQueryHandler));

bot.launch().then(r => r);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
