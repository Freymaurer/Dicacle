import { Expect_hasLength, Expect_throws, Test_testCase, Test_testList } from "./fable_modules/Fable.Mocha.2.16.0/Mocha.fs.js";
import { singleton, append, item, delay, toList } from "./fable_modules/fable-library.4.0.1/Seq.js";
import { equals as equals_1, int32ToString, structuralHash, assertEqual } from "./fable_modules/fable-library.4.0.1/Util.js";
import { item as item_1, ofArray, contains } from "./fable_modules/fable-library.4.0.1/List.js";
import { equals, class_type, decimal_type, string_type, float64_type, bool_type, int32_type } from "./fable_modules/fable-library.4.0.1/Reflection.js";
import { printf, toText } from "./fable_modules/fable-library.4.0.1/String.js";
import { DiceParsingTypes_PreDiceRoll_create_7C6CFFAF, DiceParsingAux_parseDiceRoll, DiceParsingAux_parseDiceRolls, DiceParsingAux_parseSets } from "./src/DiceParsing.js";
import { Reroll, Explode, KeepDrop, Dice$reflection, Dice_create_458B7DF0, Command, Command$reflection } from "./src/Classes.js";
import { toString } from "./fable_modules/fable-library.4.0.1/Types.js";

const tests_SetPattern = Test_testList("parseSets", toList(delay(() => {
    const testSet = (tupledArg, sets) => {
        let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5, copyOfStruct_1, clo_6, clo_1_1, clo_2_1, clo_3_1, clo_4_1, clo_5_1;
        const index = tupledArg[0] | 0;
        const set$ = item(index, sets);
        const actual = set$.setCount | 0;
        const expected = tupledArg[1] | 0;
        const msg = `set${index}.setCount`;
        if ((actual === expected) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual, expected, msg);
        }
        else {
            throw new Error(contains((copyOfStruct = actual, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg = int32ToString(expected), (arg_1 = int32ToString(actual), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected), (clo_5 = clo_4(actual), clo_5(msg))))));
        }
        const actual_1 = set$.diceRolls;
        const expected_1 = tupledArg[2];
        const msg_1 = `set${index}.diceRolls`;
        if ((actual_1 === expected_1) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual_1, expected_1, msg_1);
        }
        else {
            throw new Error(contains((copyOfStruct_1 = actual_1, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((clo_6 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_1 = clo_6(expected_1), (clo_2_1 = clo_1_1(actual_1), clo_2_1(msg_1))))) : ((clo_3_1 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_1 = clo_3_1(expected_1), (clo_5_1 = clo_4_1(actual_1), clo_5_1(msg_1))))));
        }
    };
    return append(singleton(Test_testCase("no set specified", () => {
        Expect_throws(() => {
            DiceParsingAux_parseSets("||");
        }, "");
    })), delay(() => append(singleton(Test_testCase("no set", () => {
        let copyOfStruct_2, arg_8, arg_1_2, clo_7, clo_1_2, clo_2_2, clo_3_2, clo_4_2, clo_5_2, copyOfStruct_3, clo_8, clo_1_3, clo_2_3, clo_3_3, clo_4_3, clo_5_3;
        const sets_2 = DiceParsingAux_parseSets("3d6 + 1d11 + 15d20");
        Expect_hasLength(sets_2, 1, "number of sets");
        const set0 = item_1(0, sets_2);
        const actual_2 = set0.setCount | 0;
        const expected_2 = 1;
        const msg_2 = "set0.setCount";
        if ((actual_2 === expected_2) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual_2, expected_2, msg_2);
        }
        else {
            throw new Error(contains((copyOfStruct_2 = actual_2, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_8 = int32ToString(expected_2), (arg_1_2 = int32ToString(actual_2), (clo_7 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_2 = clo_7(arg_8), (clo_2_2 = clo_1_2(arg_1_2), clo_2_2(msg_2))))))) : ((clo_3_2 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_2 = clo_3_2(expected_2), (clo_5_2 = clo_4_2(actual_2), clo_5_2(msg_2))))));
        }
        const actual_3 = set0.diceRolls;
        const expected_3 = "3d6+1d11+15d20";
        const msg_3 = "set0.diceRolls";
        if ((actual_3 === expected_3) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual_3, expected_3, msg_3);
        }
        else {
            throw new Error(contains((copyOfStruct_3 = actual_3, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((clo_8 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_3 = clo_8(expected_3), (clo_2_3 = clo_1_3(actual_3), clo_2_3(msg_3))))) : ((clo_3_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_3 = clo_3_3(expected_3), (clo_5_3 = clo_4_3(actual_3), clo_5_3(msg_3))))));
        }
    })), delay(() => append(singleton(Test_testCase("single set", () => {
        let copyOfStruct_4, arg_10, arg_1_4, clo_9, clo_1_4, clo_2_4, clo_3_4, clo_4_4, clo_5_4, copyOfStruct_5, clo_10, clo_1_5, clo_2_5, clo_3_5, clo_4_5, clo_5_5;
        const sets_3 = DiceParsingAux_parseSets("(3d6 + 1d11 + 15d20)");
        Expect_hasLength(sets_3, 1, "number of sets");
        const set0_1 = item_1(0, sets_3);
        const actual_4 = set0_1.setCount | 0;
        const expected_4 = 1;
        const msg_4 = "set0.setCount";
        if ((actual_4 === expected_4) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual_4, expected_4, msg_4);
        }
        else {
            throw new Error(contains((copyOfStruct_4 = actual_4, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_10 = int32ToString(expected_4), (arg_1_4 = int32ToString(actual_4), (clo_9 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_4 = clo_9(arg_10), (clo_2_4 = clo_1_4(arg_1_4), clo_2_4(msg_4))))))) : ((clo_3_4 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_4 = clo_3_4(expected_4), (clo_5_4 = clo_4_4(actual_4), clo_5_4(msg_4))))));
        }
        const actual_5 = set0_1.diceRolls;
        const expected_5 = "3d6+1d11+15d20";
        const msg_5 = "set0.diceRolls";
        if ((actual_5 === expected_5) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual_5, expected_5, msg_5);
        }
        else {
            throw new Error(contains((copyOfStruct_5 = actual_5, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((clo_10 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_5 = clo_10(expected_5), (clo_2_5 = clo_1_5(actual_5), clo_2_5(msg_5))))) : ((clo_3_5 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_5 = clo_3_5(expected_5), (clo_5_5 = clo_4_5(actual_5), clo_5_5(msg_5))))));
        }
    })), delay(() => append(singleton(Test_testCase("multiple sets", () => {
        const sets_4 = DiceParsingAux_parseSets("(1d20 + 14) (1d20 + 14) (1d20 + 9)");
        Expect_hasLength(sets_4, 3, "number of sets");
        testSet([0, 1, "1d20+14"], sets_4);
        testSet([1, 1, "1d20+14"], sets_4);
        testSet([2, 1, "1d20+9"], sets_4);
    })), delay(() => append(singleton(Test_testCase("multiple sets, with setCount", () => {
        const sets_5 = DiceParsingAux_parseSets("2 (1d20 + 14) (1d20 + 9)");
        Expect_hasLength(sets_5, 2, "number of sets");
        testSet([0, 2, "1d20+14"], sets_5);
        testSet([1, 1, "1d20+9"], sets_5);
    })), delay(() => append(singleton(Test_testCase("multiple sets, with multiple setCounts", () => {
        const sets_6 = DiceParsingAux_parseSets("3 (1d20 + 14) 10 (4d6 kl2 + 15)");
        Expect_hasLength(sets_6, 2, "number of sets");
        testSet([0, 3, "1d20+14"], sets_6);
        testSet([1, 10, "4d6kl2+15"], sets_6);
    })), delay(() => append(singleton(Test_testCase("no set specified, complex", () => {
        const sets_7 = DiceParsingAux_parseSets("18+10 + 5d8 + 3d6 ir2");
        Expect_hasLength(sets_7, 1, "number of sets");
        testSet([0, 1, "18+10+5d8+3d6ir2"], sets_7);
    })), delay(() => append(singleton(Test_testCase("multiple sets, with multiple setCounts, no whitespace", () => {
        const sets_8 = DiceParsingAux_parseSets("3(1d20+14)10(4d6kl2+15)");
        Expect_hasLength(sets_8, 2, "number of sets");
        testSet([0, 3, "1d20+14"], sets_8);
        testSet([1, 10, "4d6kl2+15"], sets_8);
    })), delay(() => singleton(Test_testCase("multiple sets, with multiple setCounts, lots of whitespace", () => {
        const sets_9 = DiceParsingAux_parseSets("(1d20   +   14   )     (   1d20   +    9     )");
        Expect_hasLength(sets_9, 2, "number of sets");
        testSet([0, 1, "1d20+14"], sets_9);
        testSet([1, 1, "1d20+9"], sets_9);
    }))))))))))))))))));
})));

