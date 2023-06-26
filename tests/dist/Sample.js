import { Expect_isTrue, Test_testCase, Test_testList } from "./fable_modules/Fable.Mocha.2.16.0/Mocha.fs.js";
import { singleton } from "./fable_modules/fable-library.4.0.1/List.js";

export const main = Test_testList("samples", singleton(Test_testCase("universe exists (╭ರᴥ•́)", () => {
    Expect_isTrue(true)("I compute, therefore I am.");
})));

