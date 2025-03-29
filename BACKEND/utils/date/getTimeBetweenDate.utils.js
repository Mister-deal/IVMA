const getTimeBetweenDate = (pastDate, actualDate) => {
    const past = new Date(pastDate);
    const actual = new Date(actualDate);

    const timeInSeconds = ((actual - past) / 1000);
    return timeInSeconds;
}

module.exports = getTimeBetweenDate;
