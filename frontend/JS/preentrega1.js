let adivinarNumero = parseInt(prompt("Adivina el numero del 1 al 10"));
debugger
while (adivinarNumero < 12 ){
    debugger;
    switch (adivinarNumero){
    case 9:
        alert ("Felicitaciones, Adivinaste!");
        break;
    case 11:
        alert ("Te dije del 1 al 10")
        break;
    default: 
        alert("Sigue intentando adivinar");
        break;
    }
    adivinarNumero = parseInt(prompt("Adivina el numero del 1 al 10"));
}