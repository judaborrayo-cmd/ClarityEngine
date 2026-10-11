import display from "./question-display.json";
// Presentation only; canonical diagnostic inputs and frozen answer IDs are unchanged.
export function questionDisplay(question: { id: string; prompt: string }) {
  return display[question.id as keyof typeof display] ?? question.prompt;
}
