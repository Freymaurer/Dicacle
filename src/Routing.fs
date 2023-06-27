module Routing

open Feliz

type Pages = 
| Dicacle
| Hello
| Counter
| NotFound
    with
        member this.AsUrl =
            match this with
            | Dicacle   -> "#/"
            | Hello     -> "#/hello"
            | Counter   -> "#/counter"
            | NotFound  -> "#/404"

        static member ofUrl(url: string list) =
            match url with
            | [ ] | [ "/" ] -> Dicacle
            | [ "hello" ]   -> Hello
            | [ "counter" ] -> Counter
            | otherwise     -> NotFound

        static member ofHash(hashStr:string) =
            match hashStr with
            | "" | "#/"   -> Dicacle
            | "#/hello"   -> Hello
            | "#/counter" -> Counter
            | otherwise   -> NotFound

        member this.PageName =
            match this with
            | Dicacle   -> "Dicacle"
            | Hello     -> "Hello"
            | Counter   -> "Counter"
            | NotFound  -> "404"