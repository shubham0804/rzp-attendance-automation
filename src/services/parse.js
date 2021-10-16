require('dotenv').config()

const cronExpression = ({time, randomizeTime}) => {
    let hours = time.split(':')[0]
    let minutes = time.split(':')[1]

    const now = new Date();
    now.setHours(hours)
    now.setMinutes(minutes - (randomizeTime/2));
    
    minutes = now.getMinutes();
    hours = now.getHours();

    return `${minutes} ${hours} * * *`
}

module.exports = {
    cronExpression
}