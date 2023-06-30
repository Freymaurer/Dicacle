module Dice.Parsing

open System.Text.RegularExpressions
open Classes

module Pattern = 
    
    [<LiteralAttribute>]
    let SetPattern = @"(?<setCount>\d*)?\s*(^|\()(?<diceRolls>[a-zA-Z0-9\s+-]*)($|\))"
    [<LiteralAttribute>]
    let DiceRollsPattern = @"(?<command>^|\+|-)\s*(?<diceRoll>[a-zA-Z0-9\s]+)"

    module DiceRollPatterns =
        let createSubPattern(subpatternName:string, identifier: string list) = sprintf @"(?<%s>(?<%sType>%s)(?<%sNumber>\d+))" subpatternName subpatternName (String.concat "|" identifier) subpatternName
        let KeepDropPattern = createSubPattern("KeepDrop", ["k"; "kh"; "kl"; "d"; "dl"; "dh"])
        let ExplodePattern = createSubPattern("Explode", ["e"; "ie"])
        let RerollPattern = createSubPattern("Reroll", ["r"; "ir"])
        let DicePattern = @"^(?<DiceCount>\d+)((d|w)(?<DiceSize>\d+))?"

    open DiceRollPatterns

    let tryKeepDrop input =
        let matches = Regex.Matches(input,KeepDropPattern)
        match matches.Count with
        | 1 -> 
            let m = matches.[0]
            let t = m.Groups.["KeepDropType"].Value // required
            let n = m.Groups.["KeepDropNumber"].Value |> int // required
            KeepDrop.ofString(t,n) |> Some
        | empty when empty <= 0 -> 
            None
        | _ ->
            failwith "Found Keep/Drop logic multiple times in dice roll."

    let tryExplode input =
        let matches = Regex.Matches(input,ExplodePattern)
        match matches.Count with
        | 1 -> 
            let m = matches.[0]
            let t = m.Groups.["ExplodeType"].Value // required
            let n = m.Groups.["ExplodeNumber"].Value |> int // required
            Explode.ofString(t,n) |> Some
        | empty when empty <= 0 -> 
            None
        | _ ->
            failwith "Found Keep/Drop logic multiple times in dice roll."

    let tryReroll input =
        let matches = Regex.Matches(input,RerollPattern)
        match matches.Count with
        | 1 -> 
            let m = matches.[0]
            let t = m.Groups.["RerollType"].Value // required
            let n = m.Groups.["RerollNumber"].Value |> int // required
            Reroll.ofString(t,n) |> Some
        | empty when empty <= 0 -> 
            None
        | _ ->
            failwith "Found Keep/Drop logic multiple times in dice roll."

/// These types are only used to make testing easier and should never be used outside.
module DiceParsingTypes = 

    type PreSet = {
        setCount: int; diceRolls: string
    } with
        static member create(setCount: int, diceRolls: string) : PreSet = {
            setCount = setCount; diceRolls = diceRolls
        }

    type PreDiceRoll = {
        command: Command; 
        diceRoll: string
    } with
        static member create(command: Command, diceRoll: string) : PreDiceRoll = {
            command = command; 
            diceRoll = diceRoll
        }

open DiceParsingTypes

module DiceParsingAux =

    let parseSets(input: string) = 
        let input = input.Replace(" ","")
        let matches = Regex.Matches(input, Pattern.SetPattern)
        if matches.Count = 0 then failwith $"Unable to parse `{input}` to sets!"
        [
            for m in matches do
                /// This group is optional
                let setCount = match m.Groups.["setCount"].Value.Trim() with | "" -> 1 | anyelse -> int anyelse
                /// This group is mandatory
                let diceRolls = m.Groups.["diceRolls"].Value
                PreSet.create(setCount,diceRolls)
        ]

    let parseDiceRolls(input: string) = 
        let matches = Regex.Matches(input, Pattern.DiceRollsPattern)
        if matches.Count = 0 then failwith $"Unable to parse `{input}` to dice rolls!"
        [
            for m in matches do
                let command = m.Groups.["command"].Value.Trim() |> Command.ofString
                /// This group is mandatory
                let diceRolls = m.Groups.["diceRoll"].Value.Trim()
                PreDiceRoll.create(command,diceRolls)
        ]

    let parseDiceRoll(preDiceRoll:PreDiceRoll) = 
        let input = preDiceRoll.diceRoll
        let command = preDiceRoll.command
        let m = Regex.Match(input, Pattern.DiceRollPatterns.DicePattern)
        match m.Success with
        | true -> 
            /// required
            let diceCount = m.Groups.["DiceCount"].Value |> int
            /// optional
            let diceSize = match m.Groups.["DiceSize"].Value with | "" -> 0 | anyNumber -> int anyNumber
            match diceSize with
            // if no diceSize, all other options are not valid.
            | 0 -> 
                Dice.create(diceCount, diceSize, command)
            | _ ->
                let diceRollParams = input.Remove(0,m.Length).Trim()
                let explode = Pattern.tryExplode(diceRollParams)
                let reroll = Pattern.tryReroll(diceRollParams)
                let keepdrop = Pattern.tryKeepDrop(diceRollParams)
                Dice.create(diceCount, diceSize, command, ?explode=explode, ?reroll=reroll, ?keepdrop=keepdrop)
        | false ->
            failwithf "Unable to find `DicePattern` (e.g. `3d6`, `14`) at beginning of role: %s" input

open DiceParsingAux

let parseStringToDice(input:string) =
    let sets = parseSets input
    sets
    |> List.map (fun set ->
        let dice = parseDiceRolls set.diceRolls |> List.map (fun preDie -> parseDiceRoll(preDie)) |> ResizeArray
        DiceSet.create(set.setCount, dice).roll()
    )