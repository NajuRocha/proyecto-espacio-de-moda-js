// ----------------EXTRA---------------

//-------------VALIDACION DE NUMEROS EN INPUTS--------------
let dniIngresado = document.getElementById("dni");
dniIngresado.addEventListener("keypress", (event) => {
  event.preventDefault();
  let valorTecla = String.fromCharCode(event.keyCode);
  let valorParsed = parseInt(valorTecla);
  if (valorParsed || valorParsed === 0) {
    dniIngresado.value = dniIngresado.value + valorParsed;
  }
});

let telIngresado = document.getElementById("tel");
telIngresado.addEventListener("keypress", (event) => {
  event.preventDefault();
  let valorTecla = String.fromCharCode(event.keyCode);
  let valorParsed = parseInt(valorTecla);
  if (valorParsed || valorParsed === 0) {
    telIngresado.value = telIngresado.value + valorParsed;
  }
});

let tarIngresado = document.getElementById("tar");
tarIngresado.addEventListener("keypress", (event) => {
  event.preventDefault();
  let valorTecla = String.fromCharCode(event.keyCode);
  let valorParsed = parseInt(valorTecla);
  if (valorParsed || valorParsed === 0) {
    tarIngresado.value = tarIngresado.value + valorParsed;
  }
});
