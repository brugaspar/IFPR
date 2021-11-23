"use strict";
//! Migrado para pasta "routes", separado por arquivos
// TODO: remover arquivo
// import { Router } from "express"
// import multer from "multer"
// import multerConfiguration from "../src/configuration/multer.configuration"
// import { authenticationMiddleware } from "../src/middlewares/authentication.middleware"
// import { permissionsMiddleware } from "../src/middlewares/permissions.middleware"
// import authenticationController from "../src/controllers/authentication.controller"
// import userController from "../src/controllers/users.controller"
// import cityController from "../src/controllers/cities.controller"
// import permissionsController from "../src/controllers/permissions.controller"
// import plansController from "../src/controllers/plans.controller"
// import membersController from "../src/controllers/members.controller"
// const router = Router()
// router.post("/authenticate", authenticationController.authenticate)
// router.post(
//   "/users",
//   authenticationMiddleware,
//   permissionsMiddleware(["create_users"]),
//   userController.store
// )
// router.get(
//   "/users",
//   authenticationMiddleware,
//   permissionsMiddleware(["list_users"]),
//   userController.index
// )
// router.get(
//   "/users/:id",
//   authenticationMiddleware,
//   permissionsMiddleware(["list_users"]),
//   userController.show
// )
// router.put(
//   "/users/:id",
//   authenticationMiddleware,
//   permissionsMiddleware(["edit_users"]),
//   userController.update
// )
// router.get(
//   "/cities",
//   authenticationMiddleware,
//   permissionsMiddleware(["list_cities"]),
//   cityController.index
// )
// router.get("/permissions", authenticationMiddleware, permissionsController.index)
// router.post(
//   "/plans",
//   authenticationMiddleware,
//   permissionsMiddleware(["create_plans"]),
//   plansController.store
// )
// router.get(
//   "/plans",
//   authenticationMiddleware,
//   permissionsMiddleware(["list_plans"]),
//   plansController.index
// )
// router.get(
//   "/plans/:id",
//   authenticationMiddleware,
//   permissionsMiddleware(["list_plans"]),
//   plansController.show
// )
// router.put(
//   "/plans/:id",
//   authenticationMiddleware,
//   permissionsMiddleware(["edit_plans"]),
//   plansController.update
// )
// router.post(
//   "/members",
//   authenticationMiddleware,
//   permissionsMiddleware(["create_members"]),
//   multer(multerConfiguration).array("files"),
//   membersController.store
// )
// router.get(
//   "/members",
//   authenticationMiddleware,
//   permissionsMiddleware(["list_members"]),
//   membersController.index
// )
// router.get(
//   "/members/documents",
//   authenticationMiddleware,
//   permissionsMiddleware(["list_documents"]),
//   membersController.findDocuments
// )
// router.get(
//   "/members/:id",
//   authenticationMiddleware,
//   permissionsMiddleware(["list_members"]),
//   membersController.show
// )
// router.put(
//   "/members/:id",
//   authenticationMiddleware,
//   multer(multerConfiguration).array("files"),
//   membersController.update
// )
// export { router }
