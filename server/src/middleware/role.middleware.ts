import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import config from "config";
import { Request, Response } from 'express';
import { RoleList } from "src/models/role/role-list";
const jsonwebtoken = require('jsonwebtoken');

export function RoleMiddleware(role) {
    return function (req, res, next: () => void) {
        {
            try {
                const userRoles = req.body.userRoles;
                if (!userRoles) {
                    throw new BadRequestException("нет доступа");
                }

                if (userRoles.indexOf(RoleList[role]) > -1 || userRoles.indexOf(RoleList.ADMIN) > -1) {
                    next();
                } else {
                    throw new BadRequestException("нет доступа");
                }


            } catch (error) {
                console.log(error);
                throw new BadRequestException("нет доступа");
            }
        }

    }
}