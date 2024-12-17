import EventBase from '../../types/EventBase';
import { Events } from 'athena';
import Bot from '../../Bot';

export default class Error extends EventBase {
    name: keyof Events = 'error';
    enabled = true;

    async handle(caller: Bot, error: Error) {
        if (!this.enabled) return;

        caller.logger.error(error);
    }
}
