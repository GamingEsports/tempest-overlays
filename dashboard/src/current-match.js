const defaultRep = {
    playerAName: '',
    playerBName: '',
    playerAScore: 0,
    playerBScore: 0,
    matchStyle: "",
    matchName: ""
}
const currentMatchRep = nodecg.Replicant('current-match', {defaultValue: defaultRep});
const unsavedCurrentMatchRep = nodecg.Replicant('current-match-unsaved', {defaultValue: defaultRep});

const playerAName = document.querySelector("#player-a-name");
const playerBName = document.querySelector("#player-b-name");
const playerAScore = document.querySelector("#player-a-score");
const playerBScore = document.querySelector("#player-b-score");
const matchStyle = document.querySelector("#match-style");
const matchName = document.querySelector("#match-name");
const notSaved = document.querySelector("#notsaved");

NodeCG.waitForReplicants(currentMatchRep, unsavedCurrentMatchRep).then(() => {
    unsavedCurrentMatchRep.on('change', (newVal) => {
        console.log("unsavedCurrentMatchRep", newVal);
        playerAName.value = newVal.playerAName;
        playerBName.value = newVal.playerBName;
        playerAScore.value = newVal.playerAScore;
        playerBScore.value = newVal.playerBScore;
        matchStyle.value = newVal.matchStyle;
        matchName.value = newVal.matchName;

        if (!replicantsEqual(newVal, currentMatchRep.value)) {
            notSaved.style.display = "block";
        } else {
            notSaved.style.display = "none";
        }
    });

    currentMatchRep.on('change', (newVal, oldVal) => {
        console.log("currentMatchRep", newVal);
        if (oldVal === undefined) return;
        notSaved.style.display = "none";
    });
});

function playerANameChanged() {
    unsavedCurrentMatchRep.value.playerAName = playerAName.value;
}

function playerBNameChanged() {
    unsavedCurrentMatchRep.value.playerBName = playerBName.value;
}

function playerAScoreChanged() {
    unsavedCurrentMatchRep.value.playerAScore = parseInt(playerAScore.value);
}

function playerBScoreChanged() {
    unsavedCurrentMatchRep.value.playerBScore = parseInt(playerBScore.value);
}

function matchStyleChanged() {
    unsavedCurrentMatchRep.value.matchStyle = matchStyle.value;
}

function matchNameChanged() {
    unsavedCurrentMatchRep.value.matchName = matchName.value;
}

function updateButtonClicked() {
    currentMatchRep.value = JSON.parse(JSON.stringify(unsavedCurrentMatchRep.value));
}

function revertButtonClicked() {
    unsavedCurrentMatchRep.value = JSON.parse(JSON.stringify(currentMatchRep.value));
}

function importNextMatch(){
    nodecg.readReplicant('next-match', value => {
        unsavedCurrentMatchRep.value = {
            playerAName: value.playerAName,
            playerBName: value.playerBName,
            playerAScore: 0,
            playerBScore: 0,
            matchStyle: value.matchStyle,
            matchName: value.matchName
        }
    });
}

function replicantsEqual(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
}