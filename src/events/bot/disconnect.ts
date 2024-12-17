import EventBase from '../../types/EventBase';
import { Events } from 'athena';
import Bot from '../../Bot';

export default class Disconnect extends EventBase {
    name: keyof Events = 'disconnect';
    enabled = true;

    async handle(caller: Bot) {
        if (!this.enabled) return;

        caller.logger.warning('Bot disconnected.');
    }
}
