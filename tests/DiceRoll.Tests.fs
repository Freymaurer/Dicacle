module Tests.DiceRoll

#if FABLE_COMPILER
open Fable.Mocha
#else
open Expecto
#endif

open Classes

let tests_roll = testList "roll" [
    testCase "check random" <| fun _ ->
        let rolls = rollMultiple(1000, 6)
        let min = Seq.min rolls
        let max = Seq.max rolls
        let avg = Seq.average (Seq.map float rolls)
        Expect.hasLength rolls 1000 "check length"
        Expect.isTrue (min = 1) "check min"
        Expect.isTrue (max = 6) "check max"
        Expect.isTrue (avg < 4) $"check avg ceil: {avg} < {4}"
        Expect.isTrue (avg > 3) $"check avg floor: {avg} > {3}"
]

let tests_explode = testList "explode" [
    testCase "explode once" <| fun _ ->
        let treshold = 6
        let rolls = ResizeArray([1..10])
        let explosions = Classes.RollAux.explode(Explode.Once treshold, 10, rolls)
        for i in 0 .. (rolls.Count-1) do
            let before = i+1
            let current = rolls.[i]
            if before >= treshold then
                Expect.isTrue (current > before) $"current ({current}) > before ({before})" 
            else
                Expect.equal current before $"equal at {i}"
    ]

let tests_keepDrop = testList "keepDrop" [
    testCase "DropHighest" <| fun _ ->
        let rolls = ResizeArray([1..10])
        Classes.RollAux.keepDrop(KeepDrop.DropHighest 2, rolls)
        let expected = [|1..8|]
        Expect.equal (Array.ofSeq rolls) expected ""
    testCase "DropLowest" <| fun _ ->
        let rolls = ResizeArray([1..10])
        Classes.RollAux.keepDrop(KeepDrop.DropLowest 2, rolls)
        let expected = [|3..10|]
        Expect.equal (Array.ofSeq rolls) expected ""
    testCase "KeepHighest" <| fun _ ->
        let rolls = ResizeArray([1..10])
        Classes.RollAux.keepDrop(KeepDrop.KeepHighest 2, rolls)
        let expected = [|9;10|]
        Expect.equal (Array.ofSeq rolls) expected ""
    testCase "KeepLowest" <| fun _ ->
        let rolls = ResizeArray([1..10])
        Classes.RollAux.keepDrop(KeepDrop.KeepLowest 2, rolls)
        let expected = [|1;2|]
        Expect.equal (Array.ofSeq rolls) expected ""
]

let main =
    testList "DiceRoll" [
        tests_roll
        tests_explode
        tests_keepDrop
    ]
