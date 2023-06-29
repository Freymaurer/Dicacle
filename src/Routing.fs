module Routing

open Feliz

type Pages = 
| Dicacle
| Reference
| NotFound
    with
        member this.AsUrl =
            match this with
            | Dicacle   -> "#/"
            | Reference -> "#/reference"
            | NotFound  -> "#/404"

        static member ofUrl(url: string list) =
            match url with
            | [ ] | [ "/" ]     -> Dicacle
            | [ "reference" ]   -> Reference
            | otherwise         -> NotFound

        static member ofHash(hashStr:string) =
            match hashStr with
            | "" | "#/"     -> Dicacle
            | "#/reference" -> Reference
            | otherwise     -> NotFound

        member this.PageName =
            match this with
            | Dicacle   -> "Dicacle"
            | Reference -> "Reference"
            | NotFound  -> "404"