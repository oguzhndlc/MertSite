function initWaveText() {
  document.querySelectorAll(".wave-text").forEach(el => {
    const text = el.innerText;
    el.innerHTML = "";

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.animationDelay = `${i * 0.1}s`;
      el.appendChild(span);
    });
  });
}
