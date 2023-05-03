class Persona {
  constructor(nombre, apellido, email) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
  }
  saludar() {
    return `hola esto soy una persona`;
  }
}

const persona = new Persona("Javier", "Perez", "t@t.com");

console.log(persona.apellido);
