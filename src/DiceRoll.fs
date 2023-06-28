[<AutoOpenAttribute>]
module DiceRoll

open System

let rollOnceBy(max:int, rnd:Random) =
    rnd.Next(1, max+1)

let rollMultipleBy(count:int, max: int) =
    fun (rnd: Random) ->
        ResizeArray([
            for _ in 1 .. count do
                yield rnd.Next(1, max+1)
        ])  