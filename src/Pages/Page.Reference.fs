module Page.Reference

open Feliz
open Feliz.Bulma
open Classes

let private createSection(title:string, content: Fable.React.ReactElement list, description: Fable.React.ReactElement list) =
    Bulma.content [
        Html.h3 title
        if not description.IsEmpty then yield! description
        Bulma.tableContainer [
            Bulma.table [
                prop.className "reference-table"
                Bulma.table.isBordered
                Bulma.table.isFullWidth
                prop.children [
                    Html.tbody content
                ]
            ]
        ]
    ]
    

let private section_basic =
    createSection("Basic", [
        Html.tr [
            Html.td [
                Html.code "3d6 + 1d11 + 15w20"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "Basic dice roll. Roll <i>x</i> dice with <i>y</i> sides, where <code>xdy</code> or <code>xwy</code>."
            ]
        ]
        Html.tr [
            Html.td [
                Html.code "3d6 + 15"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "You can add flat modifiers to basic dice roll."
            ]
        ]
    ], [
    Html.p "For one dice roll (e.g. 3d6) you can mix between categories below but never use multiples of the same category."
    Html.ul [
        Html.li [
            Html.span "Not allowed:"
            Html.code "3d6 k2 kl2"
        ]
        Html.li [
            Html.span "Allowed:"
            Html.code "3d6 k1 ie6 r2"
            Html.span "; roll 3d6, reroll any 1 or 2 once, explode rolled 6, then keep highest."
        ]
    ]
    Html.p [ prop.dangerouslySetInnerHTML "The order of execution for categories is always: <code>Reroll</code> → <code>Explode</code> → <code>Keep/Drop</code>." ]
    ])

let private section_keepdrop =
    createSection("Keep/Drop", [
        Html.tr [
            Html.td [
                Html.code "3d6 k1"
                Html.span "/"
                Html.code "3d6 kh1"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "Keep <b>highest</b> <i>x</i> rolls, where x is <code>3d6 kx</code> or <code>3d6 khx</code>. This example would roll 3 six-sided dice and only return the highest number rolled."
            ]
        ]
        Html.tr [
            Html.td [
                Html.code "3d6 kl2"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "Keep <b>lowest</b> <i>x</i> rolls, where x is <code>3d6 klx</code>. This example would roll 3 six-sided dice and only return the two lowest numbers rolled."
            ]
        ]
        Html.tr [
            Html.td [
                Html.code "3d6 d1"
                Html.span "/"
                Html.code "3d6 dl1"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "Drop <b>lowest</b> <i>x</i> rolls, where x is <code>3d6 dx</code> or <code>3d6 dlx</code>. This example would roll 3 six-sided dice and return all dice rolles, except the lowest."
            ]
        ]
        Html.tr [
            Html.td [
                Html.code "3d6 dh2"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "Drop <b>highest</b> <i>x</i> rolls, where x is <code>3d6 dhx</code>. This example would roll 3 six-sided dice and return all dice rolles, except the two highest."
            ]
        ]
    ],[])

let private section_explode =
    createSection("Explode", [
        Html.tr [
            Html.td [
                Html.code "3d6 e6"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "Explode die <b>once</b> when rolled above <i>x</i>, where x is <code>3d6 ex</code>. This example would roll 3 six-sided dice and add another roll on top of any die rolling a 6."
            ]
        ]
        Html.tr [
            Html.td [
                Html.code "3d6 ie6"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "Explode die <b>indefinitely</b> (max 100x) when rolled above <i>x</i>, where x is <code>3d6 iex</code>. This example would roll 3 six-sided dice and add another roll on top of any die rolling a 6. If any of those dice would roll a 6 again, explode again."
            ]
        ]
    ],[])

let private section_reroll =
    createSection("Reroll", [
        Html.tr [
            Html.td [
                Html.code "3d6 r2"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "Reroll die <b>once</b> when rolled below <i>x</i>, where x is <code>3d6 rx</code>. This example would roll 3 six-sided dice and reroll any roll below 2."
            ]
        ]
        Html.tr [
            Html.td [
                Html.code "3d6 ir2"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "Reroll die <b>indefinitely</b> (max 100x) when rolled below <i>x</i>, where x is <code>3d6 irx</code>. This example would roll 3 six-sided dice and reroll any dice below 2 until rolling above 2."
            ]
        ]
    ],[])


let private section_sets =
    createSection("Sets", [
        Html.tr [
            Html.td [
                Html.code "(1d20 + 14) (1d20 + 14) (1d20 + 9)"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "Any dice combination inside <code>(..)</code> is handled as one <b>set</b>. This example will return <code>1d20 + 14</code>, <code>1d20 + 14</code> and <code>1d20 + 9</code>, each with its own sum."
            ]
        ]
        Html.tr [
            Html.td [
                Html.code "2 (1d20 + 14) (1d20 + 9)"
            ]
            Html.td [
                prop.dangerouslySetInnerHTML "Roll <b>set</b> <i>x</i> times, where x is the number before <code>(..)</code>. This example will return <code>1d20 + 14</code> <b>twice</b> and <code>1d20 + 9</code> <b>once</b>."
            ]
        ]
    ],[])

[<ReactComponent>]
let Main() =
    Bulma.container [
        prop.style [style.alignSelf.baseline]
        prop.children [
            section_basic
            section_keepdrop
            section_explode
            section_reroll
            section_sets
        ]
    ]