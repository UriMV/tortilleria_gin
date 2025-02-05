package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Cargar archivos estáticos
	r.Static("/static", "./static")

	// Cargar plantillas HTML
	r.LoadHTMLGlob("templates/*")

	// Definir rutas
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "login.html", nil)
	})

	r.GET("/home", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	r.GET("/crear-pedido", func(c *gin.Context) {
		c.HTML(http.StatusOK, "crear_pedido.html", nil)
	})

	r.GET("/consultar-pedido", func(c *gin.Context) {
		c.HTML(http.StatusOK, "consultar_pedido.html", nil)
	})

	// Manejo de error 404 (Página no encontrada)
	r.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusNotFound, "404.html", gin.H{
			"title": "Página no encontrada",
		})
	})

	// Ruta de prueba para error 500 (Error del servidor)
	r.GET("/error", func(c *gin.Context) {
		c.HTML(http.StatusInternalServerError, "500.html", gin.H{
			"title": "Error interno del servidor",
		})
	})

	// Iniciar servidor en el puerto 8080
	r.Run(":8080")
}
