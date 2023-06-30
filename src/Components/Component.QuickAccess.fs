module Component.QuickAccess

open Feliz
open Feliz.Bulma

open Classes
open States.Dicacle

let private tag (id, activate) =
    let id = "/" + id
    Bulma.tag [
        prop.style [style.cursor.pointer]
        prop.onClick (fun _ -> activate id)
        prop.children [
            Html.code [
                prop.style [style.userSelect.none]
                prop.text id
            ]
        ]
    ]

let Main(state:Set<string>, activate) =
    Bulma.tags [
        for qa in state do
            tag (qa, activate)
    ]