export const tests_DiceRollsPattern = Test_testList("DiceRollsPattern", toList(delay(() => {
    const testDiceRoll = (tupledArg, sets) => {
        let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5, copyOfStruct_1, clo_6, clo_1_1, clo_2_1, clo_3_1, clo_4_1, clo_5_1;
        const index = tupledArg[0] | 0;
        const set$ = item(index, sets);
        const actual = set$.command;
        const expected = tupledArg[1];
        const msg = `set${index}.command`;
        if (equals_1(actual, expected) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual, expected, msg);
        }
        else {
            throw new Error(contains((copyOfStruct = actual, Command$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg = toString(expected), (arg_1 = toString(actual), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected), (clo_5 = clo_4(actual), clo_5(msg))))));
        }
        const actual_1 = set$.diceRoll;
        const expected_1 = tupledArg[2];
        const msg_1 = `set${index}.diceRoll`;
        if ((actual_1 === expected_1) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual_1, expected_1, msg_1);
        }
        else {
            throw new Error(contains((copyOfStruct_1 = actual_1, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((clo_6 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_1 = clo_6(expected_1), (clo_2_1 = clo_1_1(actual_1), clo_2_1(msg_1))))) : ((clo_3_1 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_1 = clo_3_1(expected_1), (clo_5_1 = clo_4_1(actual_1), clo_5_1(msg_1))))));
        }
    };
    return append(singleton(Test_testCase("base case", () => {
        const rolls = DiceParsingAux_parseDiceRolls("1d20");
        Expect_hasLength(rolls, 1, "number of rolls");
        testDiceRoll([0, new Command(0, []), "1d20"], rolls);
    })), delay(() => append(singleton(Test_testCase("no dice size", () => {
        const rolls_1 = DiceParsingAux_parseDiceRolls("12");
        Expect_hasLength(rolls_1, 1, "number of rolls");
        testDiceRoll([0, new Command(0, []), "12"], rolls_1);
    })), delay(() => append(singleton(Test_testCase("multiple rolls", () => {
        const rolls_2 = DiceParsingAux_parseDiceRolls("1d20+14");
        Expect_hasLength(rolls_2, 2, "number of rolls");
        testDiceRoll([0, new Command(0, []), "1d20"], rolls_2);
        testDiceRoll([1, new Command(0, []), "14"], rolls_2);
    })), delay(() => append(singleton(Test_testCase("multiple rolls2", () => {
        const rolls_3 = DiceParsingAux_parseDiceRolls("3d6+1d11+15d20");
        Expect_hasLength(rolls_3, 3, "number of rolls");
        testDiceRoll([0, new Command(0, []), "3d6"], rolls_3);
        testDiceRoll([1, new Command(0, []), "1d11"], rolls_3);
        testDiceRoll([2, new Command(0, []), "15d20"], rolls_3);
    })), delay(() => append(singleton(Test_testCase("keep", () => {
        const rolls_4 = DiceParsingAux_parseDiceRolls("3d6k1");
        Expect_hasLength(rolls_4, 1, "number of rolls");
        testDiceRoll([0, new Command(0, []), "3d6k1"], rolls_4);
    })), delay(() => append(singleton(Test_testCase("keep lowest", () => {
        const rolls_5 = DiceParsingAux_parseDiceRolls("3d6kl2");
        Expect_hasLength(rolls_5, 1, "number of rolls");
        testDiceRoll([0, new Command(0, []), "3d6kl2"], rolls_5);
    })), delay(() => append(singleton(Test_testCase("exploding", () => {
        const rolls_6 = DiceParsingAux_parseDiceRolls("3d6e6");
        Expect_hasLength(rolls_6, 1, "number of rolls");
        testDiceRoll([0, new Command(0, []), "3d6e6"], rolls_6);
    })), delay(() => append(singleton(Test_testCase("exploding inf", () => {
        const rolls_7 = DiceParsingAux_parseDiceRolls("3d6ie6");
        Expect_hasLength(rolls_7, 1, "number of rolls");
        testDiceRoll([0, new Command(0, []), "3d6ie6"], rolls_7);
    })), delay(() => append(singleton(Test_testCase("reroll <2", () => {
        const rolls_8 = DiceParsingAux_parseDiceRolls("3d6r2");
        Expect_hasLength(rolls_8, 1, "number of rolls");
        testDiceRoll([0, new Command(0, []), "3d6r2"], rolls_8);
    })), delay(() => append(singleton(Test_testCase("reroll <2 in", () => {
        const rolls_9 = DiceParsingAux_parseDiceRolls("3d6ir2");
        Expect_hasLength(rolls_9, 1, "number of rolls");
        testDiceRoll([0, new Command(0, []), "3d6ir2"], rolls_9);
    })), delay(() => append(singleton(Test_testCase("no whitespace, multiple", () => {
        const rolls_10 = DiceParsingAux_parseDiceRolls("4d6kl2+15");
        Expect_hasLength(rolls_10, 2, "number of rolls");
        testDiceRoll([0, new Command(0, []), "4d6kl2"], rolls_10);
        testDiceRoll([1, new Command(0, []), "15"], rolls_10);
    })), delay(() => append(singleton(Test_testCase("complex", () => {
        const rolls_11 = DiceParsingAux_parseDiceRolls("3d6k1ie6r2 ");
        Expect_hasLength(rolls_11, 1, "number of rolls");
        testDiceRoll([0, new Command(0, []), "3d6k1ie6r2"], rolls_11);
    })), delay(() => append(singleton(Test_testCase("complex, not allowed, should not throw yet", () => {
        const rolls_12 = DiceParsingAux_parseDiceRolls("3d6k2kl2");
        Expect_hasLength(rolls_12, 1, "number of rolls");
        testDiceRoll([0, new Command(0, []), "3d6k2kl2"], rolls_12);
    })), delay(() => append(singleton(Test_testCase("multiple substract", () => {
        const rolls_13 = DiceParsingAux_parseDiceRolls("1d20-14");
        Expect_hasLength(rolls_13, 2, "number of rolls");
        testDiceRoll([0, new Command(0, []), "1d20"], rolls_13);
        testDiceRoll([1, new Command(1, []), "14"], rolls_13);
    })), delay(() => append(singleton(Test_testCase("single substract", () => {
        const rolls_14 = DiceParsingAux_parseDiceRolls("-14");
        Expect_hasLength(rolls_14, 1, "number of rolls");
        testDiceRoll([0, new Command(1, []), "14"], rolls_14);
    })), delay(() => singleton(Test_testCase("lots of whitespace, multiple substract", () => {
        const rolls_15 = DiceParsingAux_parseDiceRolls("-3d6k2kl2-5d8+20");
        Expect_hasLength(rolls_15, 3, "number of rolls");
        testDiceRoll([0, new Command(1, []), "3d6k2kl2"], rolls_15);
        testDiceRoll([1, new Command(1, []), "5d8"], rolls_15);
        testDiceRoll([2, new Command(0, []), "20"], rolls_15);
    }))))))))))))))))))))))))))))))));
})));

