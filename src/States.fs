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
        History: ResizeArray<DiceSet>
    } with
        static member init() = 
            let diceStorage = 
                DiceStorage.load() |> Option.defaultValue (System.Collections.Generic.Dictionary<string, string>())
            let history =
                History.load() |> Option.defaultValue (ResizeArray())
            {
                Input = ""
                Results = ResizeArray()
                DiceStorage = diceStorage
                History = history
            }

        member this.KeyFromInput = if this.Input <> "" then this.Input.Remove(0,1) else ""
        member this.GetRecent = 
            let recent = ResizeArray<string>()
            let mutable iterator = 0
            while recent.Count < 5 && iterator <= (this.History.Count-1) do
                let input = this.History.[iterator].Input.Replace(" ","")
                iterator <- iterator + 1
                if recent.Contains(input) |> not then
                    recent.Add(input)

            recent