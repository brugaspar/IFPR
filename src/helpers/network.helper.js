"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIPv4Address = void 0;
const os_1 = __importDefault(require("os"));
function getIPv4Address() {
    const nets = os_1.default.networkInterfaces();
    for (const key of Object.keys(nets)) {
        if (key === "Ethernet" || key === "Wi-Fi") {
            const ethernet = nets[key];
            if (!ethernet) {
                return;
            }
            for (const net of ethernet) {
                if (net.family === "IPv4") {
                    return net.address;
                }
            }
        }
    }
}
exports.getIPv4Address = getIPv4Address;
