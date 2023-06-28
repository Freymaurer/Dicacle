import { nonSeeded } from "../../fable_modules/fable-library.4.0.1/Random.js";
import { alt, d20, d12, d10, d8, d6, d4 } from "../Dice/Dice.Icon.js";
import { createElement } from "react";
import React from "react";
import { comparePrimitives, min, equals, createObj } from "../../fable_modules/fable-library.4.0.1/Util.js";
import { Helpers_combineClasses } from "../../fable_modules/Feliz.Bulma.3.0.0/ElementBuilders.fs.js";
import { map as map_1, cons, singleton, ofArray } from "../../fable_modules/fable-library.4.0.1/List.js";
import { Interop_reactApi } from "../../fable_modules/Feliz.2.6.0/Interop.fs.js";
import { DiceSet$reflection, Command, Command__get_AsString } from "../Classes.js";
import { toArray, map, sumBy, empty, collect, singleton as singleton_1, append, delay, toList } from "../../fable_modules/fable-library.4.0.1/Seq.js";
import { rangeDouble } from "../../fable_modules/fable-library.4.0.1/Range.js";
import { Convert_fromJson, Convert_serialize } from "../../fable_modules/Fable.SimpleJson.3.24.0/Json.Converter.fs.js";
import { createTypeInfo } from "../../fable_modules/Fable.SimpleJson.3.24.0/TypeInfo.Converter.fs.js";
import { array_type, record_type, class_type, string_type } from "../../fable_modules/fable-library.4.0.1/Reflection.js";
import { join, toText, remove, printf, toConsole } from "../../fable_modules/fable-library.4.0.1/String.js";
import { SimpleJson_tryParse } from "../../fable_modules/Fable.SimpleJson.3.24.0/SimpleJson.fs.js";
import { Record } from "../../fable_modules/fable-library.4.0.1/Types.js";
import { value as value_72, some, defaultArg } from "../../fable_modules/fable-library.4.0.1/Option.js";
import { getItemFromDict, addToDict } from "../../fable_modules/fable-library.4.0.1/MapUtil.js";
import { useFeliz_React__React_useState_Static_1505, useReact_useState_FCFD9EF } from "../../fable_modules/Feliz.2.6.0/React.fs.js";
import { parseStringToDice } from "../Dice/Dice.Parsing.js";
import { Classes_DiceSet__DiceSet_rollBy_Z6EA5070B } from "../Dice/Dice.Roll.js";
import { defaultOf } from "../../fable_modules/fable-library.4.0.1/Util.js";
import { renderModal } from "../Components/Component.Modal.js";

const dice_examples = ["3d6 + 1d11", "2 (1d20+14) (1d20+9)", "2d20k1 + 9", "1d12 + 12 + 2d6"];

