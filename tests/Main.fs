module Tests.Dicacle

#if FABLE_COMPILER
open Fable.Mocha
#else
open Expecto

[<Tests>]
#endif
let tests = 
    testList "main" [
        Tests.Dice.Parsing.main
        Tests.Dice.Roll.main
    ]

[<EntryPoint>]
let main argv =
    #if FABLE_COMPILER
    Mocha.runTests tests
    #else
    Tests.runTestsWithCLIArgs [] argv tests
    #endif
