const bottomBarRep = nodecg.Replicant('bottomBar', {defaultValue: {
    show: "break",
    breakText: ""
}});
const unsavedBottomBarRep = nodecg.Replicant('bottomBar-unsaved', {defaultValue: {
    show: "break",
    breakText: ""
}});

const showCurrent = document.querySelector("#show-current");
const showNext = document.querySelector("#show-next");
const showBreak = document.querySelector("#show-break");
const breakText = document.querySelector("#break-text");
const notSaved = document.querySelector("#notsaved");

NodeCG.waitForReplicants(bottomBarRep, unsavedBottomBarRep).then(() => {
    unsavedBottomBarRep.on('change', (newVal) => {
        if (newVal.show === "current") {
            showCurrent.classList.add("selected");
            showNext.classList.remove("selected");
            showBreak.classList.remove("selected");
        } else if (newVal.show === "next") {
            showCurrent.classList.remove("selected");
            showNext.classList.add("selected");
            showBreak.classList.remove("selected");
        } else if (newVal.show === "break") {
            showCurrent.classList.remove("selected");
            showNext.classList.remove("selected");
            showBreak.classList.add("selected");
        }

        breakText.value = newVal.breakText;

        if (!replicantsEqual(newVal, bottomBarRep.value)) {
            notSaved.style.display = "block";
        } else {
            notSaved.style.display = "none";
        }
    });

    bottomBarRep.on('change', (newVal, oldVal) => {
        if (oldVal === undefined) return;
        notSaved.style.display = "none";
    });
});

function showCurrentClicked() {
    unsavedBottomBarRep.value.show = "current";
}

function showNextClicked() {
    unsavedBottomBarRep.value.show = "next";
}

function showBreakClicked() {
    unsavedBottomBarRep.value.show = "break";
}

function breakTextChanged() {
    unsavedBottomBarRep.value.breakText = breakText.value;
}

function updateButtonClicked() {
    bottomBarRep.value = JSON.parse(JSON.stringify(unsavedBottomBarRep.value));
}

function revertButtonClicked() {
    unsavedBottomBarRep.value = JSON.parse(JSON.stringify(bottomBarRep.value));
}

function replicantsEqual(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
}