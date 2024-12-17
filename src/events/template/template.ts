import EventBase from '../../types/EventBase';
import { Events } from 'athena';
import Bot from '../../Bot';

export default class Template extends EventBase {
    name: keyof Events = 'interactionCreate';
    enabled = true;

    async handle(caller: Bot) {
        if (!this.enabled) return;
    }
}
