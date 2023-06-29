namespace App

open Feliz
open Feliz.Bulma
open Feliz.Router

type Components =

    static member Reference() = Page.Reference.Main()

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
                            match currentPage with
                            | Routing.Dicacle   -> Components.Dicacle()
                            | Routing.Reference -> Components.Reference()
                            | Routing.NotFound  -> Html.h1 "404: Page not found"
                            Component.Footer.Main
                        ]
                    ]
                ]
            ]
        ]