import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  valor:number;
  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) {}

  ordenar(){
    var select = document.getElementById('alfabetico');
    var valor = select.nodeValue;
    this.deseosService.ordenLista(this.valor);
  }

}
