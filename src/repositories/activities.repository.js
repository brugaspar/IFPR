"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const pg_1 = require("pg");
const disabled_helper_1 = require("../helpers/disabled.helper");
const logs_repository_1 = __importDefault(require("./logs.repository"));
const prisma = new client_1.PrismaClient();
const pgPool = new pg_1.Pool();
class ActivitiesRepository {
    async store(activity, requestUserId) {
        const { lastUpdatedBy, createdBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(false, requestUserId);
        const { id } = await prisma.activities.create({
            data: {
                ...activity,
                createdBy,
                lastUpdatedBy,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("activities", {
            action: "insert",
            description: "Registro incluído por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
    async storeItem(item) {
        const { id } = await prisma.activitiesItems.create({
            data: item,
            select: {
                id: true,
            },
        });
        return id;
    }
    // async updateItem(item: UpdateActivityItem, itemId: string) {
    //   console.log(item, itemId)
    //   const { id } = await prisma.activitiesItems.update({
    //     data: item,
    //     select: {
    //       id: true,
    //     },
    //     where: {
    //       id: itemId,
    //     },
    //   })
    //   return id
    // }
    async findById(id) {
        const activities = await prisma.activities.findUnique({
            where: {
                id,
            },
            include: {
                items: true,
            },
        });
        return activities;
    }
    async findAll({ search = "" }) {
        //? Antigo SELECT, com case-sensitive e considerando acentos
        // const users = await prisma.users.findMany({
        //   where: {
        //     disabled: onlyEnabled ? false : undefined,
        //   },
        //   include: {
        //     disabledByUser: true,
        //   },
        // })
        const splittedSearch = search.split(" ");
        let searchText = "";
        splittedSearch.forEach((word, index) => {
            searchText += `
        (
          upper(unaccent(m.name)) like upper(unaccent('%${word}%'))
        )
      `;
            if (index !== splittedSearch.length - 1) {
                searchText += "and";
            }
        });
        let whereClause = `
      where
        ${searchText}
    `;
        const pg = await pgPool.connect();
        const query = `
      select
        a.id,
        a.status,
        a.total,
        a.total_quantity,
        a.total_items,
        a.observation,
        a.cancelled_reason,
        a.seller_id,
        u2.name seller_name,
        a.member_id,
        m.name member_name,
        a.created_at,
        a.cancelled_at,
        a.updated_at,
        a.last_updated_by,
        a.created_by,
        a.finished_at,
        (select u.name from users u where u.id = a.last_cancelled_by) cancelled_by_user
      from
        activities a
      left join
        members m on m.id = a.member_id
      left join
        users u2 on u2.id = a.seller_id
      ${whereClause}
      order by
        a.created_at
    `;
        const activities = await pg.query(query);
        if (!activities) {
            return [];
        }
        let items = [];
        for (const activity of activities.rows) {
            const itemsQuery = `
        select
          ai.id,
          ai.product_id,
          ai.quantity,
          ai.price,
          ai.subtotal
        from
          activities_items ai
        where
          ai.activity_id = '${activity.id}'
      `;
            items = await pg.query(itemsQuery);
            if (!items) {
                items = [];
            }
            else {
                items = items.rows;
            }
        }
        const parsedActivitiesResult = activities.rows.map((activity) => {
            const cancelledAt = activity.cancelled_at ? new Date(activity.cancelled_at).toISOString() : null;
            const createdAt = activity.created_at ? new Date(activity.created_at).toISOString() : null;
            const updatedAt = activity.updated_at ? new Date(activity.updated_at).toISOString() : null;
            return {
                id: activity.id,
                status: activity.status,
                total: activity.total,
                totalQuantity: activity.total_quantity,
                totalItems: activity.total_items,
                observation: activity.observation,
                cancelledReason: activity.cancelled_reason,
                seller: {
                    id: activity.seller_id,
                    name: activity.seller_name,
                },
                member: {
                    id: activity.member_id,
                    name: activity.member_name,
                },
                createdAt,
                updatedAt,
                cancelledAt,
                finishedAt: activity.finished_at,
                lastUpdatedBy: activity.last_updated_by,
                canceledByUser: activity.cancelled_by_user,
                createdBy: activity.created_by,
                items,
            };
        });
        await pg.release();
        return parsedActivitiesResult;
    }
    async update({ activity, requestUserId, activityId }) {
        const { lastUpdatedBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(false, requestUserId);
        let cancelledAt = null;
        let finishedAt = null;
        let lastCancelledBy = null;
        if (activity.status === "cancelled") {
            cancelledAt = new Date();
            lastCancelledBy = requestUserId;
        }
        else if (activity.status === "open") {
            cancelledAt = null;
            finishedAt = null;
            lastCancelledBy = null;
            activity.cancelledReason = "";
        }
        else if (activity.status === "closed") {
            finishedAt = new Date();
        }
        const { id } = await prisma.activities.update({
            data: {
                ...activity,
                lastUpdatedBy,
                cancelledAt,
                finishedAt,
                lastCancelledBy,
            },
            where: {
                id: activityId,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("activities", {
            action: "update",
            description: "Registro atualizado por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
}
exports.default = new ActivitiesRepository();
