﻿module Component.Navbar

open Feliz
open Feliz.Bulma

let private pageLink(page:Routing.Pages, activePage:Routing.Pages) =
    Bulma.navbarItem.a [
        if (page = activePage) then Bulma.navbarItem.isActive
        prop.href <| page.AsUrl
        prop.text page.PageName
    ]

let private navbarStart() = 
    let activePage = Browser.Dom.window.location.hash |> Routing.Pages.ofHash
    Bulma.navbarStart.div [
        pageLink(Routing.Pages.Dicacle, activePage)
        pageLink(Routing.Pages.Reference, activePage)
        //pageLink(Routing.Pages.Counter, activePage)
    ]

let private navbarEnd = 
    Bulma.navbarEnd.div [
        Component.DarkModeButton.Main()
        Bulma.navbarItem.a [
            prop.href Urls.Github_Dicacle
            prop.target "_blank"
            prop.children [
                Html.span "GitHub"
                Bulma.icon [
                    Bulma.icon.isMedium
                    prop.children (
                        Html.i [
                            prop.className "fa-brands fa-github fa-xl"
                        ]
                    )
                ]
            ]
        ]
    ]
    

let private navbarMenu(isActive:bool) =
    Bulma.navbarMenu [
        if isActive then Bulma.navbarMenu.isActive
        prop.children [
            navbarStart()
            navbarEnd
        ]
    ]

[<ReactComponent>]
let Main() = 
    let (state, setState) = React.useState(false)
    let logoUrl = Extensions.StaticFile.import "./../img/logo.svg"
    Bulma.navbar [
        Bulma.navbar.hasShadow
        Bulma.navbar.isFixedTop
        Bulma.color.isBlack
        prop.children [
            Bulma.navbarBrand.div [
                Bulma.navbarItem.a [
                    Bulma.icon [
                        Bulma.icon.isMedium
                        prop.children [
                            Html.img [prop.src logoUrl; prop.alt "logo"]
                        ]
                    ]
                ]
                Bulma.navbarBurger [
                    prop.ariaLabel "menu"
                    prop.ariaExpanded state
                    prop.role "button"
                    prop.onClick (fun _ -> setState (not state))
                    prop.children [
                        Html.span [prop.ariaHidden true]
                        Html.span [prop.ariaHidden true]
                        Html.span [prop.ariaHidden true]
                    ]
                ]
            ]
            navbarMenu(state)
        ]
    ]