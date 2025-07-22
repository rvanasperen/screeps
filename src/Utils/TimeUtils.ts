export function every(interval: number) {
    return {
        ticks: (callback: () => void) => {
            if (Game.time % interval === 0) {
                callback();
            }
        },
    };
}
