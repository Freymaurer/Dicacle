import { Expect_isTrue, Expect_hasLength, Test_testCase, Test_testList } from "./fable_modules/Fable.Mocha.2.16.0/Mocha.fs.js";
import { RollAux_keepDrop, RollAux_explode, rollMultipleBy } from "./src/Dice/Dice.Roll.js";
import { nonSeeded } from "./fable_modules/fable-library.4.0.1/Random.js";
import { toArray, toList, map, average, max as max_1, min as min_1 } from "./fable_modules/fable-library.4.0.1/Seq.js";
import { int32ToString, structuralHash, assertEqual, comparePrimitives } from "./fable_modules/fable-library.4.0.1/Util.js";
import { ofArray, contains, singleton } from "./fable_modules/fable-library.4.0.1/List.js";
import { rangeDouble } from "./fable_modules/fable-library.4.0.1/Range.js";
import { KeepDrop, Explode } from "./src/Classes.js";
import { array_type, equals, class_type, decimal_type, string_type, float64_type, bool_type, int32_type } from "./fable_modules/fable-library.4.0.1/Reflection.js";
import { printf, toText } from "./fable_modules/fable-library.4.0.1/String.js";
import { equalsWith } from "./fable_modules/fable-library.4.0.1/Array.js";
import { seqToString } from "./fable_modules/fable-library.4.0.1/Types.js";

export const tests_roll = Test_testList("roll", singleton(Test_testCase("check random", () => {
    const rolls = rollMultipleBy(1000, 6, nonSeeded());
    const min = min_1(rolls, {
        Compare: comparePrimitives,
    }) | 0;
    const max = max_1(rolls, {
        Compare: comparePrimitives,
    }) | 0;
    const avg = average(map((value) => value, rolls), {
        GetZero: () => 0,
        Add: (x_3, y_2) => (x_3 + y_2),
        DivideByInt: (x_2, i) => (x_2 / i),
    });
    Expect_hasLength(rolls, 1000, "check length");
    Expect_isTrue(min === 1)("check min");
    Expect_isTrue(max === 6)("check max");
    Expect_isTrue(avg < 4)(`check avg ceil: ${avg} < ${4}`);
    Expect_isTrue(avg > 3)(`check avg floor: ${avg} > ${3}`);
})));

export const tests_explode = Test_testList("explode", singleton(Test_testCase("explode once", () => {
    let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
    const treshold = 6;
    const rnd = nonSeeded();
    const rolls = Array.from(toList(rangeDouble(1, 1, 10)));
    RollAux_explode(new Explode(0, [treshold]), 10, rolls, rnd);
    for (let i = 0; i <= (rolls.length - 1); i++) {
        const before = (i + 1) | 0;
        const current = rolls[i] | 0;
        if (before >= treshold) {
            Expect_isTrue(current > before)(`current (${current}) > before (${before})`);
        }
        else {
            const actual = current | 0;
            const expected = before | 0;
            const msg = `equal at ${i}`;
            if ((actual === expected) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
                assertEqual(actual, expected, msg);
            }
            else {
                throw new Error(contains((copyOfStruct = actual, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                    Equals: equals,
                    GetHashCode: structuralHash,
                }) ? ((arg = int32ToString(expected), (arg_1 = int32ToString(actual), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected), (clo_5 = clo_4(actual), clo_5(msg))))));
            }
        }
    }
})));

