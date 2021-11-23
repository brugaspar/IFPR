"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const schema_handler_1 = require("../handlers/schema.handler");
const request_helper_1 = require("../helpers/request.helper");
const errors_handler_1 = require("../handlers/errors.handler");
const members_repository_1 = __importDefault(require("../repositories/members.repository"));
const plans_repository_1 = __importDefault(require("../repositories/plans.repository"));
const addresses_repository_1 = __importDefault(require("../repositories/addresses.repository"));
const documents_repository_1 = __importDefault(require("../repositories/documents.repository"));
class MemberController {
    async store(request, response) {
        const member = request.body;
        const memberDocuments = request.files;
        const schema = {
            name: yup.string().required(),
            rg: yup.string().required(),
            issuingAuthority: yup.string().required(),
            cpf: yup.string().required(),
            naturalityCityId: yup.string().required(),
            motherName: yup.string(),
            fatherName: yup.string(),
            profession: yup.string().required(),
            email: yup.string(),
            phone: yup.string(),
            cellPhone: yup.string().required(),
            crNumber: yup.string().required(),
            issuedAt: yup.date().required(),
            birthDate: yup.date().required(),
            crValidity: yup.date().required(),
            healthIssues: yup.string(),
            gender: yup.mixed().oneOf(["male", "female", "other"]).required(),
            maritalStatus: yup
                .mixed()
                .oneOf(["single", "married", "widower", "legally_separated", "divorced"])
                .required(),
            bloodTyping: yup
                .mixed()
                .oneOf([
                "APositive",
                "ANegative",
                "BPositive",
                "BNegative",
                "ABPositive",
                "ABNegative",
                "OPositive",
                "ONegative",
            ])
                .required(),
            disabled: yup.string(),
            planId: yup.string().required(),
            address: yup.object().shape({
                street: yup.string().required("Endereço é obrigatório"),
                number: yup.string().required("Número é obrigatório"),
                neighbourhood: yup.string().required("Bairro é obrigatório"),
                complement: yup.string(),
                zipcode: yup.string().required("CEP é obrigatório"),
                cityId: yup.number().required("Cidade é obrigatória"),
            }),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        if (member.email) {
            const emailExists = await members_repository_1.default.findByEmail(member.email);
            if (emailExists) {
                throw new errors_handler_1.AppError("E-mail já está em uso");
            }
        }
        const planExists = await plans_repository_1.default.findById(member.planId);
        if (!planExists) {
            throw new errors_handler_1.AppError("Plano não encontrado");
        }
        member.issuedAt = new Date(member.issuedAt).toISOString();
        member.crValidity = new Date(member.crValidity).toISOString();
        member.birthDate = new Date(member.birthDate).toISOString();
        const { address, ...memberData } = member;
        const storedMember = await members_repository_1.default.store({
            ...memberData,
            naturalityCityId: Number(member.naturalityCityId),
        }, request.userId);
        if (memberDocuments) {
            for (const document of memberDocuments) {
                const documentData = {
                    name: document.key,
                    path: `http://localhost:3030/files/${document.key}`,
                };
                await documents_repository_1.default.store({
                    ...documentData,
                    memberId: storedMember,
                }, request.userId);
            }
        }
        await addresses_repository_1.default.store({
            ...JSON.parse(address),
            memberId: storedMember,
        }, request.userId);
        return response.status(201).json({ id: storedMember });
    }
    async index(request, response) {
        const { onlyEnabled = true, search = "" } = request.query;
        const schema = {
            onlyEnabled: yup.boolean(),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const members = await members_repository_1.default.findAll({
            onlyEnabled: JSON.parse(onlyEnabled),
            search,
        });
        return response.status(200).json(members);
    }
    async show(request, response) {
        const id = request.params.id;
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const member = await members_repository_1.default.findById(id);
        if (!member) {
            throw new errors_handler_1.AppError("Membro não encontrado");
        }
        return response.status(200).json(member);
    }
    async update(request, response) {
        const member = request.body;
        const id = request.params.id;
        const schema = {
            name: yup.string(),
            rg: yup.string(),
            issuingAuthority: yup.string(),
            cpf: yup.string(),
            naturalityCityId: yup.string(),
            motherName: yup.string(),
            fatherName: yup.string(),
            profession: yup.string(),
            email: yup.string(),
            phone: yup.string(),
            cellPhone: yup.string(),
            crNumber: yup.string(),
            issuedAt: yup.date(),
            birthDate: yup.date(),
            crValidity: yup.date(),
            healthIssues: yup.string(),
            gender: yup.mixed().oneOf(["male", "female", "other"]),
            maritalStatus: yup.mixed().oneOf(["single", "married", "widower", "legally_separated", "divorced"]),
            bloodTyping: yup
                .mixed()
                .oneOf(["APositive", "ANegative", "BPositive", "BNegative", "ABPositive", "ABNegative", "OPositive", "ONegative"]),
            disabled: yup.string(),
            planId: yup.string(),
            address: yup.object().shape({
                street: yup.string(),
                number: yup.string(),
                neighbourhood: yup.string(),
                complement: yup.string(),
                zipcode: yup.string(),
                cityId: yup.number(),
            }),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const memberExists = await members_repository_1.default.findById(id);
        if (!memberExists) {
            throw new errors_handler_1.AppError("Membro não encontrado");
        }
        if (member.email && member.email !== memberExists.email) {
            const emailExists = await members_repository_1.default.findByEmail(member.email);
            if (emailExists) {
                throw new errors_handler_1.AppError("E-mail já está em uso");
            }
        }
        if (member.planId) {
            const planExists = await plans_repository_1.default.findById(member.planId);
            if (!planExists) {
                throw new errors_handler_1.AppError("Plano não encontrado");
            }
        }
        const { address, ...memberData } = member;
        const updatedMember = await members_repository_1.default.update({
            member: memberData,
            requestUserId: request.userId,
            memberId: id,
        });
        if (address) {
            const addresses = await addresses_repository_1.default.findByZipcode(address.zipcode, updatedMember);
            if (addresses.length) {
                for (const storedAddress of addresses) {
                    if (storedAddress.number === String(address.number)) {
                        await addresses_repository_1.default.update({
                            address: {
                                ...address,
                                memberId: updatedMember,
                            },
                            requestUserId: request.userId,
                            addressId: storedAddress.id,
                        });
                    }
                    else {
                        await addresses_repository_1.default.store({
                            ...address,
                            memberId: updatedMember,
                        }, request.userId);
                    }
                }
            }
            else {
                await addresses_repository_1.default.store({
                    ...address,
                    memberId: updatedMember,
                }, request.userId);
            }
        }
        return response.status(200).json({ id: updatedMember });
    }
    async findDocuments(request, response) {
        const { memberId } = request.body;
        const schema = {
            memberId: yup.string().required(),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const memberDocuments = await members_repository_1.default.findAllDocuments(memberId);
        return response.status(200).json(memberDocuments);
    }
}
exports.default = new MemberController();
