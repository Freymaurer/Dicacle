import { toFail, remove, replace, printf, toText, join } from "../../fable_modules/fable-library.4.0.1/String.js";
import { map, ofArray } from "../../fable_modules/fable-library.4.0.1/List.js";
import { match, create, matches as matches_1 } from "../../fable_modules/fable-library.4.0.1/RegExp.js";
import { DiceSet_create_63F6707F, Dice_create_458B7DF0, Command_ofString_Z721C83C5, Command$reflection, Reroll_ofString_Z18115A39, Explode_ofString_Z18115A39, KeepDrop_ofString_Z18115A39 } from "../Classes.js";
import { parse } from "../../fable_modules/fable-library.4.0.1/Int32.js";
import { Record } from "../../fable_modules/fable-library.4.0.1/Types.js";
import { record_type, string_type, int32_type } from "../../fable_modules/fable-library.4.0.1/Reflection.js";
import { singleton, collect, delay, toList } from "../../fable_modules/fable-library.4.0.1/Seq.js";
import { Classes_DiceSet__DiceSet_roll } from "./Dice.Roll.js";

export function Pattern_DiceRollPatterns_createSubPattern(subpatternName, identifier) {
    const arg_2 = join("|", identifier);
    const clo = toText(printf("(?<%s>(?<%sType>%s)(?<%sNumber>\\d+))"));
    const clo_1 = clo(subpatternName);
    const clo_2 = clo_1(subpatternName);
    const clo_3 = clo_2(arg_2);
    return clo_3(subpatternName);
}

export const Pattern_DiceRollPatterns_KeepDropPattern = Pattern_DiceRollPatterns_createSubPattern("KeepDrop", ofArray(["k", "kh", "kl", "d", "dl", "dh"]));

export const Pattern_DiceRollPatterns_ExplodePattern = Pattern_DiceRollPatterns_createSubPattern("Explode", ofArray(["e", "ie"]));

export const Pattern_DiceRollPatterns_RerollPattern = Pattern_DiceRollPatterns_createSubPattern("Reroll", ofArray(["r", "ir"]));

export const Pattern_DiceRollPatterns_DicePattern = "^(?<DiceCount>\\d+)((d|w)(?<DiceSize>\\d+))?";

export function Pattern_tryKeepDrop(input) {
    const matches = matches_1(create(Pattern_DiceRollPatterns_KeepDropPattern), input);
    const matchValue = matches.length | 0;
    if (matchValue === 1) {
        const m = matches[0];
        return KeepDrop_ofString_Z18115A39((m.groups && m.groups.KeepDropType) || "", parse((m.groups && m.groups.KeepDropNumber) || "", 511, false, 32));
    }
    else if (matchValue <= 0) {
        return void 0;
    }
    else {
        throw new Error("Found Keep/Drop logic multiple times in dice roll.");
    }
}

export function Pattern_tryExplode(input) {
    const matches = matches_1(create(Pattern_DiceRollPatterns_ExplodePattern), input);
    const matchValue = matches.length | 0;
    if (matchValue === 1) {
        const m = matches[0];
        return Explode_ofString_Z18115A39((m.groups && m.groups.ExplodeType) || "", parse((m.groups && m.groups.ExplodeNumber) || "", 511, false, 32));
    }
    else if (matchValue <= 0) {
        return void 0;
    }
    else {
        throw new Error("Found Keep/Drop logic multiple times in dice roll.");
    }
}

export function Pattern_tryReroll(input) {
    const matches = matches_1(create(Pattern_DiceRollPatterns_RerollPattern), input);
    const matchValue = matches.length | 0;
    if (matchValue === 1) {
        const m = matches[0];
        return Reroll_ofString_Z18115A39((m.groups && m.groups.RerollType) || "", parse((m.groups && m.groups.RerollNumber) || "", 511, false, 32));
    }
    else if (matchValue <= 0) {
        return void 0;
    }
    else {
        throw new Error("Found Keep/Drop logic multiple times in dice roll.");
    }
}