function getDiceExample() {
    const rnd = nonSeeded();
    return dice_examples[rnd.Next1(dice_examples.length)];
}

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
    const size = this$.Dice.DiceSize | 0;
    const sum = createElement("span", {
        className: "mr-2 dice-result-subsum",
        children: `${Command__get_AsString(this$.Dice.Command)}${this$.DiceRollSum}`,
    });
    const children = (size === 0) ? singleton(sum) : toList(delay(() => append(singleton_1(sum), delay(() => append(singleton_1(createElement("span", {
        children: ["["],
    })), delay(() => append(collect((i) => {
        const roll = this$.DiceRolled[i] | 0;
        const isLast = i === (this$.DiceRolled.length - 1);
        return append(singleton_1(diceIconOf(roll, size)), delay(() => ((!isLast) ? singleton_1(createElement("span", {
            children: [" + "],
        })) : empty())));
    }, rangeDouble(0, 1, this$.DiceRolled.length - 1)), delay(() => singleton_1(createElement("span", {
        children: ["]"],
    }))))))))));
    return createElement("span", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export function Classes_SetResult__SetResult_ToHtml(this$) {
    let elems_2, elems, elems_1;
    const sum = sumBy((res) => {
        if (equals(res.Dice.Command, new Command(1, []))) {
            return (res.DiceRollSum * -1) | 0;
        }
        else {
            return res.DiceRollSum | 0;
        }
    }, this$.Results, {
        GetZero: () => 0,
        Add: (x, y) => (x + y),
    }) | 0;
    return createElement("div", createObj(ofArray([["className", "dice-result-container is-flex is-align-items-center"], (elems_2 = [createElement("span", createObj(ofArray([["className", "dice-result-subsum-container"], ["style", {
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

function DiceStorage_write(storedDice) {
    const v = Convert_serialize(storedDice, createTypeInfo(class_type("System.Collections.Generic.Dictionary`2", [string_type, string_type])));
    localStorage.setItem("DiceStorage", v);
}

function DiceStorage_load() {
    let matchValue;
    try {
        return (matchValue = SimpleJson_tryParse(localStorage.getItem("DiceStorage")), (matchValue != null) ? Convert_fromJson(matchValue, createTypeInfo(class_type("System.Collections.Generic.Dictionary`2", [string_type, string_type]))) : (() => {
            throw new Error("Couldn\'t parse the input JSON string because it seems to be invalid");
        })());
    }
    catch (matchValue_1) {
        toConsole(printf("Could not find DiceStorage"));
        return void 0;
    }
}

class DiceStorage_State extends Record {
    "constructor"(Name, DiceString, Current) {
        super();
        this.Name = Name;
        this.DiceString = DiceString;
        this.Current = Current;
    }
}

function DiceStorage_State$reflection() {
    return record_type("Page.Dicacle.DiceStorage.State", [], DiceStorage_State, () => [["Name", string_type], ["DiceString", string_type], ["Current", class_type("System.Collections.Generic.Dictionary`2", [string_type, string_type])]]);
}

function DiceStorage_State_init() {
    let option, value;
    return new DiceStorage_State("", "", (option = DiceStorage_load(), (value = (new Map([])), defaultArg(option, value))));
}

const DiceStorage_emptyRow = (() => {
    let elems_1, elems;
    const children = singleton(createElement("td", createObj(ofArray([["colSpan", 2], ["style", {
        textAlign: "center",
    }], (elems_1 = [createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-large"], (elems = [createElement("i", {
        className: "fa-solid fa-broom fa-shake fa-2xl",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), createElement("span", {
        children: ["..empty"],
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))));
    return createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
})();

function DiceStorage_addName(diceStorage, setDiceStorage) {
    let elems_2, elms, elems_1;
    return createElement("div", createObj(Helpers_combineClasses("field", ofArray([["className", "has-addons"], (elems_2 = [(elms = singleton(createElement("button", createObj(Helpers_combineClasses("button", ofArray([["tabIndex", -1], ["className", "is-static"], ["children", "/"]]))))), createElement("div", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("div", createObj(Helpers_combineClasses("control", singleton((elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["autoFocus", true], ["tabIndex", 0], ["placeholder", "..name"], ["onChange", (ev) => {
        setDiceStorage(new DiceStorage_State(ev.target.value, diceStorage.DiceString, diceStorage.Current));
    }]])))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]))));
}

function DiceStorage_addDiceString(diceStorage, setDiceStorage) {
    let elems_2, elems_1, elems;
    return createElement("div", createObj(Helpers_combineClasses("field", singleton((elems_2 = [createElement("div", createObj(Helpers_combineClasses("control", ofArray([["className", "has-icons-left"], (elems_1 = [createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["tabIndex", 0], ["placeholder", getDiceExample()], ["onChange", (ev) => {
        setDiceStorage(new DiceStorage_State(diceStorage.Name, ev.target.value, diceStorage.Current));
    }]]))))), createElement("span", createObj(Helpers_combineClasses("icon", ofArray([["className", "is-left"], ["className", "is-small"], (elems = [createElement("i", {
        className: "fa-solid fa-dice-d20",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])))));
}

class State extends Record {
    "constructor"(Input, Results, DiceStorage) {
        super();
        this.Input = Input;
        this.Results = Results;
        this.DiceStorage = DiceStorage;
    }
}

function State$reflection() {
    return record_type("Page.Dicacle.State", [], State, () => [["Input", string_type], ["Results", array_type(DiceSet$reflection())], ["DiceStorage", class_type("System.Collections.Generic.Dictionary`2", [string_type, string_type])]]);
}

function State_init() {
    let option, value;
    return new State("", [], (option = DiceStorage_load(), (value = (new Map([])), defaultArg(option, value))));
}

function State__get_KeyFromInput(this$) {
    if (this$.Input !== "") {
        return remove(this$.Input, 0, 1);
    }
    else {
        return "";
    }
}

function addToDiceStorage(state, setState, storageState, setStorageState) {
    addToDict(state.DiceStorage, storageState.Name, storageState.DiceString);
    setState(new State(state.Input, state.Results, state.DiceStorage));
    addToDict(storageState.Current, storageState.Name, storageState.DiceString);
    setStorageState(new DiceStorage_State(storageState.Name, storageState.DiceString, storageState.Current));
    DiceStorage_write(storageState.Current);
}

function removeFromDiceStorage(id, state, setState, storageState, setStorageState) {
    state.DiceStorage.delete(id);
    setState(new State(state.Input, state.Results, state.DiceStorage));
    storageState.Current.delete(id);
    setStorageState(new DiceStorage_State(storageState.Name, storageState.DiceString, storageState.Current));
    DiceStorage_write(storageState.Current);
}

function DiceStorageModal(diceStorageModalInputProps) {
    let children, children_3, children_5, children_7, elems_5, elems_4, elems_12, elms_5, elms_4, elms_3, elms_2;
    const rmv = diceStorageModalInputProps.rmv;
    const setState = diceStorageModalInputProps.setState;
    const state = diceStorageModalInputProps.state;
    const patternInput = useReact_useState_FCFD9EF(DiceStorage_State_init);
    const setDiceStorage = patternInput[1];
    const diceStorage = patternInput[0];
    let content;
    const elms = singleton((children = toList(delay(() => ((diceStorage.Current.size > 0) ? collect((matchValue) => {
        let clo, elems, clo_1, clo_2, clo_3;
        const activePatternResult = matchValue;
        const id_1 = activePatternResult[0];
        return singleton_1(createElement("tr", createObj(ofArray([["key", (clo = toText(printf("Stored-Dice-%s")), clo(id_1))], (elems = [createElement("td", {
            key: (clo_1 = toText(printf("Stored-Dice-Name-%s")), clo_1(id_1)),
            children: createElement("code", {
                children: ["/" + id_1],
            }),
        }), createElement("td", {
            key: (clo_2 = toText(printf("Stored-Dice-diceString-%s")), clo_2(id_1)),
            children: activePatternResult[1],
        }), createElement("td", {
            key: (clo_3 = toText(printf("Stored-Dice-remove-%s")), clo_3(id_1)),
            children: createElement("button", createObj(Helpers_combineClasses("delete", ofArray([["style", {
                float: "right",
            }], ["onClick", (_arg) => {
                removeFromDiceStorage(id_1, state, setState, diceStorage, setDiceStorage);
            }]])))),
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))));
    }, diceStorage.Current) : singleton_1(DiceStorage_emptyRow)))), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    })));
    content = createElement("table", {
        className: "table",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
    let addNewToStorageElement;
    const elms_1 = ofArray([(children_3 = singleton(DiceStorage_addName(diceStorage, setDiceStorage)), createElement("div", {
        className: "column",
        children: Interop_reactApi.Children.toArray(Array.from(children_3)),
    })), (children_5 = singleton(DiceStorage_addDiceString(diceStorage, setDiceStorage)), createElement("div", {
        className: "column",
        children: Interop_reactApi.Children.toArray(Array.from(children_5)),
    })), (children_7 = singleton(createElement("div", createObj(Helpers_combineClasses("field", singleton((elems_5 = [createElement("div", createObj(Helpers_combineClasses("control", singleton((elems_4 = [createElement("button", createObj(Helpers_combineClasses("button", toList(delay(() => {
        const valid = (diceStorage.Name !== "") && (diceStorage.DiceString !== "");
        return append(singleton_1(["style", {
            float: "right",
        }]), delay(() => append(singleton_1(["children", "+"]), delay(() => append((!valid) ? singleton_1(["className", "is-static"]) : empty(), delay(() => append(singleton_1(["tabIndex", 0]), delay(() => singleton_1(["onClick", (_arg_1) => {
            if (valid) {
                addToDiceStorage(state, setState, diceStorage, setDiceStorage);
            }
        }])))))))));
    })))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_5))])))))), createElement("div", {
        className: "column",
        children: Interop_reactApi.Children.toArray(Array.from(children_7)),
    }))]);
    addNewToStorageElement = createElement("div", {
        className: "columns",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    });
    return createElement("div", createObj(Helpers_combineClasses("modal", ofArray([["className", "is-active"], (elems_12 = [createElement("div", createObj(Helpers_combineClasses("modal-background", singleton(["onClick", (e) => {
        rmv();
    }])))), (elms_5 = singleton((elms_4 = singleton((elms_3 = ofArray([createElement("h1", {
        children: ["Dice Storage"],
    }), (elms_2 = ofArray([createElement("span", {
        children: ["Type "],
    }), createElement("code", {
        children: ["/placeholder"],
    }), createElement("span", {
        children: ["in main field to quick access any stored dice!"],
    })]), createElement("p", {
        className: "help",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    })), content, addNewToStorageElement]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))), createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    }))), createElement("div", {
        className: "modal-content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_5)),
    })), createElement("button", createObj(Helpers_combineClasses("modal-close", ofArray([["className", "is-medium"], ["aria-label", "close"], ["onClick", (e_1) => {
        rmv();
    }]]))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_12))])]))));
}

function rollDice(state) {
    const sets = parseStringToDice((state.Input.indexOf("/") === 0) ? getItemFromDict(state.DiceStorage, State__get_KeyFromInput(state)) : state.Input);
    const arr = Array.from(sets);
    console.log(some("[DICE]"), arr);
    const rnd = nonSeeded();
    const arg = map_1((x) => Classes_DiceSet__DiceSet_rollBy_Z6EA5070B(x, rnd), sets);
    return Array.from(arg);
}

function event_rollDice(state, setState) {
    setState(new State(state.Input, rollDice(state), state.DiceStorage));
}

function updateUIState(state, cmds, increase) {
    let state_2;
    const state_1 = defaultArg(state, -1) | 0;
    state_2 = (increase ? min(comparePrimitives, state_1 + 1, cmds.length - 1) : (state_1 - 1));
    if (state_2 < 0) {
        return void 0;
    }
    else {
        return state_2;
    }
}

function Searchbar(searchbarInputProps) {
    let elems_2;
    const setState = searchbarInputProps.setState;
    const state = searchbarInputProps.state;
    const example = getDiceExample();
    const isCommand = state.Input.indexOf("/") === 0;
    const hasMatch = isCommand && state.DiceStorage.has(State__get_KeyFromInput(state));
    const inputKey = State__get_KeyFromInput(state);
    const filteredCommands = toArray(delay(() => collect((x) => (((x[0].indexOf(inputKey) === 0) && (x[0] !== inputKey)) ? singleton_1(x) : empty()), state.DiceStorage)));
    const patternInput = useFeliz_React__React_useState_Static_1505(void 0);
    const uiState = patternInput[0];
    const setUiState = patternInput[1];
    return createElement("div", createObj(ofArray([["style", {
        display: "flex",
        position: "relative",
    }], (elems_2 = toList(delay(() => append(singleton_1(createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", toList(delay(() => append(singleton_1(["className", "is-large"]), delay(() => append(singleton_1(["placeholder", example]), delay(() => append(singleton_1(["autoFocus", true]), delay(() => append(hasMatch ? singleton_1(["className", "has-text-danger-dark"]) : empty(), delay(() => {
        let value_11;
        return append(singleton_1((value_11 = state.Input, ["ref", (e) => {
            if ((!(e == null)) && (!equals(e.value, value_11))) {
                e.value = value_11;
            }
        }])), delay(() => append(singleton_1(["onChange", (ev) => {
            const nextState = new State(ev.target.value, state.Results, state.DiceStorage);
            setUiState(void 0);
            setState(nextState);
        }]), delay(() => singleton_1(["onKeyDown", (k) => {
            if (isCommand && (filteredCommands.length > 0)) {
                const matchValue = k.which;
                if (matchValue === 40) {
                    setUiState(updateUIState(uiState, filteredCommands, true));
                }
                else if (matchValue === 38) {
                    setUiState(updateUIState(uiState, filteredCommands, false));
                }
                else if (matchValue === 13) {
                    if (uiState != null) {
                        setState(new State("/" + filteredCommands[value_72(uiState)][0], state.Results, state.DiceStorage));
                        setUiState(void 0);
                    }
                }
            }
            else if (k.which === 13) {
                event_rollDice(state, setState);
                setUiState(void 0);
            }
        }])))));
    }))))))))))))))), delay(() => {
        let children;
        return isCommand ? singleton_1(createElement("div", {
            id: "command-container",
            style: {
                backgroundColor: "#F5F5F5",
                zIndex: 3,
                position: "absolute",
                top: 100 + "%",
                left: 0,
                width: 100 + "%",
                maxHeight: 100 + "px",
            },
            children: (children = toList(delay(() => collect((index) => {
                let elems_1, elems;
                const command_1 = filteredCommands[index];
                return singleton_1(createElement("li", createObj(ofArray([["style", createObj(toList(delay(() => (((uiState != null) && (value_72(uiState) === index)) ? singleton_1(["filter", ("brightness(" + 85) + "%)"]) : empty()))))], (elems_1 = [createElement("div", createObj(ofArray([["onClick", (_arg) => {
                    setState(new State("/" + command_1[0], state.Results, state.DiceStorage));
                }], (elems = [createElement("code", {
                    children: ["/" + command_1[0]],
                }), createElement("span", {
                    children: [command_1[1]],
                })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))));
            }, rangeDouble(0, 1, filteredCommands.length - 1)))), createElement("ul", {
                children: Interop_reactApi.Children.toArray(Array.from(children)),
            })),
        })) : empty();
    })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])));
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
    const elms_1 = toList(delay(() => ((state.Results.length === 0) ? singleton_1(defaultOf()) : collect((i) => {
        let elms;
        return singleton_1((elms = singleton(showSetResult(state.Results[i - 1])), createElement("div", {
            className: "field",
            children: Interop_reactApi.Children.toArray(Array.from(elms)),
        })));
    }, rangeDouble(1, 1, state.Results.length)))));
    return createElement("div", {
        className: "field",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    });
}

function storageButton(state, setState) {
    return createElement("button", createObj(Helpers_combineClasses("button", ofArray([["className", "is-large"], ["title", "Manage stored dice"], ["role", join(" ", ["button"])], ["children", "+"], ["onClick", (_arg) => {
        renderModal((rmv) => createElement(DiceStorageModal, {
            state: state,
            setState: setState,
            rmv: rmv,
        }));
    }]]))));
}

function rollButton(state, setState) {
    return createElement("button", createObj(Helpers_combineClasses("button", ofArray([["className", "is-large"], ["role", join(" ", ["button"])], ["children", "Roll!"], ["onClick", (e) => {
        event_rollDice(state, setState);
    }]]))));
}

export function Main() {
    let elems_4, elems_3, elms, elems_1, elms_1;
    const patternInput = useReact_useState_FCFD9EF(State_init);
    const state = patternInput[0];
    const setState = patternInput[1];
    return createElement("div", createObj(Helpers_combineClasses("container", ofArray([["className", "is-max-desktop"], (elems_4 = [createElement("div", createObj(Helpers_combineClasses("field", ofArray([["className", "has-addons"], (elems_3 = [(elms = singleton(storageButton(state, setState)), createElement("div", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), createElement("div", createObj(Helpers_combineClasses("control", ofArray([["className", "is-expanded"], (elems_1 = [createElement(Searchbar, {
        state: state,
        setState: setState,
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), (elms_1 = singleton(rollButton(state, setState)), createElement("div", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))), showSetsResults(state)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])]))));
}

