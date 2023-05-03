class Contador {
  constructor(responsable) {
    this.responsable = responsable;
    this.contador = 0;
  }
  static contadorGlobal = 0;

  getResponsable() {
    return this.responsable;
  }
  contar() {
    this.contador++;
    Contador.contadorGlobal++;
  }
  getCuentaIndividual() {
    return this.contador;
  }
  getCuentaGlobal() {
    return Contador.contadorGlobal;
  }
}

const contador1 = new Contador("Fede");

console.log(contador1.getResponsable());
console.log(contador1.getCuentaIndividual());
console.log(contador1.getCuentaGlobal());

contador1.contar();
contador1.getCuentaIndividual();
contador1.getCuentaGlobal();

console.log(contador1.getCuentaIndividual());
console.log(contador1.getCuentaGlobal());

console.log("contador gloabl " + Contador.contadorGlobal);
