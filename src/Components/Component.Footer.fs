module Component.Footer

open Feliz
open Feliz.Bulma

let private spanDivide = Html.span [prop.text " • "; prop.className "mx-1"]

let Main = 
    Bulma.heroFoot [
        Bulma.container [
            Html.span [
                Html.span "Icons from "
                Html.a [
                    prop.href "https://www.flaticon.com"
                    prop.text "flaticon"
                ]
            ]
            spanDivide
            Html.span [
                Html.a [
                    prop.href "https://fable.io"
                    prop.text "Fable"
                ]
                Html.span " |> ❤️"
            ]
            spanDivide
            Html.span [
                Html.span "Usage under "
                Html.a [
                    prop.href Urls.Github_License
                    prop.text "GNU GPL"
                ]
            ]
        ]
    ]