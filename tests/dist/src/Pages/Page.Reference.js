import { empty, singleton, append, delay, toList } from "../../fable_modules/fable-library.4.0.1/Seq.js";
import { createElement } from "react";
import React from "react";
import { empty as empty_1, singleton as singleton_1, ofArray, isEmpty } from "../../fable_modules/fable-library.4.0.1/List.js";
import { createObj } from "../../fable_modules/fable-library.4.0.1/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/ElementBuilders.fs.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.6.0/Interop.fs.js";

function createSection(title, content, description) {
    const elms_1 = toList(delay(() => append(singleton(createElement("h3", {
        children: [title],
    })), delay(() => append((!isEmpty(description)) ? description : empty(), delay(() => {
        let elms, elems;
        return singleton((elms = singleton_1(createElement("table", createObj(Helpers_combineClasses("table", ofArray([["className", "reference-table"], ["className", "is-bordered"], ["className", "is-fullwidth"], (elems = [createElement("tbody", {
            children: Interop_reactApi.Children.toArray(Array.from(content)),
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))), createElement("div", {
            className: "table-container",
            children: Interop_reactApi.Children.toArray(Array.from(elms)),
        })));
    }))))));
    return createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    });
}

const section_basic = createSection("Basic", ofArray([(() => {
    let children;
    const children_2 = ofArray([(children = singleton_1(createElement("code", {
        children: ["3d6 + 1d11 + 15w20"],
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "Basic dice roll. Roll <i>x</i> dice with <i>y</i> sides, where <code>xdy</code> or <code>xwy</code>.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    });
})(), (() => {
    let children_4;
    const children_6 = ofArray([(children_4 = singleton_1(createElement("code", {
        children: ["3d6 + 15"],
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "You can add flat modifiers to basic dice roll.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_6)),
    });
})()]), ofArray([createElement("p", {
    children: ["For one dice roll (e.g. 3d6) you can mix between categories below but never use multiples of the same category."],
}), (() => {
    let children_8, children_10;
    const children_12 = ofArray([(children_8 = ofArray([createElement("span", {
        children: ["Not allowed:"],
    }), createElement("code", {
        children: ["3d6 k2 kl2"],
    })]), createElement("li", {
        children: Interop_reactApi.Children.toArray(Array.from(children_8)),
    })), (children_10 = ofArray([createElement("span", {
        children: ["Allowed:"],
    }), createElement("code", {
        children: ["3d6 k1 ie6 r2"],
    }), createElement("span", {
        children: ["; roll 3d6, reroll any 1 or 2 once, explode rolled 6, then keep highest."],
    })]), createElement("li", {
        children: Interop_reactApi.Children.toArray(Array.from(children_10)),
    }))]);
    return createElement("ul", {
        children: Interop_reactApi.Children.toArray(Array.from(children_12)),
    });
})(), createElement("p", {
    dangerouslySetInnerHTML: {
        __html: "The order of execution for categories is always: <code>Reroll</code> → <code>Explode</code> → <code>Keep/Drop</code>.",
    },
})]));

const section_keepdrop = createSection("Keep/Drop", ofArray([(() => {
    let children;
    const children_2 = ofArray([(children = ofArray([createElement("code", {
        children: ["3d6 k1"],
    }), createElement("span", {
        children: ["/"],
    }), createElement("code", {
        children: ["3d6 kh1"],
    })]), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "Keep <b>highest</b> <i>x</i> rolls, where x is <code>3d6 kx</code> or <code>3d6 khx</code>. This example would roll 3 six-sided dice and only return the highest number rolled.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    });
})(), (() => {
    let children_4;
    const children_6 = ofArray([(children_4 = singleton_1(createElement("code", {
        children: ["3d6 kl2"],
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "Keep <b>lowest</b> <i>x</i> rolls, where x is <code>3d6 klx</code>. This example would roll 3 six-sided dice and only return the two lowest numbers rolled.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_6)),
    });
})(), (() => {
    let children_8;
    const children_10 = ofArray([(children_8 = ofArray([createElement("code", {
        children: ["3d6 d1"],
    }), createElement("span", {
        children: ["/"],
    }), createElement("code", {
        children: ["3d6 dl1"],
    })]), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children_8)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "Drop <b>lowest</b> <i>x</i> rolls, where x is <code>3d6 dx</code> or <code>3d6 dlx</code>. This example would roll 3 six-sided dice and return all dice rolles, except the lowest.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_10)),
    });
})(), (() => {
    let children_12;
    const children_14 = ofArray([(children_12 = singleton_1(createElement("code", {
        children: ["3d6 dh2"],
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children_12)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "Drop <b>highest</b> <i>x</i> rolls, where x is <code>3d6 dhx</code>. This example would roll 3 six-sided dice and return all dice rolles, except the two highest.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_14)),
    });
})()]), empty_1());

const section_explode = createSection("Explode", ofArray([(() => {
    let children;
    const children_2 = ofArray([(children = singleton_1(createElement("code", {
        children: ["3d6 e6"],
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "Explode die <b>once</b> when rolled above <i>x</i>, where x is <code>3d6 ex</code>. This example would roll 3 six-sided dice and add another roll on top of any die rolling a 6.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    });
})(), (() => {
    let children_4;
    const children_6 = ofArray([(children_4 = singleton_1(createElement("code", {
        children: ["3d6 ie6"],
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "Explode die <b>indefinitely</b> (max 100x) when rolled above <i>x</i>, where x is <code>3d6 iex</code>. This example would roll 3 six-sided dice and add another roll on top of any die rolling a 6. If any of those dice would roll a 6 again, explode again.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_6)),
    });
})()]), empty_1());

const section_reroll = createSection("Reroll", ofArray([(() => {
    let children;
    const children_2 = ofArray([(children = singleton_1(createElement("code", {
        children: ["3d6 r2"],
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "Reroll die <b>once</b> when rolled below <i>x</i>, where x is <code>3d6 rx</code>. This example would roll 3 six-sided dice and reroll any roll below 2.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    });
})(), (() => {
    let children_4;
    const children_6 = ofArray([(children_4 = singleton_1(createElement("code", {
        children: ["3d6 ir2"],
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "Reroll die <b>indefinitely</b> (max 100x) when rolled below <i>x</i>, where x is <code>3d6 irx</code>. This example would roll 3 six-sided dice and reroll any dice below 2 until rolling above 2.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_6)),
    });
})()]), empty_1());

const section_sets = createSection("Sets", ofArray([(() => {
    let children;
    const children_2 = ofArray([(children = singleton_1(createElement("code", {
        children: ["(1d20 + 14) (1d20 + 14) (1d20 + 9)"],
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "Any dice combination inside <code>(..)</code> is handled as one <b>set</b>. This example will return <code>1d20 + 14</code>, <code>1d20 + 14</code> and <code>1d20 + 9</code>, each with its own sum.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    });
})(), (() => {
    let children_4;
    const children_6 = ofArray([(children_4 = singleton_1(createElement("code", {
        children: ["2 (1d20 + 14) (1d20 + 9)"],
    })), createElement("td", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    })), createElement("td", {
        dangerouslySetInnerHTML: {
            __html: "Roll <b>set</b> <i>x</i> times, where x is the number before <code>(..)</code>. This example will return <code>1d20 + 14</code> <b>twice</b> and <code>1d20 + 9</code> <b>once</b>.",
        },
    })]);
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children_6)),
    });
})()]), empty_1());

export function Main() {
    return createElement("div", createObj(Helpers_combineClasses("container", ofArray([["style", {
        alignSelf: "baseline",
    }], ["children", Interop_reactApi.Children.toArray([section_basic, section_keepdrop, section_explode, section_reroll, section_sets])]]))));
}

