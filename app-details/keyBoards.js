
module.exports = {
    scheduleKeyboard: {
        inline_keyboard: [
            [
                { text: "Розклад на сьогодні", callback_data: "schedule-today" },
                { text: "Розклад на завтра", callback_data: "schedule-tomorrow" }
            ],
            [
                { text: "Вибрати на календарі", callback_data: "open-calendar" }
            ],
            [
                { text: "Мій звіт", url: "https://cabinet.krok.edu.ua/university/payment/details" }
            ],
            [
                { text: "Відкрити розклад у браузері", url: "https://schedule.krok.edu.ua/" }
            ]
        ]
    },
    backKeyboard: {
        inline_keyboard: [
            [{ text: "Назад", callback_data: "back" }]
        ]
    }
};
