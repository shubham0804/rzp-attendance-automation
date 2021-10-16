const CronJob = require("cron").CronJob;
const { cronExpression } = require("./parse");

const baseUrl = "https://payroll.razorpay.com";

const getAccessToken = async (page) => {
    const cookies = await page.cookies();
    const tokenCookie = await cookies.find(
        (cookie) => cookie.name === "opfinproduction"
    );
    const token = tokenCookie.value;
    const expiry = new Date(tokenCookie.expires * 1000);

    return {
        token,
        expiry,
    };
};

const getCsrfToken = async (page) => {
    await page.goto(`${baseUrl}/attendance`, {
        waitUntil: "domcontentloaded",
    });

    const csrfTokens = await page.evaluate(() =>
        Array.from(document.getElementsByName("csrf-token"), (e) => e.value)
    );

    if (csrfTokens.length === 3) {
        return csrfTokens[0];
    }
};

const startCronJob = async ({ fnc, executionTime, randomizeTime }) => {
    const cron = cronExpression({ time: executionTime, randomizeTime });

    return new CronJob(
        cron,
        function () {
            const randomDelay = Math.floor(Math.random() * randomizeTime + 1);

            setTimeout(() => {
                fnc();
            }, randomDelay * 60000);
        },
        null,
        true,
        "Asia/Kolkata"
    );
};

module.exports = {
    getAccessToken,
    getCsrfToken,
    startCronJob,
};
