import Bot from '../Bot';
import IORedis from 'ioredis';
import CoolDown from './redis/cooldown';

//EXAMPLE REDIS LAYOUT (left cooldown for example purposes)
export default class Redis {
    caller: Bot;
    // private redis: IORedis;
    // cooldown: CoolDown;

    constructor(caller: Bot) {
        this.caller = caller;
        // this.redis = new IORedis({
        //     host: caller.config.REDIS.HOST,
        //     keyPrefix: caller.config.REDIS.KEY_PREFIX,
        // });
        // this.cooldown = new CoolDown(this.redis);
    }
}
