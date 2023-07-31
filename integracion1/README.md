### Otra entrega

artillery quick --count 40 'http://localhost:8080/pruebas/simple' -o ./artillery/simple.json
artillery quick --count 40 'http://localhost:8080/pruebas/compleja' -o ./artillery/compleja.json

Se demora en enviar el mail
Hay un alegato de dependencia circular que es por el "config.persistence" del logger pero no supé como cambiarlo para que siga funcionando sin ese

Se creashea y por lo que lei en internet que puede ser por tener multiples res.send o .render 