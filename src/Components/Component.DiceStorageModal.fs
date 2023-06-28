﻿module Component.DiceStorageModal

open Feliz
open Feliz.Bulma
open States.DiceStorage
open LocalStorage

let private emptyRow = 
    Html.tr [
        Html.td [
            prop.colSpan 2
            prop.style [style.textAlign.center]
            prop.children [
                Bulma.icon [
                    Bulma.icon.isLarge
                    prop.children [
                        Html.i [prop.className "fa-solid fa-broom fa-shake fa-2xl"]
                    ]
                ]
                Html.span "..empty"
            ]
        ]
    ]

let private addName(state:States.Dicacle.State, diceStorage: State, setDiceStorage: State -> unit) =
    Bulma.field.div [
        Bulma.field.hasAddons
        prop.children [
            Bulma.control.div [ 
                Bulma.button.button [
                    prop.tabIndex -1
                    Bulma.button.isStatic
                    prop.text "/"
                ]
            ]
            Bulma.control.div [
                prop.children [
                    Bulma.input.text [
                        if state.DiceStorage.ContainsKey diceStorage.Name then Bulma.color.isDanger
                        prop.autoFocus true
                        prop.tabIndex 0
                        prop.placeholder "..name"
                        prop.onTextChange(fun newInput ->
                            setDiceStorage { diceStorage with Name = newInput }
                        )
                    ]
                ]
            ]
        ]
    ]

let private addDiceString(diceStorage: State, setDiceStorage: State -> unit) =
    let example = Dice.HtmlAux.getDiceExample()
    Bulma.field.div [
        prop.children [
            Bulma.control.div [
                Bulma.control.hasIconsLeft
                prop.children [
                    Bulma.input.text [
                        prop.tabIndex 0
                        prop.placeholder example
                        prop.onTextChange(fun newInput ->
                            setDiceStorage { diceStorage with DiceString = newInput }
                        )
                    ]
                    Bulma.icon [
                        Bulma.icon.isLeft
                        Bulma.icon.isSmall
                        prop.children [Html.i [prop.className "fa-solid fa-dice-d20"]]
                    ]
                ]
            ]
        ]
    ]

open States
open States.Dicacle
open LocalStorage

let private addToDiceStorage(state:State, setState:State -> unit, storageState: DiceStorage.State, setStorageState: DiceStorage.State -> unit) =
    state.DiceStorage.Add(storageState.Name, storageState.DiceString)
    setState {state with DiceStorage = state.DiceStorage}
    setStorageState <| DiceStorage.State.init() // This is necessary to refresh ui
    DiceStorage.write(state.DiceStorage)

let private removeFromDiceStorage(id:string, state:State, setState:State -> unit, storageState: DiceStorage.State, setStorageState: DiceStorage.State -> unit) =
    ignore <| state.DiceStorage.Remove(id)
    setState {state with DiceStorage = state.DiceStorage}
    setStorageState <| DiceStorage.State.init() // This is necessary to refresh ui
    DiceStorage.write(state.DiceStorage)

let private storedDice(state:State, setState: State-> unit, storageState: DiceStorage.State, setStorageState: DiceStorage.State -> unit) = 
    let rmvButton(id:string) = Bulma.delete [
        prop.style [style.float'.right]
        prop.onClick(fun _ -> 
            removeFromDiceStorage(id, state, setState, storageState, setStorageState)
        )
    ]
    Bulma.table [
        Html.tbody [
            //if storageState.Current.Count > 0 then
            if state.DiceStorage.Count > 0 then
                //for KeyValue(id, diceString) in storageState.Current do
                for KeyValue(id, diceString) in state.DiceStorage do
                    Html.tr [
                        prop.key (sprintf "Stored-Dice-%s" id)
                        prop.children [
                            Html.td [prop.key (sprintf "Stored-Dice-Name-%s" id); prop.children (Html.code ("/"+id))]
                            Html.td [prop.key (sprintf "Stored-Dice-diceString-%s" id); prop.text diceString]
                            Html.td [prop.key (sprintf "Stored-Dice-remove-%s" id); prop.children (rmvButton(id))]
                        ]
                    ]
            else
                emptyRow
        ]
    ]

let private addNewToStorageElement(state:State, setState: State-> unit, storageState: DiceStorage.State, setStorageState: DiceStorage.State -> unit) =
    Bulma.columns [
        Bulma.column (addName(state,storageState,setStorageState))
        Bulma.column (addDiceString(storageState,setStorageState))
        Bulma.column (Bulma.field.div [
            prop.children [
                Bulma.control.div [
                    prop.children [
                        Bulma.button.button [
                            let valid = storageState.Name <> "" && storageState.DiceString <> "" && (state.DiceStorage.ContainsKey storageState.Name |> not)
                            prop.style [style.float'.right]
                            prop.text "+"
                            if not valid then Bulma.button.isStatic
                            prop.tabIndex 0
                            prop.onClick(fun _ -> 
                                if valid then
                                    addToDiceStorage(state, setState, storageState, setStorageState)
                            )
                        ]
                    ]
                ]
            ]
        ])
    ]

[<ReactComponent>]
let Main(state:State) (setState: State-> unit) (rmv: _ -> unit) =
    let (diceStorage, setDiceStorage) = React.useState(DiceStorage.State.init)
    let rmv = fun _ ->
        rmv()
        let ele = Browser.Dom.document.getElementById(ElementId.DiceRoller_Input)
        ele.focus()
    Bulma.modal [
        prop.onKeyDown(key.escape,rmv
        )
        Bulma.modal.isActive
        prop.children [
            Bulma.modalBackground [
                prop.onClick rmv
            ]
            Bulma.modalContent [
                Bulma.box [
                    Bulma.content [
                        Html.h1 "Dice Storage"
                        Bulma.help [
                            Html.span "Type " 
                            Html.code "/placeholder"
                            Html.span "in main field to quick access any stored dice!" 
                        ]
                        storedDice(state,setState,diceStorage,setDiceStorage)
                        addNewToStorageElement(state,setState,diceStorage,setDiceStorage)
                    ]
                ]
            ]
            Bulma.modalClose [
                Bulma.modalClose.isMedium
                prop.ariaLabel "close"
                prop.onClick rmv
            ]
        ]
    ]

