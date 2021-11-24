import { PrismaClient } from ".prisma/client";
// import { Pool } from "pg"
import { pgPool } from "../configuration/pg.configuration";

import { getDisabledInfo } from "../helpers/disabled.helper";

import logsRepository from "./logs.repository";

type RequestProduct = {
  name: string;
  quantity: number;
  minimumQuantity: number;
  price: number;
  brandId: string;
  groupId: string;
  disabled: boolean;
  isService: boolean;
};

type Product = {
  id: string;
  name: string;
  quantity: number;
  is_service: boolean;
  minimum_quantity: number;
  price: number;
  brand_id: string;
  brand_name: string;
  group_id: string;
  group_name: string;
  disabled: boolean;
  disabled_at: string;
  created_at: string;
  updated_at: string;
  last_disabled_by: string;
  last_updated_by: string;
  created_by: string;
  disabled_by_user: string;
};

type UpdateProductProps = {
  product: RequestProduct;
  requestUserId: string;
  productId: string;
};

type FilterProduct = {
  onlyEnabled: boolean;
  search: string;
};

const prisma = new PrismaClient();
// const pgPool = new Pool()

class ProductsRepository {
  async store(product: RequestProduct, requestUserId: string) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = getDisabledInfo(product.disabled, requestUserId);

    const { id } = await prisma.products.create({
      data: {
        ...product,
        createdBy,
        lastUpdatedBy,
        disabledAt,
        lastDisabledBy,
      },
      select: {
        id: true,
      },
    });

    await logsRepository.store("products", {
      action: "insert",
      description: "Registro incluído por usuário",
      referenceId: id,
      userId: logUserId,
    });

    return id;
  }

  async findById(id: string) {
    const product = await prisma.products.findUnique({
      where: {
        id,
      },
    });

    return product;
  }

  async findAll({ onlyEnabled = true, search = "" }: FilterProduct) {
    const splittedSearch = search.split(" ");

    let searchText = "";

    splittedSearch.forEach((word, index) => {
      searchText += `
        (
          upper(unaccent(p.name)) like upper(unaccent('%${word}%'))
          or
          upper(unaccent(pg.name)) like upper(unaccent('%${word}%'))
          or
          upper(unaccent(pb.name)) like upper(unaccent('%${word}%'))
        )
      `;

      if (index !== splittedSearch.length - 1) {
        searchText += "and";
      }
    });

    let whereClause = `
      where
        ${onlyEnabled ? `p.disabled = false and` : ""}
        ${searchText}
    `;

    const pg = await pgPool.connect();

    const query = `
      select
        p.id,
        p.name,
        p.is_service,
        p.quantity,
        p.minimum_quantity,
        p.price,
        p.brand_id,
        p.group_id,
        p.disabled,
        p.disabled_at,
        p.created_at,
        p.updated_at,
        p.last_disabled_by,
        p.last_updated_by,
        p.created_by,
        (select u.name from users u where u.id = p.last_disabled_by) disabled_by_user,
        pg.name group_name,
        pb.name brand_name
      from
        products p
      left join
        products_groups pg on pg.id = p.group_id
      left join
        products_brands pb on pb.id = p.brand_id
      ${whereClause}
      order by
        p.created_at
    `;

    const products = await pg.query<Product>(query);

    await pg.release();

    if (!products) {
      return [];
    }

    const parsedProductsResult = products.rows.map((product) => {
      const disabledAt = product.disabled_at ? new Date(product.disabled_at).toISOString() : null;
      const createdAt = product.created_at ? new Date(product.created_at).toISOString() : null;
      const updatedAt = product.updated_at ? new Date(product.updated_at).toISOString() : null;

      return {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        minimumQuantity: product.minimum_quantity,
        price: product.price,
        brand: {
          id: product.brand_id,
          name: product.brand_name,
        },
        group: {
          id: product.group_id,
          name: product.group_name,
        },
        disabled: product.disabled,
        disabledAt,
        createdAt,
        updatedAt,
        lastDisabledBy: product.last_disabled_by,
        lastUpdatedBy: product.last_updated_by,
        createdBy: product.created_by,
        disabledByUser: product.disabled_by_user,
        isService: product.is_service,
      };
    });

    return parsedProductsResult;
  }

  async update({ product, requestUserId, productId }: UpdateProductProps) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = getDisabledInfo(product.disabled, requestUserId);

    const { id } = await prisma.products.update({
      data: {
        ...product,
        disabledAt,
        lastDisabledBy,
        lastUpdatedBy,
      },
      where: {
        id: productId,
      },
      select: {
        id: true,
      },
    });

    if (disabledAt) {
      await logsRepository.store("products", {
        action: "disable",
        description: "Registro desativado por usuário",
        referenceId: id,
        userId: logUserId,
      });
    } else {
      await logsRepository.store("products", {
        action: "update",
        description: "Registro atualizado por usuário",
        referenceId: id,
        userId: logUserId,
      });
    }

    return id;
  }

  async updateQuantity(productId: string, quantity: number) {
    await prisma.products.update({
      data: {
        quantity,
      },
      where: {
        id: productId,
      },
    });
  }
}

export default new ProductsRepository();
