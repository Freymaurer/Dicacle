module Tests.Regex

#if FABLE_COMPILER
open Fable.Mocha
#else
open Expecto
#endif

let main =
    testList "samples" [
        testCase "universe exists (╭ರᴥ•́)" <| fun _ ->
            let subject = true
            Expect.isTrue subject "I compute, therefore I am."
    ]
