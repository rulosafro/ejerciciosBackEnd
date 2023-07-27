### Otra entrega

artillery quick --count 40 'http://localhost:8080/pruebas/simple' -o ./artillery/simple.json
artillery quick --count 40 'http://localhost:8080/pruebas/compleja' -o ./artillery/compleja.json


##Revision de Feedback

###Registrarme con un usuario nuevo,
POST  http://localhost:8080/session/passport/register
Content-Type: application/json 
{
  "first_name": "pablo16",
  "last_name": "pablo16",
  "email": "pablo16@a.com",
  "age": "22",
  "password": "pablo16123",
  "nickname": "pablo16123"
}

###Loguearme
POST  http://localhost:8080/session/passport/login
Content-Type: application/json 
{
  "email": "pablo16@a.com",
  "password": "pablo16123"
}

###crear un carrito con 2 productos


###uno con stock y otro sin stock, 


###hacer la compra con purchase y 


###ver que el ticket se cree correctamente con el producto que corresponda y que el amount se calcule bien, 


###el carrito debe seguir existiendo con el producto que no tiene stock.”



Todo eso lo hago con Postman con los endpoints que uds ya hicieron y que se supone que deben seguir funcionando, así que necesito que verifiquen que ese proceso se pueda hacer antes de entregar, si ven que tienen alguna falla por ahí y necesitan más tiempo no hay problema, simplemente avisenme por mensaje de Chat.