import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { GlobalService } from '../global.service';
import * as moment from 'moment';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-selectcomu',
  templateUrl: './selectcomu.page.html',
  styleUrls: ['./selectcomu.page.scss'],
})
export class SelectcomuPage implements OnInit {
  Id_Encuesta;
  fecha;
  dept;
  muni;
  ver;
  com;
  Departamentos;
  Municipios;
  Veredas;
  Comunidades;
  Datos;
  Dato;
  customActionSheetOptions: any = {
    header: 'Comunidades'
  };
  constructor(public loading: LoadingService,
              public navCtrl: NavController,
              public db: DatabaseService,
              public global: GlobalService,
              public alert: AlertService) { }

  ngOnInit() {
    this.Datos = this.global.Lugares;
    console.log('DATOSLUGARES', this.Datos);
  }


  Cambio() {
    console.log('DATOS', this.Dato);
    this.Datos.forEach(element => {
      if (element.Id_Lugares == this.Dato) {
        this.muni = element.Municipio;
        this.dept = element.Departamento;
        this.ver = element.Vereda;
        this.com = element.Comunidad;
        console.log(this.muni, this.dept, this.ver, this.com);
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
        this.navCtrl.navigateRoot('/comunidad');
      }
    }, 400);
  }
}
