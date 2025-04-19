function withErrorHandling(handler) {
    return async (msg) => {
        try {
            await handler(msg);
        } catch (error) {
            if (error.response && error.response.error_code === 400) {
                console.warn(`Telegram API error: ${error.description}`);
            } else {
                console.error("Error in handler:", error);
            }
        }
    };
}

module.exports = withErrorHandling;
