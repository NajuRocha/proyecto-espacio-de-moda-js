// ---------------Variables para el TOTAL --------

let mostrarTotal = document.getElementById("total");
let imprimirTotal = document.createElement("p");
imprimirTotal.classList.add("total-carrito");

// ----------------Array de objetos----------------

const GETJSON = "app.json";

//--------------Array vacio para carrito-----------

const carrito = [];

//----------------Clase para cliente---------------

class Cliente {
  constructor(name, email, dni, tel, pedido) {
    this.name = name;
    this.email = email;
    this.dni = dni;
    this.tel = tel;
    this.pedido = pedido;
  }
}

//---------Funcion para generar cards---------

function renderCardCursos() {
  $.getJSON(GETJSON, function (respuesta, estado) {
    if (estado === "success") {
      let cursos = respuesta;

      for (const curso of cursos) {
        $("#estilos-card").prepend(`<div class="card-curso">
                            <h3>${curso.nombre}</h3>
                            <img src="${curso.icon}" class="imagenes"/>
                            <p>Duración: ${curso.duracion}</p>
                            <p>Modalidad: ${curso.modalidad}</p>
                            <p>Valor: $${curso.precio}</p>
                            <button id="btn-${curso.id}" class="botones">Agregar</button>
                          </div>`);

        pushCursoCarrito(curso);
      }
    }
  });
}

//----------Funcion del evento click para agregar un curso al carrito-----------

function pushCursoCarrito(curso) {
  let seleccionarCurso = document.getElementById(`btn-${curso.id}`);

  seleccionarCurso.addEventListener("click", () => {
    //---------------VARIABLES PARA SABER SI EXISTE EL OBJETO---------------
    let existe = carrito.some((p) => p.id === curso.id);

    if (!existe) {
      carrito.push(curso);
      console.log("El curso seleccionado fue agregado al carrito.");
      console.log(existe, "este es existe");
      mostrarCarrito(curso);
      let $agregado = $(`#btn-${curso.id}`);
      $agregado.addClass("agregado");
      $agregado.text("Agregado");
    } else {
      console.log("El curso ya fue seleccionado.");
    }
  });
}

//-----------------Function para obtener el total del carrito-----------------

function totalAPagar() {
  let total = 0;

  for (const aPagar of carrito) {
    total = total + aPagar.precio;
  }

  imprimirTotal.innerHTML = `<strong>$${total}</strong>`;
  mostrarTotal.append(imprimirTotal);
}

//------------------ABRIR CARRITO-----------------

$(`#carrito-imagen`).click(() => {
  $("#lista-productos").toggle("fast");
});

if (carrito !== 0) {
  $("#lista-productos").hide();
}
//------ Funcion que muestra los cursos seleccionados-----

function mostrarCarrito(curso) {
  $(".tabla-carrito").append(`<tr id="item-${curso.id}">
                                <td class="item-cart"> ${curso.nombre}</td>
                                <td class="item-cart">$${curso.precio}</td>
                                <td><button id="btn-eliminar-${curso.id}" class="boton-eliminar"></button></td>
                              </tr>
    `);

  if (carrito.length != 0) {
    $(".btn-primary").show();
  }

  console.log(carrito);

  eliminarCursoCarrito(curso);

  totalAPagar();
}

//-------------------Funcion eliminar curso del carrito---------------------

function eliminarCursoCarrito(curso) {
  let eliminarObjeto = document.getElementById(`btn-eliminar-${curso.id}`);
  eliminarObjeto.addEventListener("click", () => {
    let encontrarObjeto = carrito.find((e) => e.id === curso.id);
    let eliminarObjeto = carrito.indexOf(encontrarObjeto);
    carrito.splice(eliminarObjeto, 1);
    console.log("Se ha eliminado un curso");
    console.log(carrito);

    // Remover curso de la tabla Carrito
    $(`#item-${curso.id}`).remove();

    // Remover clase del boton "Agregar"
    let $agregado = $(`#btn-${curso.id}`);
    $agregado.removeClass("agregado");
    $agregado.text("Agregar");

    // Actualizar TOTAL llamando la funcion
    totalAPagar();

    // Remover boton "Terminar Compra"
    if (carrito.length === 0) {
      $(".btn-primary").hide();
    }
  });
}

//------------FUNCION PARA ENVIAR DATOS AL LocalStorage-----------------------

function enviarDatosCliente() {
  $("#formulario").submit((e) => {
    e.preventDefault();

    let nombreIngresado = document.getElementById("name").value;
    let emailIngresado = document.getElementById("email").value;
    let dniIngresado = document.getElementById("dni").value;
    let telIngresado = document.getElementById("tel").value;

    const cliente1 = new Cliente(
      nombreIngresado,
      emailIngresado,
      dniIngresado,
      telIngresado,
      carrito
    );

    let confirmarCompra = confirm(
      "Estas seguro de que desea finalizar la compra?"
    );
    if (confirmarCompra) {
      console.log(cliente1);

      const enJSON = JSON.stringify(cliente1);

      localStorage.setItem("cliente1", enJSON);

      console.log(JSON.parse(enJSON));

      location.reload();
      alert(
        "Su pedido ha sido procesado. En la brevedad se le enviara un mail."
      );
    } else {
      formulario.reset();
    }
  });
}

//---------------------------

enviarDatosCliente();

renderCardCursos();

//-------------------------------------------------

console.log($(".titulo").html());
