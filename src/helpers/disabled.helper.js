"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisabledInfo = void 0;
function getDisabledInfo(disabled, requestUserId) {
    const adminId = process.env.MASTER_ADMIN_ID;
    const lastUpdatedBy = requestUserId === adminId ? undefined : requestUserId;
    const createdBy = requestUserId === adminId ? undefined : requestUserId;
    const logUserId = requestUserId === adminId ? undefined : requestUserId;
    let disabledAt = null;
    let lastDisabledBy = undefined;
    if (disabled === undefined) {
        disabledAt = undefined;
    }
    else if (disabled) {
        disabledAt = new Date();
        lastDisabledBy = requestUserId === adminId ? undefined : requestUserId;
    }
    return { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId };
}
exports.getDisabledInfo = getDisabledInfo;
