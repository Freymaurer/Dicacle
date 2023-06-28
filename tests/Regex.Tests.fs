module Tests.Regex

#if FABLE_COMPILER
open Fable.Mocha
#else
open Expecto
#endif

open Dice.Parsing
open Dice.Parsing.DiceParsingTypes
open Dice.Parsing.DiceParsingAux

module SetPattern =

    //3d6 + 1d11 + 15d20
    //(3d6 + 1d11 + 15d20)
    //2 (1d20 + 14) (1d20 + 9)
    //(1d20 + 14) (1d20 + 14) (1d20 + 9)
    //3 (1d20 + 14) 3 (1d20 + 14)
    //18+10 + 5d8 + 3d6 ir2
    //3(1d20+14)10(4d6kl2+15)

    let [<Literal>] example_throw   = "||"
    let [<Literal>] example1        = "3d6 + 1d11 + 15d20"
    let [<Literal>] example2        = "(3d6 + 1d11 + 15d20)"
    let [<Literal>] example3        = "(1d20 + 14) (1d20 + 14) (1d20 + 9)"
    let [<Literal>] example4        = "2 (1d20 + 14) (1d20 + 9)"
    let [<Literal>] example5        = "3 (1d20 + 14) 10 (4d6 kl2 + 15)"
    let [<Literal>] example6        = "18+10 + 5d8 + 3d6 ir2"
    let [<Literal>] example7        = "3(1d20+14)10(4d6kl2+15)"
    let [<Literal>] example8        = "(1d20   +   14   )     (   1d20   +    9     )"

let private tests_SetPattern = testList "parseSets" [
    let testSet(index:int, expectedCount: int, expectedDiceString: string) =
        fun (sets: PreSet list) ->
            let set = Seq.item index sets 
            Expect.equal set.setCount expectedCount $"set{index}.setCount"
            Expect.equal set.diceRolls expectedDiceString $"set{index}.diceRolls"
    testCase "no set specified" <| fun _ ->
        let sets() = parseSets SetPattern.example_throw
        Expect.throws (sets >> ignore) ""
    testCase "no set" <| fun _ ->
        let input = SetPattern.example1
        let sets = parseSets input
        Expect.hasLength sets 1 "number of sets"
        // set 0
        let set0 = sets.Item 0
        Expect.equal set0.setCount 1 "set0.setCount"
        Expect.equal set0.diceRolls "3d6+1d11+15d20" "set0.diceRolls"
    testCase "single set" <| fun _ ->
        let input = SetPattern.example2
        let sets = parseSets input
        Expect.hasLength sets 1 "number of sets"
        // set 0
        let set0 = sets.Item 0
        Expect.equal set0.setCount 1 "set0.setCount"
        Expect.equal set0.diceRolls "3d6+1d11+15d20" "set0.diceRolls"
    testCase "multiple sets" <| fun _ ->
        let input = SetPattern.example3
        let sets = parseSets input
        Expect.hasLength sets 3 "number of sets"
        testSet(0, 1, "1d20+14") sets
        testSet(1, 1, "1d20+14") sets
        testSet(2, 1, "1d20+9") sets
    testCase "multiple sets, with setCount" <| fun _ ->
        let input = SetPattern.example4
        let sets = parseSets input
        Expect.hasLength sets 2 "number of sets"
        testSet(0, 2, "1d20+14") sets
        testSet(1, 1, "1d20+9") sets
    testCase "multiple sets, with multiple setCounts" <| fun _ ->
        let input = SetPattern.example5
        let sets = parseSets input
        Expect.hasLength sets 2 "number of sets"
        testSet(0, 3, "1d20+14") sets
        testSet(1, 10, "4d6kl2+15") sets
    testCase "no set specified, complex" <| fun _ ->
        let input = SetPattern.example6
        let sets = parseSets input
        Expect.hasLength sets 1 "number of sets"
        testSet(0, 1, "18+10+5d8+3d6ir2") sets
    testCase "multiple sets, with multiple setCounts, no whitespace" <| fun _ ->
        let input = SetPattern.example7
        let sets = parseSets input
        Expect.hasLength sets 2 "number of sets"
        testSet(0, 3, "1d20+14") sets
        testSet(1, 10, "4d6kl2+15") sets
    testCase "multiple sets, with multiple setCounts, lots of whitespace" <| fun _ ->
        let input = SetPattern.example8
        let sets = parseSets input
        Expect.hasLength sets 2 "number of sets"
        testSet(0, 1, "1d20+14") sets
        testSet(1, 1, "1d20+9") sets
]

