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

    let reroll(t: Reroll, diceSize: int, rollArr: ResizeArray<int>) =
        fun (rnd:Random) ->
            let prepareReroll = 
                match t with 
                | Reroll.Once treshold -> 
                    fun roll -> RerollAux.rerollOnce(treshold,roll,diceSize) rnd
                | Reroll.Inf treshold -> 
                    fun roll -> RerollAux.rerollInf(treshold,roll,diceSize) rnd
            //let mutable l = []
            for i in 0 .. (rollArr.Count-1) do
                let roll = rollArr.[i]
                let ex = prepareReroll roll
                rollArr.[i] <- ex.roll
        //    l <- ex::l
        //l |> List.rev

    let explode(t: Explode, diceSize: int, rollArr: ResizeArray<int>) =
        fun (rnd:Random) ->
            let prepareExplode = 
                match t with 
                | Explode.Once treshold -> 
                    fun roll -> ExplodeAux.explodeOnce(treshold,roll,diceSize) rnd
                | Explode.Inf treshold -> 
                    fun roll -> ExplodeAux.explodeInf(treshold,roll,diceSize) rnd
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

type Dice with
    member this.roll(): DiceRoll = 
        let rnd = new Random()
        this.rollBy(rnd)

    member this.rollBy(rnd:Random) =
        let rolls = rollMultipleBy(this.DiceCount, this.DiceSize) rnd
        this.Explode |> Option.map (fun et -> RollAux.explode(et,this.DiceSize,rolls)) |> ignore
        this.Reroll |> Option.map (fun rt -> RollAux.reroll(rt,this.DiceSize,rolls)) |> ignore
        this.KeepDrop |> Option.map (fun kdt -> RollAux.keepDrop(kdt,rolls)) |> ignore
        DiceRoll.create(this, rolls, Seq.sum rolls)

type DiceSet with
    member this.roll() =
        let rnd = new System.Random()
        this.rollBy(rnd)

    member this.rollBy(rnd:Random) =
        let results = 
            [
                for i in 1 .. this.SetCount do
                    let results = this.DiceRolls |> Seq.map (fun d -> d.rollBy(rnd))
                    SetResult.create(i, ResizeArray(results))
            ]
            |> ResizeArray
        {this with Results = results}