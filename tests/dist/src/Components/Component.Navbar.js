import { createElement } from "react";
import React from "react";
import { equals, createObj } from "../../fable_modules/fable-library.4.0.1/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/ElementBuilders.fs.js";
import { empty, singleton, append, delay, toList } from "../../fable_modules/fable-library.4.0.1/Seq.js";
import { Pages, Pages_ofHash_Z721C83C5, Pages__get_PageName, Pages__get_AsUrl } from "../Routing.js";
import { singleton as singleton_1, ofArray } from "../../fable_modules/fable-library.4.0.1/List.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.6.0/Interop.fs.js";
import { useFeliz_React__React_useState_Static_1505 } from "../../fable_modules/Feliz.2.6.0/React.fs.js";
import logo from "../../../../src/img/logo.svg";
import { join } from "../../fable_modules/fable-library.4.0.1/String.js";

function pageLink(page, activePage) {
    return createElement("a", createObj(Helpers_combineClasses("navbar-item", toList(delay(() => append(equals(page, activePage) ? singleton(["className", "is-active"]) : empty(), delay(() => append(singleton(["href", Pages__get_AsUrl(page)]), delay(() => singleton(["children", Pages__get_PageName(page)]))))))))));
}

function navbarStart() {
    const activePage = Pages_ofHash_Z721C83C5(window.location.hash);
    const elms = ofArray([pageLink(new Pages(0, []), activePage), pageLink(new Pages(1, []), activePage)]);
    return createElement("div", {
        className: "navbar-start",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
}

const navbarEnd = (() => {
    let elems_1, elms;
    const elms_1 = singleton_1(createElement("a", createObj(Helpers_combineClasses("navbar-item", ofArray([["href", "https://github.com/Freymaurer/Dicacle"], ["target", "_blank"], (elems_1 = [(elms = singleton_1(createElement("i", {
        className: "fa-brands fa-github fa-xl mr-3",
        style: {
            color: "white",
        },
    })), createElement("span", {
        className: "icon",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("span", {
        children: ["GitHub"],
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))));
    return createElement("div", {
        className: "navbar-end",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    });
})();

function navbarMenu(isActive) {
    return createElement("div", createObj(Helpers_combineClasses("navbar-menu", toList(delay(() => append(isActive ? singleton(["className", "is-active"]) : empty(), delay(() => {
        let elems;
        return singleton((elems = [navbarStart(), navbarEnd], ["children", Interop_reactApi.Children.toArray(Array.from(elems))]));
    })))))));
}

export function Main() {
    let elems_4, elms_1, elms, elems, elems_2;
    const patternInput = useFeliz_React__React_useState_Static_1505(false);
    const state = patternInput[0];
    return createElement("nav", createObj(Helpers_combineClasses("navbar", ofArray([["className", "is-fixed-top"], ["className", "is-black"], (elems_4 = [(elms_1 = ofArray([(elms = singleton_1(createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-medium"], (elems = [createElement("img", {
        src: logo,
        alt: "logo",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))), createElement("a", {
        className: "navbar-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("a", createObj(Helpers_combineClasses("navbar-burger", ofArray([["aria-label", "menu"], ["aria-expanded", state], ["role", join(" ", ["button"])], ["onClick", (_arg) => {
        patternInput[1](!state);
    }], (elems_2 = [createElement("span", {
        "aria-hidden": true,
    }), createElement("span", {
        "aria-hidden": true,
    }), createElement("span", {
        "aria-hidden": true,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))))]), createElement("div", {
        className: "navbar-brand",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    })), navbarMenu(state)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])]))));
}

