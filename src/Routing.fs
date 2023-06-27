module Routing

open Feliz

type Pages = 
| Dicacle
| Reference
| Counter
| NotFound
    with
        member this.AsUrl =
            match this with
            | Dicacle   -> "#/"
            | Reference -> "#/reference"
            | Counter   -> "#/counter"
            | NotFound  -> "#/404"

        static member ofUrl(url: string list) =
            match url with
            | [ ] | [ "/" ]     -> Dicacle
            | [ "reference" ]   -> Reference
            | [ "counter" ]     -> Counter
            | otherwise         -> NotFound

        static member ofHash(hashStr:string) =
            match hashStr with
            | "" | "#/"     -> Dicacle
            | "#/reference" -> Reference
            | "#/counter"   -> Counter
            | otherwise     -> NotFound

        member this.PageName =
            match this with
            | Dicacle   -> "Dicacle"
            | Reference -> "Reference"
            | Counter   -> "Counter"
            | NotFound  -> "404"