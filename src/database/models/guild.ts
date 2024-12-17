import { PrismaClient, Prisma, Guild as GuildModel } from '@prisma/client';

export default class Guild {
    db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    //Creates a new guild in the database
    create(data: Prisma.GuildCreateInput) {
        return this.db.guild.create({
            data,
        });
    }

    //Gets a guild from the database
    get(guildID: GuildModel['guildID']) {
        return this.db.guild.findUnique({
            where: {
                guildID,
            },
        });
    }

    //Updates a guild in the database
    update(guildID: GuildModel['guildID'], data: Prisma.GuildUpdateInput) {
        return this.db.guild.update({
            where: {
                guildID,
            },
            data,
        });
    }

    //Deletes a guild from the database
    delete(guildID: GuildModel['guildID']) {
        return this.db.guild.delete({
            where: {
                guildID,
            },
        });
    }
}
