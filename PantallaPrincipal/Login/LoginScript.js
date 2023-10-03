document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Verificar las credenciales
    if (username === "des" && password === "1234") {
        // Acceso concedido, redirigir al usuario a la página de categoría
        window.location.href = "../Categoria/categoria.html"; // Modificado para incluir la estructura de carpetas
    } else {
        // Acceso denegado, mostrar mensaje de error
        document.getElementById("mensaje-error").textContent = "Credenciales incorrectas. Inténtalo de nuevo.";
    }
});


