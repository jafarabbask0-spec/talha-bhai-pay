// --- Security Check Start ---
(function() {
    const authorizedDomain = "talha-bhai-pay.vercel.app";
    const currentHost = window.location.hostname;

    // Agar domain match nahi karta toh /error par bhej do
    if (currentHost !== authorizedDomain) {
        window.location.href = window.location.origin + "/error";
    }
})();
// --- Security Check End ---

// --- Main Application Script (Direct Execution) ---
(function() {
    // --- Time Logic ---
    const updateTime = () => {
        var time = new Date().toLocaleTimeString("en", { timeStyle: 'short' });
        const timeElement = document.querySelector(".time");
        if(timeElement) timeElement.innerHTML = time.replace(/\s|PM|AM/g, "");

        const utcTime = new Date();
        const formatted = utcTime.toISOString().replace('T', ' ').slice(0, 19);
        const utcElement = document.querySelector(".utc");
        if(utcElement) utcElement.innerHTML = formatted + " (UTC)";
    };
    updateTime();

    // --- Box Setup ---
    const box = document.querySelector("#box");
    if(box) box.contentEditable = true;

    // --- Screenshot Logic ---
    const btn = document.querySelector(".btn");
    if(btn) {
        btn.addEventListener("click", () => {
            document.body.contentEditable = false;
            html2canvas(document.querySelector("#box")).then(canvas => {
                let a = document.createElement("a");
                a.download = `SS-${Date.now()}.png`;
                a.href = canvas.toDataURL("image/png");
                a.click();
                document.body.contentEditable = true;
            });
        });
    }

    // --- Battery Logic ---
    const batteryInput = document.querySelector("input");
    const batteryFill = document.querySelector(".battery2");
    if(batteryInput && batteryFill) {
        const updateBattery = () => {
            batteryFill.style.width = `${Number(batteryInput.value) * 25 / 100}px`;
        };
        updateBattery();
        batteryInput.onchange = updateBattery;
    }

    console.log("App loaded successfully without external locks.");
})();
