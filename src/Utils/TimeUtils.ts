export function every(ticks: number) {
    return {
        ticks: (callback: () => void) => {
            if (Game.time % ticks === 0) {
                callback();
            }
        },
    };
}
