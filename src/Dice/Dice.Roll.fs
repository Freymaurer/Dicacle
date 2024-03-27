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


module RollAux =

    module RerollAux =

        /// reroll if roll <= threshold
        let rerollOnce(treshold: int, roll: int, diceSize: int) =
            fun (rnd:Random) ->
                if roll <= treshold then 
                    rollOnceBy(diceSize, rnd)
                else 
                    roll
                |> fun r -> {|rerolls=1; roll=r|}

        /// reroll inf (max 100) if roll <= threshold
        let rerollInf(treshold: int, roll: int, diceSize: int) =
            fun (rnd:Random) ->
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
            fun (rnd:Random) ->
                if roll >= treshold then 
                    roll+rollOnceBy(diceSize, rnd)
                else 
                    roll
                |> fun r -> {|sum=r; explosions=1|}

        /// explode inf (max 100) if roll >= threshold
        let explodeInf(treshold: int, roll: int, diceSize: int) =
            fun (rnd:Random) ->
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

    let reroll(reroll: DiceOperations, diceSize: DiceSize, rollArr: ResizeArray<int>) =
        fun (rnd:Random) ->
            let prepareReroll = 
                match reroll with 
                | Reroll treshold -> 
                    fun roll -> RerollAux.rerollOnce(treshold,roll,diceSize) rnd
                | RerollInfinity treshold -> 
                    fun roll -> RerollAux.rerollInf(treshold,roll,diceSize) rnd
                | _ ->
                    failwith "Passed non-reroll operation into 'reroll' function."
            //let mutable l = []
            for i in 0 .. (rollArr.Count-1) do
                let roll = rollArr.[i]
                let ex = prepareReroll roll
                rollArr.[i] <- ex.roll
        //    l <- ex::l
        //l |> List.rev

    let explode(explode: DiceOperations, diceSize: int, rollArr: ResizeArray<int>) =
        fun (rnd:Random) ->
            let prepareExplode = 
                match explode with 
                | Explode treshold -> 
                    fun roll -> ExplodeAux.explodeOnce(treshold,roll,diceSize) rnd
                | ExplodeInfinity treshold -> 
                    fun roll -> ExplodeAux.explodeInf(treshold,roll,diceSize) rnd
                | _ ->
                    failwith "Passed non-explode operation into 'explode' function."
            //let mutable l = []
            for i in 0 .. (rollArr.Count-1) do
                let roll = rollArr.[i]
                let ex = prepareExplode roll
                rollArr.[i] <- ex.sum
        //    l <- ex::l
        //l |> List.rev

    let keepDrop(kdt: DiceOperations, rollArr:ResizeArray<int>) =
        rollArr.Sort()
        match kdt with
        | KeepHighest n -> 
            let diff = rollArr.Count - n
            rollArr.RemoveRange(0,diff)
        | KeepLowest n -> 
            let diff = rollArr.Count - n
            rollArr.RemoveRange(n,diff)
        | DropHighest n -> 
            let diff = rollArr.Count - n
            rollArr.RemoveRange(diff,n)
        | DropLowest n ->
            rollArr.RemoveRange(0,n)
        | _ ->
            failwith "Passed non-keep/drop operation into 'keepDrop' function."

type DiceOperations with
    /// <summary>
    /// This function updates the given ResizeArray mutably.
    /// </summary>
    /// <param name="diceSize"></param>
    /// <param name="r"></param>
    /// <param name="rnd"></param>
    static member rollBy(diceSize, r, rnd) = 
        fun (operation: DiceOperations) ->
            match operation with
            | KeepHighest _ | KeepLowest _ | DropHighest _ | DropLowest _ ->
                RollAux.keepDrop(operation, r)
            | Reroll _ | RerollInfinity _ ->
                RollAux.reroll(operation, diceSize, r) rnd
            | Explode _ | ExplodeInfinity _ ->
                RollAux.explode(operation, diceSize, r) rnd

type Dice with
    member this.roll(): ResizeArray<int> = 
        let rnd = new Random()
        this.rollBy(rnd)

    member this.rollBy(rnd:Random) : ResizeArray<int> =
        let rolls = rollMultipleBy(this.DiceCount, this.DiceSize) rnd
        for diceOperation in this.Operations do
            DiceOperations.rollBy(this.DiceSize, rolls, rnd) diceOperation
        rolls

type DiceRollInfo with
    
    member this.roll() = 
        let rnd = new Random()
        this.rollBy(rnd)
    
    member this.rollBy(rnd:Random) =
        let r = this.Dice.rollBy(rnd)
        let sum = Seq.sum r
        {this with DiceRolled = r; DiceRollSum = sum}

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
                            d.Command.AsFunction acc d.DiceRollSum
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