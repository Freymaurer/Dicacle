import { alt, d20, d12, d10, d8, d6, d4 } from "../DiceIcon.js";
import { createElement } from "react";
import React from "react";
import { createObj } from "../../fable_modules/fable-library.4.0.1/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/ElementBuilders.fs.js";
import { cons, map as map_1, sumBy, singleton, ofArray } from "../../fable_modules/fable-library.4.0.1/List.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.6.0/Interop.fs.js";
import { join, printf, toText } from "../../fable_modules/fable-library.4.0.1/String.js";
import { map, empty, singleton as singleton_1, append, collect, delay, toList } from "../../fable_modules/fable-library.4.0.1/Seq.js";
import { rangeDouble } from "../../fable_modules/fable-library.4.0.1/Range.js";
import { Record } from "../../fable_modules/fable-library.4.0.1/Types.js";
import { record_type, array_type, string_type } from "../../fable_modules/fable-library.4.0.1/Reflection.js";
import { DiceSet__roll, DiceSet$reflection } from "../Classes.js";
import { parseStringToDice } from "../DiceParsing.js";
import { some } from "../../fable_modules/fable-library.4.0.1/Option.js";
import { PropHelpers_createOnKey } from "../../fable_modules/Feliz.2.6.0/Properties.fs.js";
import { key_enter } from "../../fable_modules/Feliz.2.6.0/Key.fs.js";
import { defaultOf } from "../../fable_modules/fable-library.4.0.1/Util.js";
import { useReact_useState_FCFD9EF } from "../../fable_modules/Feliz.2.6.0/React.fs.js";

function diceIconOf(diceValue, diceSize) {
    let elems;
    const diceImg = (diceSize === 4) ? d4 : ((diceSize === 6) ? d6 : ((diceSize === 8) ? d8 : ((diceSize === 10) ? d10 : ((diceSize === 12) ? d12 : ((diceSize === 20) ? d20 : alt)))));
    const color = (diceValue > diceSize) ? ["className", "has-text-link"] : ((diceValue === diceSize) ? ["className", "has-text-success-dark"] : ((diceValue === 1) ? ["className", "has-text-danger"] : ["className", "is-black"]));
    return createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-medium"], ["style", {
        position: "relative",
    }], (elems = [createElement("img", {
        style: {
            opacity: 0.4,
        },
        src: diceImg,
    }), createElement("span", createObj(ofArray([color, ["style", {
        position: "absolute",
        top: 50 + "%",
        left: 50 + "%",
        transform: ((("translate(" + (-50 + "%")) + ",") + (-50 + "%")) + ")",
        zIndex: 2,
        fontSize: 1.5 + "rem",
        fontWeight: "bold",
    }], ["children", diceValue]])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))));
}

export function Classes_DiceRoll__DiceRoll_ToHtml(this$) {
    let clo;
    const size = this$.Dice.DiceSize | 0;
    const children = (size === 0) ? singleton(createElement("span", {
        children: [(clo = toText(printf(" +%i ")), clo(this$.DiceRollSum))],
    })) : toList(delay(() => collect((i) => {
        const roll = this$.DiceRolled[i] | 0;
        const isLast = i === (this$.DiceRolled.length - 1);
        return append(singleton_1(diceIconOf(roll, size)), delay(() => ((!isLast) ? singleton_1(createElement("span", {
            children: [" + "],
        })) : empty())));
    }, rangeDouble(0, 1, this$.DiceRolled.length - 1))));
    const children_1 = toList(delay(() => append(singleton_1(createElement("span", {
        children: ["["],
    })), delay(() => append(children, delay(() => singleton_1(createElement("span", {
        children: ["]"],
    }))))))));
    return createElement("span", {
        children: Interop_reactApi.Children.toArray(Array.from(children_1)),
    });
}

export function Classes_SetResult__SetResult_ToHtml(this$) {
    let elems_2, elems, elems_1;
    const sum = sumBy((res) => res.DiceRollSum, this$.Results, {
        GetZero: () => 0,
        Add: (x, y) => (x + y),
    }) | 0;
    return createElement("div", createObj(ofArray([["className", "dice-result-container is-flex is-align-items-center"], (elems_2 = [createElement("span", createObj(ofArray([["style", {
        fontSize: 10 + "px",
    }], (elems = toList(delay(() => map(Classes_DiceRoll__DiceRoll_ToHtml, this$.Results))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))), createElement("span", createObj(ofArray([["className", "dice-roll-sum"], ["style", {
        marginLeft: "auto",
        minWidth: "max-content",
    }], (elems_1 = [createElement("span", {
        children: [" = "],
    }), createElement("span", {
        style: {
            fontWeight: "bold",
        },
        children: sum,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])));
}

class State extends Record {
    "constructor"(Input, Results) {
        super();
        this.Input = Input;
        this.Results = Results;
    }
}

function State$reflection() {
    return record_type("Page.Dicacle.State", [], State, () => [["Input", string_type], ["Results", array_type(DiceSet$reflection())]]);
}

function State_init() {
    return new State("", []);
}

function rollDice(state) {
    const sets = parseStringToDice(state.Input);
    console.log(some("[DICE]"), Array.from(sets));
    const arg = map_1(DiceSet__roll, sets);
    return Array.from(arg);
}

function event_rollDice(state, setState) {
    setState(new State(state.Input, rollDice(state)));
}

function searchbar(state, setState) {
    return createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["className", "is-large"], ["autoFocus", true], ["onChange", (ev) => {
        setState(new State(ev.target.value, state.Results));
    }], ["onKeyDown", (ev_1) => {
        PropHelpers_createOnKey(key_enter, (_arg) => {
            console.log(some("ENTER"));
            event_rollDice(state, setState);
        }, ev_1);
    }]])))));
}

function showSetResult(set$) {
    const children = toList(delay(() => map((setResult) => {
        let clo, elems;
        return createElement("li", createObj(ofArray([["key", (clo = toText(printf("set-index-%i")), clo(setResult.Index))], (elems = [Classes_SetResult__SetResult_ToHtml(setResult)], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
    }, set$.Results)));
    return createElement("ol", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

function showSetsResults(state) {
    const elms = toList(delay(() => ((state.Results.length === 0) ? singleton_1(defaultOf()) : collect((i) => singleton_1(showSetResult(state.Results[i - 1])), rangeDouble(1, 1, state.Results.length)))));
    return createElement("div", {
        className: "field",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
}

function rollButton(state, setState) {
    return createElement("button", createObj(Helpers_combineClasses("button", ofArray([["className", "is-large"], ["id", "Roll-Button"], ["role", join(" ", ["button"])], ["children", "Roll!"], ["onClick", (e) => {
        event_rollDice(state, setState);
    }]]))));
}

export function Main() {
    let elems_3, elems_2, elems, elms;
    const patternInput = useReact_useState_FCFD9EF(State_init);
    const state = patternInput[0];
    const setState = patternInput[1];
    return createElement("div", createObj(Helpers_combineClasses("container", ofArray([["className", "is-max-desktop"], (elems_3 = [createElement("div", createObj(Helpers_combineClasses("field", ofArray([["className", "has-addons"], (elems_2 = [createElement("div", createObj(Helpers_combineClasses("control", ofArray([["className", "is-expanded"], (elems = [searchbar(state, setState)], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), (elms = singleton(rollButton(state, setState)), createElement("div", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))), showSetsResults(state)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]))));
}

