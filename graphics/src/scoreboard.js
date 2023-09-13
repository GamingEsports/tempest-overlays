const currentMatchRep = nodecg.Replicant('current-match');

const e = {
    playerA: {
        name: document.querySelector("#player-a-name"),
        score: document.querySelector("#player-a-score")
    },
    playerB: {
        name: document.querySelector("#player-b-name"),
        score: document.querySelector("#player-b-score")
    },
    matchStyle: document.querySelector("#match-style"),
    matchName: document.querySelector("#match-name"),
}

const NAME_WIDTH = 350;

NodeCG.waitForReplicants(currentMatchRep).then(() => {
    currentMatchRep.on('change', (newVal, oldVal) => {
        console.log("currentMatchRep", newVal);
        if (oldVal === undefined) {
            changeScore(e.playerA.score, newVal.playerAScore, true);
            changeScore(e.playerB.score, newVal.playerBScore, true);
            changePlayerName(e.playerA.name, newVal.playerAName);
            changePlayerName(e.playerB.name, newVal.playerBName);
            changeDetailText(e.matchStyle, newVal.matchStyle);
            changeDetailText(e.matchName, newVal.matchName);

            return;
        }

        if (newVal.playerAScore !== oldVal.playerAScore) {
            changeScore(e.playerA.score, newVal.playerAScore, newVal.playerAScore > oldVal.playerAScore);
        }

        if (newVal.playerBScore !== oldVal.playerBScore) {
            changeScore(e.playerB.score, newVal.playerBScore, newVal.playerBScore > oldVal.playerBScore);
        }

        if (newVal.playerAName !== oldVal.playerAName) {
            changePlayerName(e.playerA.name, newVal.playerAName);
        }

        if (newVal.playerBName !== oldVal.playerBName) {
            changePlayerName(e.playerB.name, newVal.playerBName);
        }

        if (newVal.matchStyle !== oldVal.matchStyle) {
            changeDetailText(e.matchStyle, newVal.matchStyle);
        }

        if (newVal.matchName !== oldVal.matchName) {
            changeDetailText(e.matchName, newVal.matchName);
        }
    });
});

function changeScore(element, num, upwards){
    const tl = gsap.timeline();
    const DISTANCE = 50;
    tl.fromTo(element, {y: 0}, {y : upwards ? DISTANCE : -DISTANCE, duration: 0.5, ease: "power2.in", onComplete: function() {
        element.innerText = num;
    }})
    .fromTo(element, {y : upwards ? -DISTANCE : DISTANCE}, {y : 0, duration: 0.5, ease: "power2.out"});
}

function changePlayerName(element, name){
    const tl = gsap.timeline();
    tl.to(element, {opacity: 0, duration: 0.3, ease: "power2.in", onComplete: function() {
        element.innerText = name;
        
        const width = Math.max(element.scrollWidth, NAME_WIDTH);
        const scale = width == NAME_WIDTH ? 1 : NAME_WIDTH / width;
        gsap.set(element, {scale: scale, width: NAME_WIDTH});
    }})
    .to(element, {opacity: 1, duration: 0.3, ease: "power2.out"});
}

function changeDetailText(element, text){
    const tl = gsap.timeline();
    tl.to(element, {opacity: 0, duration: 0.3, ease: "power2.in", onComplete: function() {
        element.innerText = text;
        if (text != "") {
            tl.to(element, {opacity: 1, duration: 0.3, ease: "power2.out"});
        }
    }})
}