import { Record, Union } from "../fable_modules/fable-library.4.0.1/Types.js";
import { list_type, array_type, record_type, option_type, union_type, int32_type } from "../fable_modules/fable-library.4.0.1/Reflection.js";
import { nonSeeded } from "../fable_modules/fable-library.4.0.1/Random.js";
import { sum as sum_2, singleton, collect, delay, toList } from "../fable_modules/fable-library.4.0.1/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.0.1/Range.js";
import { comparePrimitives } from "../fable_modules/fable-library.4.0.1/Util.js";
import { map, defaultArg } from "../fable_modules/fable-library.4.0.1/Option.js";
import { map as map_1, empty } from "../fable_modules/fable-library.4.0.1/List.js";

export class KeepDrop extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["KeepHighest", "KeepLowest", "DropHighest", "DropLowest"];
    }
}

export function KeepDrop$reflection() {
    return union_type("Classes.KeepDrop", [], KeepDrop, () => [[["Item", int32_type]], [["Item", int32_type]], [["Item", int32_type]], [["Item", int32_type]]]);
}

export function KeepDrop_ofString_Z18115A39(strType, n) {
    let matchResult;
    if (strType === "k") {
        matchResult = 0;
    }
    else if (strType === "kh") {
        matchResult = 0;
    }
    else if (strType === "kl") {
        matchResult = 1;
    }
    else if (strType === "d") {
        matchResult = 2;
    }
    else if (strType === "dl") {
        matchResult = 2;
    }
    else if (strType === "dh") {
        matchResult = 3;
    }
    else {
        matchResult = 4;
    }
    switch (matchResult) {
        case 0: {
            return new KeepDrop(0, [n]);
        }
        case 1: {
            return new KeepDrop(1, [n]);
        }
        case 2: {
            return new KeepDrop(3, [n]);
        }
        case 3: {
            return new KeepDrop(2, [n]);
        }
        case 4: {
            throw new Error(`Unable to parse \`${strType}\` to Keep/Drop logic`);
        }
    }
}

export class Reroll extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Once", "Inf"];
    }
}

export function Reroll$reflection() {
    return union_type("Classes.Reroll", [], Reroll, () => [[["Item", int32_type]], [["Item", int32_type]]]);
}

export function Reroll_ofString_Z18115A39(strType, n) {
    if (strType === "r") {
        return new Reroll(0, [n]);
    }
    else if (strType === "ir") {
        return new Reroll(1, [n]);
    }
    else {
        throw new Error(`Unable to parse \`${strType}\` to reroll logic`);
    }
}

export class Explode extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Once", "Inf"];
    }
}

export function Explode$reflection() {
    return union_type("Classes.Explode", [], Explode, () => [[["Item", int32_type]], [["Item", int32_type]]]);
}

export function Explode_ofString_Z18115A39(strType, n) {
    if (strType === "e") {
        return new Explode(0, [n]);
    }
    else if (strType === "ie") {
        return new Explode(1, [n]);
    }
    else {
        throw new Error(`Unable to parse \`${strType}\` to explode logic`);
    }
}

export class Command extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Add", "Substract"];
    }
}

export function Command$reflection() {
    return union_type("Classes.Command", [], Command, () => [[], []]);
}

export function Command_ofString_Z721C83C5(str) {
    let matchResult;
    if (str === "") {
        matchResult = 0;
    }
    else if (str === "+") {
        matchResult = 0;
    }
    else if (str === "-") {
        matchResult = 1;
    }
    else {
        matchResult = 2;
    }
    switch (matchResult) {
        case 0: {
            return new Command(0, []);
        }
        case 1: {
            return new Command(1, []);
        }
        case 2: {
            throw new Error(`Unable to parse \`${str}\` to \`+\` or \`-\`.`);
        }
    }
}

export function rollOnceBy(max, rnd) {
    return rnd.Next2(1, max + 1);
}

export function rollOnce(max) {
    const rnd = nonSeeded();
    return rnd.Next2(1, max + 1) | 0;
}

export function rollMultiple(count, max) {
    const rnd = nonSeeded();
    return Array.from(toList(delay(() => collect((matchValue) => singleton(rnd.Next2(1, max + 1)), rangeDouble(1, 1, count)))));
}

export function RollAux_RerollAux_rerollOnce(treshold, roll, diceSize) {
    return {
        rerolls: 1,
        roll: (roll <= treshold) ? rollOnce(diceSize) : roll,
    };
}

