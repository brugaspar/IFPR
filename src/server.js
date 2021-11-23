"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const network_helper_1 = require("./helpers/network.helper");
const package_json_1 = __importDefault(require("../package.json"));
const port = Number(process.env.PORT) || 3000;
const ipAddress = (0, network_helper_1.getIPv4Address)();
const serverAddress = ipAddress ? `${ipAddress}:${port}` : `${port} - Unavailable IP address`;
app_1.app.listen(port, () => {
    console.log(`\n▶ Server running on ${serverAddress}`);
    console.log(`▶ Application name: ${package_json_1.default.name}`);
    console.log(`▶ Application version: ${package_json_1.default.version}\n`);
});
