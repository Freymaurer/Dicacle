module Classes


//type IPrintable =
//   abstract member Print : unit -> unit

//type SomeClass1(x: int, y: float) =
//   interface IPrintable with
//      member this.Print() = printfn "%d %f" x y

/// Keep/Drop highest/lowest `int` dice results
[<RequireQualifiedAccess>]
type KeepDrop =
    | KeepHighest of int
    | KeepLowest of int
    | DropHighest of int
    | DropLowest of int

    with
    static member ofString(strType:string, n: int) =
        match strType with
        | "k" | "kh"    -> KeepHighest n
        | "kl"          -> KeepLowest n
        | "d" | "dl"    -> DropLowest n
        | "dh"          -> DropHighest n
        | anyelse -> failwith $"Unable to parse `{anyelse}` to Keep/Drop logic"

/// Reroll any dice result below `int`, `Once` or `Inf`
[<RequireQualifiedAccess>]
type Reroll =
    | Once of int
    | Inf of int

    with
    static member ofString(strType:string, n: int) =
        match strType with
        | "r"       -> Reroll.Once n
        | "ir"      -> Reroll.Inf n
        | anyelse -> failwith $"Unable to parse `{anyelse}` to reroll logic"
    
/// Explode any dice result above `int`, `Once` or `Inf`
[<RequireQualifiedAccess>]
type Explode =
    | Once of int
    | Inf of int

    with
    static member ofString(strType:string, n: int) =
        match strType with
        | "e"       -> Explode.Once n
        | "ie"      -> Explode.Inf n
        | anyelse -> failwith $"Unable to parse `{anyelse}` to explode logic"

[<RequireQualifiedAccess>]
type Command =
    | Add
    | Substract
    with
    static member ofString(str:string) =
        match str with
        | "" | "+" -> Command.Add
        | "-" -> Command.Substract
        | anyelse -> failwith $"Unable to parse `{anyelse}` to `+` or `-`."

    member this.AsString =
        match this with
        | Command.Add -> "+"
        | Command.Substract -> "-"

open System

type Dice = {
    Command: Command
    DiceCount: int
    DiceSize: int
    Explode: Explode option
    Reroll: Reroll option
    KeepDrop: KeepDrop option
} with
    static member create(count:int, size:int, ?command, ?explode, ?reroll, ?keepdrop) =
        {
            DiceCount = count
            DiceSize = size
            Command = defaultArg command Command.Add
            Explode = explode
            Reroll = reroll
            KeepDrop = keepdrop
        }

type DiceRoll = {
    Dice: Dice
    /// Raw rolled dice results before sum
    DiceRolled: ResizeArray<int>
    /// Sum of rolles dice
    DiceRollSum: int
} with
    static member create(dice, diceRolled, diceRollSum) = {
        Dice = dice
        DiceRolled = diceRolled
        DiceRollSum = diceRollSum
    }


type SetResult = {
    Index: int
    Results: ResizeArray<DiceRoll>
} with
    static member create(i, res) = {
        Index = i
        Results = res
    }

type DiceSet = {
    SetCount: int
    DiceRolls: ResizeArray<Dice>
    Results: ResizeArray<SetResult>
} with
    static member create(count, diceRolls, ?results) = {
        SetCount = count
        DiceRolls = diceRolls
        Results = defaultArg results <| ResizeArray()
    }
    