export function RollAux_RerollAux_rerollInf(treshold, roll, diceSize) {
    const rnd = nonSeeded();
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

export function RollAux_ExplodeAux_explodeOnce(treshold, roll, diceSize) {
    return {
        explosions: 1,
        sum: (roll >= treshold) ? (roll + rollOnce(diceSize)) : roll,
    };
}

export function RollAux_ExplodeAux_explodeInf(treshold, roll, diceSize) {
    const rnd = nonSeeded();
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

export function RollAux_reroll(t, diceSize, rollArr) {
    const prepareReroll = (t.tag === 1) ? ((roll_1) => RollAux_RerollAux_rerollInf(t.fields[0], roll_1, diceSize)) : ((roll) => RollAux_RerollAux_rerollOnce(t.fields[0], roll, diceSize));
    for (let i = 0; i <= (rollArr.length - 1); i++) {
        const ex = prepareReroll(rollArr[i]);
        rollArr[i] = (ex.roll | 0);
    }
}

export function RollAux_explode(t, diceSize, rollArr) {
    const prepareExplode = (t.tag === 1) ? ((roll_1) => RollAux_ExplodeAux_explodeInf(t.fields[0], roll_1, diceSize)) : ((roll) => RollAux_ExplodeAux_explodeOnce(t.fields[0], roll, diceSize));
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

export class Dice extends Record {
    "constructor"(Command, DiceCount, DiceSize, Explode, Reroll, KeepDrop) {
        super();
        this.Command = Command;
        this.DiceCount = (DiceCount | 0);
        this.DiceSize = (DiceSize | 0);
        this.Explode = Explode;
        this.Reroll = Reroll;
        this.KeepDrop = KeepDrop;
    }
}

export function Dice$reflection() {
    return record_type("Classes.Dice", [], Dice, () => [["Command", Command$reflection()], ["DiceCount", int32_type], ["DiceSize", int32_type], ["Explode", option_type(Explode$reflection())], ["Reroll", option_type(Reroll$reflection())], ["KeepDrop", option_type(KeepDrop$reflection())]]);
}

export function Dice_create_458B7DF0(count, size, command, explode, reroll, keepdrop) {
    return new Dice(defaultArg(command, new Command(0, [])), count, size, explode, reroll, keepdrop);
}

export class DiceRoll extends Record {
    "constructor"(Dice, DiceRolled, DiceRollSum) {
        super();
        this.Dice = Dice;
        this.DiceRolled = DiceRolled;
        this.DiceRollSum = (DiceRollSum | 0);
    }
}

export function DiceRoll$reflection() {
    return record_type("Classes.DiceRoll", [], DiceRoll, () => [["Dice", Dice$reflection()], ["DiceRolled", array_type(int32_type)], ["DiceRollSum", int32_type]]);
}

export function DiceRoll_create_7C3376E1(dice, diceRolled, diceRollSum) {
    return new DiceRoll(dice, diceRolled, diceRollSum);
}

export function Dice__roll(this$) {
    const rolls = rollMultiple(this$.DiceCount, this$.DiceSize);
    map((et) => {
        RollAux_explode(et, this$.DiceSize, rolls);
    }, this$.Explode);
    map((rt) => {
        RollAux_reroll(rt, this$.DiceSize, rolls);
    }, this$.Reroll);
    map((kdt) => {
        RollAux_keepDrop(kdt, rolls);
    }, this$.KeepDrop);
    return DiceRoll_create_7C3376E1(this$, rolls, sum_2(rolls, {
        GetZero: () => 0,
        Add: (x, y) => (x + y),
    }));
}

export class SetResult extends Record {
    "constructor"(Index, Results) {
        super();
        this.Index = (Index | 0);
        this.Results = Results;
    }
}

export function SetResult$reflection() {
    return record_type("Classes.SetResult", [], SetResult, () => [["Index", int32_type], ["Results", list_type(DiceRoll$reflection())]]);
}

export function SetResult_create_45D5267B(i, res) {
    return new SetResult(i, res);
}

export class DiceSet extends Record {
    "constructor"(SetCount, DiceRolls, Results) {
        super();
        this.SetCount = (SetCount | 0);
        this.DiceRolls = DiceRolls;
        this.Results = Results;
    }
}

export function DiceSet$reflection() {
    return record_type("Classes.DiceSet", [], DiceSet, () => [["SetCount", int32_type], ["DiceRolls", list_type(Dice$reflection())], ["Results", list_type(SetResult$reflection())]]);
}

export function DiceSet_create_699046FF(count, diceRolls, results) {
    return new DiceSet(count, diceRolls, defaultArg(results, empty()));
}

export function DiceSet__roll(this$) {
    return new DiceSet(this$.SetCount, this$.DiceRolls, toList(delay(() => collect((i) => singleton(SetResult_create_45D5267B(i, map_1(Dice__roll, this$.DiceRolls))), rangeDouble(1, 1, this$.SetCount)))));
}

