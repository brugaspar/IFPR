"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgPool = void 0;
const pg_1 = require("pg");
const pgPool = new pg_1.Pool({
    ssl: {
        rejectUnauthorized: false,
    },
});
exports.pgPool = pgPool;
