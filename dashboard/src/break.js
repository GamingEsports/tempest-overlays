const breakRep = nodecg.Replicant('break', {defaultValue: {
    infoText: "",
    edition: "",
    locationText: ""
}});
const unsavedBreakRep = nodecg.Replicant('break-unsaved', {defaultValue: {
    infoText: "",
    edition: "",
    locationText: ""
}});

const infoText = document.querySelector("#info-text");
const edition = document.querySelector("#edition");
const locationText = document.querySelector("#location-text");
const notSaved = document.querySelector("#notsaved");

NodeCG.waitForReplicants(breakRep, unsavedBreakRep).then(() => {  
    unsavedBreakRep.on('change', (newVal) => {
        infoText.value = newVal.infoText;
        edition.value = newVal.edition;
        locationText.value = newVal.locationText;

        if (!replicantsEqual(newVal, breakRep.value)) {
            notSaved.style.display = "block";
        } else {
            notSaved.style.display = "none";
        }
    });

    breakRep.on('change', (newVal, oldVal) => {
        if (oldVal === undefined) return;
        notSaved.style.display = "none";
    });
});

function infoTextChanged() {
    unsavedBreakRep.value.infoText = infoText.value;
}

function editionChanged() {
    unsavedBreakRep.value.edition = edition.value;
}

function locationTextChanged() {
    unsavedBreakRep.value.locationText = locationText.value;
}

function updateButtonClicked() {
    breakRep.value = JSON.parse(JSON.stringify(unsavedBreakRep.value));
}

function revertButtonClicked() {
    unsavedBreakRep.value = JSON.parse(JSON.stringify(breakRep.value));
}

function replicantsEqual(a, b){
    console.log("replicantsEqual", a, b, JSON.stringify(a) === JSON.stringify(b));
    return JSON.stringify(a) === JSON.stringify(b);
}