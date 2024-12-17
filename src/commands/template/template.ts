import { Command, CommandBuilder, CommandInteraction, Constants } from 'athena';
import Bot from '../../Bot';

export default class Template extends Command<Bot> {
    id = 'template';
    definition = new CommandBuilder('template', 'template command').setCommandType(Constants.ApplicationCommandType.ChatInput);

    async handleCommand(caller: Bot, command: CommandInteraction) {
        try {
            await command.createMessage({
                content: 'Hello!',
            });
        } catch (error) {
            caller.parsing.commandError(error);
        }
    }
}
