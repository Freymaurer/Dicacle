import { class_type } from "../fable_modules/fable-library.4.0.1/Reflection.js";
import { createElement } from "react";
import React from "react";
import * as react from "react";
import { Main } from "./Pages/Page.Reference.js";
import { useFeliz_React__React_useState_Static_1505 } from "../fable_modules/Feliz.2.6.0/React.fs.js";
import { singleton as singleton_1, ofArray } from "../fable_modules/fable-library.4.0.1/List.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.6.0/Interop.fs.js";
import { Main as Main_1 } from "./Pages/Page.Dicacle.js";
import { Pages_ofUrl_7F866359 } from "./Routing.js";
import { RouterModule_router, RouterModule_urlSegments } from "../fable_modules/Feliz.Router.4.0.0/Router.fs.js";
import { createObj } from "../fable_modules/fable-library.4.0.1/Util.js";
import { Main as Main_2 } from "./Components/Component.Navbar.js";
import { Helpers_combineClasses } from "../fable_modules/Feliz.Bulma.3.0.0/ElementBuilders.fs.js";
import { singleton, delay, toList } from "../fable_modules/fable-library.4.0.1/Seq.js";

export class Components {
    "constructor"() {
    }
}

export function Components$reflection() {
    return class_type("App.Components", void 0, Components);
}

export function Components_Reference() {
    return createElement(Main, null);
}

export function Components_Counter() {
    const patternInput = useFeliz_React__React_useState_Static_1505(0);
    const count = patternInput[0] | 0;
    const children = ofArray([createElement("h1", {
        children: [count],
    }), createElement("button", {
        onClick: (_arg) => {
            patternInput[1](count + 1);
        },
        children: "Increment",
    })]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export function Components_Dicacle() {
    return createElement(Main_1, null);
}

export function Components_Router() {
    let elements, children_7, elems_3, elms, elms_2, elms_1, children_1, children_3;
    const patternInput = useFeliz_React__React_useState_Static_1505(Pages_ofUrl_7F866359(RouterModule_urlSegments(window.location.hash, 1)));
    const currentPage = patternInput[0];
    const spanDivide = createElement("span", {
        children: " • ",
        className: "mx-1",
    });
    return RouterModule_router(createObj(ofArray([["onUrlChanged", (arg_2) => {
        patternInput[1](Pages_ofUrl_7F866359(arg_2));
    }], (elements = singleton_1((children_7 = ofArray([createElement(Main_2, null), createElement("div", {
        id: "Test",
    }), createElement("section", createObj(Helpers_combineClasses("hero", ofArray([["className", "is-fullheight-with-navbar"], (elems_3 = [(elms = toList(delay(() => ((currentPage.tag === 1) ? singleton(Components_Reference()) : ((currentPage.tag === 2) ? singleton(createElement(Components_Counter, null)) : ((currentPage.tag === 3) ? singleton(createElement("h1", {
        children: ["Not found"],
    })) : singleton(Components_Dicacle())))))), createElement("div", {
        className: "hero-body",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_2 = singleton_1((elms_1 = ofArray([(children_1 = ofArray([createElement("span", {
        children: ["Icons from "],
    }), createElement("a", {
        href: "https://www.flaticon.com",
        children: "flaticon",
    })]), createElement("span", {
        children: Interop_reactApi.Children.toArray(Array.from(children_1)),
    })), spanDivide, (children_3 = ofArray([createElement("a", {
        href: "https://fable.io",
        children: "Fable",
    }), createElement("span", {
        children: [" |> ❤️"],
    })]), createElement("span", {
        children: Interop_reactApi.Children.toArray(Array.from(children_3)),
    }))]), createElement("div", {
        className: "container",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))), createElement("div", {
        className: "hero-foot",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]))))]), createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_7)),
    }))), ["application", react.createElement(react.Fragment, {}, ...elements)])])));
}

