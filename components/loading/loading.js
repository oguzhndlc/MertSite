(() => {
    const MIN_DURATION = 1200;
    let startTime = Date.now();
    let loaderEl = null;

    const injectHTML = async () => {
        const res = await fetch("/components/loading/loading.html");
        if (!res.ok) return;

        document.body.insertAdjacentHTML("afterbegin", await res.text());
        loaderEl = document.getElementById("loading-screen");
    };

    const injectCSS = () => {
        if (document.getElementById("loading-css")) return;

        const link = document.createElement("link");
        link.id = "loading-css";
        link.rel = "stylesheet";
        link.href = "/components/loading/loading.css";
        document.head.appendChild(link);
    };

    const show = () => {
        document.body.classList.add("loading");
        loaderEl?.classList.remove("hide");
        startTime = Date.now();
    };

    const hide = () => {
        const delay = Math.max(0, MIN_DURATION - (Date.now() - startTime));
        setTimeout(() => {
            loaderEl?.classList.add("hide");
            document.body.classList.remove("loading");
        }, delay);
    };

    const init = async () => {
        injectCSS();
        await injectHTML();
        show();

        if (document.readyState === "complete") {
            hide();
        } else {
            window.addEventListener("load", hide);
        }
    };

    init();

    // 🌍 Global erişim
    window.Loader = { show, hide };
})();