export class DiceParsingTypes_PreSet extends Record {
    "constructor"(setCount, diceRolls) {
        super();
        this.setCount = (setCount | 0);
        this.diceRolls = diceRolls;
    }
}

export function DiceParsingTypes_PreSet$reflection() {
    return record_type("Dice.Parsing.DiceParsingTypes.PreSet", [], DiceParsingTypes_PreSet, () => [["setCount", int32_type], ["diceRolls", string_type]]);
}

export function DiceParsingTypes_PreSet_create_Z176EF219(setCount, diceRolls) {
    return new DiceParsingTypes_PreSet(setCount, diceRolls);
}

export class DiceParsingTypes_PreDiceRoll extends Record {
    "constructor"(command, diceRoll) {
        super();
        this.command = command;
        this.diceRoll = diceRoll;
    }
}

export function DiceParsingTypes_PreDiceRoll$reflection() {
    return record_type("Dice.Parsing.DiceParsingTypes.PreDiceRoll", [], DiceParsingTypes_PreDiceRoll, () => [["command", Command$reflection()], ["diceRoll", string_type]]);
}

export function DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(command, diceRoll) {
    return new DiceParsingTypes_PreDiceRoll(command, diceRoll);
}

export function DiceParsingAux_parseSets(input) {
    const input_1 = replace(input, " ", "");
    const matches = matches_1(/(?<setCount>\d*)?\s*(^|\()(?<diceRolls>[a-zA-Z0-9\s+-]*)($|\))/gu, input_1);
    if (matches.length === 0) {
        throw new Error(`Unable to parse \`${input_1}\` to sets!`);
    }
    return toList(delay(() => collect((m) => {
        let matchValue;
        return singleton(DiceParsingTypes_PreSet_create_Z176EF219((matchValue = ((m.groups && m.groups.setCount) || "").trim(), (matchValue === "") ? 1 : parse(matchValue, 511, false, 32)), (m.groups && m.groups.diceRolls) || ""));
    }, matches)));
}

export function DiceParsingAux_parseDiceRolls(input) {
    const matches = matches_1(/(?<command>^|\+|-)\s*(?<diceRoll>[a-zA-Z0-9\s]+)/gu, input);
    if (matches.length === 0) {
        throw new Error(`Unable to parse \`${input}\` to dice rolls!`);
    }
    return toList(delay(() => collect((m) => singleton(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(Command_ofString_Z721C83C5(((m.groups && m.groups.command) || "").trim()), ((m.groups && m.groups.diceRoll) || "").trim())), matches)));
}

export function DiceParsingAux_parseDiceRoll(preDiceRoll) {
    const input = preDiceRoll.diceRoll;
    const command = preDiceRoll.command;
    const m = match(create(Pattern_DiceRollPatterns_DicePattern), input);
    if (m != null) {
        const diceCount = parse((m.groups && m.groups.DiceCount) || "", 511, false, 32) | 0;
        let diceSize;
        const matchValue_1 = (m.groups && m.groups.DiceSize) || "";
        diceSize = ((matchValue_1 === "") ? 0 : parse(matchValue_1, 511, false, 32));
        if (diceSize === 0) {
            return Dice_create_458B7DF0(diceCount, diceSize, command);
        }
        else {
            const diceRollParams = remove(input, 0, m[0].length).trim();
            return Dice_create_458B7DF0(diceCount, diceSize, command, Pattern_tryExplode(diceRollParams), Pattern_tryReroll(diceRollParams), Pattern_tryKeepDrop(diceRollParams));
        }
    }
    else {
        const clo = toFail(printf("Unable to find `DicePattern` (e.g. `3d6`, `14`) at beginning of role: %s"));
        return clo(input);
    }
}

export function parseStringToDice(input) {
    return map((set$) => {
        let arg;
        return Classes_DiceSet__DiceSet_roll(DiceSet_create_63F6707F(set$.setCount, (arg = map(DiceParsingAux_parseDiceRoll, DiceParsingAux_parseDiceRolls(set$.diceRolls)), Array.from(arg))));
    }, DiceParsingAux_parseSets(input));
}

