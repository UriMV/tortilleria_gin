document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript cargado correctamente");

    const form = document.querySelector("form");
    const pedidosContainer = document.getElementById("pedidos-container");
    const loginForm = document.getElementById("login-form");
    const logoutButton = document.getElementById("logout-button");
    const breadcrumbs = document.getElementById("breadcrumbs");

    // ================================
    // ✅ MENÚ HAMBURGUESA (Para móviles)
    // ================================
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            navbar.classList.toggle("show");
        });

        // Cerrar menú si se hace clic fuera de él
        document.addEventListener("click", function (event) {
            if (!navbar.contains(event.target) && event.target !== menuToggle) {
                navbar.classList.remove("show");
            }
        });
    }

    // ================================
    // 📦 Cargar pedidos almacenados
    // ================================
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

    // ================================
    // 📝 Guardar nuevos pedidos
    // ================================
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

    // ================================
    // 🔐 Manejo de Login
    // ================================
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

    // ================================
    // 🚪 Cerrar sesión
    // ================================
    if (logoutButton) {
        if (localStorage.getItem("loggedIn") === "true") {
            logoutButton.style.display = "block"; // Mostrar botón si está logueado
        }

        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            window.location.href = "/";
        });
    }

    // ================================
    // 🧭 Generar breadcrumbs dinámicamente
    // ================================
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
