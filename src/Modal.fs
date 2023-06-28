module Modal

open Fable.React
open Feliz


///<summary>Function to add a modal to the html body of the active document. If an object with the same name exists, it is removed first.</summary>
///<param name="name">The name of the modal, this is used for generate an Id for the modal by which it is later identified.</param>
///<param name="reactElement">The modal itself with a open parameter which will be the correct remove function for the modal.</param>
let renderModal(reactElement: (_ -> unit) -> Fable.React.ReactElement) =
    let root = Feliz.ReactDOM.createRoot(Browser.Dom.document.getElementById "modal-container")
    let rmv = root.unmount
    root.render(reactElement rmv)