module DiceRollsPattern =

    //1d20
    //12
    //1d20 + 14
    //3d6 + 1d11 + 15d20
    //3d6 k1
    //3d6 kl2
    //3d6 e6
    //3d6 ie6
    //3d6 r2
    //3d6 ir2
    //4d6kl2+15
    //3d6 k1 ie6 r2 
    //3d6 k2 kl2
    //1d20 - 14

    let [<Literal>] example1 = "1d20"
    let [<Literal>] example2 = "12"
    let [<Literal>] example3 = "1d20+14"
    let [<Literal>] example4 = "3d6+1d11+15d20"
    let [<Literal>] example5 = "3d6k1"
    let [<Literal>] example6 = "3d6kl2"
    let [<Literal>] example7 = "3d6e6"
    let [<Literal>] example8 = "3d6ie6"
    let [<Literal>] example9 = "3d6r2"
    let [<Literal>] example10 = "3d6ir2"
    let [<Literal>] example11 = "4d6kl2+15"
    let [<Literal>] example12 = "3d6k1ie6r2 "
    let [<Literal>] example13 = "3d6k2kl2"
    let [<Literal>] example14 = "1d20-14"
    let [<Literal>] example15 = "-14"
    let [<Literal>] example16 = "-3d6k2kl2-5d8+20"

open Classes

let tests_DiceRollsPattern = testList "DiceRollsPattern" [
    let testDiceRoll(index:int, expectedCommand: Command, expectedDiceString: string) =
        fun (sets: PreDiceRoll list) ->
            let set = Seq.item index sets 
            Expect.equal set.command expectedCommand $"set{index}.command"
            Expect.equal set.diceRoll expectedDiceString $"set{index}.diceRoll"
    testCase "base case" <| fun _ ->
        let input = DiceRollsPattern.example1
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 1 "number of rolls"
        testDiceRoll(0, Command.Add, "1d20") rolls
    testCase "no dice size" <| fun _ ->
        let input = DiceRollsPattern.example2
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 1 "number of rolls"
        testDiceRoll(0, Command.Add, "12") rolls
    testCase "multiple rolls" <| fun _ ->
        let input = DiceRollsPattern.example3
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 2 "number of rolls"
        testDiceRoll(0, Command.Add, "1d20") rolls
        testDiceRoll(1, Command.Add, "14") rolls
    testCase "multiple rolls2" <| fun _ ->
        let input = DiceRollsPattern.example4
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 3 "number of rolls"
        testDiceRoll(0, Command.Add, "3d6") rolls
        testDiceRoll(1, Command.Add, "1d11") rolls
        testDiceRoll(2, Command.Add, "15d20") rolls
    testCase "keep" <| fun _ ->
        let input = DiceRollsPattern.example5
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 1 "number of rolls"
        testDiceRoll(0, Command.Add, "3d6k1") rolls
    testCase "keep lowest" <| fun _ ->
        let input = DiceRollsPattern.example6
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 1 "number of rolls"
        testDiceRoll(0, Command.Add, "3d6kl2") rolls
    testCase "exploding" <| fun _ ->
        let input = DiceRollsPattern.example7
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 1 "number of rolls"
        testDiceRoll(0, Command.Add, "3d6e6") rolls
    testCase "exploding inf" <| fun _ ->
        let input = DiceRollsPattern.example8
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 1 "number of rolls"
        testDiceRoll(0, Command.Add, "3d6ie6") rolls
    testCase "reroll <2" <| fun _ ->
        let input = DiceRollsPattern.example9
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 1 "number of rolls"
        testDiceRoll(0, Command.Add, "3d6r2") rolls
    testCase "reroll <2 in" <| fun _ ->
        let input = DiceRollsPattern.example10
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 1 "number of rolls"
        testDiceRoll(0, Command.Add, "3d6ir2") rolls
    testCase "no whitespace, multiple" <| fun _ ->
        let input = DiceRollsPattern.example11
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 2 "number of rolls"
        testDiceRoll(0, Command.Add, "4d6kl2") rolls
        testDiceRoll(1, Command.Add, "15") rolls
    testCase "complex" <| fun _ ->
        let input = DiceRollsPattern.example12
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 1 "number of rolls"
        testDiceRoll(0, Command.Add, "3d6k1ie6r2") rolls
    testCase "complex, not allowed, should not throw yet" <| fun _ ->
        let input = DiceRollsPattern.example13
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 1 "number of rolls"
        testDiceRoll(0, Command.Add, "3d6k2kl2") rolls
    testCase "multiple substract" <| fun _ ->
        let input = DiceRollsPattern.example14
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 2 "number of rolls"
        testDiceRoll(0, Command.Add, "1d20") rolls
        testDiceRoll(1, Command.Substract, "14") rolls
    testCase "single substract" <| fun _ ->
        let input = DiceRollsPattern.example15
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 1 "number of rolls"
        testDiceRoll(0, Command.Substract, "14") rolls
    testCase "lots of whitespace, multiple substract" <| fun _ ->
        let input = DiceRollsPattern.example16
        let rolls = parseDiceRolls input
        Expect.hasLength rolls 3 "number of rolls"
        testDiceRoll(0, Command.Substract, "3d6k2kl2") rolls
        testDiceRoll(1, Command.Substract, "5d8") rolls
        testDiceRoll(2, Command.Add, "20") rolls
]    

