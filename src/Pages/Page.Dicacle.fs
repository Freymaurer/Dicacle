module Page.Dicacle

open Feliz
open Feliz.Bulma
open Classes

let [<Literal>] private RollButtonId = "Roll-Button"

let private diceIconOf(diceValue: int, diceSize:int) =
    let diceImg = 
        match diceSize with
        | 4 -> DiceIcon.d4
        | 6 -> DiceIcon.d6
        | 8 -> DiceIcon.d8
        | 10 -> DiceIcon.d10
        | 12 -> DiceIcon.d12
        | 20 -> DiceIcon.d20
        | _ -> DiceIcon.alt
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

type private DiceRoll with
    member this.ToHtml() =
        let size = this.Dice.DiceSize
        let container (children: Fable.React.ReactElement list) = 
            Html.span [
                prop.children children
            ]
        let sum = 
            Html.span [
                prop.className "mr-2 dice-result-subsum"
                prop.text $"{this.Dice.Command.AsString}{this.DiceRollSum}"
            ]
        let createDiceIcons() = 
            [
                sum
                Html.span "["
                for i in 0 .. (this.DiceRolled.Count-1) do
                    let roll = this.DiceRolled.[i]
                    let isLast = i = this.DiceRolled.Count-1
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

type private SetResult with
    member this.ToHtml() =
        let sum = (this.Results |> Seq.sumBy (fun res -> if res.Dice.Command = Command.Substract then res.DiceRollSum * (-1) else res.DiceRollSum))
        Html.div [
            prop.className "dice-result-container is-flex is-align-items-center"
            prop.children [
                Html.span [
                    prop.className "dice-result-subsum-container"
                    prop.style [style.fontSize (length.px 10)]
                    prop.children [
                        for diceRoll in this.Results do
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

type private State = {
    Input: string
    Results: ResizeArray<DiceSet>
} with
    static member init() = {
        Input = ""
        Results = ResizeArray()
    }

let private rollDice(state:State) = 
    let sets = DiceParsing.parseStringToDice(state.Input)
    let arr = ResizeArray(sets)
    Browser.Dom.console.log("[DICE]", arr)
    let rnd = new System.Random()
    sets
    |> List.map (fun x -> x.rollBy(rnd))
    |> ResizeArray

let private event_rollDice(state:State, setState: State -> unit) =
    let nextState = { state with Results = rollDice(state) }
    setState nextState

let private searchbar(state: State, setState: State -> unit) =
    let examples = [|
        "3d6 + 1d11";
        "2 (1d20+14) (1d20+9)";
        "2d20k1 + 9"
        "1d12 + 12 + 2d6"
    |]
    let example = 
        let rnd = new System.Random()
        examples.[rnd.Next(examples.Length)]
    Bulma.input.text [
        Bulma.input.isLarge
        prop.placeholder example    
        prop.autoFocus(true)
        prop.onTextChange (fun (input) ->
            let nextState = {
                state with Input = input
            }
            setState nextState
        )
        prop.onKeyDown(key.enter, fun _ ->
            Browser.Dom.console.log("ENTER")
            event_rollDice(state, setState)
        )
    ]

let private showSetResult (set:DiceSet) =
    Html.ol [
        for setResult in set.Results do
            Html.li [
                prop.key (sprintf "set-index-%i" setResult.Index)
                prop.children [
                    (setResult.ToHtml())
                ]
            ]
    ]

let private showSetsResults (state:State) =
    Bulma.field.div [
        if state.Results.Count = 0 then
            Html.none
        else
            for i in 1 .. state.Results.Count do
                let set = state.Results.Item (i-1)
                showSetResult set
    ]

let private rollButton(state, setState) =
    Bulma.button.button [
        Bulma.button.isLarge
        prop.id RollButtonId
        prop.role "button"
        prop.text "Roll!"
        prop.onClick(fun e ->
            event_rollDice(state, setState)
        )
    ]

[<ReactComponent>]
let Main() = 
    let (state, setState) = React.useState(State.init)
    Bulma.container [
        prop.className "is-max-desktop"
        prop.children [
            Bulma.field.div [
                Bulma.field.hasAddons
                prop.children [
                    Bulma.control.div [
                        Bulma.control.isExpanded
                        prop.children [
                            searchbar(state, setState)
                        ]
                    ]
                    Bulma.control.div [ 
                        rollButton(state, setState)
                    ]
                ]
            ]
            showSetsResults state
        ]
    ]

