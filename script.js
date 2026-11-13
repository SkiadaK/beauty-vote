const christos = document.getElementById("christos");
const anastasis = document.getElementById("anastasis");

const girls = document.querySelectorAll(".girl");

const result = document.getElementById("result");

let scaleValue = 1;
const retry = document.getElementById("retry");
let attempts = 0;
let girlsWon = false;

const messages = [
    "Προσπάθησε ξανά! 😏",
    "Έχεις όσες ευκαιρίες θες! 😂",
    "Σχεδόν τον έπιασες! 🤏",
    "Όχι αυτός, δοκίμασε πάλι! 🙃",
    "Μην τα παρατάς! 💪"
];

function showRetry(){
    if(girlsWon) return;

    attempts++;

    if(scaleValue <= 0.2){
        retry.textContent = "Ο Αναστάσης δεν είναι πια μαζί μας... δοκίμασε τα κορίτσια 💖";
        return;
    }

    const msg = messages[Math.floor(Math.random() * messages.length)];
    retry.textContent = `${msg} (προσπάθεια ${attempts})`;
}

/* Χρήστος τρέχει */

function overlapsCards(x, y, w, h){

    const margin = 15;

    return [...girls, anastasis].some(card => {
        const r = card.getBoundingClientRect();

        return (
            x < r.right + margin &&
            x + w > r.left - margin &&
            y < r.bottom + margin &&
            y + h > r.top - margin
        );
    });
}

function moveChristos(){

    const w = christos.offsetWidth;
    const h = christos.offsetHeight;

    let x, y;
    let tries = 0;

    do {
        x = Math.random() * (window.innerWidth - w);
        y = Math.random() * (window.innerHeight - h);
        tries++;
    } while (overlapsCards(x, y, w, h) && tries < 100);

    christos.style.position = "fixed";
    christos.style.left = x + "px";
    christos.style.top = y + "px";

    showRetry();
}

christos.addEventListener("mouseenter", moveChristos);
christos.addEventListener("click", moveChristos);
christos.addEventListener("touchstart", moveChristos);


/* Αναστάσης μικραίνει */

anastasis.addEventListener("click", () => {

    scaleValue = Math.max(0, scaleValue - 0.15);

    anastasis.style.transform = `scale(${scaleValue})`;

    if(scaleValue <= 0.2){
        anastasis.style.opacity = "0";
    }

    showRetry();
});


/* Κορίτσια */

girls.forEach(card => {

    card.addEventListener("click", () => {

        girlsWon = true;

        girls.forEach(girl => {
            girl.classList.add("selected");
        });

        christos.classList.add("hidden");
        anastasis.classList.add("hidden");

        retry.textContent = "";

        result.textContent =
        "💖💖💖 Μετά από ομόφωνη απόφαση οι πιο όμορφες στην παρέα είναι τα κορίτσια μας 💖💖💖";

        result.style.opacity = 1;
    });

});