export const tests_DiceRollPattern = Test_testList("DiceRollPattern", ofArray([Test_testCase("base case", () => {
    let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
    const actual_1 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "1d20"));
    const expected_1 = Dice_create_458B7DF0(1, 20);
    const msg = "";
    if (equals_1(actual_1, expected_1) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_1, expected_1, msg);
    }
    else {
        throw new Error(contains((copyOfStruct = actual_1, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg = toString(expected_1), (arg_1 = toString(actual_1), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected_1), (clo_5 = clo_4(actual_1), clo_5(msg))))));
    }
}), Test_testCase("base case, german", () => {
    let copyOfStruct_1, arg_6, arg_1_1, clo_6, clo_1_1, clo_2_1, clo_3_1, clo_4_1, clo_5_1;
    const actual_3 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3w20"));
    const expected_3 = Dice_create_458B7DF0(3, 20);
    const msg_1 = "";
    if (equals_1(actual_3, expected_3) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_3, expected_3, msg_1);
    }
    else {
        throw new Error(contains((copyOfStruct_1 = actual_3, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_6 = toString(expected_3), (arg_1_1 = toString(actual_3), (clo_6 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_1 = clo_6(arg_6), (clo_2_1 = clo_1_1(arg_1_1), clo_2_1(msg_1))))))) : ((clo_3_1 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_1 = clo_3_1(expected_3), (clo_5_1 = clo_4_1(actual_3), clo_5_1(msg_1))))));
    }
}), Test_testCase("flat", () => {
    let copyOfStruct_2, arg_7, arg_1_2, clo_7, clo_1_2, clo_2_2, clo_3_2, clo_4_2, clo_5_2;
    const actual_5 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "12"));
    const expected_5 = Dice_create_458B7DF0(12, 0);
    const msg_2 = "";
    if (equals_1(actual_5, expected_5) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_5, expected_5, msg_2);
    }
    else {
        throw new Error(contains((copyOfStruct_2 = actual_5, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_7 = toString(expected_5), (arg_1_2 = toString(actual_5), (clo_7 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_2 = clo_7(arg_7), (clo_2_2 = clo_1_2(arg_1_2), clo_2_2(msg_2))))))) : ((clo_3_2 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_2 = clo_3_2(expected_5), (clo_5_2 = clo_4_2(actual_5), clo_5_2(msg_2))))));
    }
}), Test_testCase("absurd die", () => {
    let copyOfStruct_3, arg_8, arg_1_3, clo_8, clo_1_3, clo_2_3, clo_3_3, clo_4_3, clo_5_3;
    const actual_7 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "1d110"));
    const expected_7 = Dice_create_458B7DF0(1, 110);
    const msg_3 = "";
    if (equals_1(actual_7, expected_7) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_7, expected_7, msg_3);
    }
    else {
        throw new Error(contains((copyOfStruct_3 = actual_7, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_8 = toString(expected_7), (arg_1_3 = toString(actual_7), (clo_8 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_3 = clo_8(arg_8), (clo_2_3 = clo_1_3(arg_1_3), clo_2_3(msg_3))))))) : ((clo_3_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_3 = clo_3_3(expected_7), (clo_5_3 = clo_4_3(actual_7), clo_5_3(msg_3))))));
    }
}), Test_testCase("keep: k", () => {
    let copyOfStruct_4, arg_9, arg_1_4, clo_9, clo_1_4, clo_2_4, clo_3_4, clo_4_4, clo_5_4;
    const actual_9 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6k1"));
    const expected_9 = Dice_create_458B7DF0(3, 6, void 0, void 0, void 0, new KeepDrop(0, [1]));
    const msg_4 = "";
    if (equals_1(actual_9, expected_9) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_9, expected_9, msg_4);
    }
    else {
        throw new Error(contains((copyOfStruct_4 = actual_9, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_9 = toString(expected_9), (arg_1_4 = toString(actual_9), (clo_9 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_4 = clo_9(arg_9), (clo_2_4 = clo_1_4(arg_1_4), clo_2_4(msg_4))))))) : ((clo_3_4 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_4 = clo_3_4(expected_9), (clo_5_4 = clo_4_4(actual_9), clo_5_4(msg_4))))));
    }
}), Test_testCase("keep: kh", () => {
    let copyOfStruct_5, arg_10, arg_1_5, clo_10, clo_1_5, clo_2_5, clo_3_5, clo_4_5, clo_5_5;
    const actual_11 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6kh1"));
    const expected_11 = Dice_create_458B7DF0(3, 6, void 0, void 0, void 0, new KeepDrop(0, [1]));
    const msg_5 = "";
    if (equals_1(actual_11, expected_11) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_11, expected_11, msg_5);
    }
    else {
        throw new Error(contains((copyOfStruct_5 = actual_11, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_10 = toString(expected_11), (arg_1_5 = toString(actual_11), (clo_10 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_5 = clo_10(arg_10), (clo_2_5 = clo_1_5(arg_1_5), clo_2_5(msg_5))))))) : ((clo_3_5 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_5 = clo_3_5(expected_11), (clo_5_5 = clo_4_5(actual_11), clo_5_5(msg_5))))));
    }
}), Test_testCase("keep: kl", () => {
    let copyOfStruct_6, arg_11, arg_1_6, clo_11, clo_1_6, clo_2_6, clo_3_6, clo_4_6, clo_5_6;
    const actual_13 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6kl2"));
    const expected_13 = Dice_create_458B7DF0(3, 6, void 0, void 0, void 0, new KeepDrop(1, [2]));
    const msg_6 = "";
    if (equals_1(actual_13, expected_13) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_13, expected_13, msg_6);
    }
    else {
        throw new Error(contains((copyOfStruct_6 = actual_13, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_11 = toString(expected_13), (arg_1_6 = toString(actual_13), (clo_11 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_6 = clo_11(arg_11), (clo_2_6 = clo_1_6(arg_1_6), clo_2_6(msg_6))))))) : ((clo_3_6 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_6 = clo_3_6(expected_13), (clo_5_6 = clo_4_6(actual_13), clo_5_6(msg_6))))));
    }
}), Test_testCase("drop: d", () => {
    let copyOfStruct_7, arg_12, arg_1_7, clo_12, clo_1_7, clo_2_7, clo_3_7, clo_4_7, clo_5_7;
    const actual_15 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6d1"));
    const expected_15 = Dice_create_458B7DF0(3, 6, void 0, void 0, void 0, new KeepDrop(3, [1]));
    const msg_7 = "";
    if (equals_1(actual_15, expected_15) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_15, expected_15, msg_7);
    }
    else {
        throw new Error(contains((copyOfStruct_7 = actual_15, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_12 = toString(expected_15), (arg_1_7 = toString(actual_15), (clo_12 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_7 = clo_12(arg_12), (clo_2_7 = clo_1_7(arg_1_7), clo_2_7(msg_7))))))) : ((clo_3_7 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_7 = clo_3_7(expected_15), (clo_5_7 = clo_4_7(actual_15), clo_5_7(msg_7))))));
    }
}), Test_testCase("drop: dl", () => {
    let copyOfStruct_8, arg_13, arg_1_8, clo_13, clo_1_8, clo_2_8, clo_3_8, clo_4_8, clo_5_8;
    const actual_17 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6dl1"));
    const expected_17 = Dice_create_458B7DF0(3, 6, void 0, void 0, void 0, new KeepDrop(3, [1]));
    const msg_8 = "";
    if (equals_1(actual_17, expected_17) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_17, expected_17, msg_8);
    }
    else {
        throw new Error(contains((copyOfStruct_8 = actual_17, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_13 = toString(expected_17), (arg_1_8 = toString(actual_17), (clo_13 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_8 = clo_13(arg_13), (clo_2_8 = clo_1_8(arg_1_8), clo_2_8(msg_8))))))) : ((clo_3_8 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_8 = clo_3_8(expected_17), (clo_5_8 = clo_4_8(actual_17), clo_5_8(msg_8))))));
    }
}), Test_testCase("drop: dh", () => {
    let copyOfStruct_9, arg_14, arg_1_9, clo_14, clo_1_9, clo_2_9, clo_3_9, clo_4_9, clo_5_9;
    const actual_19 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6dh1"));
    const expected_19 = Dice_create_458B7DF0(3, 6, void 0, void 0, void 0, new KeepDrop(2, [1]));
    const msg_9 = "";
    if (equals_1(actual_19, expected_19) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_19, expected_19, msg_9);
    }
    else {
        throw new Error(contains((copyOfStruct_9 = actual_19, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_14 = toString(expected_19), (arg_1_9 = toString(actual_19), (clo_14 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_9 = clo_14(arg_14), (clo_2_9 = clo_1_9(arg_1_9), clo_2_9(msg_9))))))) : ((clo_3_9 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_9 = clo_3_9(expected_19), (clo_5_9 = clo_4_9(actual_19), clo_5_9(msg_9))))));
    }
}), Test_testCase("explode once", () => {
    let copyOfStruct_10, arg_15, arg_1_10, clo_15, clo_1_10, clo_2_10, clo_3_10, clo_4_10, clo_5_10;
    const actual_21 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6e6"));
    const expected_21 = Dice_create_458B7DF0(3, 6, void 0, new Explode(0, [6]));
    const msg_10 = "";
    if (equals_1(actual_21, expected_21) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_21, expected_21, msg_10);
    }
    else {
        throw new Error(contains((copyOfStruct_10 = actual_21, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_15 = toString(expected_21), (arg_1_10 = toString(actual_21), (clo_15 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_10 = clo_15(arg_15), (clo_2_10 = clo_1_10(arg_1_10), clo_2_10(msg_10))))))) : ((clo_3_10 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_10 = clo_3_10(expected_21), (clo_5_10 = clo_4_10(actual_21), clo_5_10(msg_10))))));
    }
}), Test_testCase("explode inf", () => {
    let copyOfStruct_11, arg_16, arg_1_11, clo_16, clo_1_11, clo_2_11, clo_3_11, clo_4_11, clo_5_11;
    const actual_23 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6ie6"));
    const expected_23 = Dice_create_458B7DF0(3, 6, void 0, new Explode(1, [6]));
    const msg_11 = "";
    if (equals_1(actual_23, expected_23) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_23, expected_23, msg_11);
    }
    else {
        throw new Error(contains((copyOfStruct_11 = actual_23, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_16 = toString(expected_23), (arg_1_11 = toString(actual_23), (clo_16 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_11 = clo_16(arg_16), (clo_2_11 = clo_1_11(arg_1_11), clo_2_11(msg_11))))))) : ((clo_3_11 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_11 = clo_3_11(expected_23), (clo_5_11 = clo_4_11(actual_23), clo_5_11(msg_11))))));
    }
}), Test_testCase("reroll once", () => {
    let copyOfStruct_12, arg_17, arg_1_12, clo_17, clo_1_12, clo_2_12, clo_3_12, clo_4_12, clo_5_12;
    const actual_25 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6r2"));
    const expected_25 = Dice_create_458B7DF0(3, 6, void 0, void 0, new Reroll(0, [2]));
    const msg_12 = "";
    if (equals_1(actual_25, expected_25) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_25, expected_25, msg_12);
    }
    else {
        throw new Error(contains((copyOfStruct_12 = actual_25, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_17 = toString(expected_25), (arg_1_12 = toString(actual_25), (clo_17 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_12 = clo_17(arg_17), (clo_2_12 = clo_1_12(arg_1_12), clo_2_12(msg_12))))))) : ((clo_3_12 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_12 = clo_3_12(expected_25), (clo_5_12 = clo_4_12(actual_25), clo_5_12(msg_12))))));
    }
}), Test_testCase("reroll inf", () => {
    let copyOfStruct_13, arg_18, arg_1_13, clo_18, clo_1_13, clo_2_13, clo_3_13, clo_4_13, clo_5_13;
    const actual_27 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6ir2"));
    const expected_27 = Dice_create_458B7DF0(3, 6, void 0, void 0, new Reroll(1, [2]));
    const msg_13 = "";
    if (equals_1(actual_27, expected_27) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_27, expected_27, msg_13);
    }
    else {
        throw new Error(contains((copyOfStruct_13 = actual_27, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_18 = toString(expected_27), (arg_1_13 = toString(actual_27), (clo_18 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_13 = clo_18(arg_18), (clo_2_13 = clo_1_13(arg_1_13), clo_2_13(msg_13))))))) : ((clo_3_13 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_13 = clo_3_13(expected_27), (clo_5_13 = clo_4_13(actual_27), clo_5_13(msg_13))))));
    }
}), Test_testCase("no whitespace", () => {
    let copyOfStruct_14, arg_19, arg_1_14, clo_19, clo_1_14, clo_2_14, clo_3_14, clo_4_14, clo_5_14;
    const actual_29 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "4d6kl2"));
    const expected_29 = Dice_create_458B7DF0(4, 6, void 0, void 0, void 0, new KeepDrop(1, [2]));
    const msg_14 = "";
    if (equals_1(actual_29, expected_29) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_29, expected_29, msg_14);
    }
    else {
        throw new Error(contains((copyOfStruct_14 = actual_29, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_19 = toString(expected_29), (arg_1_14 = toString(actual_29), (clo_19 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_14 = clo_19(arg_19), (clo_2_14 = clo_1_14(arg_1_14), clo_2_14(msg_14))))))) : ((clo_3_14 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_14 = clo_3_14(expected_29), (clo_5_14 = clo_4_14(actual_29), clo_5_14(msg_14))))));
    }
}), Test_testCase("complex", () => {
    let copyOfStruct_15, arg_20, arg_1_15, clo_20, clo_1_15, clo_2_15, clo_3_15, clo_4_15, clo_5_15;
    const actual_31 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6k1ie6r2"));
    const expected_31 = Dice_create_458B7DF0(3, 6, void 0, new Explode(1, [6]), new Reroll(0, [2]), new KeepDrop(0, [1]));
    const msg_15 = "";
    if (equals_1(actual_31, expected_31) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_31, expected_31, msg_15);
    }
    else {
        throw new Error(contains((copyOfStruct_15 = actual_31, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_20 = toString(expected_31), (arg_1_15 = toString(actual_31), (clo_20 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_15 = clo_20(arg_20), (clo_2_15 = clo_1_15(arg_1_15), clo_2_15(msg_15))))))) : ((clo_3_15 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_15 = clo_3_15(expected_31), (clo_5_15 = clo_4_15(actual_31), clo_5_15(msg_15))))));
    }
}), Test_testCase("flat with params", () => {
    let copyOfStruct_16, arg_21, arg_1_16, clo_21, clo_1_16, clo_2_16, clo_3_16, clo_4_16, clo_5_16;
    const actual_33 = DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "12k2"));
    const expected_33 = Dice_create_458B7DF0(12, 0);
    const msg_16 = "";
    if (equals_1(actual_33, expected_33) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_33, expected_33, msg_16);
    }
    else {
        throw new Error(contains((copyOfStruct_16 = actual_33, Dice$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_21 = toString(expected_33), (arg_1_16 = toString(actual_33), (clo_21 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_16 = clo_21(arg_21), (clo_2_16 = clo_1_16(arg_1_16), clo_2_16(msg_16))))))) : ((clo_3_16 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_16 = clo_3_16(expected_33), (clo_5_16 = clo_4_16(actual_33), clo_5_16(msg_16))))));
    }
}), Test_testCase("duplicate keep, throws", () => {
    Expect_throws(() => {
        DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6k2kl2"));
    }, "");
}), Test_testCase("duplicate explode, throws", () => {
    Expect_throws(() => {
        DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6k2e6ie6"));
    }, "");
}), Test_testCase("duplicate keep/drop, throws", () => {
    Expect_throws(() => {
        DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6k2e6d2"));
    }, "");
}), Test_testCase("duplicate reroll, throws", () => {
    Expect_throws(() => {
        DiceParsingAux_parseDiceRoll(DiceParsingTypes_PreDiceRoll_create_7C6CFFAF(new Command(0, []), "3d6k2e6r1ir2"));
    }, "");
})]));

export const main = Test_testList("Regex", ofArray([tests_SetPattern, tests_DiceRollsPattern, tests_DiceRollPattern]));

