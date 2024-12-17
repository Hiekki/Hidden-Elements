import Bot from '../Bot';
import { PrismaClient } from '@prisma/client';
import Guild from './models/guild';

export default class Database {
    private prisma = new PrismaClient();

    caller: Bot;
    guild: Guild;

    constructor(caller: Bot) {
        this.caller = caller;
        this.guild = new Guild(this.prisma);
    }
}
