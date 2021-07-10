const config = require("config");

// APP
const APP_CONFIG = config.get("APP_CONFIG");

// Database
const DATABASE_CONFIG = config.get("DATABASE_CONFIG");

// Redis
const REDIS_BULL_CONFIG = config.get("REDIS_BULL_CONFIG");
const REDIS_CONFIG = config.get("REDIS_CONFIG");

export {
    APP_CONFIG,
    DATABASE_CONFIG,
    REDIS_CONFIG,
    REDIS_BULL_CONFIG
};