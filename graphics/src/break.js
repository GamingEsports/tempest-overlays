const breakRep = nodecg.Replicant('break');

const e = {
    breakText: document.getElementById('break-text'),
    detailsText: document.getElementById('details-text'),
    cloud: document.getElementById('cloud'),
    sephiroth: document.getElementById('sephiroth'),
}

const charTl = gsap.timeline({repeat: -1});
charTl.to(e.cloud, {duration: 1, "--mask-offset": "0%", ease: "power2.out"}, "+=.5")
    .to(e.cloud, {duration: 1, "--mask-offset": "125%", ease: "power2.in"}, "+=9")
    .to(e.sephiroth, {duration: 1, "--mask-offset": "0%", ease: "power2.out"}, "+=.5")
    .to(e.sephiroth, {duration: 1, "--mask-offset": "125%", ease: "power2.in"}, "+=9");


NodeCG.waitForReplicants(breakRep).then(() => {
    breakRep.on('change', (newVal, oldVal) => {
        if (oldVal === undefined) {
            changeText(e.breakText, newVal.infoText);
            changeText(e.detailsText, `#${newVal.edition} - ${getDate()} - ${newVal.locationText}`);
            return;
        }
        if (newVal.infoText !== oldVal.infoText) {
            changeText(e.breakText, newVal.infoText);
        }
        if (newVal.edition !== oldVal.edition || newVal.locationText !== oldVal.locationText) {
            changeText(e.detailsText, `#${newVal.edition} - ${getDate()} - ${newVal.locationText}`);
        }
    });
});

function changeText(element, text) {
    const tl = gsap.timeline();
    tl.to(element, {duration: 0.5, opacity: 0, ease: "power2.in", onComplete: () => {
        element.innerText = text;
    }});
    tl.to(element, {duration: 0.5, opacity: 1, ease: "power2.out"}, "+=.25");
}

function getDate() {
    const today = new Date();
    const date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    return date;
}