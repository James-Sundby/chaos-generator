//const DEBUG = process.env.NODE_ENV === "development";
const DEBUG = process.env.NODE_ENV === "production";

function debug(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

module.exports = {
    DEBUG,
    debug,
};