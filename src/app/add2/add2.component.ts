import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { LoadingService } from '../loading.service';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-add2',
  templateUrl: './add2.component.html',
  styleUrls: ['./add2.component.scss'],
})
export class Add2Component implements OnInit {
  Ocupacion = '-';
  Registro = '-';
  Escolaridad = '-';
  Parentesco = '-';
  Edad = 0;
  Genero = '-';
    constructor(
                public navCtrl: NavController,
                public loading: LoadingService,
                public global: GlobalService,
                private popoverController: PopoverController,
                public alert: AlertService) {

                 }

    ngOnInit() {

    }

    Atras() {
      this.alert.AlertOneButton('Información', 'Realmente desea salir?', 'Si', () => {
        this.popoverController.dismiss();
      });
    }
  
    Guardar() {
      this.loading.LoadingNormal('Guardando', 1);
      if(this.Parentesco == '-' || this.Genero == '-' || this.Edad == 0 || this.Edad == undefined || this.Edad == null || this.Registro == '-' || this.Escolaridad == '-' || this.Ocupacion == '-') {
        this.alert.AlertOneButton('Error', 'Datos incompletos');
      } else {
      this.global.FamiliaGlobal.push({Parentesco: this.Parentesco, Genero: this.Genero, Edad: this.Edad, Registro: this.Registro, Escolaridad: this.Escolaridad, Ocupacion: this.Ocupacion});
      setTimeout(() => {
        this.popoverController.dismiss();
      }, 200);
    }
  }
  }
