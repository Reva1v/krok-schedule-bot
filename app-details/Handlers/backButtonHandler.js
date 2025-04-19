const {scheduleKeyboard} = require('../keyBoards');

async function backButtonHandler(msg) {
    try {
        await msg.editMessageText("На який день?", {
            reply_markup: scheduleKeyboard
        });
    } catch (err) {
        await msg.reply("На який день?", {
            reply_markup: scheduleKeyboard
        });
    }
    await msg.answerCbQuery();
}

module.exports = backButtonHandler;
