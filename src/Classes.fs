[<AutoOpenAttribute>]
module Classes

type DiceCount = int
type DiceSize = int
type FlatBonus = int
type Threshold = int
type Count = int

/// Keep/Drop highest/lowest `int` dice results
[<RequireQualifiedAccess>]
type KeepDrop =
    | KeepHighest of Count
    | KeepLowest of Count
    | DropHighest of Count
    | DropLowest of Count

type KeepDropResult =
    | Ok of int
    | Remove of int
    with
        member this.Number =
            match this with
            | Ok i -> i
            | Remove i -> i
        member this.NumberOk =
            match this with
            | Ok i -> Some i
            | Remove _ -> None
        member this.IsRemoved = match this with | Remove _ -> true | _ -> false

/// Reroll any dice result below `Count`, `Once` or `Infinity`
[<RequireQualifiedAccess>]
type Reroll =
    | Once of Threshold
    | Infinity of Threshold

    with
        member this.MaxTries =
            match this with
            | Once _ -> 1
            | Infinity _ -> 100
        member this.Threshold =
            match this with
            | Once t -> t
            | Infinity t -> t
    
/// Explode any dice result above `int`, `Once` or `Inf`
[<RequireQualifiedAccess>]
type Explode =
    | Once of Threshold
    | Infinity of Threshold

    with
        member this.MaxTries =
            match this with
            | Once _ -> 1
            | Infinity _ -> 100
        member this.Threshold =
            match this with
            | Once t -> t
            | Infinity t -> t


type [<RequireQualifiedAccess>] Command = 
    | Plus
    | Minus
    member this.AsFunction = 
        match this with | Plus -> (+) | Minus -> (-)

    member this.AsString =
        match this with
        | Command.Plus -> "+"
        | Command.Minus -> "-"

    static member fromString (str: string) = 
        match str with | "" | "+" -> Command.Plus | "-" -> Command.Minus | any -> failwithf "Error: Unknow pattern for Command: %s" any

open System

type Dice = {
    DiceCount: DiceCount
    DiceSize: DiceSize
    Explode: Explode option
    Reroll: Reroll option
    KeepDrop: KeepDrop option
} with
    /// <summary>
    /// Used to create most inner dice roll information. 
    /// </summary>
    /// <param name="count"></param>
    /// <param name="size">defaultArg: 1</param>
    /// <param name="operations">defaultArg: 0</param>
    static member create (count, ?size, ?explode, ?reroll, ?keepdrop) = {
        DiceCount = count
        DiceSize = defaultArg size 1
        Explode = explode
        Reroll = reroll
        KeepDrop = keepdrop
    }

type Rerolls = int list
type Explodes = int list

type DiceResult = {
    InitialRoll: ResizeArray<int>
    Rerolls: ResizeArray<Rerolls> option
    Explodes: ResizeArray<Explodes> option
    KeepDrops: ResizeArray<KeepDropResult> option
} with
    static member init(init: ResizeArray<int>) = { 
        InitialRoll = init; 
        Rerolls = None
        Explodes = None
        KeepDrops = None
    }
    /// <summary>
    /// This function is used during roll calculation to alway get the latest
    /// </summary>
    member this.Current =
        match this with
        | {KeepDrops = Some l} ->
            let r = ResizeArray()
            for e in l do
                if e.NumberOk.IsSome then 
                    r.Add(e.NumberOk.Value)
            r
        | {Explodes = Some l} ->
            let r = ResizeArray()
            for e in l do
                r.Add (List.sum e)
            r
        | {Rerolls = Some l} ->
            let r = ResizeArray()
            for e in l do
                r.Add (List.head e)
            r
        | _ -> 
            ResizeArray(this.InitialRoll)
    member this.Filled =
        let init = this.InitialRoll
        let rerolls = this.Rerolls |> Option.defaultValue (ResizeArray([for v in init do [v]]))
        let explodes = this.Explodes |> Option.defaultValue (ResizeArray([for v in rerolls do [List.head v]]))
        let keepdrop = this.KeepDrops |> Option.defaultValue (ResizeArray([for v in explodes do List.sum v |> Ok]))
        {
            InitialRoll = init
            Rerolls     = Some rerolls
            Explodes    = Some explodes
            KeepDrops   = Some keepdrop
        }

    member this.Sum = this.Current |> Seq.sum

[<CustomEquality; NoComparison>]
type DiceRollInfo = {
    Dice: Dice
    /// (+) or (-)
    Command: Command
    /// Sum of rolles dice
    Result: DiceResult option
} with
    static member create(dice, ?command, ?result) = {
        Dice = dice
        Command = defaultArg command Command.Plus
        Result = defaultArg result None
    }

    override this.Equals(o: obj) =
        match o with
        | :? DiceRollInfo as other->
            this.Dice = other.Dice
            && this.Command = other.Command
            && this.Result = other.Result
        | _ -> 
            failwith "Error. Cannot compare `DiceRollInfo` with another type."

    override this.GetHashCode() = failwith "GetHashCode is not implemented on `DiceRollInfo`!"

type SetResult = {
    Index: int
    Dice: DiceRollInfo []
    Sum: int
} with
    static member create(index, dice, sum) =
        {
            Index = index
            Dice = dice
            Sum = sum
        }

[<CustomEquality; NoComparison>]
type DiceSet = {
    SetCount: int
    Dice: ResizeArray<DiceRollInfo>
    Results: SetResult []
} with
    static member create(count, dice) = {
        SetCount = count
        Dice = dice
        Results = [||]
    }

    override this.Equals(o: obj) =
        match o with
        | :? DiceSet as other->
            this.SetCount = other.SetCount
            && Seq.length this.Dice = Seq.length other.Dice
            && Seq.forall2 (fun t o -> t = o) this.Dice other.Dice
        | _ -> 
            failwith "Error. Cannot compare `DiceSet` with another type."

    override this.GetHashCode() = failwith "GetHashCode is not implemented on `DiceSet`!"
    
[<CustomEquality; NoComparison>]
type DiceSets = {
    Input: string
    Time: System.DateTime
    DiceSets: ResizeArray<DiceSet>
} with
    static member create(input:string, sets, ?now) = 
        {
            Input = input
            Time = defaultArg now System.DateTime.Now
            DiceSets = sets
        }

    override this.Equals(o: obj) =
        match o with
        | :? DiceSets as other->
            this.Input = other.Input
            && this.Time = other.Time
            && Seq.length this.DiceSets = Seq.length other.DiceSets
            && Seq.forall2 (fun t o -> t = o) this.DiceSets other.DiceSets
        | _ -> 
            failwith "Error. Cannot compare DiceSets with another type."

    override this.GetHashCode() = failwith "GetHashCode is not implemented on `DiceSets`!"