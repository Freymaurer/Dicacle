module Tests.Dice.Parsing

open Expecto

open Dice
open Dice.Parsing

module ExampleSets =

    let [<Literal>] example_throw           = "||"
    let [<Literal>] example_add             = "18+10"
    let [<Literal>] example_lazyRoller      = "d6+10+d12"
    let [<Literal>] example_minus           = "1d20-1"
    let [<Literal>] example_simple          = "3d6 + 1d11 + 15d20"
    let [<Literal>] example_group           = "(3d6 + 1d11 + 15d20)"
    let [<Literal>] example_groups          = "(1d20 + 14) (1d20 + 14) (1d20 + 9)"
    let [<Literal>] example_groupsCount     = "2 (1d20 + 14) (1d20 + 9)"
    let [<Literal>] example_groupsCounts    = "3 (1d20 + 14) 10 (4d6 + 15)"
    let [<Literal>] example_keephighest     = "5d20 k2"
    let [<Literal>] example_keeplowest      = "5d20 kl2"
    let [<Literal>] example_droplowest      = "5d20 dl2"
    let [<Literal>] example_drophighest     = "5d20 dh2"
    let [<Literal>] example_reroll          = "5d20 ir2"
    let [<Literal>] example_explode         = "5d20 e6"
    let [<Literal>] example_mixedMultiples  = "5d8 k1 + 3d6 e6 -10 - 2d11dl1 + 11"
    let [<Literal>] example_noWhitespace   = "3(1d20+14)10(4d6kl2+15)"
    let [<Literal>] example_manyWhitespace  = "2    (1d20   +   14   )     (   1d20   +    9     )"

let rmv (str:string) = str.Replace(" ","")

let tests_Sets = 
    let testSet (expectedSetCount: int) (expectedDiceRolls:string) (set: int*string) =
        let actualSetCount, actualDiceRolls = set
        Expect.equal actualSetCount expectedSetCount $"[SetCount] not equal: {actualSetCount} <> {expectedSetCount}"
        Expect.equal actualDiceRolls expectedDiceRolls $"[DiceRolls] not equal: {actualDiceRolls} <> {expectedDiceRolls}"
        
    testList "Sets" [
        testCase "throws" <| fun _ ->
            let func = fun () -> ExampleSets.example_throw |> rmv |> Regex.getSets |> ignore
            Expect.throws func ""
        testCase "only numbers" <| fun _ ->
            let actual = ExampleSets.example_add |> rmv |> Regex.getSets
            Expect.hasLength actual 1 "number of sets"
            testSet 1 "18+10" actual.[0]
        testCase "lazy roller" <| fun _ ->
            let actual = ExampleSets.example_lazyRoller |> rmv |> Regex.getSets
            Expect.hasLength actual 1 "number of sets"
            testSet 1 "d6+10+d12" actual.[0]
        testCase "minus" <| fun _ ->
            let actual = ExampleSets.example_minus |> rmv |> Regex.getSets
            Expect.hasLength actual 1 "number of sets"
            testSet 1 "1d20-1" actual.[0]
        testCase "simple" <| fun _ ->
            let actual = ExampleSets.example_simple |> rmv |> Regex.getSets
            Expect.hasLength actual 1 "number of sets"
            testSet 1 "3d6+1d11+15d20" actual.[0]
        testCase "no whitespace" <| fun _ ->
            let actual = ExampleSets.example_noWhitespace |> rmv |> Regex.getSets
            Expect.hasLength actual 2 "number of sets"
            testSet 3 "1d20+14" actual.[0]
            testSet 10 "4d6kl2+15" actual.[1]
    ]

