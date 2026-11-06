import { useEffect } from "react";
import { mountHomeExplorers } from "./home-explorer-controller";
import "./home-explorer-scenes.css";

/** Add decorative motion without replacing the existing hero or credential artwork. */
export default function HomeExplorerScenes() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    return mountHomeExplorers(hero);
  }, []);
  return null;
}
