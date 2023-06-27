import { Mocha_runTests, Test_testList } from "./fable_modules/Fable.Mocha.2.16.0/Mocha.fs.js";
import { main as main_1 } from "./DiceRoll.Tests.js";
import { main as main_2 } from "./Regex.Tests.js";
import { ofArray } from "./fable_modules/fable-library.4.0.1/List.js";

export const tests = Test_testList("main", ofArray([main_1, main_2]));

(function (argv) {
    return Mocha_runTests(tests);
})(typeof process === 'object' ? process.argv.slice(2) : []);

