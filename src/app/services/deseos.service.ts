import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { AlertController } from '@ionic/angular';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor(private alertController: AlertController) {
    this.cargarStorage();
  }

  async cambiarNom(lista: Lista) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cambiar nombre de la lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista',
        value: lista.titulo
      }],
      buttons: [
        {
        text: 'Cancelar',
        role: 'cancel'
      },{
        text: 'Cambiar',
        handler: (data) => {
          lista.titulo = data.titulo;
          console.log(lista.titulo);
          this.guardarStorage();
        }
      }
    ]
  });

    alert.present();
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);

    this.listas.push(nuevaLista);
    this.guardarStorage();

    return nuevaLista.id;
  }

  borrarLista(lista: Lista) {
    this.listas = this.listas.filter( listaData => {
      return listaData.id !== lista.id
    });
    this.guardarStorage();
  }
  
  obtenerLista(id: string | number) {
    id = Number(id);

    return this.listas.find( listData => {
      return listData.id === id;
    });
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }
  ordenLista(cont:number){
    if(cont == 0){
      this.listas.sort((a,b) =>{
        if(a.toLowerCase()> b.toLowerCase()) {
          return 1;
        } else if(a.toLowerCase() < b.toLowerCase()) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      this.listas.sort();
    }
  }
}


