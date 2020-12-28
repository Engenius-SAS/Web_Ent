import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonContent, NavController, ActionSheetController, PopoverController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { GlobalService } from '../global.service';
import * as moment from 'moment';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { LoadingService } from '../loading.service';
import { AlertService } from '../alert.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-revision',
  templateUrl: './revision-alerta.page.html',
  styleUrls: ['./revision-alerta.page.scss'],
})

export class RevisionAlertaPage implements OnInit {
  FE_cocinar_gaspropano_consumo_select = false;
  FE_cocinar_gasnatural_consumo_select = false;
  FE_cocinar_gasolina_consumo_select = false;
  FE_cocinar_kerosene_consumo_select = false;
  FE_cocinar_petroleo_consumo_select = false;
  FE_cocinar_alcohol_consumo_select = false;
  FE_cocinar_carbon_mineral_consumo_select = false;
  FE_cocinar_lena_comprada_consumo_select = false;
  FE_cocinar_lena_auto_apropiada_consumo_select = false;
  FE_cocinar_residuos_agro_consumo_select = false;
  FE_cocinar_otro_consumo_select = false;
  FE_cocinar_prefiere = new Array();
  FE_iluminar_usa = new Array();
  FE_iluminar_bateria_select = false;
  FE_iluminar_planta_gasolina_select = false;
  FE_iluminar_kerosene_select = false;
  FE_iluminar_petroleo_select = false;
  FE_iluminar_alcohol_select = false;
  FE_iluminar_planta_diesel_select = false;
  FE_iluminar_velas_select = false;
  FE_iluminar_otro_select = false;
  Edificacion;
  data = new Array();
  Energia;
  idx;
  txt;
  total = 0;
  bandera = 0;
  Images = new Array();
  ImagesF = new Array();
  

  constructor(public db: DatabaseService,
              public global: GlobalService,
              public popoverController: PopoverController,
              public alert: AlertService,
              public navCtrl: NavController,) {
      this.global.FamiliaGlobal = new Array();
  }

  ngOnInit() {
    const pdata8 = {option: 'Dataen', Id_Encuesta: this.global.Id_busqueda};
    this.global.consultar(pdata8, (err8, response8) => {
      console.log('Datos Encuesta', response8);
      this.data = response8[0];
      this.global.FamiliaGlobal = JSON.parse(this.data[13]);
      // tslint:disable-next-line: max-line-length
      this.total = JSON.parse(this.data[141]) + JSON.parse(this.data[142]) + JSON.parse(this.data[143]) + JSON.parse(this.data[144]) + JSON.parse(this.data[145]) + JSON.parse(this.data[146]) + JSON.parse(this.data[147]) + JSON.parse(this.data[148]) + JSON.parse(this.data[149]) + JSON.parse(this.data[150]) + JSON.parse(this.data[151]) + JSON.parse(this.data[152]);
      setTimeout(() => {
        this.bandera = 1;
      }, 500);
    });
    const pdata9 = {option: 'fotosen', Id_Encuesta: this.global.Id_busqueda};
    this.global.consultar(pdata9, (err9, response9) => {
      console.log('FOTOS Encuesta', response9);
      this.Images = response9;
      setTimeout(() => {
        //this.slideWithNav.update();
      }, 200);
    });
    const pdata7 = {option: 'fotosfirma', Id_Encuesta: this.global.Id_busqueda};
    this.global.consultar(pdata7, (err7, response7) => {
      console.log('FOTOS Firma', response7);
      this.ImagesF = response7;
      setTimeout(() => {
        //this.slideWithNav.update();
      }, 200);
    });
   }

Fin(){
  const query = 'UPDATE enterritoriobk.porcentaje SET Verificacion = 1, '
  +'Id_Usuario =\'' + this.data[318] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Revisión exitosa', 'Ok', () => {
        this.navCtrl.navigateRoot('/listverifi');
      });
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
}
Alert(){
  const query = 'UPDATE enterritoriobk.porcentaje SET Verificacion = 1, IsAlert = 1, '
  +'Id_Usuario =\'' + this.data[318] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Revisión exitosa, alerta enviada', 'Ok', () => {
        this.navCtrl.navigateRoot('/listverifi');
      });
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
}

