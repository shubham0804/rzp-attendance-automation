require("dotenv").config();
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const { markAttendance, login } = require("./src/services/razorpay");
const { startCronJob } = require("./src/services/misc");

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const checkInTime = process.env.CHECK_IN_TIME;
const checkOutTime = process.env.CHECK_OUT_TIME;
const randomizeTime = process.env.RANDOMIZE_TIME;

const start = async () => {
    try {
        // To-Do Validate env file

        const browser = await puppeteer.launch();
        console.log("Validating login credentials...");
        const isLoggedIn = await login({ browser, email, password });
        if (!isLoggedIn) {
            throw new Error("Invalid login credentials. Edit in .env");
        } 
        console.log("Login credentials valid!");

        // Check In
        // To-Do Check if access token is valid
        const checkIn = async () =>
            await markAttendance({ browser, type: "checkIn" });
        // const dummyCheckIn = () =>
        //     console.log(`${new Date().toLocaleTimeString()}: checking in`);
        const checkInCron = await startCronJob({
            fnc: checkIn,
            executionTime: checkInTime,
            randomizeTime,
        });

        // Check Out
        // To-Do Check if access token is valid
        const checkOut = async () =>
            await markAttendance({ browser, type: "checkOut" });
        // const dummyCheckOut = () =>
        //     console.log(`${new Date().toLocaleTimeString()}: checking out`);
        const checkOutCron = await startCronJob({
            fnc: checkOut,
            executionTime: checkOutTime,
            randomizeTime,
        });
    } catch (error) {
        console.error(error);
    }
};
start();
