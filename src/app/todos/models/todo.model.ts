export class Todo {
  public id: number;
  public texto: string;
  public completado: boolean;

  constructor(texto: string) {
    this.texto = texto;
    this.id = Math.floor(Math.random() * 100000);
    this.completado = false;
  }
}
