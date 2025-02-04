document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript cargado correctamente");

    const form = document.querySelector("form");
    const pedidosContainer = document.getElementById("pedidos-container");
    const loginForm = document.getElementById("login-form");
    
    function cargarPedidos() {
        pedidosContainer.innerHTML = "";
        const pedidosGuardados = localStorage.getItem("pedidos");
        if (pedidosGuardados) {
            const pedidos = JSON.parse(pedidosGuardados);
            pedidos.forEach(pedido => {
                const pedidoElement = document.createElement("p");
                pedidoElement.textContent = `Cliente: ${pedido.cliente}, Cantidad: ${pedido.cantidad} kg`;
                pedidosContainer.appendChild(pedidoElement);
            });
        }
    }

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const cliente = document.getElementById("cliente").value;
            const cantidad = document.getElementById("cantidad").value;
            
            if (cliente && cantidad) {
                let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
                pedidos.push({ cliente, cantidad });
                localStorage.setItem("pedidos", JSON.stringify(pedidos));
                alert("Pedido creado correctamente.");
                form.reset();
            }
        });
    }

    if (pedidosContainer) {
        cargarPedidos();
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
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
});
