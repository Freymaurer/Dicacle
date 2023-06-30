module Component.History

open Feliz
open Feliz.Bulma

open Classes
open States
open Dice.HtmlAux

let private showSet (set:DiceSet) =
    Html.ol [
        for setResult in set.Results do
            Html.li [
                prop.key (sprintf "set-index-%i" setResult.Index)
                prop.children [
                    setResult.ToHtml()
                ]
            ]
    ]

let private emptyDefault = 
    Bulma.field.div [
        Bulma.notification [
            prop.className "mb-1"
            prop.text "History is empty"
        ]
    ]

let private displayInputFromSets (sets:DiceSets, state: Dicacle.State, setState: Dicacle.State -> unit) =
    Html.div [
        prop.className "mb-1"
        prop.children [
            Html.code sets.Input
            Bulma.button.button [
                prop.onClick(fun _ -> 
                    let nextState = {state with Input=sets.Input}
                    setState nextState
                )
                Bulma.button.isSmall
                prop.className "is-ghost"
                prop.style [style.float'.right]
                prop.children [ Bulma.icon [Html.i [prop.className "fa-regular fa-paste"] ]]
            ]
        ]
    ]
    
let private displayDateTimeFromSets(sets:DiceSets) =
    Html.div [
        prop.className "mb-1"
        prop.children [
            Bulma.help [ 
                prop.text (sets.Time.ToLongDateString() + " " + sets.Time.ToLongTimeString())
            ]
        ]
    ]

let private clearHistoryButton(state: Dicacle.State, setState) =
    Bulma.button.button [
        prop.onClick(fun _ ->
            let nextState = {state with History = ResizeArray()}
            setState nextState
            LocalStorage.History.write nextState.History
        )
        prop.className "is-danger"
        Bulma.button.isFullWidth
        prop.text "Clear History"
    ]

let private showSets (state:Dicacle.State, setState: Dicacle.State -> unit) =
    Bulma.field.div [
        prop.id "history-container"
        prop.children [
            if state.History.Count = 0 then
                emptyDefault
            else
                for sets in state.History do
                    Bulma.field.div [
                        displayDateTimeFromSets(sets)
                        displayInputFromSets(sets, state, setState)
                        for set in sets.DiceSets do
                            showSet set
                    ]
                clearHistoryButton(state, setState)
        ]
    ]

open History

let private toggleButton(state:State, setState: State -> unit) =
    Bulma.button.button [
        prop.id ElementId.DiceRoller_HistoryButton
        prop.role "button"
        prop.title "Toggle History"
        prop.onClick (fun _ -> setState {state with IsActive = not state.IsActive})
        prop.children [
            Bulma.icon [
                Bulma.icon.isSmall
                prop.children (Html.i [
                    prop.className "fa-regular fa-rectangle-list"
                ])
            ]
        ]
    ]

[<ReactComponent>]
let Main(diceState: Dicacle.State, setDicacleState: Dicacle.State -> unit) = 
    let state, setState = React.useState(State.init)
    Html.div [
        prop.id ElementId.DiceRoller_History
        prop.style [
            if not state.IsActive then style.minWidth.unset
        ]
        prop.children [
            toggleButton(state, setState)
            Html.div [ 
                prop.id ElementId.DiceRoller_HistoryInner
                prop.style [
                    if not state.IsActive then style.display.none
                ]
                prop.children [
                    showSets (diceState, setDicacleState)
                ]
            ]
        ]
    ]

