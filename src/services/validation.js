// const validateTime = (time) => {
//     if (!time.includes(":")) {
//         throw new Error('Invalid time')
//     }

//     const hours = time.split(":")[0];
//     const minutes = time.split(":")[1];

//     if (hours.length !== 2 || minutes.length !== 2) {
//         throw new Error('Invalid time')
//     }

//     if (parseInt(hours) < 0 || parseInt(hours) > 24) {
//         throw new Error('Invalid time')
//     }

//     if (parseInt(minutes) < 0 || parseInt(minutes) > 60) {
//         throw new Error('Invalid time')
//     }

//     return true
// };

// const validateCheckinCheckoutTime = ({checkIn, checkOut, randomizeTime}) => {
//     validateTime(checkIn);
//     validateTime(checkOut);

//     const checkInTime = new Date();
//     checkInTime.setHours(checkIn.split(":")[0]);
//     checkInTime.setMinutes(checkIn.split(":")[1]);

//     const checkOutTime = new Date();
//     checkOutTime.setHours(checkOut.split(":")[0]);
//     checkOutTime.setMinutes(checkOut.split(":")[1]);
//     const diffInMs = Date.parse(checkOutTime) - Date.parse(checkInTime);
//     const diffInMin = Math.round(((diffInMs % 86400000) % 3600000) / 60000);

//     if (randomizeTime < 5 || randomizeTime > 60) {
//         throw new Error('Randomize time should be between 5 and 60')
//     }

//     if (diffInMs <= 0) {
//         throw new Error('Check in time cannot be later than check out time');
//     };

//     if (diffInMin <= randomizeTime) {
//         throw new Error('Kindly increase the difference between check-in/check-out time or decrease the randomize time')
//     }

//     return true
// }

const validateAccessTokenExpiry = (browser) => {
}

module.exports = {
    // validateTime,
    // validateCheckinCheckoutTime,
    validateAccessTokenExpiry
}