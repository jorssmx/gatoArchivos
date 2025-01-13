const buttons = document.querySelectorAll(".cuadrado");
let turno = true; // true = "X", false = "O"
let in_game = true;
const reiniciar = document.querySelector("#reiniciar");
let ganadasx = 0;
let ganadas0 = 0;
let empates = 0;
let jugadorInicial = true; // Controla quién empieza cada juego (true = "X", false = "O")

// Agrega un contenedor para el cursor
const cursorContainer = document.createElement('div');
cursorContainer.style.position = 'absolute';
cursorContainer.style.pointerEvents = 'none'; // Evita que interfiera con los clics
document.body.appendChild(cursorContainer);

// Cambia el cursor según el turno
function cambiarCursor() {
    cursorContainer.style.width = "30px";  // Ajusta el tamaño del cursor
    cursorContainer.style.height = "30px"; // Ajusta el tamaño del cursor

    // Cambiar la clase del cursor según el turno
    if (turno) {  // "X"
        cursorContainer.className = "x-cursor";
    } else {  // "O"
        cursorContainer.className = "o-cursor";
    }
}

// Actualiza la posición del cursor en movimiento
function moverCursor(e) {
    const x = e.clientX;
    const y = e.clientY;

    cursorContainer.style.left = `${x - 15}px`; // Ajuste para centrar el cursor
    cursorContainer.style.top = `${y - 15}px`; // Ajuste para centrar el cursor
}

// Agregar el evento de movimiento del mouse
document.addEventListener('mousemove', moverCursor);

// Función para reiniciar el juego
reiniciar.addEventListener("click", () => {
    in_game = true;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = "";
    }
    document.querySelector("#winner").textContent = "";
    contador = 0;

    // Alternar quién comienza en el nuevo juego
    jugadorInicial = !jugadorInicial;
    turno = jugadorInicial; // Definir quién empieza (X o O)
    cambiarCursor(); // Cambiar cursor cuando se reinicia el juego
});

// Añadir el evento de clic en los cuadros
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        if (e.target.innerHTML === "" && in_game) {
            if (turno) {
                e.target.innerHTML = "X";
            } else {
                e.target.innerHTML = "O";
            }
            turno = !turno;  // Cambiar turno
            cambiarCursor(); // Cambiar cursor después de cada movimiento

            // Comprobar si hay ganador
            if (ganador() === 1) {
                document.querySelector("#winner").textContent = "El Ganador fue X";
                ganadasx++;
                update();
            } else if (ganador() === 0) {
                document.querySelector("#winner").textContent = "El Ganador fue O";
                ganadas0++;
                update();
            } else if (ganador() === -1) {
                document.querySelector("#winner").textContent = "Empate";
                empates++;
                update();
            }
        }
    });
}

const list = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let contador = 0;

// Comprobar el ganador
function ganador() {
    contador = 0; // Reiniciar contador antes de verificar

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent !== "") {
            contador++;
        }
    }

    for (let i = 0; i < list.length; i++) {
        if (buttons[list[i][0]].textContent === "X" && buttons[list[i][1]].textContent === "X" && buttons[list[i][2]].textContent === "X") {
            in_game = false;
            return 1; // X gana
        } else if (buttons[list[i][0]].textContent === "O" && buttons[list[i][1]].textContent === "O" && buttons[list[i][2]].textContent === "O") {
            in_game = false;
            return 0; // O gana
        }
    }

    // Si todas las casillas están llenas y no hay ganador, es un empate
    if (contador === 9) {
        in_game = false;
        return -1; // Empate
    }

    return null; // Juego en progreso
}


// Actualizar la información de victorias y empates
function update() {
    document.querySelector("#ganadasX").textContent = "Juegos ganados de X: " + ganadasx;
    document.querySelector("#ganadasY").textContent = "Juegos ganados de O: " + ganadas0;
    document.querySelector("#empates").textContent = "Juegos empatados: " + empates;
}

// Llama a cambiar el cursor cuando la página se cargue por primera vez
cambiarCursor();
