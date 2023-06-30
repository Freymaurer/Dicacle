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
        Results: DiceSets option
        DiceStorage: System.Collections.Generic.Dictionary<string, string>
        History: ResizeArray<DiceSets>
        // Must use mutable to allow for ui changes in subcomponent.
        QuickAccess: Set<string>
    } with
        static member init() = 
            let diceStorage = 
                DiceStorage.load() |> Option.defaultValue (System.Collections.Generic.Dictionary<string, string>())
            let history =
                History.load() |> Option.defaultValue (ResizeArray())
            let quickAccess =
                QuickAccess.load() 
                |> Option.defaultValue Set.empty
                |> Set.filter(fun key -> diceStorage.ContainsKey(key))
            {
                Input = ""
                Results = None
                DiceStorage = diceStorage
                History = history
                QuickAccess = quickAccess
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

module History =

    type State = {
        IsActive: bool
    } with
        static member init() = {
            IsActive = false
        }