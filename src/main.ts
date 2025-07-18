import ColonyManager from './Colony/ColonyManager';

// noinspection JSUnusedGlobalSymbols
export function loop(): void {
    new ColonyManager().run();
}
