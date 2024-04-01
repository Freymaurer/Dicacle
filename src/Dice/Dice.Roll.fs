[<AutoOpenAttribute>]
module Dice.Roll

open Classes
open System

let rollOnceBy(max:int, rnd:Random) =
    rnd.Next(1, max+1)

let rollMultipleBy(count:int, max: int) =
    fun (rnd: Random) ->
        ResizeArray([
            for _ in 1 .. count do
                yield rnd.Next(1, max+1)
        ])  

module Helper =

    let private rollDiceAcc(initialRoll: int, diceSize: int, maxTries: int, nextRollEvaluator: int -> bool) =
        fun (rnd:Random) ->
            let rec loop (tries: int) (currentRoll: int) (acc: int list)=
                if tries >= maxTries then
                    acc
                elif nextRollEvaluator currentRoll then 
                    let nextRoll = rollOnceBy(diceSize,rnd)
                    let nextAcc = nextRoll::acc
                    loop (tries+1) nextRoll nextAcc
                else 
                    acc
            loop 0 initialRoll [initialRoll]

    let explodeDice(treshold: int, roll: int, diceSize: int, maxTries: int) =
        let nextRollEvaluator nextRoll = nextRoll >= treshold
        rollDiceAcc (roll,diceSize,maxTries,nextRollEvaluator)

    let reroll(t: Reroll, diceSize: int, current: ResizeArray<int>) = 
        fun (rnd:Random) ->
            let prepareReroll = fun roll -> 
                let nextRollEvaluator nextRoll = nextRoll <= t.Threshold
                rollDiceAcc (roll,diceSize,t.MaxTries,nextRollEvaluator) rnd
            let nextResult: ResizeArray<Rerolls> = ResizeArray(current.Count)
            for roll in current do
                let acc = prepareReroll roll
                nextResult.Add(acc)
            nextResult

    let explode(t: Explode, diceSize: int, current: ResizeArray<int>) = 
        fun (rnd:Random) ->
            let prepareReroll = fun roll -> 
                let nextRollEvaluator nextRoll = nextRoll >= t.Threshold
                rollDiceAcc (roll,diceSize,t.MaxTries,nextRollEvaluator) rnd
            let nextResult: ResizeArray<Rerolls> = ResizeArray(current.Count)
            for roll in current do
                let acc = prepareReroll roll
                nextResult.Add(acc)
            nextResult

    let keepDrop(kdt: KeepDrop, current: ResizeArray<int>) =
        current.Sort()
        let c = current.Count
        let removeRangeLow, removeRangeHigh =
            match kdt with
            | KeepDrop.KeepHighest n -> 
                let diff = c - n
                (0,diff-1)
            | KeepDrop.KeepLowest n -> 
                let diff = c - n
                (n,n+diff-1)
            | KeepDrop.DropHighest n -> 
                let diff = c - n
                (diff,n+diff-1)
            | KeepDrop.DropLowest n ->
                (0,n-1)
        let next = ResizeArray(current.Count)
        for i in 0..(c-1) do
            let e = current.[i]
            if i >= removeRangeLow && i <= removeRangeHigh then
                next.Add (Remove e)
            else
                next.Add (Ok e)
        next

type Dice with
    member this.roll(): DiceResult = 
        let rnd = new Random()
        this.rollBy(rnd)

    member this.rollBy(rnd:Random): DiceResult =
        let rolls = rollMultipleBy(this.DiceCount, this.DiceSize) rnd
        let result = DiceResult.init rolls
        result
        |> fun r ->
            let rerolls = 
                this.Reroll |> Option.map (fun config ->
                    Helper.reroll(config,this.DiceSize,r.Current) rnd
                )
            {r with Rerolls = rerolls}
        |> fun r ->
            let explodes = 
                this.Explode |> Option.map (fun config ->
                    Helper.explode(config,this.DiceSize,r.Current) rnd
                )
            {r with Explodes = explodes}
        |> fun r ->
            let keepDrop = 
                this.KeepDrop |> Option.map (fun config ->
                    Helper.keepDrop(config,r.Current)
                )
            {r with KeepDrops = keepDrop}
        //for diceOperation in this.Operations do
        //    DiceOperations.rollBy(this.DiceSize, rolls, rnd) diceOperation
        //rolls

type DiceRollInfo with
    
    member this.roll() = 
        let rnd = new Random()
        this.rollBy(rnd)
    
    member this.rollBy(rnd:Random) =
        let r = this.Dice.rollBy(rnd)
        {this with Result = Some r}

type DiceSet with
    member this.roll() =
        let rnd = new System.Random()
        this.rollBy(rnd)

    /// This is not feasible currently. I need a new idea on how to manage my results correctly.
    member this.rollBy(rnd:Random) =
        let results =
            [|
                for count in 1 .. this.SetCount do
                    let diceResults = this.Dice |> Array.ofSeq |> Array.map (fun d -> d.rollBy(rnd))
                    let sum = 
                        diceResults 
                        |> Array.fold (fun acc d -> 
                            d.Command.AsFunction acc d.Result.Value.Sum
                        ) 0
                    SetResult.create(count, diceResults, sum)
            |]
        {this with Results = results}

type DiceSets with
    member this.roll() =
        let rnd = new System.Random()
        this.rollBy(rnd)

    member this.rollBy(rnd:Random) =
        let nextSets = 
            [|
                for i in 0 .. (this.DiceSets.Count-1) do
                    let set = this.DiceSets.[i]
                    set.rollBy(rnd)
            |]
            |> ResizeArray
        { this with DiceSets = nextSets }