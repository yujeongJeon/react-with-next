const path = require("path");
const lcloud = require("./env/lcloud");
const development = require("./env/development");
const production = require("./env/production");

const defaults = {
  root: path.join(__dirname, "..")
};

module.exports = {
  lcloud: Object.assign({}, lcloud, defaults),
  development: Object.assign({}, development, defaults),
  production: Object.assign({}, production, defaults)
}[process.env.NEXT_ENV || "development"];
