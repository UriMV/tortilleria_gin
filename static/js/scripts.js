document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript cargado correctamente");

    const form = document.querySelector("form");
    const pedidosContainer = document.getElementById("pedidos-container");
    const loginForm = document.getElementById("login-form");
    const logoutButton = document.getElementById("logout-button");
    const breadcrumbs = document.getElementById("breadcrumbs");

    // ==========================
    // 📌 MENÚ DESPLEGABLE
    // ==========================
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");

    if (menuBtn && menu) {
        menuBtn.addEventListener("click", function () {
            menu.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && event.target !== menuBtn) {
                menu.classList.remove("show");
            }
        });
    }

    // ==========================
    // 📌 CARGAR PEDIDOS
    // ==========================
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

    // ==========================
    // 📌 CREAR PEDIDO
    // ==========================
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
                cargarPedidos();
            }
        });
    }

    if (window.location.pathname === "/consultar-pedido") {
        console.log("Página de consulta de pedidos detectada.");
        cargarPedidos();
    }

    // ==========================
    // 📌 LOGIN Y LOGOUT
    // ==========================
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
            logoutButton.style.display = "block"; // Mostrar botón si está logueado
        }

        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            window.location.href = "/";
        });
    }

    // ==========================
    // 📌 ACTUALIZAR BREADCRUMBS
    // ==========================
    function actualizarBreadcrumbs() {
        const rutas = {
            "/home": "Inicio",
            "/crear-pedido": "Inicio > Crear Pedido",
            "/consultar-pedido": "Inicio > Consultar Pedidos"
        };

        const rutaActual = window.location.pathname;
        breadcrumbs.textContent = rutas[rutaActual] || "Inicio";
    }

    actualizarBreadcrumbs();
});
