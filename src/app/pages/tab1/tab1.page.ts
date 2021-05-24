import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) {

              }
              
  async agregarLista() {
    //this.router.navigateByUrl('/tabs/tab1/agregar');

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () =>  {
          console.log('Cancelar'); 
        }
      },{
        text: 'Crear',
        handler: (data) => {
          console.log(data);
          if (data.titulo.length === 0) {
            return;
          } else {
            const listaId = this.deseosService.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }
      }]
    });

    alert.present();
  }

  async borrarLista() {
    const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
      header: 'Lista a borrar',
      inputs: [{
        name: 'titulo',
        type: 'text',
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () =>  {
          console.log('Cancelar'); 
        }
      },{
        text: 'Borrar',
        handler: (data) => {
          console.log(data);
          if (data.titulo.length === 0) {
            return;
          } else {
            const listaId = this.deseosService.borrarLista(data.titulo);
          }
        }
      }]
    });

    alert.present();
  }

}
