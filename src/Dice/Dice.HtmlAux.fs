module Dice.HtmlAux

open Feliz
open Feliz.Bulma
open Classes

let private dice_examples = [|
        "3d6 + 1d11";
        "2 (1d20+14) (1d20+9)";
        "2d20k1 + 9"
        "1d12 + 12 + 2d6"
    |]

let getDiceExample() = 
    let rnd = new System.Random()
    dice_examples.[rnd.Next(dice_examples.Length)]

let diceIconOf(diceValue: int, diceSize:int) =
    let diceImg = 
        match diceSize with
        | 4 -> Dice.Icon.d4
        | 6 -> Dice.Icon.d6
        | 8 -> Dice.Icon.d8
        | 10 -> Dice.Icon.d10
        | 12 -> Dice.Icon.d12
        | 20 -> Dice.Icon.d20
        | _ -> Dice.Icon.alt
    let color = 
        if diceValue > diceSize then Bulma.color.hasTextLink//explode
        elif diceValue = diceSize then Bulma.color.hasTextSuccessDark //max roll
        elif diceValue = 1 then Bulma.color.hasTextDanger //min roll
        else Bulma.color.isBlack
    Bulma.icon [
        Bulma.icon.isMedium
        prop.style [style.position.relative]
        prop.children [
            Html.img [
                prop.style [style.opacity 0.4]
                prop.src diceImg
            ]
            Html.span [
                color
                prop.style [
                    style.position.absolute; 
                    style.top (length.perc 50) 
                    style.left (length.perc 50) 
                    style.transform(transform.translate(length.perc -50, length.perc -50))
                    style.zIndex 2; style.fontSize (length.rem 1.5);
                    style.fontWeight.bold
                ]
                prop.text diceValue
            ]
        ]
    ]

type DiceRollInfo with
    member this.ToHtml() =
        if this.Result.IsNone then
            Html.span "-"
        else
            let result = this.Result.Value
            let size = this.Dice.DiceSize
            let container (children: Fable.React.ReactElement list) = 
                Html.span [
                    prop.children children
                ]
            let sum = 
                Html.span [
                    prop.className "mr-2 dice-result-subsum"
                    prop.text $"{this.Command.AsString}{result.Sum}"
                ]
            let createDiceIcons() = 
                [
                    sum
                    Html.span "["
                    for i in 0 .. (result.Current.Count-1) do
                        let roll = result.Current.[i]
                        let isLast = i = result.Current.Count-1
                        diceIconOf(roll,size)
                        if not isLast then 
                            Html.span " + "
                    Html.span "]"
                ]
            if size = 0 then 
                [sum] 
            else 
                createDiceIcons()
            |> container

type SetResult with
    member this.ToHtml() =
        let sum = this.Sum
        Html.div [
            prop.className "dice-result-container is-flex is-align-items-center"
            prop.children [
                Html.span [
                    prop.className "dice-result-subsum-container"
                    prop.style [style.fontSize (length.px 10)]
                    prop.children [
                        for diceRoll in this.Dice do
                            diceRoll.ToHtml()
                    ]
                ]
                Html.span [
                    prop.className "dice-roll-sum"
                    prop.style [style.custom("marginLeft", "auto"); style.minWidth.maxContent]
                    prop.children [
                        Html.span " = "
                        Html.span [
                            prop.style [style.fontWeight.bold]
                            prop.text sum
                        ]
                    ]
                ]
            ]
        ]