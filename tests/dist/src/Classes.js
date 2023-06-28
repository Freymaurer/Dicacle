import { Record, Union } from "../fable_modules/fable-library.4.0.1/Types.js";
import { array_type, record_type, option_type, union_type, int32_type } from "../fable_modules/fable-library.4.0.1/Reflection.js";
import { defaultArg } from "../fable_modules/fable-library.4.0.1/Option.js";

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

export function Command__get_AsString(this$) {
    if (this$.tag === 1) {
        return "-";
    }
    else {
        return "+";
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

export class SetResult extends Record {
    "constructor"(Index, Results) {
        super();
        this.Index = (Index | 0);
        this.Results = Results;
    }
}

export function SetResult$reflection() {
    return record_type("Classes.SetResult", [], SetResult, () => [["Index", int32_type], ["Results", array_type(DiceRoll$reflection())]]);
}

export function SetResult_create_50178D20(i, res) {
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
    return record_type("Classes.DiceSet", [], DiceSet, () => [["SetCount", int32_type], ["DiceRolls", array_type(Dice$reflection())], ["Results", array_type(SetResult$reflection())]]);
}

export function DiceSet_create_63F6707F(count, diceRolls, results) {
    return new DiceSet(count, diceRolls, defaultArg(results, []));
}

