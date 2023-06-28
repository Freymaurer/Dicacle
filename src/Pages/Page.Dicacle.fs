module Page.Dicacle

open Feliz
open Feliz.Bulma
open Classes

let private dice_examples = [|
        "3d6 + 1d11";
        "2 (1d20+14) (1d20+9)";
        "2d20k1 + 9"
        "1d12 + 12 + 2d6"
    |]
let private getDiceExample() = 
    let rnd = new System.Random()
    dice_examples.[rnd.Next(dice_examples.Length)]

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

[<RequireQualifiedAccess>]
module private DiceStorage =

    open Browser
    open Fable.SimpleJson

    let [<Literal>] DiceStorage_Key = "DiceStorage"

    let write(storedDice: System.Collections.Generic.Dictionary<string, string>) = 
        let v = Json.serialize storedDice
        WebStorage.localStorage.setItem(DiceStorage_Key, v)

    let load() =
        try 
            WebStorage.localStorage.getItem(DiceStorage_Key)
            |> Json.parseAs<System.Collections.Generic.Dictionary<string, string>>
            |> Some
        with
            |_ -> 
                printfn "Could not find DiceStorage"
                None

    type State = {
        Name: string
        DiceString: string
        Current: System.Collections.Generic.Dictionary<string, string>
    } with
        static member init() = 
            let diceStorage = load() |> Option.defaultValue (System.Collections.Generic.Dictionary<string, string>())
            {
                Name = ""
                DiceString = ""
                Current = diceStorage
            }
    let emptyRow = 
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

    let addName(diceStorage: State, setDiceStorage: State -> unit) =
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

    let addDiceString(diceStorage: State, setDiceStorage: State -> unit) =
        let example = getDiceExample()
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

type private State = {
    Input: string
    Results: ResizeArray<DiceSet>
    DiceStorage: System.Collections.Generic.Dictionary<string, string>
} with
    static member init() = 
        let diceStorage = 
            DiceStorage.load() |> Option.defaultValue (System.Collections.Generic.Dictionary<string, string>())
        {
            Input = ""
            Results = ResizeArray()
            DiceStorage = diceStorage
        }

    member this.KeyFromInput = if this.Input <> "" then this.Input.Remove(0,1) else ""

let private addToDiceStorage(state:State, setState:State -> unit, storageState: DiceStorage.State, setStorageState: DiceStorage.State -> unit) =
    state.DiceStorage.Add(storageState.Name, storageState.DiceString)
    setState {state with DiceStorage = state.DiceStorage}
    storageState.Current.Add(storageState.Name, storageState.DiceString)
    setStorageState {storageState with Current = storageState.Current}
    DiceStorage.write(storageState.Current)

let private removeFromDiceStorage(id:string, state:State, setState:State -> unit, storageState: DiceStorage.State, setStorageState: DiceStorage.State -> unit) =
    ignore <| state.DiceStorage.Remove(id)
    setState {state with DiceStorage = state.DiceStorage}
    ignore <| storageState.Current.Remove(id)
    setStorageState {storageState with Current = storageState.Current}
    DiceStorage.write(storageState.Current)

[<ReactComponent>]
let private DiceStorageModal(state:State) (setState: State-> unit) (rmv: _ -> unit) =
    let (diceStorage, setDiceStorage) = React.useState(DiceStorage.State.init)
    let content = 
        let rmvButton(id:string) = Bulma.delete [
            prop.style [style.float'.right]
            prop.onClick(fun _ -> 
                removeFromDiceStorage(id, state, setState, diceStorage, setDiceStorage)
            )
        ]
        Bulma.table [
            Html.tbody [
                if diceStorage.Current.Count > 0 then
                    for KeyValue(id, diceString) in diceStorage.Current do
                        Html.tr [
                            prop.key (sprintf "Stored-Dice-%s" id)
                            prop.children [
                                Html.td [prop.key (sprintf "Stored-Dice-Name-%s" id); prop.children (Html.code ("/"+id))]
                                Html.td [prop.key (sprintf "Stored-Dice-diceString-%s" id); prop.text diceString]
                                Html.td [prop.key (sprintf "Stored-Dice-remove-%s" id); prop.children (rmvButton(id))]
                            ]
                        ]
                else
                    DiceStorage.emptyRow
            ]
        ]
    let addNewToStorageElement =
        Bulma.columns [
            Bulma.column (DiceStorage.addName(diceStorage,setDiceStorage))
            Bulma.column (DiceStorage.addDiceString(diceStorage,setDiceStorage))
            Bulma.column (Bulma.field.div [
                prop.children [
                    Bulma.control.div [
                        prop.children [
                            Bulma.button.button [
                                let valid = diceStorage.Name <> "" && diceStorage.DiceString <> ""
                                prop.style [style.float'.right]
                                prop.text "+"
                                if not valid then Bulma.button.isStatic
                                prop.tabIndex 0
                                prop.onClick(fun _ -> 
                                    if valid then
                                        addToDiceStorage(state, setState, diceStorage, setDiceStorage)
                                )
                            ]
                        ]
                    ]
                ]
            ])
        ]
    Bulma.modal [
        Bulma.modal.isActive
        prop.children [
            Bulma.modalBackground [
                prop.onClick (fun e -> rmv())
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
                        content
                        addNewToStorageElement
                    ]
                ]
            ]
            Bulma.modalClose [
                Bulma.modalClose.isMedium
                prop.ariaLabel "close"
                prop.onClick (fun e -> rmv())
            ]
        ]
    ]

let private rollDice(state:State) = 
    let input = if state.Input.StartsWith("/") then state.DiceStorage.[state.KeyFromInput] else state.Input
    let sets = DiceParsing.parseStringToDice(input)
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
    let example = getDiceExample()
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
            Modal.renderModal (DiceStorageModal state setState)
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

