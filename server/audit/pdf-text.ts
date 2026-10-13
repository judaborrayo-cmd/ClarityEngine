// Keep the original report strings intact. The PDF font subset misrenders some
// arrows and smart punctuation; use supported equivalents at the text boundary.
export function pdfSafeText(value: string) {
  return value
    .replace(/→/g, '->')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—‑]/g, '-')
    .replace(/\u00a0/g, ' ');
}