let tests_DiceRollInfo = testList "DiceRollInfo" [
    let testDiceRoll (expectedCommand: Command) (expectedDiceRoll: string) (actual: Command * string) =
        let actualCommand, actualDiceRoll = actual
        Expect.equal actualCommand expectedCommand $"[Command] not equal `command 2 2`: {actualCommand} <> {expectedCommand}"
        Expect.equal actualDiceRoll expectedDiceRoll $"[DiceRoll] not equal: {actualDiceRoll} <> {expectedDiceRoll}"
    testCase "throws" <| fun _ ->
        let func = fun () -> ExampleSets.example_throw |> rmv |> Regex.getSets |> ignore
        Expect.throws func ""
    testCase "only numbers" <| fun _ ->
        let actual = ExampleSets.example_add |> rmv |> Regex.getDiceRollInfo
        Expect.hasLength actual 2 "number of DiceRolls"
        testDiceRoll Command.Plus "18" actual.[0]
        testDiceRoll Command.Plus "10" actual.[1]
    testCase "lazy roller" <| fun _ ->
        let actual = ExampleSets.example_lazyRoller |> rmv |> Regex.getDiceRollInfo
        Expect.hasLength actual 3 "number of DiceRolls"
        testDiceRoll Command.Plus "d6" actual.[0]
        testDiceRoll Command.Plus "10" actual.[1]
        testDiceRoll Command.Plus "d12" actual.[2]
    testCase "minus" <| fun _ ->
        let actual = ExampleSets.example_minus |> rmv |> Regex.getDiceRollInfo
        Expect.hasLength actual 2 "number of DiceRolls"
        testDiceRoll Command.Plus "1d20" actual.[0]
        testDiceRoll Command.Minus "1" actual.[1]
    testCase "keephighest" <| fun _ ->
        let actual = ExampleSets.example_keephighest |> rmv |> Regex.getDiceRollInfo
        Expect.hasLength actual 1 "number of DiceRolls"
        testDiceRoll Command.Plus "5d20k2" actual.[0]
    testCase "keeplowest" <| fun _ ->
        let actual = ExampleSets.example_keeplowest |> rmv |> Regex.getDiceRollInfo
        Expect.hasLength actual 1 "number of DiceRolls"
        testDiceRoll Command.Plus "5d20kl2" actual.[0]
    testCase "drophighest" <| fun _ ->
        let actual = ExampleSets.example_drophighest |> rmv |> Regex.getDiceRollInfo
        Expect.hasLength actual 1 "number of DiceRolls"
        testDiceRoll Command.Plus "5d20dh2" actual.[0]
    testCase "droplowest" <| fun _ ->
        let actual = ExampleSets.example_droplowest |> rmv |> Regex.getDiceRollInfo
        Expect.hasLength actual 1 "number of DiceRolls"
        testDiceRoll Command.Plus "5d20dl2" actual.[0]
    testCase "mixed multiples" <| fun _ ->
        let actual = ExampleSets.example_mixedMultiples |> rmv |> Regex.getDiceRollInfo
        Expect.hasLength actual 5 "number of DiceRolls"
        testDiceRoll Command.Plus "5d8k1" actual.[0]
        testDiceRoll Command.Plus "3d6e6" actual.[1]
        testDiceRoll Command.Minus "10" actual.[2]
        testDiceRoll Command.Minus "2d11dl1" actual.[3]
        testDiceRoll Command.Plus "11" actual.[4]
]

module ExampleDice =

    let [<Literal>] throws = "14irdh2"
    let [<Literal>] simple = "1d20"
    let [<Literal>] lazy' = "d12"
    let [<Literal>] flat = "14"
    let [<Literal>] operation = "5d20k2"
    let [<Literal>] operations = "5d20kl2ir1e6"

let private tests_Dice = testList "Dice" [
    let testDiceBasic (diceCount: int) (diceSize: int) (operations: string option) (actual: int * int * string option) =
        let actualdiceCount, actualdiceSize, actualOperations = actual
        Expect.equal actualdiceCount diceCount $"[diceCount] not equal: {actualdiceCount} <> {diceCount}"
        Expect.equal actualdiceSize diceSize $"[diceSize] not equal: {actualdiceSize} <> {diceSize}"
        Expect.equal actualOperations operations $"[operations] not equal: {actualOperations} <> {operations}"
    testCase "throws" <| fun _ ->
        let func = fun () -> Regex.getDiceBasic ExampleDice.throws |> ignore
        Expect.throws func ""
    testCase "simple" <| fun _ ->
        let actual = Regex.getDiceBasic ExampleDice.simple
        testDiceBasic 1 20 None actual
    testCase "lazy" <| fun _ ->
        let actual = Regex.getDiceBasic ExampleDice.lazy'
        testDiceBasic 1 12 None actual
    testCase "flat" <| fun _ ->
        let actual = Regex.getDiceBasic ExampleDice.flat
        testDiceBasic 14 1 None actual
    testCase "operation" <| fun _ ->
        let actual = Regex.getDiceBasic ExampleDice.operation
        testDiceBasic 5 20 (Some "k2") actual
    testCase "operations" <| fun _ ->
        let actual = Regex.getDiceBasic ExampleDice.operations
        testDiceBasic 5 20 (Some "kl2ir1e6") actual
]

