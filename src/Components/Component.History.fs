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
                    (setResult.ToHtml())
                ]
            ]
    ]

let private showSets (state:Dicacle.State, setState: Dicacle.State -> unit) =
    Bulma.field.div [
        prop.id "history-container"
        prop.children [
            if state.History.Count = 0 then
                Html.none
            else
                for set in state.History do
                    Bulma.field.div [
                        Html.div [
                            prop.className "mb-1"
                            prop.children [
                                Html.code set.Input
                                Bulma.button.button [
                                    prop.onClick(fun _ -> 
                                        let nextState = {state with Input=set.Input}
                                        setState nextState
                                    )
                                    Bulma.button.isSmall
                                    prop.className "is-ghost"
                                    prop.style [style.float'.right]
                                    prop.children [ Bulma.icon [Html.i [prop.className "fa-regular fa-paste"] ]]
                                ]
                            ]
                        ]
                        showSet set
                    ]
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

