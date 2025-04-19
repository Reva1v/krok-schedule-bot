const axios = require('axios');
const {schedulePrint} = require('../schedulePrintFUNC');
const {backKeyboard} = require('../keyBoards');
const Calendar = require('telegram-inline-calendar');
const {Telegraf} = require("telegraf");
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;

const KROK_API_KEY = process.env.KROK_API_KEY;

const bot = new Telegraf(BOT_TOKEN);

const calendar = new Calendar(bot, {
    date_format: 'YYYY-MM-DD',
    language: 'uk',
    bot_api: 'telegraf',
    close_calendar: false
});

async function openCalendarHandler(msg) {
    await msg.deleteMessage();
    await calendar.startNavCalendar(msg)
}

async function callbackQueryHandler(msg) {
    let res;
    try {
        res = calendar.clickButtonCalendar(msg.callbackQuery);
    } catch (e) {
        // console.error(e);
        return
    }
    if (res !== -1) {
        await msg.deleteMessage();
        try {
            const waitingMessage = await msg.reply('Зачекайте трохи..');
            // console.log(KROK_API_KEY + res);
            const response = await axios.get(KROK_API_KEY + res);
            const schedule = response.data.schedule;

            if (schedule.length === 0) {
                await msg.reply('На цей день пар немає', {
                    reply_markup: backKeyboard
                });
                await msg.deleteMessage(waitingMessage.message_id);
            } else {
                await schedulePrint(schedule, msg);
                await msg.deleteMessage(waitingMessage.message_id);
            }
        } catch (err) {
            console.log(err);
        }
    }
}


module.exports = {
    openCalendarHandler,
    callbackQueryHandler
};
