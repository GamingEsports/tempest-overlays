const bottomBarRep = nodecg.Replicant('bottomBar');
const currentMatchRep = nodecg.Replicant('current-match');
const nextMatchRep = nodecg.Replicant('next-match');

const e = {
    currentMatch: {
        wrapper: document.getElementById('current-match-wrapper'),
        text: document.getElementById('current-match')
    },
    nextMatch: {
        wrapper: document.getElementById('next-match-wrapper'),
        text: document.getElementById('next-match')
    },
    breakText: {
        wrapper: document.getElementById('break-text-wrapper'),
        text: document.getElementById('break-text')
    },
    time: document.getElementById('time')
}

NodeCG.waitForReplicants(bottomBarRep, currentMatchRep, nextMatchRep).then(() => {
    bottomBarRep.on('change', (newVal, oldVal) => {
        if (oldVal === undefined) {
            changeText(e.breakText, newVal.breakText);

            switch (newVal.show) {
                case "current":
                    switchModeWrapper(e.currentMatch);
                    break;
                case "next":
                    switchModeWrapper(e.nextMatch);
                    break;
                case "break":
                    switchModeWrapper(e.breakText);
                    break;
            }
            return;
        }

        if (newVal.breakText !== oldVal.breakText) {
            changeText(e.breakText, newVal.breakText);
        }

        if (newVal.show !== oldVal.show) {
            switch (newVal.show) {
                case "current":
                    switchModeWrapper(e.currentMatch);
                    break;
                case "next":
                    switchModeWrapper(e.nextMatch);
                    break;
                case "break":
                    switchModeWrapper(e.breakText);
                    break;
            }
        }
    });

    currentMatchRep.on('change', (newVal, oldVal) => {
        const html = `${newVal.playerAName}<span class="score">${newVal.playerAScore} - ${newVal.playerBScore}</span>${newVal.playerBName}`;
        if (oldVal === undefined) {
            changeText(e.currentMatch, html);
            return;
        }
        if (newVal.playerAName !== oldVal.playerAName || newVal.playerBName !== oldVal.playerBName || newVal.playerAScore !== oldVal.playerAScore || newVal.playerBScore !== oldVal.playerBScore) {
            changeText(e.currentMatch, html);
        }
    });

    nextMatchRep.on('change', (newVal, oldVal) => {
        const playerA = newVal.playerAName != "" ? newVal.playerAName : "?";
        const playerB = newVal.playerBName != "" ? newVal.playerBName : "?";
        const html = playerA + '<span class="score">vs</span>' + playerB;
        if (oldVal === undefined) {
            changeText(e.nextMatch, html);
            return;
        }
        if (newVal.playerAName !== oldVal.playerAName || newVal.playerBName !== oldVal.playerBName) {
            changeText(e.nextMatch, html);
        }
    });
});

function switchModeWrapper(element){
    const tl = gsap.timeline();

    tl.fromTo(".bar-mode-wrapper", {y: 0}, {duration: 0.5, y: 120, opacity: 0, ease: "power2.in", display: "none"})
    .set(element.wrapper, {display:"flex", onComplete: function() {
        fitText(element.text);
        tl.fromTo(element.wrapper, {y: -120, opacity: 0}, {duration: 0.5, y: 0, opacity: 1, ease: "power2.out"});
    }})

}

function changeText(element, text){
    const tl = gsap.timeline();
    tl.to(element.text, {opacity: 0, duration: 0.3, ease: "power2.in", onComplete: function() {
        element.text.innerHTML = text;
        fitText(element.text);
        tl.to(element.text, {opacity: 1, duration: 0.3, ease: "power2.out"});
    }})
}

function fitText(element){
    const MAX_WIDTH = 1000;
    element.style.width = "auto";
    const width = element.scrollWidth;
    const scale = Math.min(1, MAX_WIDTH / width);
    element.style.width = Math.min(width, MAX_WIDTH) + "px";
    element.style.transform = "scale(" + scale + ")";
    console.log("fitText", element, width, scale);
}

function setClock(){
    const date = new Date();
    e.time.innerText = date.toLocaleString('en-US', { hour: '2-digit', minute: "2-digit", hour12: true}).replace("PM", "").replace("AM", "");
}
setInterval(setClock, 10000);
setClock();