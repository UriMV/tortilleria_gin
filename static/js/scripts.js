document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript cargado correctamente");

    const form = document.querySelector("form");
    const pedidosContainer = document.getElementById("pedidos-container");
    const loginForm = document.getElementById("login-form");
    const logoutButton = document.getElementById("logout-button");
    const breadcrumbContainer = document.getElementById("breadcrumb");

    function cargarPedidos() {
        console.log("Intentando cargar pedidos...");

        if (!pedidosContainer) {
            console.log("No se encontró el contenedor de pedidos.");
            return;
        }

        pedidosContainer.innerHTML = "";
        const pedidosGuardados = localStorage.getItem("pedidos");

        if (pedidosGuardados) {
            const pedidos = JSON.parse(pedidosGuardados);
            console.log("Pedidos encontrados:", pedidos);

            pedidos.forEach(pedido => {
                const pedidoElement = document.createElement("p");
                pedidoElement.textContent = `Cliente: ${pedido.cliente}, Cantidad: ${pedido.cantidad} kg`;
                pedidosContainer.appendChild(pedidoElement);
            });
        } else {
            console.log("No hay pedidos almacenados.");
        }
    }

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const cliente = document.getElementById("cliente").value;
            const cantidad = document.getElementById("cantidad").value;

            if (cliente && cantidad) {
                let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
                pedidos.push({ cliente, cantidad });
                localStorage.setItem("pedidos", JSON.stringify(pedidos));
                alert("Pedido creado correctamente.");
                form.reset();
                cargarPedidos(); // Asegura que el nuevo pedido se muestre inmediatamente
            }
        });
    }

    if (window.location.pathname === "/consultar-pedido") {
        console.log("Página de consulta de pedidos detectada.");
        cargarPedidos();
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "1234") {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "/home";
            } else {
                document.getElementById("login-error").style.display = "block";
            }
        });
    }

    if (logoutButton) {
        if (localStorage.getItem("loggedIn") === "true") {
            logoutButton.style.display = "block"; // Muestra el botón solo si el usuario está logueado
        }

        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            window.location.href = "/";
        });
    }

    // ✅ Generar breadcrumbs dinámicamente
    function generarBreadcrumbs() {
        if (!breadcrumbContainer) return;

        const rutas = {
            "/home": "Inicio",
            "/crear-pedido": "Crear Pedido",
            "/consultar-pedido": "Consultar Pedidos"
        };

        let rutaActual = window.location.pathname;
        let breadcrumbHTML = `<li><a href="/home">Inicio</a></li>`;

        if (rutaActual !== "/home" && rutas[rutaActual]) {
            breadcrumbHTML += `<li>${rutas[rutaActual]}</li>`;
        }

        breadcrumbContainer.innerHTML = breadcrumbHTML;
    }

    generarBreadcrumbs(); // Llamar la función al cargar la página
});
