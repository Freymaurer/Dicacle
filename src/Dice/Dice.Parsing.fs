module Dice.Parsing

open System.Text.RegularExpressions
open Classes

open System.Text.RegularExpressions

module Regex =

    [<LiteralAttribute>]
    let private SetPattern = @"((?<setCount>\d*)\()?(?<diceRolls>[a-zA-Z0-9+-]+)(\))?"
    let private SetRegex = Regex(SetPattern,RegexOptions.Singleline)

    [<LiteralAttribute>]
    let private DicePattern = @"(?<command>\+|-)?(?<diceRoll>[a-zA-Z0-9]+)"
    let private DiceRegex = Regex(DicePattern,RegexOptions.Singleline)

    [<LiteralAttribute>]
    //let private DiceBasicPattern = @"^(?<dicecount>\d+)?(?<d>(?(dicecount)d{1}|d?))(?<dicesize>\d+)(?(dicecount)(?<operations>[a-zA-Z0-9]+))?$"
    let private DiceBasicPattern = @"^((?<dicecount>\d+)?(?<d>d)(?<dicesize>\d+)(?<operations>[a-zA-Z0-9]+)?|(?<simpledicesize>\d+))$"
    let private DiceBasicRegex = Regex(DiceBasicPattern)

    module Operations = 

        [<LiteralAttribute>]
        let private KeepDropPattern = @"(?<operation>k|kh|kl|d|dl|dh)(?<count>\d+)"
        let private KeepDropRegex = Regex(KeepDropPattern)

        let getKeepDrop(str: string) = 
            let m = KeepDropRegex.Match(str)
            match m.Success with
            | false ->
                None
            | true ->
                let count = int m.Groups.["count"].Value
                let operation = 
                    match m.Groups.["operation"].Value.ToLower() with
                    | "kh" | "k" -> KeepDrop.KeepHighest
                    | "kl" -> KeepDrop.KeepLowest
                    | "dl" | "d" -> KeepDrop.DropLowest
                    | "dh" -> KeepDrop.DropHighest
                    | anyElse -> failwithf "Error. Unknown input for KeepDrop pattern: `%s`" anyElse
                Some (operation count)

        let private ExplodePattern = @"(?<operation>e|ie|ei)(?<threshold>\d+)"
        let private ExplodeRegex = Regex(ExplodePattern)

        let getExplode(str: string) = 
            let m = ExplodeRegex.Match(str)
            match m.Success with
            | false ->
                None
            | true ->
                let threshold = int m.Groups.["threshold"].Value
                let operation = 
                    match m.Groups.["operation"].Value.ToLower() with
                    | "e" -> fun t -> Explode.Once t
                    | "ie" | "ei" -> fun t -> Explode.Infinity t
                    | anyElse -> failwithf "Error. Unknown input for Explode pattern: `%s`" anyElse
                Some (operation threshold)
                
        let private RerollPattern = @"(?<operation>r|ir|ri)(?<threshold>\d+)"
        let private RerollRegex = Regex(RerollPattern)

        let getReroll(str: string) = 
            let m = RerollRegex.Match(str)
            match m.Success with
            | false ->
                None
            | true ->
                let threshold = int m.Groups.["threshold"].Value
                let operation = 
                    match m.Groups.["operation"].Value.ToLower() with
                    | "r" -> fun t -> Reroll.Once t
                    | "ir" | "ri" -> fun t -> Reroll.Infinity t
                    | anyElse -> failwithf "Error. Unknown input for Explode pattern: `%s`" anyElse
                Some (operation threshold)

    /// <summary>
    /// Matches Sets from string. A set is surrounded by braces and can have a count in front.
    /// If no braces exist the full string is one set:
    ///
    /// - "3 (1d20 + 14) 10 (4d6 + 15)" 
    ///  
    /// ==> {| count = 3; set = "1d20+14"|} {| count = 10; set = "4d6+15" |}
    ///
    ///
    /// - "5d8 k1 + 3d6 e6 -10 - 2d11dl1 + 11" 
    ///  
    /// ==> {| count = 1; set = "5d8 k1 + 3d6 e6 -10 - 2d11dl1 + 11"|}
    /// </summary>
    /// <param name="str"></param>
    let getSets(str:string) =
        let matches = SetRegex.Matches(str)
        if matches.Count = 0 then failwithf "No `Set` matches for %s" str
        let defaultSetCount (setCount:string) = if setCount = "" then 1 else int setCount
        [|
            for m in matches do
                defaultSetCount m.Groups.["setCount"].Value, 
                m.Groups.["diceRolls"].Value
        |]

    /// <summary>
    /// Get different Dice from a Set string. Dice are separated by `+` or `-` or beginn with line start and implicit `+`.
    ///
    /// - "1d20 + 14"
    ///  
    /// ==> {| command = (+); diceroll = "1d20" |} {| command = (+); diceroll = "14" |}
    ///
    /// - "3d6 e6 -10 - 2d11dl1"
    ///  
    /// ==> {| command = (+); diceroll = "3d6e6" |} {| command = (-); diceroll = "10" |} {| command = (-); diceroll = "2d11dl1" |}
    /// </summary>
    /// <param name="str"></param>
    let getDiceRollInfo(str:string) =
        let matches = DiceRegex.Matches(str)
        if matches.Count = 0 then failwithf "No `Dice` matches for %s" str
        [|
            for m in matches do
                Command.fromString m.Groups.["command"].Value, 
                m.Groups.["diceRoll"].Value
        |]


    /// <summary>
    /// Get different DiceBasic from a Dice string.
    ///
    /// - "1d20"
    ///  
    /// ==> {| dicecount = 1; dicesize = 20; operations = None |}
    ///
    /// - "d12"
    ///  
    /// ==> {| dicecount = 1; dicesize = 12; operations = None |}
    ///
    /// - "14"
    ///  
    /// ==> {| dicecount = 14; dicesize = 1; operations = None |}
    /// </summary>
    /// <param name="str"></param>
    let getDiceBasic(str:string) = 
        let m = DiceBasicRegex.Match(str)
        match m.Success with
        | false ->
            failwithf "No `DiceBasic` matches for %s" str
        | true ->
            let defaultDiceCount (dicecount:string) = if dicecount = "" then 1 else int dicecount
            // if no `d` is present we have only a flat bonus/malus we model this with flatbonus = dicecount and dicesize = 1
            if m.Groups.["d"].Value = "" then
                int m.Groups.["simpledicesize"].Value,
                1,
                None
            // if `d` is present we follow normal groups
            else
                defaultDiceCount m.Groups.["dicecount"].Value,
                int m.Groups.["dicesize"].Value,
                match m.Groups.["operations"].Success with | true -> Some m.Groups.["operations"].Value | _ -> None

    let getOperations (str: string option) =
        match str with
        | None -> None, None, None
        | Some str ->
            Operations.getReroll str, Operations.getExplode str, Operations.getKeepDrop str
        
open Regex

let parseGeneralDice (input: string, now: System.DateTime) =
    let input = input.Replace(" ","") //shadow but remove all whitespace
    let sets = 
        // solve sets, either by linestart or by brackets
        getSets input 
        |> Array.map (fun (count,setStr) -> 
            let dice = 
                // split set into different dice with +/- information
                getDiceRollInfo setStr 
                |> Array.map (fun (command,rawBasicDiceStr) ->
                    // get the number of dice and the dice size, as well as the raw operations (keep/drop,explode,reroll)
                    let diceCount, diceSize, rawOperations = getDiceBasic rawBasicDiceStr 
                    // get operations parsed
                    let reroll, explode, keepdrop = getOperations rawOperations
                    let singleDice = Dice.create(diceCount,diceSize,?explode = explode,?reroll=reroll,?keepdrop = keepdrop)
                    DiceRollInfo.create(singleDice,command)
                )
                |> ResizeArray
            DiceSet.create(count,dice)
        )
        |> ResizeArray
    DiceSets.create(
        input,
        sets,
        now
    )