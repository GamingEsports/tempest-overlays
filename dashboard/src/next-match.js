const defaultRep = {
    playerAName: '',
    playerBName: '',
    matchStyle: "",
    matchName: ""
}
const nextMatchRep = nodecg.Replicant('next-match', {defaultValue: defaultRep});
const unsavedNextMatchRep = nodecg.Replicant('next-match-unsaved', {defaultValue: defaultRep});

const playerAName = document.querySelector("#player-a-name");
const playerBName = document.querySelector("#player-b-name");
const matchStyle = document.querySelector("#match-style");
const matchName = document.querySelector("#match-name");
const notSaved = document.querySelector("#notsaved");

NodeCG.waitForReplicants(nextMatchRep, unsavedNextMatchRep).then(() => {
    unsavedNextMatchRep.on('change', (newVal) => {
        console.log("unsavedNextMatchRep", newVal);
        playerAName.value = newVal.playerAName;
        playerBName.value = newVal.playerBName;
        matchStyle.value = newVal.matchStyle;
        matchName.value = newVal.matchName;

        if (!replicantsEqual(newVal, nextMatchRep.value)) {
            notSaved.style.display = "block";
        } else {
            notSaved.style.display = "none";
        }
    });

    nextMatchRep.on('change', (newVal, oldVal) => {
        console.log("nextMatchRep", newVal);
        if (oldVal === undefined) return;
        notSaved.style.display = "none";
    });
});

function playerANameChanged() {
    unsavedNextMatchRep.value.playerAName = playerAName.value;
}

function playerBNameChanged() {
    unsavedNextMatchRep.value.playerBName = playerBName.value;
}

function matchStyleChanged() {
    unsavedNextMatchRep.value.matchStyle = matchStyle.value;
}

function matchNameChanged() {
    unsavedNextMatchRep.value.matchName = matchName.value;
}

function updateButtonClicked() {
    nextMatchRep.value = JSON.parse(JSON.stringify(unsavedNextMatchRep.value));
}

function revertButtonClicked() {
    unsavedNextMatchRep.value = JSON.parse(JSON.stringify(nextMatchRep.value));
}

function replicantsEqual(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
}