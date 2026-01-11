async function loadHeader() {
  try {
    const res = await fetch("/components/header/header.html");
    if (!res.ok) throw new Error("Header yüklenemedi");

    const html = await res.text();
    document.getElementById("header-placeholder").innerHTML = html;

    // Header JS'ini YÜKLE
    if (!document.querySelector('script[src="/components/header/script.js"]')) {
      const script = document.createElement("script");
      script.src = "/components/header/script.js";
      script.defer = true;
      document.body.appendChild(script);
    }

  } catch (err) {
    console.error("❌ Header load error:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadHeader);
