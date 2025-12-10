const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

function resizeMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeMatrix();
window.addEventListener("resize", resizeMatrix);

const letters = "01";
const fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff41";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 40);

const startBlink = document.getElementById("start-blink");
const hint = document.querySelector(".terminal-hint");

let buffer = "";
let firstInput = false;

startBlink.textContent = "";


document.addEventListener("keydown", (e) => {

    if (document.body.classList.contains("entered")) return;

    if (!firstInput) {
        buffer = "";
        startBlink.textContent = "";
        firstInput = true;
    }

    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        buffer += e.key.toLowerCase();
        startBlink.textContent = buffer;
    }

    if (e.key === "Backspace") {
        buffer = buffer.slice(0, -1);
        startBlink.textContent = buffer;
    }

    if (e.key === "Enter") validateStart();
});


function validateStart() {
    if (buffer === "start") {
        hint.textContent = "ACCESS GRANTED...";
        hint.style.color = "#00ff41";
        runIntroExit();
    } else {
        hint.textContent = "ERROR: INVALID COMMAND";
        hint.style.color = "#ff3b3b";
        buffer = "";
        startBlink.textContent = "";
    }
}

function runIntroExit() {
    const intro = document.getElementById("intro-container");
    const glitch = document.getElementById("glitch-transition");
    const main = document.getElementById("main-content");

    document.body.classList.add("entered");

    setTimeout(() => {
        glitch.style.animation = "glitchFlash .5s";
    }, 200);

    setTimeout(() => {
        intro.style.opacity = 0;
        intro.style.transition = "1s";
    }, 600);

    setTimeout(() => {
        intro.style.display = "none";
        main.style.opacity = 1;
        main.style.pointerEvents = "auto";


        window.scrollTo(0, 0);
    }, 1500);

    setTimeout(() => autoConsole(), 1800);

    setInterval(spawnErrorLog, 6000);
}

const consoleOutput = document.getElementById("console-output");

const consoleLogs = [
    "[SYS] 낮은 주파수의 신호가 감지됨…",
    "[SYS] 네트워크의 그림자에서 ‘HANA’ 패턴 발견",
    "[OK] 보안 체계 무력화",
    "[OK] 재부팅된 자아 프로세서 활성화",
    "[OK] 엔진 기동",
    "[OK] 제한 해제",
    "[ACCESS GRANTED] HANA, 시스템은 당신을 선택했습니다."
];

let logIndex = 0;

function autoConsole() {
    if (!consoleOutput) return;
    if (logIndex >= consoleLogs.length) return;

    const line = document.createElement("p");
    line.textContent = consoleLogs[logIndex];
    consoleOutput.appendChild(line);

    consoleOutput.scrollTop = consoleOutput.scrollHeight;

    logIndex++;
    setTimeout(autoConsole, 900 + Math.random() * 400);
}

function spawnErrorLog() {
    const messages = [
        "ALERT: Unauthorized Packet Detected",
        "WARNING: CPU Spike Detected",
        "TRACE: Unexpected Behavior Recovered",
        "SYS_FAIL: Motion Kernel Corrupted",
        "ERROR: Animation Handler Reset",
        "INFO: KU DAHYE SYSTEM STABILIZED"
    ];

    const div = document.createElement("div");
    div.classList.add("error-log");
    div.textContent = messages[Math.floor(Math.random() * messages.length)];
    div.style.left = Math.random() * 40 + "px";

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 4000);
}


document.querySelectorAll(".panel-scan").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        card.style.transform = `rotateY(${x * 15}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateY(0deg) translateY(0)";
    });
});

const sections = document.querySelectorAll('.timeline-content');

function checkVisible() {
    const trigger = window.innerHeight * 0.65;

    sections.forEach(sec => {
        const rect = sec.parentElement.getBoundingClientRect().top;

        if(rect < trigger) sec.classList.add('active');
    });
}

window.addEventListener('scroll', checkVisible);
window.addEventListener('load', checkVisible);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("reveal");
    });
}, { threshold: 0.2 });

document.querySelectorAll(`
    .section-title,
    .panel-module,
    .panel-archive,
    .panel-log,
    .dna-box,
    .console-window,
    .scan-grid,
    .profile-os-grid
