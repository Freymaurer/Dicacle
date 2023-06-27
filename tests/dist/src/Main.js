import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { Components_Counter } from "./Components.js";

export const root = createRoot(document.getElementById("feliz-app"));

root.render(createElement(Components_Counter, null));

