const prompts = require("prompts");

const emailPasswordPrompt = async () => {
    const questions = [
        {
            type: "text",
            name: "email",
            message: "Enter your Razorpay Payroll email address",
            initial: '@mcsam.in'
        },
        {
            type: "password",
            name: "password",
            message: "Enter your Razorpay Payroll password",
        },
    ];

    return await prompts(questions);
};

const timingPrompt = async () => {
    let initialCheckin = new Date();
    initialCheckin.setHours("10");
    initialCheckin.setMinutes("00");

    let initialCheckout = new Date();
    initialCheckout.setHours("19");
    initialCheckout.setMinutes("00");

    const questions = [
        {
            type: "date",
            name: "checkInTime",
            message: "What time would you like to check-in at?",
            initial: initialCheckin,
            mask: "H:mm",
            format: (value) => `${value.getHours()}:${value.getMinutes()}`,
        },
        {
            type: "date",
            name: "checkOutTime",
            message: "What time would you like to check-out at (24 hour format)?",
            initial: initialCheckout,
            mask: "H:mm",
            format: (value) => `${value.getHours()}:${value.getMinutes()}`,
        },
        {
            type: "number",
            name: "randomizeTime",
            message: "Enter a random duration in minutes to randomize check-in/check-out",
            validate: value => {
                if (value < 5 || value > 60) {
                    return 'Duration has to be between 5-60 minutes'
                }
                return true
            },
        },
    ];

    return await prompts(questions);
};

module.exports = {
    emailPasswordPrompt,
    timingPrompt,
};
