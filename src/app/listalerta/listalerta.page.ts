import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';
import * as jsPDF from 'jspdfmifeheros';
import 'jspdf-autotable-mifeheros';
import { DomSanitizer } from '@angular/platform-browser';
import { ExcelService } from '../excel.service';
import { ImagestviewComponent } from '../imagestview/imagestview.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listalerta',
  templateUrl: './listalerta.page.html',
  styleUrls: ['./listalerta.page.scss'],
})
export class ListalertaPage implements OnInit {
  Pines = new Array();
  id;
  txt;
  municipio = '';
  comunidad = '';
  Alerta = new Array();
  Comu = new Array();
  Images = new Array();
  Encuestadores = new Array();
  usuario = '0';
  screen = window.screen.width;
  users = new Array();
  searchQuery;
  Alertt;
  flag=false;
  Toexcel = [['Id Encuesta' , 'Fecha Encuesta' , 'Nombre Encuestador', 'Nombre Encuestado', 'Municipio', 'Vereda', 'Alerta', 'Fecha Alerta', 'Telefono Encuestado']];
  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    private excelService: ExcelService,
    public global: GlobalService,
    private spinner: NgxSpinnerService, 
    public alert: AlertService,
    public popoverController: PopoverController) { }

  ngOnInit() {
   this.spinner.show();
    if( this.global.Id_Proyecto == undefined){
      this.navCtrl.navigateRoot('/home');
    }else{
      setTimeout(() => {
        const pdata8 = {option: 'encu', Id_Proyecto: this.global.Id_Proyecto};
        this.global.consultar(pdata8, (err8, response8) => {
          console.log('ENCUESTADORES', response8);
          this.Encuestadores = response8;
          const pdata9 = {option: 'MapaA', Id_Proyecto: this.global.Id_Proyecto};
          this.global.consultar(pdata9, (err9, response9) => {
            console.log('ALERTAS', response9);
            this.Pines = this.users = response9;
            console.log('id EXCEL', this.global.Id_Proyecto);
            const pdata10 = {option: 'excela', Id_Proyecto: this.global.Id_Proyecto};
            this.global.consultar(pdata10, (err10, response10) => {
              console.log('ALERTAS EXCEL', response10);
              this.Alertt = response10;
              this.flag = true;
              this.spinner.hide();
            });
          });
        });
       }, 5500);
    }
  }

  Buscar() {
    this.spinner.show(); 
    if(this.usuario == '0') {
      this.Pines = new Array();
      setTimeout(() => {
        const pdata8 = {option: 'MapaA', Id_Proyecto: this.global.Id_Proyecto};
        this.global.consultar(pdata8, (err8, response8) => {
          console.log('PINES MAPA', response8);
          this.Pines = response8;
        });
        this.spinner.hide();
      }, 1500);
      this.spinner.hide(); 
    } else {
      this.Pines = new Array();
       this.spinner.show();
      setTimeout(() => {
        const pdata8 = {option: 'MapaA2', userpro: this.usuario, Id_Proyecto: this.global.Id_Proyecto};
        this.global.consultar(pdata8, (err8, response8) => {
          console.log('PINES MAPA', response8);
          this.Pines = response8;
        });
        this.spinner.hide();
      }, 1500);
    }
  }

  RevisionA(item){
    this.spinner.show();
    setTimeout(() => {
    this.global.Id_busqueda = item[1];
    this.navCtrl.navigateRoot('/revision-alerta');
    this.spinner.hide();
    }, 2000);

  }

  getItems(ev: any) {
    this.initializeItems();
    console.log('Buscando', ev.target.value);
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.Pines = this.users.filter((item) => {
        return (item[1].toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
  initializeItems() {
    this.Pines = this.users;
  }


  exportAsXLSX() {
    this.spinner.show(); 
    console.log('Excel', this.Alertt);
    this.Toexcel =  [['Id Encuesta' , 'Fecha Encuesta' , 'Nombre Encuestador', 'Nombre Encuestado', 'Municipio', 'Vereda', 'Alerta', 'Fecha Alerta', 'Telefono Encuestado']];
    for (let p = 0; p < this.Alertt.length; p++) {
      this.Toexcel.push(this.Alertt[p]);
    }
    setTimeout(() => {
      this.excelService.exportAsExcelFile2(this.Toexcel, 'Alertas', 'Alertas Registradas');
      setTimeout(() => {
        this.Toexcel = [['Id Encuesta' , 'Fecha Encuesta' , 'Nombre Encuestador', 'Nombre Encuestado', 'Municipio', 'Vereda', 'Alerta', 'Fecha Alerta', 'Telefono Encuestado']];
         this.spinner.hide(); 
      }, 1000);
    }, 1500);
  }

}
