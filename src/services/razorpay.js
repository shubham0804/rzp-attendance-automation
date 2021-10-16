const baseUrl = "https://payroll.razorpay.com";

const login = async ({ browser, email, password }) => {
    const page = await browser.newPage();
    page.setDefaultTimeout(60000);
    await page.goto(`${baseUrl}/login`);
    await page.type("input[name=email]", email);
    await page.type("input[name=password]", password);
    await page.keyboard.press("Enter");

    // const response = await page.waitForResponse(`${baseUrl}/dashboard`, 40000);
    await page.waitForNavigation();

    // To-Do: Check if captcha is present

    const h2Tag = await page.evaluate(() => {
        return document.querySelector(`h2`)?.innerHTML;
    });
    if (h2Tag.includes("Invalid")) {
        await page.close();
        return false;
    }
    await page.close();
    return true;
};

const markAttendance = async ({ browser, type }) => {
    // To-Do: Validate  if user is logged in

    let buttonValue;
    if (type === "checkIn") {
        buttonValue = "mark-attendance-checkin";
    } else if (type === "checkOut") {
        buttonValue = "mark-attendance-checkout";
    } else {
        throw new Error(`Invalid type: ${type}`);
    }

    const page = await browser.newPage();
    await page.goto(`${baseUrl}/attendance`, {
        waitUntil: "domcontentloaded",
    });

    await page.click(`button[value=${buttonValue}]`);

    // To-Do: Validate if user is checked-in/checked-out & log status
};

const logout = async (browser) => {
    const page = await browser.newPage();
    const cookies = await page.cookies();
    await page.deleteCookie({
        name: "opfinproduction",
        domain: ".razorpay.com",
    });
    console.log("logged out");
};

module.exports = {
    login,
    markAttendance,
    logout,
};
