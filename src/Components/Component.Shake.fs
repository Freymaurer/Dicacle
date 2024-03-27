module Component.Shake


open Fable.Core.JsInterop
open Classes

[<RequireQualifiedAccess>]
type Intensity =
| None
| Light
| Medium
| Strong
| Stronger
    member this.toAnimation =
        let createAnimation = sprintf "tilt-n-move-shaking-%s 0.15s 3" 
        match this with
        | None      -> "initial"
        | Light     -> "light" |> createAnimation
        | Medium    -> "medium" |> createAnimation
        | Strong    -> "strong" |> createAnimation
        | Stronger  -> "stronger" |> createAnimation

let DiceShake(sets: DiceSets) =
    let shakeAnimation = 
        let maxDiceCount = sets.DiceSets |> Seq.collect (fun x -> x.Results) |> Seq.collect (fun x -> x.Dice) |> Seq.collect (fun x -> x.DiceRolled) |> Seq.max
        if maxDiceCount < 5 then Intensity.None
        elif maxDiceCount < 10 then Intensity.Light
        elif maxDiceCount < 15 then Intensity.Medium
        elif maxDiceCount < 20 then Intensity.Strong
        else Intensity.Stronger
        |> fun x -> x.toAnimation
    let ele = Browser.Dom.document.getElementById(ElementId.DiceRoller_Container)
    ele?style?animation <- shakeAnimation


