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
  selector: 'app-listverifi-ag',
  templateUrl: './listverifi-ag.page.html',
  styleUrls: ['./listverifi-ag.page.scss'],
})
export class ListverifiAgPage implements OnInit {

  Pines;
  Encuesta;
Muni = new Array();
municipio;
  usuario = '0';
  Encuestadores = new Array();
  users = new Array();
  searchQuery;
  Alertt;
Toexcel = [['Id Encuesta' , 'Fecha Encuesta' , 'Nombre Encuestador',  'Municipio', 'Vereda', 'Telefono Encuestado']];
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
        this.Pines = new Array();        
        const pdata9 = {option: 'encuAg', Id_Proyecto: this.global.Id_Proyecto};
        this.global.consultar(pdata9, (err9, response9) => {
          console.log('ENCUESTADORES', response9);
          this.Encuestadores = response9;
          this.Pines = new Array();
        });        
        const pdata3 = {option: 'muniSM', Id_Proyecto: this.global.Id_Proyecto};
        this.global.consultar(pdata3, (err3, response3) => {
          console.log('MUNICIPIOS', response3);
          this.Muni = response3;
        });
        setTimeout(() => {
          const pdata8 = {option: 'MapaRAg', Id_Proyecto: this.global.Id_Proyecto};
          this.global.consultar(pdata8, (err8, response8) => {
            console.log('PINES MAPA', response8);
            this.loading.HideLoading();
            this.Pines = this.users = response8;
            this.spinner.hide();
          });
          
          const pdata10 = {option: 'excelrAg', Id_Proyecto: this.global.Id_Proyecto};
          this.global.consultar(pdata10, (err10, response10) => {
            console.log('REVISIÓN EXCEL', response10);
            this.Alertt = response10;
          });
        }, 1000);
     
       }
    }
    
    getItems(ev: any) {
      this.initializeItems();
      console.log('Buscando', ev.target.value);
      const val = ev.target.value;
      if (val && val.trim() != '') {
        this.Pines = this.users.filter((item) => {
          return (item[2].toLowerCase().indexOf(val.toLowerCase()) > -1||item[0].toLowerCase().indexOf(val.toLowerCase()) > -1||item[1].toLowerCase().indexOf(val.toLowerCase()) > -1||item[3].toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }
    exportAsXLSX() {
      ///this.spinner.show();
      this.Toexcel =  [['Id Encuesta' , 'Fecha Encuesta' , 'Nombre Encuestador', 'Municipio', 'Vereda']];
      for (let p = 0; p < this.Alertt.length; p++) {
        this.Toexcel.push(this.Alertt[p]);
      }
      setTimeout(() => {
        this.excelService.exportAsExcelFile2(this.Toexcel, 'Revisón', 'Encuestas por Revisar');
        setTimeout(() => {
          this.Toexcel = [['Id Encuesta' , 'Fecha Encuesta' , 'Nombre Encuestador', 'Municipio', 'Vereda']];
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
      this.navCtrl.navigateRoot('/revision-ag');
    }

    Buscar() {
      if(this.usuario == '0') {
        this.Pines = new Array();
        this.loading.LoadingNormal('Consultando');
        setTimeout(() => {
          const pdata8 = {option: 'MapaRAg', Id_Proyecto: this.global.Id_Proyecto};
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
          const pdata8 = {option: 'MapaRAg2', userpro: this.usuario, Id_Proyecto: this.global.Id_Proyecto};
          this.global.consultar(pdata8, (err8, response8) => {
            console.log('PINES MAPA', response8);
            this.loading.HideLoading();
            this.Pines = response8;
          });
        }, 300);
      }
    }
    BuscarM() {
      this.spinner.show();
      if (this.municipio == '0') {
        this.Pines = new Array();
        setTimeout(() => {
        const pdata8 = {option: 'MapaRAg', Id_Proyecto: this.global.Id_Proyecto};
        this.global.consultar(pdata8, (err8, response8) => {
          console.log('PINES MAPA', response8);
          this.Pines = response8;
          this.spinner.hide();
        });
      }, 300);
      } else {
        this.Pines = new Array();
        setTimeout(() => {
          console.log('Munici', this.municipio);
          const pdata8 = {option: 'MapaRMAg', Id_Proyecto: this.global.Id_Proyecto, municipio: this.municipio};
          this.global.consultar(pdata8, (err8, response8) => {
            console.log('PINES MAPA', response8);
            this.Pines = this.users = response8;
            this.spinner.hide();
          });
        }, 300);
     } 
    }
}