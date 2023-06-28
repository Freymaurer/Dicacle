﻿module LocalStorage



[<RequireQualifiedAccess>]
module DiceStorage =

    open Browser
    open Fable.SimpleJson

    let [<Literal>] DiceStorage_Key = "DiceStorage"

    let write(storedDice: System.Collections.Generic.Dictionary<string, string>) = 
        let v = Json.serialize storedDice
        WebStorage.localStorage.setItem(DiceStorage_Key, v)

    let load() =
        try 
            WebStorage.localStorage.getItem(DiceStorage_Key)
            |> Json.parseAs<System.Collections.Generic.Dictionary<string, string>>
            |> Some
        with
            |_ -> 
                printfn "Could not find DiceStorage"
                None

