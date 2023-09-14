const castersRep = nodecg.Replicant('casters');
const showCastersRep = nodecg.Replicant('show-casters');

const e = {
    caster1: {
        wrapper: document.getElementById('caster-1-wrapper'),
        name: document.getElementById('caster-1-name'), 
    },
    caster2: {
        wrapper: document.getElementById('caster-2-wrapper'),
        name: document.getElementById('caster-2-name'),
    },
    caster3: {
        wrapper: document.getElementById('caster-3-wrapper'),
        name: document.getElementById('caster-3-name'),
    }
}

NodeCG.waitForReplicants(castersRep, showCastersRep).then(() => {
    castersRep.on('change', (newVal, oldVal) => {
        if (oldVal === undefined) {
            changeCaster(e.caster1, newVal.casterA);
            changeCaster(e.caster2, newVal.casterB);
            changeCaster(e.caster3, newVal.casterC);
            return;
        }

        if (newVal.casterA !== oldVal.casterA) {
            if (newVal.casterA == "") {
                changeCasterVisibility(e.caster1, false);
            } else if (oldVal.casterA == "") {
                changeCasterVisibility(e.caster1, true);
            }
            changeCaster(e.caster1, newVal.casterA);
        }

        if (newVal.casterB !== oldVal.casterB) {
            if (newVal.casterB == "") {
                changeCasterVisibility(e.caster2, false);
            } else if (oldVal.casterB == "") {
                changeCasterVisibility(e.caster2, true);
            }
            changeCaster(e.caster2, newVal.casterB);
        }

        if (newVal.casterC !== oldVal.casterC) {
            if (newVal.casterC == "") {
                changeCasterVisibility(e.caster3, false);
            } else if (oldVal.casterC == "") {
                changeCasterVisibility(e.caster3, true);
            }
            changeCaster(e.caster3, newVal.casterC);
        }
    });

    showCastersRep.on('change', (newVal, oldVal) => {
        if (oldVal === undefined) {
            changeCasterVisibility(e.caster1, castersRep.value.casterA !== "" && newVal);
            changeCasterVisibility(e.caster2, castersRep.value.casterB !== "" && newVal);
            changeCasterVisibility(e.caster3, castersRep.value.casterC !== "" && newVal);
            return;
        }

        if (newVal !== oldVal) {
            changeCasterVisibility(e.caster1, castersRep.value.casterA !== "" && newVal);
            changeCasterVisibility(e.caster2, castersRep.value.casterB !== "" && newVal);
            changeCasterVisibility(e.caster3, castersRep.value.casterC !== "" && newVal);
        }
    });
});

function changeCaster(element, name){
    const tl = gsap.timeline();
    tl.to(element.name, {duration: 0.3, opacity: 0, onComplete: function() {
        element.name.innerText = name;
        const MAX_WIDTH = 370;
        element.name.style.width = "auto";
        const width = Math.max(element.name.scrollWidth, MAX_WIDTH);
        const scale = Math.min(1, MAX_WIDTH / width);
        element.name.style.width = Math.min(width, MAX_WIDTH) + "px";
        element.name.style.transform = "scale(" + scale + ")";
        element.name.style.transformOrigin = "left";
        console.log("fitText", element.name, width, scale);
        tl.to(element.name, {duration: 0.3, opacity: 1});
    }});
}

function changeCasterVisibility(element, visible) {
    if (visible) {
        gsap.to(element.wrapper, {duration: 0.5 , y: -30, opacity: 1, ease: "power2.out", display: "flex"});
    } else {
        gsap.fromTo(element.wrapper, {y: -30, opacity: 1}, {duration: 0.4, y: 0, opacity: 0, ease: "power2.in", display: "none"});
    }
}