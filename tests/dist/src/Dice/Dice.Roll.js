import { map as map_1, sum as sum_2, singleton, collect, delay, toList } from "../../fable_modules/fable-library.4.0.1/Seq.js";
import { rangeDouble } from "../../fable_modules/fable-library.4.0.1/Range.js";
import { comparePrimitives } from "../../fable_modules/fable-library.4.0.1/Util.js";
import { nonSeeded } from "../../fable_modules/fable-library.4.0.1/Random.js";
import { map } from "../../fable_modules/fable-library.4.0.1/Option.js";
import { DiceSet, SetResult_create_50178D20, DiceRoll_create_7C3376E1 } from "../Classes.js";

export function rollOnceBy(max, rnd) {
    return rnd.Next2(1, max + 1);
}

export function rollMultipleBy(count, max, rnd) {
    return Array.from(toList(delay(() => collect((matchValue) => singleton(rnd.Next2(1, max + 1)), rangeDouble(1, 1, count)))));
}

export function RollAux_RerollAux_rerollOnce(treshold, roll, diceSize, rnd) {
    return {
        rerolls: 1,
        roll: (roll <= treshold) ? rollOnceBy(diceSize, rnd) : roll,
    };
}

export function RollAux_RerollAux_rerollInf(treshold, roll, diceSize, rnd) {
    const loop = (tries_mut, currentRoll_mut) => {
        loop:
        while (true) {
            const tries = tries_mut, currentRoll = currentRoll_mut;
            if (tries >= 100) {
                return {
                    rerolls: tries,
                    roll: currentRoll,
                };
            }
            else if (currentRoll <= treshold) {
                tries_mut = (tries + 1);
                currentRoll_mut = rollOnceBy(diceSize, rnd);
                continue loop;
            }
            else {
                return {
                    rerolls: tries,
                    roll: currentRoll,
                };
            }
            break;
        }
    };
    return loop(0, roll);
}

export function RollAux_ExplodeAux_explodeOnce(treshold, roll, diceSize, rnd) {
    return {
        explosions: 1,
        sum: (roll >= treshold) ? (roll + rollOnceBy(diceSize, rnd)) : roll,
    };
}

export function RollAux_ExplodeAux_explodeInf(treshold, roll, diceSize, rnd) {
    const loop = (tries_mut, lastRoll_mut, sum_mut) => {
        loop:
        while (true) {
            const tries = tries_mut, lastRoll = lastRoll_mut, sum = sum_mut;
            if (tries >= 100) {
                return {
                    explosions: tries,
                    sum: sum,
                };
            }
            else if (lastRoll >= treshold) {
                const nextRoll = rollOnceBy(diceSize, rnd) | 0;
                tries_mut = (tries + 1);
                lastRoll_mut = nextRoll;
                sum_mut = (sum + nextRoll);
                continue loop;
            }
            else {
                return {
                    explosions: tries,
                    sum: sum,
                };
            }
            break;
        }
    };
    return loop(0, roll, roll);
}

export function RollAux_reroll(t, diceSize, rollArr, rnd) {
    const prepareReroll = (t.tag === 1) ? ((roll_1) => RollAux_RerollAux_rerollInf(t.fields[0], roll_1, diceSize, rnd)) : ((roll) => RollAux_RerollAux_rerollOnce(t.fields[0], roll, diceSize, rnd));
    for (let i = 0; i <= (rollArr.length - 1); i++) {
        const ex = prepareReroll(rollArr[i]);
        rollArr[i] = (ex.roll | 0);
    }
}

export function RollAux_explode(t, diceSize, rollArr, rnd) {
    const prepareExplode = (t.tag === 1) ? ((roll_1) => RollAux_ExplodeAux_explodeInf(t.fields[0], roll_1, diceSize, rnd)) : ((roll) => RollAux_ExplodeAux_explodeOnce(t.fields[0], roll, diceSize, rnd));
    for (let i = 0; i <= (rollArr.length - 1); i++) {
        const ex = prepareExplode(rollArr[i]);
        rollArr[i] = (ex.sum | 0);
    }
}

export function RollAux_keepDrop(kdt, rollArr) {
    rollArr.sort(comparePrimitives);
    switch (kdt.tag) {
        case 1: {
            const n_1 = kdt.fields[0] | 0;
            const diff_1 = (rollArr.length - n_1) | 0;
            rollArr.splice(n_1, diff_1);
            break;
        }
        case 2: {
            const n_2 = kdt.fields[0] | 0;
            const diff_2 = (rollArr.length - n_2) | 0;
            rollArr.splice(diff_2, n_2);
            break;
        }
        case 3: {
            rollArr.splice(0, kdt.fields[0]);
            break;
        }
        default: {
            const diff = (rollArr.length - kdt.fields[0]) | 0;
            rollArr.splice(0, diff);
        }
    }
}

export function Classes_Dice__Dice_roll(this$) {
    return Classes_Dice__Dice_rollBy_Z6EA5070B(this$, nonSeeded());
}

export function Classes_Dice__Dice_rollBy_Z6EA5070B(this$, rnd) {
    const rolls = rollMultipleBy(this$.DiceCount, this$.DiceSize, rnd);
    map((et) => ((rnd_1) => {
        RollAux_explode(et, this$.DiceSize, rolls, rnd_1);
    }), this$.Explode);
    map((rt) => ((rnd_2) => {
        RollAux_reroll(rt, this$.DiceSize, rolls, rnd_2);
    }), this$.Reroll);
    map((kdt) => {
        RollAux_keepDrop(kdt, rolls);
    }, this$.KeepDrop);
    return DiceRoll_create_7C3376E1(this$, rolls, sum_2(rolls, {
        GetZero: () => 0,
        Add: (x, y) => (x + y),
    }));
}

export function Classes_DiceSet__DiceSet_roll(this$) {
    return Classes_DiceSet__DiceSet_rollBy_Z6EA5070B(this$, nonSeeded());
}

export function Classes_DiceSet__DiceSet_rollBy_Z6EA5070B(this$, rnd) {
    let arg;
    return new DiceSet(this$.SetCount, this$.DiceRolls, (arg = toList(delay(() => collect((i) => {
        const results = map_1((d) => Classes_Dice__Dice_rollBy_Z6EA5070B(d, rnd), this$.DiceRolls);
        return singleton(SetResult_create_50178D20(i, Array.from(results)));
    }, rangeDouble(1, 1, this$.SetCount)))), Array.from(arg)));
}

