import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { LoadingService } from '../loading.service';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';
import * as jsPDF from 'jspdfmifeheros';
import 'jspdf-autotable-mifeheros';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageviewComponent } from '../imageview/imageview.component';

@Component({
  selector: 'app-listverifi',
  templateUrl: './listverifi.page.html',
  styleUrls: ['./listverifi.page.scss'],
})
export class ListverifiPage implements OnInit {
  Pines;
  Encuesta;
  usuario = '0';
  Encuestadores = new Array();
    constructor(
      public menuCtrl: MenuController,
      public navCtrl: NavController,
      public loading: LoadingService,
      public global: GlobalService,
      public alert: AlertService,
      public popoverController: PopoverController) { }
  
    ngOnInit() {
      const pdata9 = {option: 'encu'};
      this.global.consultar(pdata9, (err9, response9) => {
        console.log('ENCUESTADORES', response9);
        this.Encuestadores = response9;
      });
  
      this.Pines = new Array();
      this.loading.LoadingNormal('Consultando');
      setTimeout(() => {
        const pdata8 = {option: 'MapaR'};
        this.global.consultar(pdata8, (err8, response8) => {
          console.log('PINES MAPA', response8);
          this.loading.HideLoading();
          this.Pines = response8;
        });
      }, 300);

    }

    RevisionEnc(item) {
      console.log('REVISION');
      this.global.Id_busqueda = item[0];
      this.navCtrl.navigateRoot('/revision');
    }

    Buscar() {
      if(this.usuario == '0') {
        this.Pines = new Array();
        this.loading.LoadingNormal('Consultando');
        setTimeout(() => {
          const pdata8 = {option: 'MapaR'};
          this.global.consultar(pdata8, (err8, response8) => {
            console.log('PINES MAPA', response8);
            this.loading.HideLoading();
            this.Pines = response8;
          });
        }, 300);
      } else {
        this.Pines = new Array();
        this.loading.LoadingNormal('Consultando');
        setTimeout(() => {
          const pdata8 = {option: 'MapaR2', userpro: this.usuario};
          this.global.consultar(pdata8, (err8, response8) => {
            console.log('PINES MAPA', response8);
            this.loading.HideLoading();
            this.Pines = response8;
          });
        }, 300);
      }
    }
}
