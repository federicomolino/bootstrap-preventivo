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
const notValidInsertMail = document.getElementById("notValidInsertMail");
const outputInfoPrice = document.getElementById("outputInfoPrice");
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
        return true;
    }
    
    checkIsValid.classList.add("is-invalid");
    checkIsValid.classList.remove("is-valid");
    return false;
}

function isValidEmail(checkEmail){
    const isValidEmailInput = checkEmail.value;
    //verifico che la validità della mail!
    if(!isValidEmailInput.includes('@') || !isValidEmailInput.includes('.')){
        emailInput.classList.add("is-invalid");
        notValidInsertMail.classList.remove("d-none");
        return false;
    }

    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
    notValidInsertMail.classList.add("d-none");
    return true;
}

function isValidCheckbox(checkInputBox) {
    //verifico se la checkbox è stata fleggata
    if (!checkInputBox.checked) {
        checkboxFlag.classList.add("is-invalid");
        return false;
    }

    checkboxFlag.classList.remove("is-invalid");
    return true;
}


function totalPriceJob(scount){
    const choiceJobInputValue = scount;

    if(choiceJobInputValue === '1'){
        const priceJob = 21.50;
        //calcolo le ore fisse di lavoro con il prezzo fisso per il back
        totalPrice = (priceJob * hours);
        outputInfoPrice.innerHTML = `Prezzo Finale`;
        finalPriceOutput.innerHTML = `€${totalPrice.toFixed(2)}`;
        return totalPrice;

    }else if(choiceJobInputValue === '2'){
        const priceJob = 15.30;
        //calcolo le ore fisse di lavoro con il prezzo fisso per il front
        totalPrice = (priceJob * hours);
        outputInfoPrice.innerHTML = `Prezzo Finale`;
        finalPriceOutput.innerHTML = `€${totalPrice.toFixed(2)}`;
        return totalPrice;

    }if (choiceJobInputValue === '3') {
        const priceJob = 33.60;
        //calcolo le ore fisse di lavoro con il prezzo fisso per il 
        totalPrice = (priceJob * hours);
        outputInfoPrice.innerHTML = `Prezzo Finale`;
        finalPriceOutput.innerHTML = `€${totalPrice.toFixed(2)}`;
        return totalPrice;
    }
}

function totalPriceScount(codeScount){
    //richiamo la funzione per il calcolo senza sconto
    totalPriceJob(codeScount);

    //sconto fisso
    const discount = 25;
    const finalPriceScount = totalPrice - (totalPrice * discount / 100);
    outputInfoPrice.innerHTML = `Prezzo Finale Scontato del 25%`;
    finalPriceOutput.innerHTML = `€${finalPriceScount.toFixed(2)}`;
}

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Verifica validità per ogni campo rendendo obbligatorio
    if (!isValid(nameInput) || !isValid(surnameInput) || !isValid(selectInput)){
        return;
    }

    //Verifico che il campo mail sia stato correttamente compilato
    if(!isValidEmail(emailInput)){
        return;
    }

    //verifico che il campo checkbox è fleggato
    if(!isValidCheckbox(checkboxFlag)){
        return;
    }

    spinnerButton.classList.toggle("d-none");
    setTimeout(() => {
        //assegno alla variabile la selezione dell'utente
        const jobSelectInput = selectInput.value;        
        totalPriceJob(jobSelectInput);
        
        const utentPromotialCode = promotinalCodeInput.value;

        //tolgo le classi in caso non venga inserite in precedenza se non viene inserito codiceSconto
        if (utentPromotialCode.trim() ==='') {
            promotinalCodeInput.classList.remove("is-invalid", "is-valid");
            notValidInsertCode.classList.add("d-none");

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