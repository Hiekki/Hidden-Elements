import { Command, CommandBuilder, CommandInteraction, Constants } from 'athena';
import Bot from '../../Bot';
import { ErrorMessage, SuccessMessage } from '../../utils/message';
import { BotColors } from '../../utils/constants';
import numeral from 'numeral';

export default class Bank extends Command<Bot> {
    id = 'bank';
    definition = new CommandBuilder('bank', 'Clan Bank things')
        .setCommandType(Constants.ApplicationCommandType.ChatInput)
        .setMemberPermission(Constants.PermissionFlagsBits.ManageMessages)
        .addStringOption({
            name: 'option',
            description: 'Add, remove, or show a bank option.',
            required: true,
            choices: ['Add', 'Remove', 'Show'],
        })
        .addIntegerOption({ name: 'amount', description: 'How many funds would you like to add or remove?', min_value: 1 });

    async handleCommand(caller: Bot, command: CommandInteraction) {
        try {
            if (!command.guild) return;
            const options = command.getRequiredString('option');
            const amount = command.getInteger('amount');

            const guild = await caller.database.guild.get(command.guild.id);
            if (!guild) return ErrorMessage(command, 'This server does not have a bank.', true);

            switch (options) {
                case 'add': {
                    if (!amount) return ErrorMessage(command, 'You must specify how many funds to add.', true);

                    const funds = Number(guild.funds) + amount;
                    await caller.database.guild.update(command.guild.id, { funds });

                    await SuccessMessage(command, `Added \`${numeral(amount).format('0,0')}\` funds to the bank.`);
                    break;
                }
                case 'remove': {
                    if (!amount) return ErrorMessage(command, 'You must specify how many funds to remove.', true);

                    const funds = Number(guild.funds) - amount;
                    if (funds < 0) return ErrorMessage(command, 'You cannot remove more funds than the bank has.', true);

                    await caller.database.guild.update(command.guild.id, { funds });

                    await SuccessMessage(command, `Removed \`${numeral(amount).format('0,0')}\` funds from the bank.`);
                    break;
                }
                case 'show': {
                    await command.createMessage({
                        embeds: [
                            {
                                title: 'Clan Bank',
                                color: BotColors.yellow,
                                description: `The bank has <a:gp:1318661785087115376> **${numeral(guild.funds).format('0,0')}** <a:gp:1318661785087115376> GPs.`,
                            },
                        ],
                    });
                    break;
                }
            }
        } catch (error) {
            caller.parsing.commandError(error);
        }
    }
}
