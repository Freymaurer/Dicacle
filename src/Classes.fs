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

open System

let rollOnceBy(max:int, rnd:Random) =
    rnd.Next(1, max+1)

let rollOnce(max:int) =
    let rnd = new Random()
    rnd.Next(1, max+1)

let rollMultiple(count:int, max: int) =
    let rnd = new Random()
    ResizeArray([
        for _ in 1 .. count do
            yield rnd.Next(1, max+1)
    ])  

module RollAux =

    module RerollAux =

        /// reroll if roll <= threshold
        let rerollOnce(treshold: int, roll: int, diceSize: int) =
            if roll <= treshold then 
                rollOnce(diceSize)
            else 
                roll
            |> fun r -> {|rerolls=1; roll=r|}

        /// reroll inf (max 100) if roll <= threshold
        let rerollInf(treshold: int, roll: int, diceSize: int) =
            let rnd = new Random()
            let rec loop (tries: int) (currentRoll: int) =
                if tries >= 100 then
                    {|rerolls=tries; roll=currentRoll|}
                elif currentRoll <= treshold then 
                    let nextRoll = rollOnceBy(diceSize,rnd)
                    loop (tries+1) nextRoll
                else 
                    {|rerolls=tries; roll=currentRoll|}
            loop 0 roll

    module ExplodeAux =

        /// explode if roll >= threshold
        let explodeOnce(treshold: int, roll: int, diceSize: int) =
            if roll >= treshold then 
                roll+rollOnce(diceSize)
            else 
                roll
            |> fun r -> {|sum=r; explosions=1|}

        /// explode inf (max 100) if roll >= threshold
        let explodeInf(treshold: int, roll: int, diceSize: int) =
            let rnd = new Random()
            let rec loop (tries: int) (lastRoll: int) (sum: int) =
                if tries >= 100 then
                    {|sum=sum; explosions=tries|}
                elif lastRoll >= treshold then 
                    let nextRoll = rollOnceBy(diceSize,rnd) 
                    let sum = sum + nextRoll
                    loop (tries+1) nextRoll sum
                else 
                    {|sum=sum; explosions=tries|}
            loop 0 roll roll

    let reroll(t: Reroll, diceSize: int, rollArr: ResizeArray<int>) =
        let prepareReroll = 
            match t with 
            | Reroll.Once treshold -> 
                fun roll -> RerollAux.rerollOnce(treshold,roll,diceSize) 
            | Reroll.Inf treshold -> 
                fun roll -> RerollAux.rerollInf(treshold,roll,diceSize)
        //let mutable l = []
        for i in 0 .. (rollArr.Count-1) do
            let roll = rollArr.[i]
            let ex = prepareReroll roll
            rollArr.[i] <- ex.roll
        //    l <- ex::l
        //l |> List.rev

    let explode(t: Explode, diceSize: int, rollArr: ResizeArray<int>) =
        let prepareExplode = 
            match t with 
            | Explode.Once treshold -> 
                fun roll -> ExplodeAux.explodeOnce(treshold,roll,diceSize) 
            | Explode.Inf treshold -> 
                fun roll -> ExplodeAux.explodeInf(treshold,roll,diceSize)
        //let mutable l = []
        for i in 0 .. (rollArr.Count-1) do
            let roll = rollArr.[i]
            let ex = prepareExplode roll
            rollArr.[i] <- ex.sum
        //    l <- ex::l
        //l |> List.rev

    let keepDrop(kdt: KeepDrop, rollArr:ResizeArray<int>) =
        rollArr.Sort()
        match kdt with
        | KeepDrop.KeepHighest n -> 
            let diff = rollArr.Count - n
            rollArr.RemoveRange(0,diff)
        | KeepDrop.KeepLowest n -> 
            let diff = rollArr.Count - n
            rollArr.RemoveRange(n,diff)
        | KeepDrop.DropHighest n -> 
            let diff = rollArr.Count - n
            rollArr.RemoveRange(diff,n)
        | KeepDrop.DropLowest n ->
            rollArr.RemoveRange(0,n)

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

type Dice with
    member this.roll(): DiceRoll = 
        let rolls = rollMultiple(this.DiceCount, this.DiceSize)
        this.Explode |> Option.map (fun et -> RollAux.explode(et,this.DiceSize,rolls)) |> ignore
        this.Reroll |> Option.map (fun rt -> RollAux.reroll(rt,this.DiceSize,rolls)) |> ignore
        this.KeepDrop |> Option.map (fun kdt -> RollAux.keepDrop(kdt,rolls)) |> ignore
        DiceRoll.create(this, rolls, Seq.sum rolls)

type SetResult = {
    Index: int
    Results: DiceRoll list
} with
    static member create(i, res) = {
        Index = i
        Results = res
    }

type DiceSet = {
    SetCount: int
    DiceRolls: Dice list
    Results: ResizeArray<SetResult>
} with
    static member create(count, diceRolls, ?results) = {
        SetCount = count
        DiceRolls = diceRolls
        Results = defaultArg results <| ResizeArray()
    }
    member this.roll() =
        let results = 
            [
                for i in 1 .. this.SetCount do
                    let results = this.DiceRolls |> List.map (fun d -> d.roll())
                    SetResult.create(i, results)
            ]
            |> ResizeArray
        {this with Results = results}