const axios = require('axios');
const {schedulePrint} = require('../schedulePrintFUNC');
const {backKeyboard} = require('../keyBoards');
require('dotenv').config();

const KROK_API_KEY = process.env.KROK_API_KEY;

const scheduleTomorrowHandler = async (msg) => {
    const date = new Date();

    // console.log(KROK_API_KEY + `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getDate()}`);

    try {
        const response = await axios.get(KROK_API_KEY + `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getDate()}`);
        const schedule = response.data.schedule;

        if (schedule.length === 0) {
            await msg.editMessageText('На завтра пар немає', {
                reply_markup: backKeyboard
            });
        } else {
            await schedulePrint(schedule, msg);
            await msg.deleteMessage();
        }

    } catch (err) {
        console.log(err);
    }
};

module.exports = scheduleTomorrowHandler;
