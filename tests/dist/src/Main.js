import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { Components_Router } from "./Components.js";

export const root = createRoot(document.getElementById("feliz-app"));

root.render(createElement(Components_Router, null));

