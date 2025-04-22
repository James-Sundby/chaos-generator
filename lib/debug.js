const DEBUG = process.env.NODE_ENV === "development";

function debug(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

module.exports = {
    DEBUG,
    debug,
};