// A function that returns Good Morning, Good Afternoon, Good Evening based on the current time
function timeOfDayInWords() {
    let hour = new Date().getHours()
    if (hour >= 0 && hour < 6) {
        return "Good Morning"
    } else if (hour >= 6 && hour <= 15) {
        return "Good Afternoon"
    }
    return "Good Evening"
}

module.exports = timeOfDayInWords