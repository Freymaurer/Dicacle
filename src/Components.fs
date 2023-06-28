namespace App

open Feliz
open Feliz.Bulma
open Feliz.Router

open Zanaptak.TypedCssClasses

type Icon = CssClasses<"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css", Naming.PascalCase>

type Components =

    static member Reference() = Page.Reference.Main()

    /// <summary>
    /// A stateful React component that maintains a counter
    /// </summary>
    [<ReactComponent>]
    static member Counter() =
        let (count, setCount) = React.useState(0)
        Html.div [
            Html.h1 count
            Html.button [
                prop.onClick (fun _ -> setCount(count + 1))
                prop.text "Increment"
            ]
        ]

    static member Dicacle() = Page.Dicacle.Main()
        
    /// <summary>
    /// A React component that uses Feliz.Router
    /// to determine what to show based on the current URL
    /// </summary>
    [<ReactComponent>]
    static member Router() =
        let (currentPage, updatePage) = React.useState(Router.currentUrl() |> Routing.Pages.ofUrl)
        React.router [
            router.onUrlChanged (Routing.Pages.ofUrl >> updatePage)
            router.children [
                Html.div [
                    Component.Navbar.Main()
                    Bulma.hero [
                        Bulma.hero.isFullHeightWithNavbar
                        prop.children [
                            Bulma.heroBody [
                                match currentPage with
                                | Routing.Dicacle   -> Components.Dicacle()
                                | Routing.Reference -> Components.Reference()
                                | Routing.Counter   -> Components.Counter()
                                | Routing.NotFound  -> Html.h1 "Not found"
                            ]
                            Component.Footer.Main
                        ]
                    ]
                ]
            ]
        ]