module DiceRollPattern =

    let [<Literal>] example1 = "1d20"
    let [<Literal>] example2 = "12"
    let [<Literal>] example3 = "1d110"
    let [<Literal>] example4 = "3d6k1"
    let [<Literal>] example4_1 = "3d6kh1"
    let [<Literal>] example5 = "3d6kl2"
    let [<Literal>] example6 = "3d6e6"
    let [<Literal>] example7 = "3d6ie6"
    let [<Literal>] example8 = "3d6r2"
    let [<Literal>] example9 = "3d6ir2"
    let [<Literal>] example10 = "4d6kl2"
    let [<Literal>] example11 = "3d6k1ie6r2"
    /// Should raise error
    let [<Literal>] example12 = "3d6k2kl2"
    let [<Literal>] example13 = "3w20"
    let [<Literal>] example14 = "12k2" // will ignore k2
    let [<Literal>] example15 = "3d6d1"
    let [<Literal>] example15_1 = "3d6dl1"
    let [<Literal>] example16 = "3d6dh1"
    /// Should raise error
    let [<Literal>] example17 = "3d6k2e6ie6"
    /// Should raise error
    let [<Literal>] example18 = "3d6k2e6d2"
    /// Should raise error
    let [<Literal>] example19 = "3d6k2e6r1ir2"

let tests_DiceRollPattern = testList "DiceRollPattern" [
    testCase "base case" <| fun _ ->
        let input = DiceRollPattern.example1
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(1,20)
        Expect.equal actual expected "" 
    testCase "base case, german" <| fun _ ->
        let input = DiceRollPattern.example13
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,20)
        Expect.equal actual expected ""
    testCase "flat" <| fun _ ->
        let input = DiceRollPattern.example2
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(12,0)
        Expect.equal actual expected ""
    testCase "absurd die" <| fun _ ->
        let input = DiceRollPattern.example3
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(1,110)
        Expect.equal actual expected ""
    testCase "keep: k" <| fun _ ->
        let input = DiceRollPattern.example4
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,6,keepdrop=KeepDrop.KeepHighest 1)
        Expect.equal actual expected ""
    testCase "keep: kh" <| fun _ ->
        let input = DiceRollPattern.example4_1
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,6,keepdrop=KeepDrop.KeepHighest 1)
        Expect.equal actual expected "" 
    testCase "keep: kl" <| fun _ ->
        let input = DiceRollPattern.example5
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,6,keepdrop=KeepDrop.KeepLowest 2)
        Expect.equal actual expected ""
    testCase "drop: d" <| fun _ ->
        let input = DiceRollPattern.example15
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,6,keepdrop=KeepDrop.DropLowest 1)
        Expect.equal actual expected ""
    testCase "drop: dl" <| fun _ ->
        let input = DiceRollPattern.example15_1
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,6,keepdrop=KeepDrop.DropLowest 1)
        Expect.equal actual expected "" 
    testCase "drop: dh" <| fun _ ->
        let input = DiceRollPattern.example16
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,6,keepdrop=KeepDrop.DropHighest 1)
        Expect.equal actual expected ""
    testCase "explode once" <| fun _ ->
        let input = DiceRollPattern.example6
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,6,explode=Explode.Once 6)
        Expect.equal actual expected ""
    testCase "explode inf" <| fun _ ->
        let input = DiceRollPattern.example7
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,6,explode=Explode.Inf 6)
        Expect.equal actual expected ""
    testCase "reroll once" <| fun _ ->
        let input = DiceRollPattern.example8
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,6,reroll=Reroll.Once 2)
        Expect.equal actual expected ""
    testCase "reroll inf" <| fun _ ->
        let input = DiceRollPattern.example9
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,6,reroll=Reroll.Inf 2)
        Expect.equal actual expected ""
    testCase "no whitespace" <| fun _ ->
        let input = DiceRollPattern.example10
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(4,6,keepdrop=KeepDrop.KeepLowest 2)
        Expect.equal actual expected ""
    testCase "complex" <| fun _ ->
        let input = DiceRollPattern.example11
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(3,6,explode=Explode.Inf 6, reroll=Reroll.Once 2, keepdrop=KeepDrop.KeepHighest 1)
        Expect.equal actual expected ""
    testCase "flat with params" <| fun _ ->
        let input = DiceRollPattern.example14
        let actual = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        let expected = Dice.create(12,0)
        Expect.equal actual expected ""
    testCase "duplicate keep, throws" <| fun _ ->
        let input = DiceRollPattern.example12
        let actual() = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        Expect.throws (actual >> ignore) ""
    testCase "duplicate explode, throws" <| fun _ ->
        let input = DiceRollPattern.example17
        let actual() = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        Expect.throws (actual >> ignore) ""
    testCase "duplicate keep/drop, throws" <| fun _ ->
        let input = DiceRollPattern.example18
        let actual() = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        Expect.throws (actual >> ignore) ""
    testCase "duplicate reroll, throws" <| fun _ ->
        let input = DiceRollPattern.example19
        let actual() = parseDiceRoll <| PreDiceRoll.create(Command.Add,input)
        Expect.throws (actual >> ignore) ""
]

let main =
    testList "Regex" [
        tests_SetPattern
        tests_DiceRollsPattern
        tests_DiceRollPattern
    ]
