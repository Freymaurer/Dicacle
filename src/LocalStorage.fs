namespace LocalStorage

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
                WebStorage.localStorage.removeItem(DiceStorage_Key)
                printfn "Could not find DiceStorage"
                None

[<RequireQualifiedAccess>]
module History =

    open Browser
    open Fable.SimpleJson

    let [<Literal>] History_Key = "History"

    let write(storedDice: ResizeArray<Classes.DiceSets>) = 
        let v = Json.serialize storedDice
        WebStorage.localStorage.setItem(History_Key, v)

    let load() =
        try 
            WebStorage.localStorage.getItem(History_Key)
            |> Json.parseAs<ResizeArray<Classes.DiceSets>>
            |> Some
        with
            |_ -> 
                WebStorage.localStorage.removeItem(History_Key)
                printfn "Could not find History"
                None

[<RequireQualifiedAccess>]
module QuickAccess =

    open Browser
    open Fable.SimpleJson

    let [<Literal>] QuickAccess_Key = "QuickAccess"

    let write(storedDice: Set<string>) =
        let v = Json.serialize storedDice
        WebStorage.localStorage.setItem(QuickAccess_Key, v)

    let load() =
        try 
            WebStorage.localStorage.getItem(QuickAccess_Key)
            |> Json.parseAs<Set<string>>
            |> Some
        with
            |_ -> 
                WebStorage.localStorage.removeItem(QuickAccess_Key)
                printfn "Could not find QuickAccess"
                None