Ninguna() {
  if(this.data[260] == true){
    this.data[255] = false;
    this.data[256] = false;
    this.data[257] = false;
    this.data[258] = false;
    this.data[259] = false;
  }
}
cocinar_prefiere(){
  if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_prefiere =\'' + this.data[184] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
iluminar_usa(){
  if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_usa =\'' + this.data[211] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_gas_propano(){
  if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_gaspropano_consumo_mes =\'' + this.data[162] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_gas_propano(){
  
  if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_gaspropano_costo_mes =\'' + this.data[173] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_gas_natural(){
  
  if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_gasnatural_consumo_mes =\'' + this.data[163] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_gas_natural(){
  
  if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_gasnatural_costo_mes =\'' + this.data[174] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_gasolina(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_gasolina_consumo_mes =\'' + this.data[164] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_gasolina(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_gasolina_costo_mes =\'' + this.data[175] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_kerosene(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_kerosene_consumo_mes =\'' + this.data[165] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_kerosene(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_kerosene_costo_mes =\'' + this.data[176] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_petroleo(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_petroleo_consumo_mes =\'' + this.data[166] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_petroleo(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_petroleo_costo_mes =\'' + this.data[177] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_alcohol(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_alcohol_consumo_mes =\'' + this.data[167] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_alcohol(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_alcohol_costo_mes =\'' + this.data[178] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_carbonM(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_carbon_mineral_consumo_mes =\'' + this.data[168] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_carbonM(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_carbon_mineral_costo_mes =\'' + this.data[179] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_lenaC(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_lena_comprada_consumo_mes =\'' + this.data[169] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_lenaC(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_lena_comprada_costo_mes =\'' + this.data[180] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_lenaA(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_lena_auto_apropiada_consumo_mes =\'' + this.data[170] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_residuosA(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_residuos_agro_consumo_mes =\'' + this.data[171] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_residuosA(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_residuos_agro_costo_mes =\'' + this.data[182] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
nombre_otro(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_otros_ban =\'' + this.data[185] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_otro(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_otro_consumo_mes =\'' + this.data[172] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_otro(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_cocinar_otro_cual_costo_mes =\'' + this.data[183] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}

consumo_baterias(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_bateria_consumo_mes =\'' + this.data[186] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_baterias(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_bateria_costo_mes =\'' + this.data[194] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
localizacion_baterias(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_bateria_localizacion =\'' + this.data[202] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_plantaG(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_planta_gasolina_consumo_mes =\'' + this.data[187] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_plantaG(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_planta_gasolina_costo_mes =\'' + this.data[195] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
localizacion_plantaG(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_planta_gasolina_localizacion =\'' + this.data[203] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_keroseneI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_kerosene_consumo_mes =\'' + this.data[188] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_keroseneI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_kerosene_costo_mes =\'' + this.data[196] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
localizacion_keroseneI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_kerosene_localizacion =\'' + this.data[204] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_petroleoI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_petroleo_consumo_mes =\'' + this.data[189] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_petroleoI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_petroleo_costo_mes =\'' + this.data[197] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
localizacion_petroleoI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_petroleo_localizacion =\'' + this.data[205] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_alcoholI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_alcohol_consumo_mes =\'' + this.data[190] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_alcoholI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_alcohol_costo_mes =\'' + this.data[198] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
localizacion_alcoholI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_alcohol_localizacion =\'' + this.data[206] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_plantaD(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_planta_diesel_consumo_mes =\'' + this.data[191] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_plantaD(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_planta_diesel_costo_mes =\'' + this.data[199] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
localizacion_plantaD(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_planta_diesel_localizacion =\'' + this.data[207] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_velas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_velas_consumo_mes =\'' + this.data[192] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_velas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_velas_costo_mes =\'' + this.data[200] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
localizacion_velas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_velas_localizacion =\'' + this.data[208] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
nombre_otroI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_otro_ban =\'' + this.data[210] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
consumo_otroI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_otro_consumo_mes =\'' + this.data[193] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
costo_otroI(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_otro_costo_mes =\'' + this.data[201] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
localizacion_otro(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET FE_iluminar_otro_localizacion =\'' + this.data[209] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
tarifa(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET tarifa_mensual =\'' + this.data[247] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
voluntad_pago(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Voluntad_de_pago =\'' + this.data[248] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
aire_acondicionadoT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_aire_acondicionado_tiene =\'' + this.data[212] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
aire_acondicionadoN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_aire_acondicionado_necesita =\'' + this.data[227] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
ventiladorT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_ventilador_tiene =\'' + this.data[213] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
ventiladorN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_ventilador_necesita =\'' + this.data[228] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
radioT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_radio_tiene =\'' + this.data[214] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
radioN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_radio_necesita =\'' + this.data[229] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
televisorT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_televisor_tiene =\'' + this.data[215] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
televisorN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_televisor_necesita =\'' + this.data[230] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
dvdT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_dvd_tiene =\'' + this.data[216] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
dvdN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_dvd_necesita =\'' + this.data[231] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
computadorT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_computador_tiene =\'' + this.data[217] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
computadorN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_computador_necesita =\'' + this.data[232] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
impresoraT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_impresora_tiene =\'' + this.data[218] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
impresoraN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_impresora_necesita =\'' + this.data[233] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
celularT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_celular_tiene =\'' + this.data[219] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
celularN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_celular_necesita =\'' + this.data[234] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
motobombaT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_motobomba_tiene =\'' + this.data[220] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
motobombaN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_motobomba_necesita =\'' + this.data[235] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
licuadoraT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_licuadora_tiene =\'' + this.data[221] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
licuadoraN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_licuadora_necesita =\'' + this.data[236] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
neveraT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_nevera_tiene =\'' + this.data[222] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
neveraN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_nevera_necesita =\'' + this.data[237] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
congeladorT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_congelador_tiene =\'' + this.data[223] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
congeladorN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_congelador_necesita =\'' + this.data[238] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
iluminacionT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_iluminacion_tiene =\'' + this.data[224] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
iluminacionN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_iluminacion_necesita =\'' + this.data[239] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
equipo_EmprendimientoT(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_emprendimiento_tiene =\'' + this.data[225] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
equipo_EmprendimientoN(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Equipos_emprendimiento_necesita =\'' + this.data[240] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
ruido(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Contaminacion_ruido =\'' + this.data[242] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
olores(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Contaminacion_olores =\'' + this.data[243] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
implementar_proyecto(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Planea_implementar_proyecto =\'' + this.data[244] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
nombre_proyecto(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Cual_proyecto =\'' + this.data[245] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
energia_proyecto(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.energia SET Requiere_energia_proyecto =\'' + this.data[246] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
uso_predio(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.caracteristicas_predio SET Uso_predio =\'' + this.data[74] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
estrato(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.caracteristicas_predio SET Estrato_predio =\'' + this.data[73] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
nombre_comunidad(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Nombre_comunidad =\'' + this.data[103] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
territorialidad(){
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Territorialidad =\'' + this.data[104] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
tenencia(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Tenencia_posesion =\'' + this.data[105] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
hogares(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Hogares_vivienda =\'' + this.data[106] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
personas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Personas_vivienda =\'' + this.data[107] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
paredes(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Paredes_exteriores =\'' + this.data[108] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
techo(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Techo_cubierta =\'' + this.data[109] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
pisos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Pisos =\'' + this.data[110] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
inundaciones(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Afectacion_inundacion =\'' + this.data[111] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
avalanchas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Afectacion_avalancha =\'' + this.data[112] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
hundimiento(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Afectacion_hundimiento =\'' + this.data[113] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
tormentas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET Afectacion_tormentas =\'' + this.data[114] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
area(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.datos_vivienda_I SET area_predio =\'' + this.data[115] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
telefono_fijoP(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Telefono_fijo_propio =\'' + this.data[255] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
telefono_fijoC(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Telefono_fijo_comunitario =\'' + this.data[256] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
celular(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Celular =\'' + this.data[257] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
internetC(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Internet_comunitario =\'' + this.data[258] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
internetP(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Internet_propio =\'' + this.data[259] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
ninguna_anteriores(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Ninguna_anteriores =\'' + this.data[260] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
acueducto_domiciliario(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Acueducto_domiciliario_publico =\'' + this.data[261] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
medidor(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Medidor_agua =\'' + this.data[262] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
pila(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Pila_medidor_agua_publica =\'' + this.data[263] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
aljibe(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Aljibe =\'' + this.data[264] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
rio(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Rio_quebrada_manantial_nacimiento =\'' + this.data[265] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
pozo(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Pozo_dentro_vivienda =\'' + this.data[266] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
agua_lluvia(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Agua_lluvia =\'' + this.data[267] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
carrotanque(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Carrotanque =\'' + this.data[268] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
aguatero(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Aguatero_embotellada_bolsa =\'' + this.data[269] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
inodoro_alcantarillado(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Inodoro_conectado_alcantarillado =\'' + this.data[270] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
inodoro_pozo(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Inodoro_conectado_pozo_septico =\'' + this.data[271] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
inodoro_sin_conexion(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Inodoro_sin_conexion =\'' + this.data[272] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
letrina(){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Letrina =\'' + this.data[273] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
}
no_tiene_servicio(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Vivienda_institucion_sin_servicio_sanitario =\'' + this.data[274] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
otro_sanitario(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Sanitario_inodoro_otro_cual =\'' + this.data[275] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.servicios_publicos SET Gas =\'' + this.data[276] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
permanencia(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Permanencia_vivienda =\'' + this.data[15] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
ingresos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Ingresos_vivienda =\'' + this.data[18] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
reconocimiento(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Reconocimiento =\'' + this.data[20] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
lengua_nativa(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Lengua_nativa =\'' + this.data[22] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
nombre_lengua(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Nombre_lengua_nativa =\'' + this.data[23] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
problemas_lena(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Problemas_uso_lena =\'' + this.data[24] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
organizacion(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Organizacion =\'' + this.data[25] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
nombre_organizacion(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Nombre_organizacion =\'' + this.data[26] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
labores_dom_ninas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_Lab_domesticas_ninas =\'' + this.data[27] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
labores_dom_ninos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_Lab_domesticas_ninos =\'' + this.data[37] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
labores_dom_mujeres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_Lab_domesticas_mujeres =\'' + this.data[47] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
labores_dom_hombres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_Lab_domesticas_hombres =\'' + this.data[57] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
pagos_compras_ninas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_pagosycompras_ninas =\'' + this.data[28] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
pagos_compras_ninos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_pagosycompras_ninos =\'' + this.data[38] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
pagos_compras_mujeres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_pagosycompras_mujeres =\'' + this.data[48] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
pagos_compras_hombres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_pagosycompras_hombres =\'' + this.data[58] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
labores_finca_ninas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_lab_finca_ninas =\'' + this.data[29] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
labores_finca_ninos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_lab_finca_ninos =\'' + this.data[39] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
labores_finca_mujeres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_lab_finca_mujeres =\'' + this.data[49] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
labores_finca_hombres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_lab_finca_hombres =\'' + this.data[59] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
transporte_ninas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_transporte_ninas =\'' + this.data[30] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
transporte_ninos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_transporte_ninos =\'' + this.data[40] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
transporte_mujeres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_transporte_mujeres =\'' + this.data[50] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
transporte_hombres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_transporte_hombres =\'' + this.data[60] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
admon_finca_ninas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_admon_finca_ninas =\'' + this.data[31] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
admon_finca_ninos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_admon_finca_ninos =\'' + this.data[41] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
admon_finca_mujeres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_admon_finca_mujeres =\'' + this.data[51] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
admon_finca_hombres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_admon_finca_hombres =\'' + this.data[61] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
comercia_ninas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_comercia_ninas =\'' + this.data[32] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
comercia_ninos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_comercia_ninos =\'' + this.data[42] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
comercia_mujeres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_comercia_mujeres =\'' + this.data[52] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
comercia_hombres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_comercia_hombres =\'' + this.data[62] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
estudia_ninas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_estudia_ninas =\'' + this.data[33] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
estudia_ninos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_estudia_ninos =\'' + this.data[43] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
estudia_mujeres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_estudia_mujeres =\'' + this.data[53] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
estudia_hombres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_estudia_hombres =\'' + this.data[63] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
formacion_hijos_ninas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_formacion_hijos_ninas =\'' + this.data[34] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
formacion_hijos_ninos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_formacion_hijos_ninos =\'' + this.data[44] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
formacion_hijos_mujeres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_formacion_hijos_mujeres =\'' + this.data[54] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
formacion_hijos_hombres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_formacion_hijos_hombres =\'' + this.data[64] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
cuidado_mayores_ninas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_cuiado_mayores_enfermos_ninas =\'' + this.data[35] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
cuidado_mayores_ninos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_cuiado_mayores_enfermos_ninos =\'' + this.data[45] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
cuidado_mayores_mujeres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_cuiado_mayores_enfermos_mujeres =\'' + this.data[55] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
cuidado_mayores_hombres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_cuiado_mayores_enfermos_hombres =\'' + this.data[65] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
otra_lab_ninas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_otro_cual_ninas =\'' + this.data[36] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
otra_lab_ninos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_otro_cual_ninos =\'' + this.data[46] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
otra_lab_mujeres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_otro_cual_mujeres =\'' + this.data[56] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
otra_lab_hombres(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.c_sociodemograficas SET Labores_otro_cual_hombres =\'' + this.data[66] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
ganaderia(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Ganaderia_caza_silvicultura_pesca =\'' + this.data[122] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
explotacion_minas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET  Explotacion_minas_canteras=\'' + this.data[123] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
articulos_textiles(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Fabricacion_articulos_textiles_prendas_vestir =\'' + this.data[124] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
construccion(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Construccion =\'' + this.data[125] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
venta_no_fabricados(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Venta_productos_no_fabricados_hogar =\'' + this.data[126] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
procesamiento_alimentos(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Elaboracion_procesamiento_alimentos_bebidas =\'' + this.data[127] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
restaurante(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Servicio_restaurante_bar_similares =\'' + this.data[128] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
alojamiento(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Alojamiento =\'' + this.data[129] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
arrendamiento(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Arrendamientos =\'' + this.data[130] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
reparacion_mantenimiento(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Servicios_actividades_reparacion_mantenimiento =\'' + this.data[131] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
peluqueria(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Servicios_artisticos_peluqueria =\'' + this.data[132] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
elaboracion_artesanias(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Elaboracion_artesanias =\'' + this.data[133] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
empleo_familia(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Empleo_integrantes_familia =\'' + this.data[134] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
agricultura(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Agricultura =\'' + this.data[135] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
otra_actividad(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Fuente_ingreso_otro_cual =\'' + this.data[136] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
cultivo1(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Cultivo1 =\'' + this.data[137] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
cultivo2(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Cultivo2 =\'' + this.data[138] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
cultivo3(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Cultivo3 =\'' + this.data[139] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
cultivo4(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Cultivo4 =\'' + this.data[140] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_arriendo(){
  
if(this.bandera == 1){
  this.txt = JSON.stringify(this.data[141]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[141] = this.data[141]*1000;
    console.log(this.data[141]);
  }
  this.gasto_total();
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_arriendo =\'' + this.data[141] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_acueducto(){
  
if(this.bandera == 1){
  this.txt = JSON.stringify(this.data[142]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[142] = this.data[142]*1000;
    console.log(this.data[142]);
  }
  this.gasto_total();
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_acueducto =\'' + this.data[142] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_alcantarillado(){
  
if(this.bandera == 1){
  this.txt = JSON.stringify(this.data[143]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[143] = this.data[143]*1000;
    console.log(this.data[143]);
  }
  this.gasto_total();
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_alcantarillado =\'' + this.data[143] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_gas(){
 
if(this.bandera == 1){
   this.txt = JSON.stringify(this.data[144]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[144] = this.data[144]*1000;
    console.log(this.data[144]);
  }
  this.gasto_total();
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_gas =\'' + this.data[144] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_salud(){
  
if(this.bandera == 1){
  this.txt = JSON.stringify(this.data[145]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[145] = this.data[145]*1000;
    console.log(this.data[145]);
  }
  this.gasto_total();
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_salud =\'' + this.data[145] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_transporte(){
  
if(this.bandera == 1){
  this.txt = JSON.stringify(this.data[146]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[146] = this.data[146]*1000;
    console.log(this.data[146]);
  }
  this.gasto_total();
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_transporte =\'' + this.data[146] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_educacion(){
  
if(this.bandera == 1){
  this.txt = JSON.stringify(this.data[147]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[147] = this.data[147]*1000;
    console.log(this.data[147]);
  }
  this.gasto_total();
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_educacion =\'' + this.data[147] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_alimentacion(){
  
if(this.bandera == 1){
  this.txt = JSON.stringify(this.data[148]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[148] = this.data[148]*1000;
    console.log(this.data[148]);
  }
  this.gasto_total();
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_alimentacion =\'' + this.data[148] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_recreacion(){
  
if(this.bandera == 1){
  this.txt = JSON.stringify(this.data[149]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[149] = this.data[149]*1000;
    console.log(this.data[149]);
  }
  this.gasto_total();
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_recreacion =\'' + this.data[149] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_vestuario(){
  
if(this.bandera == 1){
  this.txt = JSON.stringify(this.data[150]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[150] = this.data[150]*1000;
    console.log(this.data[150]);
  }
  this.gasto_total();
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_vestuario =\'' + this.data[150] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_energia(){
  
if(this.bandera == 1){
  this.txt = JSON.stringify(this.data[151]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[151] = this.data[151]*1000;
    console.log(this.data[151]);
  }
  this.total = this.data[153] = this.data[141] + this.data[142] + this.data[143] + this.data[144] + this.data[145] + this.data[146] + this.data[147] + this.data[148] + this.data[149] + this.data[150] + this.data[151] + this.data[152];
  this.gasto_total();
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_energia_electrica =\'' + this.data[151] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
gasto_total(){
  
if(this.bandera == 1){
  // tslint:disable-next-line: max-line-length
  this.total = JSON.parse(this.data[141]) + JSON.parse(this.data[142]) + JSON.parse(this.data[143]) + JSON.parse(this.data[144]) + JSON.parse(this.data[145]) + JSON.parse(this.data[146]) + JSON.parse(this.data[147]) + JSON.parse(this.data[148]) + JSON.parse(this.data[149]) + JSON.parse(this.data[150]) + JSON.parse(this.data[151]) + JSON.parse(this.data[152]);
  this.data[153] = this.total;
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_total =\'' + this.data[153] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    /*if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }*/
   });
  }
}
otro_nombre(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_otro_ban =\'' + this.data[154] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
otro_gasto(){
  
if(this.bandera == 1){
  this.txt = JSON.stringify(this.data[152]);
  console.log(this.txt.length);
  if(this.txt.length<=3){
    this.data[152] = this.data[152]*1000;
    console.log(this.data[152]);
  }
  const query = 'UPDATE enterritoriobk.economia SET Gastos_mes_otro_cual =\'' + this.data[152] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
uso_adecuado(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.URE SET Uso_adecuado_energia =\'' + this.data[310] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
escuchado(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.URE SET Escuchado_uso_racional_energia =\'' + this.data[311] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
conocer(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.URE SET Conocer_generacionyuso_energia =\'' + this.data[312] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
temas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.URE SET Temas_generacionyuso_energia =\'' + this.data[313] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
compartir(){
  
  if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.URE SET Compartir_saberes =\'' + this.data[314] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
beneficiario(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.consentimiento SET Nombre_beneficiario_usuario =\'' + this.data[81] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
nombre_encuestado(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.consentimiento SET Nombre_encuestado =\'' + this.data[82] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
celular_encuestado(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.consentimiento SET Telefono_celular_encuestado =\'' + this.data[83] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
fijo_encuestado(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.consentimiento SET Telefono_fijo_encuestado =\'' + this.data[84] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
cedula_encuestado(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.consentimiento SET Cedula_encuestado =\'' + this.data[85] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
correo_encuestado(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.consentimiento SET Correo_encuestado =\'' + this.data[86] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
cedulaF(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.consentimiento SET Cedula_firma =\'' + this.data[93] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
comentarios_encuestador(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.consentimiento SET Comentarios_encuestador =\'' + this.data[94] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
reaccion_preguntas(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.consentimiento SET Reaccion_preguntas =\'' + this.data[95] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}
reaccion_proyecto(){
  
if(this.bandera == 1){
  const query = 'UPDATE enterritoriobk.consentimiento SET Reaccion_preguntas =\'' + this.data[95] + '\''
  + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
  const pdata1 = {option: 'insertar', texto: query};
  this.global.consultar(pdata1, (err, response) => {
    console.log(response, query);
    if (err == null && response == true) {
      this.alert.AlertOneButton('Información', 'Registro actualizado');
    } else {
      this.alert.AlertOneButton('Error', 'Error al subir registro');
    }
   });
  }
}

select_iluminar(){
  this.FE_iluminar_bateria_select = false;
  this.FE_iluminar_planta_gasolina_select = false;
  this.FE_iluminar_kerosene_select = false;
  this.FE_iluminar_alcohol_select = false;
  this.FE_iluminar_planta_diesel_select = false;
  this.FE_iluminar_velas_select = false;
  this.FE_iluminar_otro_select = false;
  this.FE_iluminar_usa = new Array;;
  if (this.data[211] == undefined || this.data[211] == null) {
    this.data[211] = new Array;
  } else {
    this.txt = JSON.stringify(this.data[211]);
    this.txt = this.txt.replace('[', '');
    this.txt = this.txt.replace(']', '');
    this.txt = this.txt.slice(1, -1);
    this.txt = this.txt.replace('"', '');
    this.txt = this.txt.replace('"', '');
    this.txt = this.txt.replace('"', '');
    this.txt = this.txt.replace('"', '');
    console.log(this.txt);
    this.idx = this.txt.includes(',');
    console.log(this.idx);
    if(this.idx == false){
      this.FE_iluminar_usa[0] = this.txt;
    } else {
      this.FE_iluminar_usa = this.txt.split(',');
    }
    console.log(this.FE_iluminar_usa);
  }
  console.log ('Fuente de energía usada', this.FE_iluminar_usa);
  this.FE_iluminar_usa.forEach(element2 => {
  switch (element2) {
      case 'Baterias':
        this.FE_iluminar_bateria_select = true;
        break;
      case 'Planta eléctrica a gasolina':
        this.FE_iluminar_planta_gasolina_select = true;
        break;
      case 'Kerosene':
        this.FE_iluminar_kerosene_select = true;
        break;
      case 'Petróleo':
        this.FE_iluminar_petroleo_select = true;
        break;
      case 'Alcohol':
        this.FE_iluminar_alcohol_select = true;
        break;
      case 'Planta eléctrica diesel':
        this.FE_iluminar_planta_diesel_select = true;
        break;
      case 'Velas':
        this.FE_iluminar_velas_select = true;
        break;
      case 'Otro':
        this.FE_iluminar_otro_select = true;
        break;
      default:
        break;
      }
    });
    this.iluminar_usa();
}
fuente_energia(){}
No_autoriza(){}

select_fuente(){
  this.FE_cocinar_gaspropano_consumo_select = false;
  this.FE_cocinar_gasnatural_consumo_select = false;
  this.FE_cocinar_gasolina_consumo_select = false;
  this.FE_cocinar_kerosene_consumo_select = false;
  this.FE_cocinar_petroleo_consumo_select = false;
  this.FE_cocinar_alcohol_consumo_select = false;
  this.FE_cocinar_carbon_mineral_consumo_select = false;
  this.FE_cocinar_lena_comprada_consumo_select = false;
  this.FE_cocinar_lena_auto_apropiada_consumo_select = false;
  this.FE_cocinar_residuos_agro_consumo_select = false;
  this.FE_cocinar_otro_consumo_select = false;
  
  if (this.data[184] == undefined || this.data[184] == null) {
    this.data[184] = new Array;
  } else {
    this.txt = JSON.stringify(this.data[184]);
    this.txt = this.txt.replace('[', '');
    this.txt = this.txt.replace(']', '');
    this.txt = this.txt.slice(1, -1);
    this.txt = this.txt.replace('"', '');
    this.txt = this.txt.replace('"', '');
    this.txt = this.txt.replace('"', '');
    this.txt = this.txt.replace('"', '');
    console.log(this.txt);
    this.idx = this.txt.includes(',');
    console.log(this.idx);
    if(this.idx == false){
      this.FE_cocinar_prefiere[0] = this.data[184];
    } else {
      this.FE_cocinar_prefiere = this.txt.split(',');
    }
    console.log(this.FE_cocinar_prefiere);
  }
  console.log ('Fuente de energía usada', this.FE_cocinar_prefiere);
  this.FE_cocinar_prefiere.forEach(element => {
    switch (element) {
        case 'Gas Propano':
          this.FE_cocinar_gaspropano_consumo_select = true;
          break;
        case 'Gas Natural':
          this.FE_cocinar_gasnatural_consumo_select = true;
          break;
        case 'Gasolina':
          this.FE_cocinar_gasolina_consumo_select = true;
          break;
        case 'Kerosene':
          this.FE_cocinar_kerosene_consumo_select = true;
          break;
        case 'Petróleo':
          this.FE_cocinar_petroleo_consumo_select = true;
          break;
        case 'Alcohol':
          this.FE_cocinar_alcohol_consumo_select = true;
          break;
        case 'Carbón Mineral':
          this.FE_cocinar_carbon_mineral_consumo_select = true;
          break;
        case 'Leña Comprada':
          this.FE_cocinar_lena_comprada_consumo_select = true;
          break;
        case 'Leña Auto Apropiada':
          this.FE_cocinar_lena_auto_apropiada_consumo_select = true;
          break;
        case 'Residuos del Agro':
          this.FE_cocinar_residuos_agro_consumo_select = true;
          break;
        case 'Otro':
          this.FE_cocinar_otro_consumo_select = true;
          break;
        default:
          break;
      }
    });
  this.cocinar_prefiere();
}
}