let private tests_DiceOperations = testList "DiceOperations" [
    testList "KeepDrop" [
        testCase "number" <| fun _ ->
            let input = "2"
            let actual = Regex.Operations.getKeepDrop input
            Expect.equal actual None ""
        testCase "missing" <| fun _ ->
            let input = "e6r1"
            let actual = Regex.Operations.getKeepDrop input
            Expect.equal actual None ""
        testCase "simple keep short" <| fun _ ->
            let input = "k1"
            let actual = Regex.Operations.getKeepDrop input
            let expected = DiceOperations.KeepHighest 1 |> Some
            Expect.equal actual expected ""
        testCase "simple keep" <| fun _ ->
            let input = "kh1"
            let actual = Regex.Operations.getKeepDrop input
            let expected = DiceOperations.KeepHighest 1 |> Some
            Expect.equal actual expected ""
        testCase "simple keep lowest" <| fun _ ->
            let input = "kl1"
            let actual = Regex.Operations.getKeepDrop input
            let expected = DiceOperations.KeepLowest 1 |> Some
            Expect.equal actual expected ""
        testCase "simple drop short" <| fun _ ->
            let input = "d1"
            let actual = Regex.Operations.getKeepDrop input
            let expected = DiceOperations.DropLowest 1 |> Some
            Expect.equal actual expected ""
        testCase "simple drop" <| fun _ ->
            let input = "dl1"
            let actual = Regex.Operations.getKeepDrop input
            let expected = DiceOperations.DropLowest 1 |> Some
            Expect.equal actual expected ""
        testCase "simple drop highest" <| fun _ ->
            let input = "dh1"
            let actual = Regex.Operations.getKeepDrop input
            let expected = DiceOperations.DropHighest 1 |> Some
            Expect.equal actual expected ""
        testCase "mixed" <| fun _ ->
            let input = "kl2ir1e6"
            let actual = Regex.Operations.getKeepDrop input
            let expected = DiceOperations.KeepLowest 2 |> Some
            Expect.equal actual expected ""
        testCase "mixed 2" <| fun _ ->
            let input = "ir1e6k2"
            let actual = Regex.Operations.getKeepDrop input
            let expected = DiceOperations.KeepHighest 2 |> Some
            Expect.equal actual expected ""
        testCase "multiple keepdrops" <| fun _ ->
            let input = "k2kld13kh1"
            let actual = Regex.Operations.getKeepDrop input
            let expected = DiceOperations.KeepHighest 2 |> Some
            Expect.equal actual expected "This will actually just use the first keep"
    ]
    testList "Explode" [
        testCase "once" <| fun _ ->
            let input = "e6"
            let actual = Regex.Operations.getExplode input
            let expected = DiceOperations.Explode (6) |> Some
            Expect.equal actual expected ""
        testCase "infinity" <| fun _ ->
            let input1 = "ei5"
            let input2 = "ie5"
            let actualFunc = Regex.Operations.getExplode 
            let expected = DiceOperations.ExplodeInfinity (5) |> Some
            Expect.equal (actualFunc input1) expected "input1"
            Expect.equal (actualFunc input2) expected "input2"
    ]
    testList "Reroll" [
        testCase "once" <| fun _ ->
            let input = "r1"
            let actual = Regex.Operations.getReroll input
            let expected = DiceOperations.Reroll (1) |> Some
            Expect.equal actual expected ""
        testCase "infinity" <| fun _ ->
            let input1 = "ri2"
            let input2 = "ir2"
            let actualFunc = Regex.Operations.getReroll 
            let expected = DiceOperations.RerollInfinity (2) |> Some
            Expect.equal (actualFunc input1) expected "input1"
            Expect.equal (actualFunc input2) expected "input2"
    ]
    testList "getOperations" [
        testCase "none" <| fun _ ->
            let input = None
            let actual = Regex.getOperations input 
            let expected = [||]
            Expect.equal actual expected ""
        testCase "no match" <| fun _ ->
            let input = Some "ssdahsdmalösjdjka"
            let actual = Regex.getOperations input 
            let expected = [||]
            Expect.equal actual expected ""
        testCase "single" <| fun _ ->
            let input = Some "ie1"
            let actual = Regex.getOperations input 
            let expected = [|ExplodeInfinity(1)|]
            Expect.equal actual expected ""
        testCase "all allowed combined" <| fun _ ->
            let input = Some "k1e6r1"
            let actual = Regex.getOperations input 
            let expected = [|Reroll(1); Explode(6); KeepHighest 1;|]
            Expect.equal actual expected "Pay attention to order, this is also the calculation order: reroll -> explode -> keep/drop."
        testCase "multiple same category" <| fun _ ->
            let input = Some "k1kl2d1dh1"
            let actual = Regex.getOperations input 
            let expected = [|KeepHighest 1;|]
            Expect.equal actual expected "Should ignore all but first."
    ]
]

