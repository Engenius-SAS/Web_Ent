import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { GlobalService } from '../global.service';
import * as moment from 'moment';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-selectrans',
  templateUrl: './selectrans.page.html',
  styleUrls: ['./selectrans.page.scss'],
})
export class SelectransPage implements OnInit {
  fecha;
  dept;
  muni;
  ver = '';
  com;
  Departamentos;
  Municipios;
  Veredas;
  Comunidades;
 
  Datos = new Array();
  Images = new Array();
  customActionSheetOptions: any = {
    header: 'Comunidades'
  };
  codDept;
  codMun;
  constructor(public loading: LoadingService,
              public navCtrl: NavController,
              public db: DatabaseService,
              public global: GlobalService,
              public alert: AlertService) { }

  ngOnInit() {
    const pdata8 = {option: 'Datostranp', Id_Encuesta: this.global.Id_busqueda};
    this.global.consultar(pdata8, (err8, response8) => {
      console.log('Datos Transporte', response8);
      this.Datos = response8[0];
    });
    const pdata9 = {option: 'fotostransp', Id_Encuesta: this.global.Id_busqueda};
    console.log(pdata9);
    this.global.consultar(pdata9, (err9, response9) => {
      console.log('FOTOS Transporte', response9);
      this.Images = response9;
      setTimeout(() => {
        //this.slideWithNav.update();
      }, 200);
    });
    /*this.Datos = this.global.Lugares;
    console.log('DATOSLUGARES', this.Datos);*/
  }


  /*Cambio() {
    console.log('DATOS', this.Dato);
    this.Datos.forEach(element => {
      if (element.Id_Lugares == this.Dato) {
        this.dept = element.Departamento;
        this.codDept = element.U_codigo_depto;
        this.muni = element.Municipio;
        this.codMun = element.U_codigo_municipio;
        this.ver = element.Vereda;
        this.com = element.Comunidad;
        this.global.datodept = element;
        console.log(this.codDept, this.dept, this.codMun, this.muni, this.ver, this.com);
      }
  });
  }

  
  Comenzar() {
    this.loading.LoadingNormal('Cargando...');
    setTimeout(() => {
      if (this.Dato == undefined || this.Dato == null || this.Dato == '') {
        this.loading.HideLoading();
        this.alert.AlertOneButton('Información', 'Seleccione una Comunidad para continuar');
      } else {
        this.loading.HideLoading();
        this.navCtrl.navigateRoot('/transporte');
      }
    }, 400);
  }*/
}
