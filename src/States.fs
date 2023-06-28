module States

open Classes
open LocalStorage

module DiceStorage =

    type State = {
        Name: string
        DiceString: string
    } with
        static member init() = 
            {
                Name = ""
                DiceString = ""
            }

module Dicacle =

    type State = {
        Input: string
        Results: ResizeArray<DiceSet>
        DiceStorage: System.Collections.Generic.Dictionary<string, string>
    } with
        static member init() = 
            let diceStorage = 
                DiceStorage.load() |> Option.defaultValue (System.Collections.Generic.Dictionary<string, string>())
            {
                Input = ""
                Results = ResizeArray()
                DiceStorage = diceStorage
            }

        member this.KeyFromInput = if this.Input <> "" then this.Input.Remove(0,1) else ""