export const tests_keepDrop = Test_testList("keepDrop", ofArray([Test_testCase("DropHighest", () => {
    let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
    const rolls = Array.from(toList(rangeDouble(1, 1, 10)));
    RollAux_keepDrop(new KeepDrop(2, [2]), rolls);
    const actual = Int32Array.from(rolls);
    const expected_1 = toArray(rangeDouble(1, 1, 8));
    const msg = "";
    if (equalsWith((x, y) => (x === y), actual, expected_1) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual, expected_1, msg);
    }
    else {
        throw new Error(contains((copyOfStruct = actual, array_type(int32_type)), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg = seqToString(expected_1), (arg_1 = seqToString(actual), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected_1), (clo_5 = clo_4(actual), clo_5(msg))))));
    }
}), Test_testCase("DropLowest", () => {
    let copyOfStruct_1, arg_6, arg_1_1, clo_6, clo_1_1, clo_2_1, clo_3_1, clo_4_1, clo_5_1;
    const rolls_1 = Array.from(toList(rangeDouble(1, 1, 10)));
    RollAux_keepDrop(new KeepDrop(3, [2]), rolls_1);
    const actual_1 = Int32Array.from(rolls_1);
    const expected_3 = toArray(rangeDouble(3, 1, 10));
    const msg_1 = "";
    if (equalsWith((x_2, y_2) => (x_2 === y_2), actual_1, expected_3) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_1, expected_3, msg_1);
    }
    else {
        throw new Error(contains((copyOfStruct_1 = actual_1, array_type(int32_type)), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_6 = seqToString(expected_3), (arg_1_1 = seqToString(actual_1), (clo_6 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_1 = clo_6(arg_6), (clo_2_1 = clo_1_1(arg_1_1), clo_2_1(msg_1))))))) : ((clo_3_1 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_1 = clo_3_1(expected_3), (clo_5_1 = clo_4_1(actual_1), clo_5_1(msg_1))))));
    }
}), Test_testCase("KeepHighest", () => {
    let copyOfStruct_2, arg_7, arg_1_2, clo_7, clo_1_2, clo_2_2, clo_3_2, clo_4_2, clo_5_2;
    const rolls_2 = Array.from(toList(rangeDouble(1, 1, 10)));
    RollAux_keepDrop(new KeepDrop(0, [2]), rolls_2);
    const actual_2 = Int32Array.from(rolls_2);
    const expected_5 = new Int32Array([9, 10]);
    const msg_2 = "";
    if (equalsWith((x_4, y_4) => (x_4 === y_4), actual_2, expected_5) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_2, expected_5, msg_2);
    }
    else {
        throw new Error(contains((copyOfStruct_2 = actual_2, array_type(int32_type)), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_7 = seqToString(expected_5), (arg_1_2 = seqToString(actual_2), (clo_7 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_2 = clo_7(arg_7), (clo_2_2 = clo_1_2(arg_1_2), clo_2_2(msg_2))))))) : ((clo_3_2 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_2 = clo_3_2(expected_5), (clo_5_2 = clo_4_2(actual_2), clo_5_2(msg_2))))));
    }
}), Test_testCase("KeepLowest", () => {
    let copyOfStruct_3, arg_8, arg_1_3, clo_8, clo_1_3, clo_2_3, clo_3_3, clo_4_3, clo_5_3;
    const rolls_3 = Array.from(toList(rangeDouble(1, 1, 10)));
    RollAux_keepDrop(new KeepDrop(1, [2]), rolls_3);
    const actual_3 = Int32Array.from(rolls_3);
    const expected_7 = new Int32Array([1, 2]);
    const msg_3 = "";
    if (equalsWith((x_6, y_6) => (x_6 === y_6), actual_3, expected_7) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_3, expected_7, msg_3);
    }
    else {
        throw new Error(contains((copyOfStruct_3 = actual_3, array_type(int32_type)), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_8 = seqToString(expected_7), (arg_1_3 = seqToString(actual_3), (clo_8 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_3 = clo_8(arg_8), (clo_2_3 = clo_1_3(arg_1_3), clo_2_3(msg_3))))))) : ((clo_3_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_3 = clo_3_3(expected_7), (clo_5_3 = clo_4_3(actual_3), clo_5_3(msg_3))))));
    }
})]));

export const main = Test_testList("DiceRoll", ofArray([tests_roll, tests_explode, tests_keepDrop]));

