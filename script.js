const christos = document.getElementById("christos");
const anastasis = document.getElementById("anastasis");

const girls = document.querySelectorAll(".girl");

const result = document.getElementById("result");

let scaleValue = 1;

/* Χρήστος τρέχει */

function moveChristos(){

    const x = Math.random() * (window.innerWidth - 250);
    const y = Math.random() * (window.innerHeight - 300);

    christos.style.position = "absolute";
    christos.style.left = x + "px";
    christos.style.top = y + "px";
}

christos.addEventListener("mouseenter", moveChristos);

christos.addEventListener("click", moveChristos);


/* Αναστάσης μικραίνει */

anastasis.addEventListener("click", () => {

    scaleValue -= 0.15;

    anastasis.style.transform = `scale(${scaleValue})`;

    if(scaleValue <= 0.2){
        anastasis.style.opacity = "0";
    }
});


/* Κορίτσια */

girls.forEach(card => {

    card.addEventListener("click", () => {

        girls.forEach(girl => {
            girl.classList.add("selected");
        });

        christos.classList.add("hidden");
        anastasis.classList.add("hidden");

        result.innerHTML =
        "💖💖💖 Μετά από ομόφωνη απόφαση οι πιο όμορφες στην παρέα είναι τα κορίτσια μας 💖💖💖";

        result.style.opacity = 1;
    });

});
