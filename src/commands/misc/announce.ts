import { Command, CommandBuilder, CommandInteraction, Constants, Role } from 'athena';
import Bot from '../../Bot';
import { BotColors } from '../../utils/constants';
import { SuccessMessage } from '../../utils/message';

export default class Announce extends Command<Bot> {
    id = 'announce';
    definition = new CommandBuilder('announce', 'Make an announcement')
        .setCommandType(Constants.ApplicationCommandType.ChatInput)
        .setMemberPermission(Constants.PermissionFlagsBits.ManageMessages)
        .addChannelOption('channel', 'Where would you like to send this announcement?', true)
        .addStringOption({ name: 'title', description: 'What is this announcement about?', required: true })
        .addStringOption({
            name: 'message',
            description: 'The message to announce. (Use `\\n` to start text on a new line. Ex: Once upon a time,\\nThe end)',
            required: true,
        })
        .addRoleOption('role_one', 'Would you like to ping a role for this announcement?')
        .addRoleOption('role_two', 'Would you like to ping another role for this announcement?')
        .addRoleOption('role_three', 'Would you like to ping another role for this announcement?');

    async handleCommand(caller: Bot, command: CommandInteraction) {
        try {
            const guild = command.guild;
            if (!guild) return;
            const image = guild.icon ? guild.iconURL : null;

            const channel = command.getRequiredChannel('channel');
            const message = command.getRequiredString('message');
            const roles = [command.getRole('role_one'), command.getRole('role_two'), command.getRole('role_three')];
            const pings: Role[] = [];

            for (const role of roles) {
                if (!role) continue;
                pings.push(role);
            }

            await caller.bot.createMessage(channel.id, {
                content: pings.map((role) => role.mention).join(' '),
                allowed_mentions: { roles: pings.map((role) => role.id) },
                embeds: [
                    {
                        author: {
                            name: caller.bot.user?.username as string,
                            icon_url: caller.bot.user?.avatarURL as string,
                        },
                        title: command.getRequiredString('title'),
                        color: BotColors.yellow,
                        description: message.replace(/\\n/g, '\n'),
                        thumbnail: { url: image as string },
                    },
                ],
            });

            await SuccessMessage(command, `Sent announcement to ${channel.mention}.`, true);
        } catch (error) {
            caller.parsing.commandError(error);
        }
    }
}
