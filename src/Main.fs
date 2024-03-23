module Main

open Feliz
open App
open Browser.Dom

Fable.Core.JsInterop.importSideEffects "./styles/styles.scss"

let root = ReactDOM.createRoot(document.getElementById "feliz-app")
root.render(Components.Router())