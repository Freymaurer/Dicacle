import { Union } from "../fable_modules/fable-library.4.0.1/Types.js";
import { union_type } from "../fable_modules/fable-library.4.0.1/Reflection.js";
import { tail, head, isEmpty } from "../fable_modules/fable-library.4.0.1/List.js";

export class Pages extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Dicacle", "Reference", "Counter", "NotFound"];
    }
}

export function Pages$reflection() {
    return union_type("Routing.Pages", [], Pages, () => [[], [], [], []]);
}

export function Pages__get_AsUrl(this$) {
    switch (this$.tag) {
        case 1: {
            return "#/reference";
        }
        case 2: {
            return "#/counter";
        }
        case 3: {
            return "#/404";
        }
        default: {
            return "#/";
        }
    }
}

export function Pages_ofUrl_7F866359(url) {
    let matchResult;
    if (!isEmpty(url)) {
        if (head(url) === "/") {
            if (isEmpty(tail(url))) {
                matchResult = 0;
            }
            else {
                matchResult = 3;
            }
        }
        else if (head(url) === "reference") {
            if (isEmpty(tail(url))) {
                matchResult = 1;
            }
            else {
                matchResult = 3;
            }
        }
        else if (head(url) === "counter") {
            if (isEmpty(tail(url))) {
                matchResult = 2;
            }
            else {
                matchResult = 3;
            }
        }
        else {
            matchResult = 3;
        }
    }
    else {
        matchResult = 0;
    }
    switch (matchResult) {
        case 0: {
            return new Pages(0, []);
        }
        case 1: {
            return new Pages(1, []);
        }
        case 2: {
            return new Pages(2, []);
        }
        case 3: {
            return new Pages(3, []);
        }
    }
}

export function Pages_ofHash_Z721C83C5(hashStr) {
    let matchResult;
    if (hashStr === "") {
        matchResult = 0;
    }
    else if (hashStr === "#/") {
        matchResult = 0;
    }
    else if (hashStr === "#/reference") {
        matchResult = 1;
    }
    else if (hashStr === "#/counter") {
        matchResult = 2;
    }
    else {
        matchResult = 3;
    }
    switch (matchResult) {
        case 0: {
            return new Pages(0, []);
        }
        case 1: {
            return new Pages(1, []);
        }
        case 2: {
            return new Pages(2, []);
        }
        case 3: {
            return new Pages(3, []);
        }
    }
}

export function Pages__get_PageName(this$) {
    switch (this$.tag) {
        case 1: {
            return "Reference";
        }
        case 2: {
            return "Counter";
        }
        case 3: {
            return "404";
        }
        default: {
            return "Dicacle";
        }
    }
}

