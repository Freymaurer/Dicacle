module Component.QuickAccess

open Feliz
open Feliz.Bulma

open Classes
open States.Dicacle

let private tag (id, input, activate) =
    let id = "/" + id
    Bulma.tag [
        prop.title input
        prop.style [style.cursor.pointer]
        prop.onClick (fun _ -> activate id)
        prop.children [
            Html.code [
                prop.style [style.userSelect.none]
                prop.text id
            ]
        ]
    ]

let Main(state: States.Dicacle.State, activate) =
    Bulma.tags [
        for qa in state.QuickAccess do
            tag (qa, state.DiceStorage.[qa], activate)
    ]

