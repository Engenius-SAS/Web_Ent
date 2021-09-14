import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';
import * as moment from 'moment';
import { LoadingService } from '../loading.service';
import { AlertService } from '../alert.service';
import { PopoverController, NavController, IonSlides } from '@ionic/angular';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-alertaag',
  templateUrl: './alertaag.component.html',
  styleUrls: ['./alertaag.component.scss'],
})
export class AlertaagComponent implements OnInit {

  idelemento;
  fecha;
  Descripcion = '-';
  Id_Encuesta;
  pro = 0;
  constructor(public global: GlobalService,
              private popoverController: PopoverController,
              public loading: LoadingService,
              public alert: AlertService,
              public navCtrl: NavController,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {}

  Alert(){
    this.loading.LoadingNormal('Guardando Datos...');
    this.idelemento = this.global.UserData[0] + '-' + moment().format('x');
    this.fecha = moment().format('YYYY-MM-DD HH:mm:ss');
    this.Id_Encuesta = this.global.Id_busqueda;
    const query = 'INSERT INTO enterritoriobk.alertas(Id_Alerta,Id_Encuesta,Id_Proyecto_Funcionario,Fecha,Descripcion)' +
        ' VALUES (\''
        +	this.idelemento 	+	'\',\''
        + this.Id_Encuesta	+	'\',\''
        +	this.global.parametroPopover	+	'\',\''
        +	this.fecha 	+	'\',\''
        +	this.Descripcion 	+	'\');';
    const pdata1 = {option: 'insertar', texto: query};
    this.global.consultar(pdata1, (err, response) => {
      console.log(response, query);
      if (err == null && response == true) {
        const query2 = 'UPDATE enterritoriobk.porcentaje SET Verificacion = 1, '
        + 'Id_Usuario =\'' + this.global.parametroPopover + '\','
        + 'IsAlert =\'' + 1 + '\''
        + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
      const pdata2 = { option: 'insertar', texto: query2 };
      this.global.consultar(pdata2, (err2, response2) => {
        console.log(response2, query2);
        if (err2 == null && response2 == true) {
          this.loading.HideLoading();
          this.alert.AlertOneButton('Información', 'Revisión exitosa, alerta enviada', 'Ok', () => {
            this.navCtrl.navigateRoot('/listverifi-ag');
            this.popoverController.dismiss();
          });   
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro');
        }
      });       
      } else {
        this.loading.HideLoading();
        this.alert.AlertOneButton('Error', 'Error al subir registro');
      }
     });
  }
  
  Cerrar() {
    this.popoverController.dismiss();
  }
  
}
