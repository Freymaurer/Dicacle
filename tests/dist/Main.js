import { Mocha_runTests, Test_testList } from "./fable_modules/Fable.Mocha.2.16.0/Mocha.fs.js";
import { main as main_1 } from "./Sample.js";
import { singleton } from "./fable_modules/fable-library.4.0.1/List.js";

export const tests = Test_testList("main", singleton(main_1));

(function (argv) {
    return Mocha_runTests(tests);
})(typeof process === 'object' ? process.argv.slice(2) : []);

