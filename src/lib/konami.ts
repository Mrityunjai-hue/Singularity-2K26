// Konami Code Easter Egg Listener (↑ ↑ ↓ ↓ ← → ← → B A)

export function registerKonamiCode(onSuccess: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const code = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let index = 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    const expected = code[index].toLowerCase();

    if (key === expected) {
      index++;
      if (index === code.length) {
        index = 0;
        onSuccess();
      }
    } else {
      index = 0;
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}
