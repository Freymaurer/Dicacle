module Page.Dicacle

open Feliz
open Feliz.Bulma
open Classes
open Dice.Roll
open Dice.HtmlAux
open States.Dicacle

let private rollDice(state:State) = 
    let input = if state.Input.StartsWith("/") then state.DiceStorage.[state.KeyFromInput] else state.Input
    let sets = Dice.Parsing.parseStringToDice(input)
    let arr = ResizeArray(sets)
    Browser.Dom.console.log("[DICE]", arr)
    let rnd = new System.Random()
    sets
    |> List.map (fun x -> x.rollBy(rnd))
    |> ResizeArray

let private event_rollDice(state:State, setState: State -> unit) =
    let nextState = { state with Results = rollDice(state) }
    setState nextState

let private updateUIState (state: int option, cmds: 'a [], increase:bool) =
    Option.defaultValue -1 state
    |> fun state -> if increase then System.Math.Min(state + 1, cmds.Length-1) else state - 1
    |> fun state -> if state < 0 then None else Some state
    
[<ReactComponent>]
let private Searchbar(state: State, setState: State -> unit) =
    let example = Dice.HtmlAux.getDiceExample()
    let isCommand = state.Input.StartsWith("/")
    let hasMatch = 
        isCommand && state.DiceStorage.ContainsKey(state.KeyFromInput)
    let inputKey = state.KeyFromInput
    let filteredCommands = 
        [|
            for x in state.DiceStorage do
                if x.Key.StartsWith(inputKey) && x.Key <> inputKey then
                    yield x
        |]
    let uiState, setUiState = 
        let init : int option = None
        React.useState(init)
    Html.div [
        prop.style [style.display.flex; style.position.relative]
        prop.children [
            Bulma.input.text [
                Bulma.input.isLarge
                prop.placeholder example    
                prop.autoFocus(true)
                if hasMatch then Bulma.color.hasTextDangerDark
                prop.valueOrDefault state.Input
                prop.onTextChange (fun (input) ->
                    let nextState = {
                        state with Input = input
                    }
                    setUiState None
                    setState nextState
                )
                prop.id ElementId.DiceRoller_Input
                prop.onKeyDown(fun k ->
                    if isCommand && filteredCommands.Length > 0 then
                        match k.which with
                        | 40. -> // Arrow down
                            let next = updateUIState(uiState,filteredCommands,true) 
                            setUiState next
                        | 38. -> // Key up
                            let next = updateUIState(uiState,filteredCommands,false)
                            setUiState next
                        | 13. -> // Enter
                            if uiState.IsSome then
                                let command = filteredCommands.[uiState.Value]
                                setState {state with Input = "/" + command.Key}
                                setUiState None   
                        | _ -> ()
                    else
                        match k.which with
                        | 13. -> //Enter
                            event_rollDice(state, setState)
                            setUiState None
                        | _ -> ()
                )
            ]
            if isCommand then
                Html.div [
                    prop.id "command-container"
                    prop.style [
                        style.backgroundColor.whiteSmoke
                        style.zIndex 3
                        style.position.absolute
                        style.top (length.perc 100)
                        style.left 0
                        style.width (length.perc 100); style.maxHeight(length.px 100)
                    ]
                    Html.ul [
                        for index in 0 .. (filteredCommands.Length-1) do
                            let command = filteredCommands.[index]
                            yield 
                                Html.li [
                                    prop.style [
                                        if uiState.IsSome && uiState.Value = index then style.filter.brightness 85
                                    ]
                                    prop.children [
                                        Html.div [
                                            prop.onClick (fun _ ->
                                                setState {state with Input = "/" + command.Key}
                                            )
                                            prop.children [
                                                Html.code ("/"+command.Key)
                                                Html.span command.Value
                                            ]
                                        ]
                                    ]
                                ]
                    ] |> prop.children
                ]
        ]
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
            Bulma.field.div [
                showSetResult set
            ]
    ]

let private storageButton(state, setState) =
    Bulma.button.button [
        Bulma.button.isLarge
        prop.title "Manage stored dice"
        prop.role "button"
        prop.text "+"
        prop.onClick(fun _ ->
            Component.Modal.renderModal (Component.DiceStorageModal.Main state setState)
        )
    ]

let private rollButton(state, setState) =
    Bulma.button.button [
        Bulma.button.isLarge
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
                        storageButton(state, setState)
                    ]
                    Bulma.control.div [
                        Bulma.control.isExpanded
                        prop.children [
                            Searchbar(state, setState)
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