let private test_parseGeneralDice = testList "parseGeneralDice" [
    testCase "throw" <| fun _ ->
        let input = ExampleSets.example_throw
        let now = System.DateTime(2023,1,1)
        let actual() = parseGeneralDice(input, now)
        Expect.throws (actual >> ignore) ""
    testCase "add" <| fun _ ->
        let input = ExampleSets.example_add
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(18,1)); 
                    DiceRollInfo.create(Dice.create(10,1))
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input,expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "lazyRoller" <| fun _ ->
        let input = ExampleSets.example_lazyRoller
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(1,6)) 
                    DiceRollInfo.create(Dice.create(10,1))
                    DiceRollInfo.create(Dice.create(1,12))
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input,expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "minus" <| fun _ ->
        let input = ExampleSets.example_minus
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(1,20)) 
                    DiceRollInfo.create(Dice.create(1,1), Command.Minus)
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input,expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "simple" <| fun _ ->
        let input = ExampleSets.example_simple
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(3,6)) 
                    DiceRollInfo.create(Dice.create(1,11))
                    DiceRollInfo.create(Dice.create(15,20))
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_group" <| fun _ ->
        let input = ExampleSets.example_group
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(3,6)) 
                    DiceRollInfo.create(Dice.create(1,11))
                    DiceRollInfo.create(Dice.create(15,20))
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_groups" <| fun _ ->
        let input = ExampleSets.example_groups
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(1,20)) 
                    DiceRollInfo.create(Dice.create(14,1))
                ]))
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(1,20)) 
                    DiceRollInfo.create(Dice.create(14,1))
                ]))
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(1,20)) 
                    DiceRollInfo.create(Dice.create(9,1))
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_groupsCount" <| fun _ ->
        let input = ExampleSets.example_groupsCount
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(2, ResizeArray([
                    DiceRollInfo.create(Dice.create(1,20)) 
                    DiceRollInfo.create(Dice.create(14,1))
                ]))
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(1,20)) 
                    DiceRollInfo.create(Dice.create(9,1))
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_groupsCounts" <| fun _ ->
        let input = ExampleSets.example_groupsCounts
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(3, ResizeArray([
                    DiceRollInfo.create(Dice.create(1,20)) 
                    DiceRollInfo.create(Dice.create(14,1))
                ]))
                DiceSet.create(10, ResizeArray([
                    DiceRollInfo.create(Dice.create(4,6)) 
                    DiceRollInfo.create(Dice.create(15,1))
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_keephighest" <| fun _ ->
        let input = ExampleSets.example_keephighest
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(5,20,[|KeepHighest 2|])) 
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_keeplowest" <| fun _ ->
        let input = ExampleSets.example_keeplowest
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(5,20,[|KeepLowest 2|])) 
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_droplowest" <| fun _ ->
        let input = ExampleSets.example_droplowest
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(5,20,[|DropLowest 2|])) 
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_drophighest" <| fun _ ->
        let input = ExampleSets.example_drophighest
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(5,20,[|DropHighest 2|])) 
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_reroll" <| fun _ ->
        let input = ExampleSets.example_reroll
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(5,20,[|RerollInfinity (2)|])) 
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_explode" <| fun _ ->
        let input = ExampleSets.example_explode
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(5,20,[|Explode 6|])) 
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_mixedMultiples" <| fun _ ->
        let input = ExampleSets.example_mixedMultiples
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(5,8,[|KeepHighest 1|])) 
                    DiceRollInfo.create(Dice.create(3,6,[|Explode 6|])) 
                    DiceRollInfo.create(Dice.create(10,1), Command.Minus) 
                    DiceRollInfo.create(Dice.create(2,11, [|DropLowest 1|]), Command.Minus) 
                    DiceRollInfo.create(Dice.create(11,1)) 
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_noWhitespace" <| fun _ ->
        let input = ExampleSets.example_noWhitespace
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(3, ResizeArray([
                    DiceRollInfo.create(Dice.create(1,20)) 
                    DiceRollInfo.create(Dice.create(14))
                ]))
                DiceSet.create(10, ResizeArray([
                    DiceRollInfo.create(Dice.create(4,6,[|KeepLowest 2|])) 
                    DiceRollInfo.create(Dice.create(15))
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
    testCase "example_manyWhitespace" <| fun _ ->
        let input = ExampleSets.example_manyWhitespace
        let now = System.DateTime(2023,1,1)
        let actual = parseGeneralDice(input, now)
        let expected_sets = 
            [|
                DiceSet.create(2, ResizeArray([
                    DiceRollInfo.create(Dice.create(1,20)) 
                    DiceRollInfo.create(Dice.create(14))
                ]))
                DiceSet.create(1, ResizeArray([
                    DiceRollInfo.create(Dice.create(1,20)) 
                    DiceRollInfo.create(Dice.create(9))
                ]))
            |] |> ResizeArray
        let expected = DiceSets.create(input.Replace(" ",""),expected_sets, now)
        Expect.equal actual expected "isEqual"
]

[<Tests>]
let main = testList "GeneralDice" [
    tests_Sets
    tests_DiceRollInfo
    tests_Dice
    tests_DiceOperations
    test_parseGeneralDice
]


