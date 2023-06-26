module Tests.Dicacle

#if FABLE_COMPILER
open Fable.Mocha
#else
open Expecto

[<Tests>]
#endif
let tests = 
    testList "main" [
        Tests.Regex.main
    ]

[<EntryPoint>]
let main argv =
    #if FABLE_COMPILER
    Mocha.runTests tests
    #else
    Tests.runTestsWithCLIArgs [] argv tests
    #endif
