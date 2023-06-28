import { createRoot } from "react-dom/client";

export function renderModal(reactElement) {
    const root = createRoot(document.getElementById("modal-container"));
    root.render(reactElement(() => {
        root.unmount();
    }));
}

