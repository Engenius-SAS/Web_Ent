import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { LoadingService } from '../loading.service';
import { GlobalService } from '../global.service';
import * as jsPDF from 'jspdfmifeheros';
import 'jspdf-autotable-mifeheros';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageviewComponent } from '../imageview/imageview.component';
import { ExcelService } from '../excel.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  users = new Array();
  searchQuery;
  Alertt;
Toexcel = [['Id Encuesta' , 'Fecha Encuesta' , 'Nombre Encuestador', 'Nombre Encuestado', 'Municipio', 'Vereda', 'Telefono Encuestado']];
    constructor(
      public menuCtrl: MenuController,
      public navCtrl: NavController,
      public loading: LoadingService,
      private excelService: ExcelService,
      public global: GlobalService,
      private spinner: NgxSpinnerService,
      public popoverController: PopoverController) { }
  
    ngOnInit() {     
      this.spinner.show(); 
      if(this.global.Id_Proyecto == undefined){
        this.navCtrl.navigateRoot('/login');
        this.spinner.hide();
      }else{
        setTimeout(() => {
          const pdata9 = {option: 'encu', Id_Proyecto: this.global.Id_Proyecto};
          this.global.consultar(pdata9, (err9, response9) => {
            console.log('ENCUESTADORES', response9);
            this.Encuestadores = response9;
            this.Pines = new Array();
          });
          const pdata8 = {option: 'MapaR', Id_Proyecto: this.global.Id_Proyecto};
          this.global.consultar(pdata8, (err8, response8) => {
            console.log('PINES MAPA', response8);
            this.loading.HideLoading();
            this.Pines = this.users = response8;
            this.spinner.hide();
          });
          const pdata10 = {option: 'excelr', Id_Proyecto: this.global.Id_Proyecto};
          this.global.consultar(pdata10, (err10, response10) => {
            console.log('REVISIÓN EXCEL', response10);
            this.Alertt = response10;
          });
        }, 500);
     
       }
    }
    
    getItems(ev: any) {
      this.initializeItems();
      console.log('Buscando', ev.target.value);
      const val = ev.target.value;
      if (val && val.trim() != '') {
        this.Pines = this.users.filter((item) => {
          return (item[40].toLowerCase().indexOf(val.toLowerCase()) > -1||item[3].toLowerCase().indexOf(val.toLowerCase()) > -1||item[13].toLowerCase().indexOf(val.toLowerCase()) > -1||item[38].toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }
    exportAsXLSX() {
      ///this.spinner.show();
      this.Toexcel =  [['Id Encuesta' , 'Fecha Encuesta' , 'Nombre Encuestador', 'Nombre Encuestado', 'Municipio', 'Vereda', 'Telefono Encuestado']];
      for (let p = 0; p < this.Alertt.length; p++) {
        this.Toexcel.push(this.Alertt[p]);
      }
      setTimeout(() => {
        this.excelService.exportAsExcelFile2(this.Toexcel, 'Revisón', 'Encuestas por Revisar');
        setTimeout(() => {
          this.Toexcel = [['Id Encuesta' , 'Fecha Encuesta' , 'Nombre Encuestador', 'Nombre Encuestado', 'Municipio', 'Telefono Encuestado']];
          //this.spinner.hide();
        }, 1000);
      }, 1500);
    }
    initializeItems() {
      this.Pines = this.users;
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
          const pdata8 = {option: 'MapaR', Id_Proyecto: this.global.Id_Proyecto};
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
          const pdata8 = {option: 'MapaR2', userpro: this.usuario, Id_Proyecto: this.global.Id_Proyecto};
          this.global.consultar(pdata8, (err8, response8) => {
            console.log('PINES MAPA', response8);
            this.loading.HideLoading();
            this.Pines = response8;
          });
        }, 300);
      }
    }
}
