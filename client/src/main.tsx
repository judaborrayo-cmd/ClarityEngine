import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./hero-layout.css";

// HubSpot adds its submission ID to redirects. Remove it before any tags initialize;
// successful submission is established by the same-tab receipt, never the URL.
if (location.pathname === "/inquiry/thank-you") {
  const url = new URL(location.href);
  url.searchParams.delete("submissionGuid");
  history.replaceState(history.state, "", url.pathname + url.search + url.hash);
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
