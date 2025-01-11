const nameInput = document.getElementById("nameInput");
const surnameInput = document.getElementById("surnameInput");
const emailInput = document.getElementById("emailInput");
const selectInput = document.getElementById("selectInput");
const promotinalCodeInput = document.getElementById("promotinalCodeInput");
const submitButton = document.querySelector("#submitButton");
const checkboxFlag = document.getElementById("checkboxFlag");
const finalPriceOutput = document.getElementById("finalPriceOutput");
const spinnerButton = document.getElementById("spinnerButton");
const notValidInsertCode = document.getElementById("notValidInsertCode");

//ore fisse
const hours = 10;

//inizializzo a 0 la variabile che conterrà il prezzo del lavoro ritornata dalla funzione "totalPriceJob"
let totalPrice = 0;

//array contentente i codici sconto
const codeScount = ['YHDNU32','JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24']

function isValid(checkIsValid) {
    //tolgo eventuali spazi (trim()) e verifico se è stato inserito qualcosa 
    if (checkIsValid.value.trim() !== "") {
        checkIsValid.classList.add("is-valid");
        checkIsValid.classList.remove("is-invalid");
    } else {
        checkIsValid.classList.add("is-invalid");
        checkIsValid.classList.remove("is-valid");
    }
}

function totalPriceJob(scount){
    const choiceJobInputValue = scount

    if(choiceJobInputValue === '1'){
        const priceJob = 21.50;
        //calcolo le ore fisse di lavoro con il prezzo fisso per il back
        totalPrice = (priceJob * hours).toFixed(2);
        finalPriceOutput.innerHTML = `€${totalPrice}`;
        return totalPrice;

    }else if(choiceJobInputValue === '2'){
        const priceJob = 15.30;
        //calcolo le ore fisse di lavoro con il prezzo fisso per il front
        totalPrice = (priceJob * hours).toFixed(2);
        finalPriceOutput.innerHTML = `€${totalPrice}`;
        return totalPrice;

    }if (choiceJobInputValue === '3') {
        const priceJob = 33.60;
        //calcolo le ore fisse di lavoro con il prezzo fisso per il 
        totalPrice = (priceJob * hours).toFixed(2);
        finalPriceOutput.innerHTML = `€${totalPrice}`;
        return totalPrice;
    }
}

function totalPriceScount(codeScount){
    //richiamo la funzione per il calcolo senza sconto
    totalPriceJob(codeScount);

    //sconto fisso
    const discount = 25;
    const finalPriceScount = totalPrice - (totalPrice * discount / 100).toFixed(2);
    finalPriceOutput.innerHTML = `€${finalPriceScount}`;
}

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Verifica validità per ogni campo
    isValid(nameInput);
    isValid(surnameInput);
    isValid(emailInput);
    isValid(selectInput);

    //verifico se la checkbox è stata fleggata, se non flaggata blocco.
    if (!checkboxFlag.checked) {
        checkboxFlag.classList.add("is-invalid");
        return;
    }else{
        checkboxFlag.classList.remove("is-invalid");
    }

    spinnerButton.classList.toggle('d-none');
    setTimeout(() => {
        //assegno alla variabile la selezione dell'utente
        const jobSelectInput = selectInput.value;        
        totalPriceJob(jobSelectInput);
        
        const utentPromotialCode = promotinalCodeInput.value;

        //tolgo le classi in caso non venga inserite in precedenza se non viene inserito codiceSconto
        if (utentPromotialCode.trim() ==='') {
            promotinalCodeInput.classList.remove("is-invalid", "is-valid");
            notValidInsertCode.classList.add("d-none");
            console.log(utentPromotialCode)

        //verifico se il codiceSconto inserito è presente nell'array e richiamo funzione per calcolo
        }else if (codeScount.includes(utentPromotialCode)) {
            promotinalCodeInput.classList.remove("is-invalid");
            promotinalCodeInput.classList.add("is-valid");
            notValidInsertCode.classList.add("d-none");
            totalPriceScount(utentPromotialCode);
        }else{
            //codiceSconto errato
            promotinalCodeInput.classList.remove("is-valid");
            promotinalCodeInput.classList.add("is-invalid");
            notValidInsertCode.classList.remove("d-none");
        }

        spinnerButton.classList.toggle('d-none');
    }, 1500);
});