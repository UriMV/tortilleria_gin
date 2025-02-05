package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
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

	// Iniciar servidor
	r.Run(":8080")
}
