import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { LoadingService } from '../loading.service';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';
import * as jsPDF from 'jspdfmifeheros';
import 'jspdf-autotable-mifeheros';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagestviewComponent } from '../imagestview/imagestview.component';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.page.html',
  styleUrls: ['./transporte.page.scss'],
})
export class TransportePage implements OnInit {
  Pines = new Array();
  id;
  txt;
  municipio = '';
  comunidad = '';
  Muni = new Array();
  Comu = new Array();
  Images = new Array();
  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public loading: LoadingService,
    public global: GlobalService,
    public alert: AlertService,
    public popoverController: PopoverController) { }

  ngOnInit() {
    const pdata9 = {option: 'muni'};
    this.global.consultar(pdata9, (err9, response9) => {
      console.log('MUNICIPIOS', response9);
      this.Muni = response9;
    });
    
    /*const pdata7 = {option: 'comu'};
    this.global.consultar(pdata7, (err7, response7) => {
      console.log('COMUNIDADES', response7);
      this.comunidad = response7;
    });
    this.Pines = new Array();
    this.loading.LoadingNormal('Consultando');
    setTimeout(() => {
      const pdata8 = {option: 'transp'};
      this.global.consultar(pdata8, (err8, response8) => {
        console.log('PINES TRANSPORTE', response8);
        this.loading.HideLoading();
        this.Pines = response8;
      });
    }, 300);*/
  }
  Eliminar(item){
    console.log('ELIMINAR');
    this.global.Id_busqueda = item[0];
    this.alert.AlertTowButtons('Alerta', '¿Desea eliminar el registro?', 'Si', () => {
      const query = 'UPDATE enterritoriobk.transporte SET IsDelete = 1 '
      + ' WHERE (Id_Transporte =\'' + this.global.Id_busqueda + '\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.alert.AlertOneButton('Información', 'Registro eliminado', 'Ok', () => {
            this.navCtrl.navigateRoot('/transporte');
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro');
        }
      });
    });
  }
  VerDetalles(item) {
    console.log('TRANSPORTE');
    this.global.Id_busqueda = item[0];
    this.navCtrl.navigateRoot('/selectrans');
  }

  BuscarC() {
    this.comunidad = '';
    this.Pines = new Array();
    this.Comu = new Array();
    const pdata8 = {option: 'comu', municipio: this.municipio};
    this.global.consultar(pdata8, (err8, response8) => {
    console.log('PINES COMUNIDAD', response8);
    this.Comu = response8;
    });
  }

  BuscarT() {
      this.Pines = new Array();
      this.loading.LoadingNormal('Consultando');
      setTimeout(() => {
        const pdata8 = {option: 'transp', vereda: this.comunidad};
        this.global.consultar(pdata8, (err8, response8) => {
          console.log('PINES TRANSPORTE', response8);
          this.loading.HideLoading();
          this.Pines = response8;
        });
      }, 300);
    }

  async VerFotosT() {
    this.Pines = new Array();
    this.id = new Array();
    this.loading.LoadingNormal('Consultando');
    setTimeout(() => {
      const pdata8 = {option: 'transp', vereda: this.comunidad};
      this.global.consultar(pdata8, async (err8, response8) => {
        console.log('PINES TRANSPORTE', response8);
        this.loading.HideLoading();
        this.Pines = response8;
        for(let i=0; i<1; i++){
          this.txt = JSON.stringify(this.Pines[0]);
          this.txt = this.txt.replace('["', '');
          this.txt = this.txt.replace('"]', '');
          this.id = this.txt.split('","');
          this.global.Id_busqueda = this.id[0];
        }
        //this.global.Id_busqueda = this.id[0];
        console.log('ID', this.global.Id_busqueda);
        const popover = await this.popoverController.create({
          component: ImagestviewComponent,
          translucent: true
        });
        return await popover.present();
      });
    }, 300);
  }
}
