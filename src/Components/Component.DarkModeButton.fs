module Component.DarkModeButton

open Feliz
open Feliz.Bulma

[<RequireQualifiedAccess>]
type private ColorMode = 
| Light
| Dark
| Auto of ColorMode
    with
        member this.toIcon =
            let c = 
                match this with
                | Light | Auto Light -> "fa-regular fa-sun"
                | Dark | Auto Dark -> "fa-solid fa-moon"
                | _ -> ""
            Html.i [
                prop.className (sprintf "%s fa-xl" c)
            ]
            
let private (|IsLight|IsDark|) (input: ColorMode) = 
    match input with
    | ColorMode.Light | ColorMode.Auto ColorMode.Light -> IsLight
    | ColorMode.Dark | ColorMode.Auto ColorMode.Dark -> IsDark
    | _ -> failwith "This can never happen"


[<RequireQualifiedAccess>]
module private LocalStorage =

    open Browser
    open Fable.SimpleJson

    let [<Literal>] Key = "ColorMode"

    let write(mode: ColorMode) =
        let v = Json.serialize mode
        WebStorage.localStorage.setItem(Key, v)

    let load() =
        try 
            WebStorage.localStorage.getItem(Key)
            |> Json.parseAs<ColorMode>
            |> Some
        with
            |_ -> 
                WebStorage.localStorage.removeItem(Key)
                printfn "Could not find %s" Key
                None

module private JsInteropAux =
    open Fable.Core.JsInterop

    let getPreferredSchema() = 
        let isDark = Browser.Dom.window?matchMedia("(prefers-color-scheme: dark)")?matches
        if isDark then ColorMode.Auto ColorMode.Dark else ColorMode.Auto ColorMode.Light

    let activateLightMode() =
        let style_dark = Browser.Dom.document.getElementById(Literals.StyleSheets.DarkMode)
        let style_light = Browser.Dom.document.getElementById(Literals.StyleSheets.LightMode)
        style_light?disabled <- null
        style_dark?disabled <- "disabled"
        //style_dark?toggleAttribute("disabled")
        //style_light?toggleAttribute("disabled")

    let activateDarkMode() =
        let style_dark = Browser.Dom.document.getElementById(Literals.StyleSheets.DarkMode)
        let style_light = Browser.Dom.document.getElementById(Literals.StyleSheets.LightMode)
        //style_dark?toggleAttribute("disabled")
        //style_light?toggleAttribute("disabled")
        style_dark?disabled <- null
        style_light?disabled <- "disabled"

    let toggleStyleSheets(mode:ColorMode) =
        match mode with
        | IsLight -> activateLightMode()
        | IsDark -> activateDarkMode()

type private State = {
    ColorMode: ColorMode
} with
    static member init() = 
        let def = JsInteropAux.getPreferredSchema()
        let mode_stored = LocalStorage.load()
        let mode = Option.defaultValue def mode_stored
        JsInteropAux.toggleStyleSheets(mode)
        {
            ColorMode = mode
        }

[<ReactComponent>]
let Main() = 
    let state, setState = React.useState(State.init)
    React.useEffect(fun () -> JsInteropAux.toggleStyleSheets(state.ColorMode))
    Bulma.navbarItem.a [
        prop.onClick (fun e ->
            e.preventDefault()
            let next = 
                match state.ColorMode with
                | IsLight -> ColorMode.Dark
                | IsDark -> ColorMode.Light
            LocalStorage.write(next)
            setState {ColorMode = next}
        )
        prop.children [
            Bulma.icon [
                Bulma.icon.isMedium
                prop.children state.ColorMode.toIcon
            ]
        ]
    ]

