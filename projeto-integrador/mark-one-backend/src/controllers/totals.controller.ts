import { Request, Response } from "express";

import { checkRequestUser } from "../helpers/request.helper";

import activitiesRepository from "../repositories/activities.repository";
import membersRepository from "../repositories/members.repository";
import plansRepository from "../repositories/plans.repository";
import productsRepository from "../repositories/products.repository";
import usersRepository from "../repositories/users.repository";

class TotalsController {
  async index(request: Request, response: Response) {
    await checkRequestUser(request.userId);

    const usersCount = await usersRepository.findCount();
    const productsCount = await productsRepository.findCount();
    const plansCount = await plansRepository.findCount();
    const membersCount = await membersRepository.findCount();
    const activitiesCount = await activitiesRepository.findCount({});
    const activitiesTotal = await activitiesRepository.findTotal();
    const activitiesOpen = await activitiesRepository.findCount({ onlyOpen: true });

    return response.status(200).json({
      usersCount,
      productsCount,
      plansCount,
      membersCount,
      activitiesCount,
      activitiesTotal,
      activitiesOpen,
    });
  }
}

export default new TotalsController();
