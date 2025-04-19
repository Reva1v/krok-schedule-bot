const {backKeyboard} = require('./keyBoards');

async function schedulePrint(schedule, msg) {
    const messageText = schedule.map(pair =>
        `День: ${pair.dayOfWeek} ${new Date(pair.date).toLocaleDateString('uk-ua')}\n` +
        `Час: ${(pair.start).replace(/:00$/, '')} - ${pair.end.replace(/:00$/, '')}\n` +
        `Предмет: ${pair.discipline}\n` +
        `${pair.studyType}\n` +
        `Локація: ${pair.location}\n` +
        `Викладач: ${pair.teacher}`
    ).join('\n\n===================\n\n');

    await msg.reply(messageText, {
        reply_markup: backKeyboard
    });
}

module.exports = {schedulePrint};

