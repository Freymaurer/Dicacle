import { class_type } from "../fable_modules/fable-library.4.0.1/Reflection.js";
import { createElement } from "react";
import React from "react";
import * as react from "react";
import { useFeliz_React__React_useState_Static_1505 } from "../fable_modules/Feliz.2.6.0/React.fs.js";
import { tail, head, isEmpty, ofArray } from "../fable_modules/fable-library.4.0.1/List.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.6.0/Interop.fs.js";
import { RouterModule_router, RouterModule_urlSegments } from "../fable_modules/Feliz.Router.4.0.0/Router.fs.js";
import { createObj } from "../fable_modules/fable-library.4.0.1/Util.js";
import { singleton, delay, toList } from "../fable_modules/fable-library.4.0.1/Seq.js";

export class Components {
    "constructor"() {
    }
}

export function Components$reflection() {
    return class_type("App.Components", void 0, Components);
}

export function Components_HelloWorld() {
    return createElement("h1", {
        children: ["Hello World"],
    });
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

export function Components_Router() {
    let elements;
    const patternInput = useFeliz_React__React_useState_Static_1505(RouterModule_urlSegments(window.location.hash, 1));
    const currentUrl = patternInput[0];
    return RouterModule_router(createObj(ofArray([["onUrlChanged", patternInput[1]], (elements = toList(delay(() => ((!isEmpty(currentUrl)) ? ((head(currentUrl) === "hello") ? (isEmpty(tail(currentUrl)) ? singleton(createElement(Components_HelloWorld, null)) : singleton(createElement("h1", {
        children: ["Not found"],
    }))) : ((head(currentUrl) === "counter") ? (isEmpty(tail(currentUrl)) ? singleton(createElement(Components_Counter, null)) : singleton(createElement("h1", {
        children: ["Not found"],
    }))) : singleton(createElement("h1", {
        children: ["Not found"],
    })))) : singleton(createElement("h1", {
        children: ["Index"],
    }))))), ["application", react.createElement(react.Fragment, {}, ...elements)])])));
}