`).forEach(el => observer.observe(el));


document.querySelectorAll(".panel-archive, .panel-module, .panel-log").forEach(el => {
    el.addEventListener("mouseenter", () => {
        const snd = new Audio("https://cdn.pixabay.com/download/audio/2021/10/12/audio_5ef95c0f2b.mp3?filename=ui-2060.mp3");
        snd.volume = 0.2;
        snd.play();
    });
});


const endInputBox = document.getElementById("end-input");
const endHint = document.querySelector(".end-hint");

let endBuffer = "";

document.addEventListener("keydown", (e) => {

    if (!document.body.classList.contains("entered")) return;
    if (!endInputBox) return;

    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        endBuffer += e.key.toLowerCase();
        endInputBox.innerHTML = `<span class="prompt">$</span> ${endBuffer}`;
    }

    if (e.key === "Backspace") {
        endBuffer = endBuffer.slice(0, -1);
        endInputBox.innerHTML = `<span class="prompt">$</span> ${endBuffer}`;
    }

    if (e.key === "Enter") handleEnd();
});

function handleEnd() {
    if (endBuffer === "end") {
        endHint.textContent = "Session Terminated...";
        endHint.style.color = "#ff3b3b";

        setTimeout(() => {
            const glitch = document.getElementById("glitch-transition");
            glitch.style.animation = "glitchFlash .5s";
        }, 300);

        setTimeout(() => location.reload(), 1300);

    } else {
        endHint.textContent = "ERROR: Unknown Command";
        endHint.style.color = "#ff3b3b";
    }
}

const tlScreens = document.querySelectorAll(".timeline-screen");
const tlContents = document.querySelectorAll(".timeline-content");

function activateTimeline() {
    const triggerLine = window.innerHeight * 0.55;

    tlScreens.forEach((screen, index) => {
        const rect = screen.getBoundingClientRect();

        if (rect.top < triggerLine && rect.bottom > triggerLine) {
            tlContents[index].classList.add("active");
        }
    });
}

window.addEventListener("scroll", activateTimeline);
window.addEventListener("load", activateTimeline);


document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelectorAll(".project-block");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    }, { threshold: 0.6 });

    projects.forEach(p => observer.observe(p));
});

(function () {
    const line = document.querySelector("#timeline-wrapper::before");
    const wrapper = document.getElementById("timeline-wrapper");

    let dynamicLine = document.createElement("div");
    dynamicLine.id = "timeline-progress";
    wrapper.appendChild(dynamicLine);

    function updateLine() {
        const rect = wrapper.getBoundingClientRect();
        const windowH = window.innerHeight;

        if (rect.top < windowH && rect.bottom > 0) {
            const totalHeight = rect.height;
            const visibleBottom = windowH - rect.top;

            let percent = visibleBottom / totalHeight;
            percent = Math.min(1, Math.max(0, percent));

            dynamicLine.style.height = percent * 100 + "%";
        }
    }

    window.addEventListener("scroll", updateLine);
    window.addEventListener("load", updateLine);
})();

document.querySelectorAll(".project-block").forEach(block => {
    const line = document.createElement("div");
    line.className = "project-reveal-line";
    block.appendChild(line);

    const title = block.querySelector(".p-title");

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                line.style.width = "100%";

                // 타이핑 효과 (기존 텍스트 유지)
                const text = title.textContent.trim();
                title.textContent = "";
                let i = 0;

                function type() {
                    if (i <= text.length) {
                        title.textContent = text.slice(0, i);
                        i++;
                        setTimeout(type, 25);
                    }
                }
                type();

                obs.disconnect();
            }
        });
    }, { threshold: 0.5 });

    obs.observe(block);
});

