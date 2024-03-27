[<AutoOpenAttribute>]
module Classes

type DiceCount = int
type DiceSize = int
type FlatBonus = int
type Threshold = int
type Count = int

type DiceOperations =
    | KeepHighest of Count
    | KeepLowest of Count
    | DropHighest of Count
    | DropLowest of Count
    /// Reroll below Threshold
    | Reroll of Threshold
    | RerollInfinity of Threshold
    /// Explode above Threshold
    | Explode of Threshold
    | ExplodeInfinity of Threshold

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
    Operations: DiceOperations []
} with
    /// <summary>
    /// Used to create most inner dice roll information. 
    /// </summary>
    /// <param name="count"></param>
    /// <param name="size">defaultArg: 1</param>
    /// <param name="operations">defaultArg: 0</param>
    static member create (count, ?size, ?operations: DiceOperations []) = {
        DiceCount = count
        DiceSize = defaultArg size 1
        Operations = defaultArg operations Array.empty
    }

[<CustomEquality; NoComparison>]
type DiceRollInfo = {
    Dice: Dice
    /// (+) or (-)
    Command: Command
    /// Raw rolled dice results before sum
    DiceRolled: ResizeArray<int>
    /// Sum of rolles dice
    DiceRollSum: int
} with
    static member create(dice, ?command, ?diceRolled, ?diceRollSum) = {
        Dice = dice
        Command = defaultArg command Command.Plus
        DiceRolled = defaultArg diceRolled <| ResizeArray()
        DiceRollSum = defaultArg diceRollSum 0
    }

    override this.Equals(o: obj) =
        match o with
        | :? DiceRollInfo as other->
            this.Dice = other.Dice
            && this.Command = other.Command
            && Seq.length this.DiceRolled = Seq.length other.DiceRolled
            && Seq.forall2 (fun t o -> t = o) this.DiceRolled other.DiceRolled
            && this.DiceRollSum = other.DiceRollSum
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