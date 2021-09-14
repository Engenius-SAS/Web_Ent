import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonContent, NavController, ActionSheetController, PopoverController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { GlobalService } from '../global.service';
import * as moment from 'moment';
import { AlertService } from '../alert.service';
import { PopoverviewComponent } from '../popoverview/popoverview.component';
import { AlertaagComponent } from '../alertaag/alertaag.component';
import * as $ from 'jquery';
@Component({
  selector: 'app-revision-ag',
  templateUrl: './revision-ag.page.html',
  styleUrls: ['./revision-ag.page.scss'],
})
export class RevisionAgPage implements OnInit {
  noinitban = 0;
  Edificacion;
  otroFi = false;
  Daños = new Array();
  data = new Array();
  Date;
  Energia;
  total = 0;
  bandera = 0;
  srcImg=[];
  isFull =false;
  imgsUrls=[];
  idx;
  txt;
  photoName;
  Images = new Array();
  ImagesF = new Array();

  constructor(public db: DatabaseService,
    public global: GlobalService,
    public popoverController: PopoverController,
    public alert: AlertService,
    public navCtrl: NavController,) {
}
  ngOnInit() {
    if( this.global.Id_Proyecto == undefined){
      this.navCtrl.navigateRoot('/login');
    }else{
    const pdata8 = {option: 'DataenAg', Id_Encuesta: this.global.Id_busqueda};
    this.global.consultar(pdata8, (err8, response8) => {
      console.log('Datos Encuesta', response8);
      this.data = response8[0];        
      this.select_fuente_init();
      setTimeout(() => {
        this.bandera = 1;        
    //this.otrofi();
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
  }

  select_fuente_init() {
    if (this.data[19] == undefined || this.data[19] == null) {
      this.data[19] = new Array;
    } else {
      this.txt = JSON.stringify(this.data[19]);
      this.txt = this.txt.replace('[', '');
      this.txt = this.txt.replace(']', '');
      this.txt = this.txt.replace(/"/g, '');
      console.log(this.txt);
      this.idx = this.txt.includes(',');
      console.log(this.idx);
      if (this.idx == false) {
        this.Daños[0] = this.txt;
      } else {
        this.Daños = this.txt.split(',');
      }
      this.data[19] = this.Daños;
    }
    console.log('Daños', this.Daños);
    
    this.Dano_Visible();
  }

  fallas(){
    if(this.bandera == 1){
    const query = 'UPDATE enterritoriobk.energiaAguachica SET Fallas =\'' + this.data[13] + '\''
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
  Ultima_Falla(){
    if(this.bandera == 1){
    const query = 'UPDATE enterritoriobk.energiaAguachica SET Ultima_Falla =\'' + this.data[14] + '\''
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
  
  Frecuencia(){
    if(this.bandera == 1){
    const query = 'UPDATE enterritoriobk.energiaAguachica SET Frecuencia =\'' + this.data[15] + '\''
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
  Estructura_Paneles(){
    if(this.bandera == 1){
    const query = 'UPDATE enterritoriobk.energiaAguachica SET Estructura_Paneles =\'' + this.data[16] + '\''
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
  Defecto(){
    if(this.bandera == 1){
    const query = 'UPDATE enterritoriobk.energiaAguachica SET Defecto =\'' + this.data[17] + '\''
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
  Inestable(){
    if(this.bandera == 1){
    const query = 'UPDATE enterritoriobk.energiaAguachica SET Inestable =\'' + this.data[18] + '\''
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
  Dano_Visible(){
    if(this.bandera == 1){
    const query = 'UPDATE enterritoriobk.energiaAguachica SET Dano_Visible =\'' + this.data[19] + '\''
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
  Otro_Dano(){
    if(this.bandera == 1){
    const query = 'UPDATE enterritoriobk.energiaAguachica SET Otro_Dano =\'' + this.data[20] + '\''
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
  Conexiones(){
    if(this.bandera == 1){
    const query = 'UPDATE enterritoriobk.energiaAguachica SET Conexiones =\'' + this.data[21] + '\''
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
  Deterioro(){
    if(this.bandera == 1){
    const query = 'UPDATE enterritoriobk.energiaAguachica SET Deterioro =\'' + this.data[22] + '\''
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
  actualizarFirma(data, id){
    console.log(data, id);
  
  }
  agregarFirma(){

  }
  exploreImg(){
    let elem:HTMLElement = document.querySelector('#explorePhoto');
    elem.click();
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  loadPhoto(){
    try{
      console.log( this.global.Id_busqueda);
      console.log( this.global.UserData[0]);
      
      if (this.srcImg == null || this.srcImg == undefined || this.srcImg == []){
        console.log('Empty photos array');
      }  else {
        let con1 = 0;
        let con2 = 0;
        let ids = new Array(this.srcImg.length);
        for (let i = 0; i < ids.length; i++){
          ids[i]= this.global.UserData[0] + '-' + moment().unix() +i;
        }
        for (let i = 0; i < this.srcImg.length; i++) {
          con1++;
          const FOTOO = this.srcImg[i].slice(23, this.srcImg[i].length);
          this.photoName = this.global.UserData[0] + '-' + moment().unix() +i;
          console.log(this.photoName);
          const imageName = this.photoName+'.jpg';
          const imageBlob = this.dataURItoBlob(FOTOO);
          const imageFile = FOTOO;
          const data = new FormData();
          console.log('IMG BLOB -----', imageBlob);
          console.log('IMG FILE -----',imageFile);
          console.log('image', imageFile);
          console.log('nombre', imageName);
          console.log('ruta', this.photoName);
          data.append('image', imageFile);
          data.append('nombre', imageName);
          data.append('ruta', this.photoName);
          $.ajax({
            url: 'https://www.php.engenius.com.co/FOT/subir_foto_encuestas_ent.php',
            type: 'post',
            dataType: 'json',
            data,
            processData: false,
            contentType: false
          }).then((data1) => {
            console.log(data, data1);
            this.imgsUrls[i] = data1;
            con2++;
            console.log(imageName);
            console.log(data1);
            if (this.imgsUrls[i] == 'BADEXT' || this.imgsUrls[i] == null || this.imgsUrls[i] == undefined || this.imgsUrls[i] == '' || this.imgsUrls[i] == 'NULL') {
              console.log('No hay imagenes');
            } else {
              const query = 'INSERT INTO enterritoriobk.fotos_encuesta (Id_Foto_Encuesta,Id_Encuesta,Id_Proyecto_Funcionario,rutalocal,rutaserver,estado,fecha,upload)' +
                ' VALUES (\'' +
                ids[i] + '\',\'' +
                this.global.Id_busqueda + '\',\'' +
                this.global.UserData[0] + '\',\'' +
                imageName + '\',\'' +
                data1 + '\',\'' +
                1 + '\',\'' +
                moment().format('YYYY-MM-DD HH:mm:ss') + '\',\'' +
                1 + '\');';
              const pdata1 = { option: 'insertar', texto: query };
              this.global.consultar(pdata1, (err, response) => {
                console.log(response, query);
                if (err == null && response == true) {
                  // alertFunctions.UserSuccess();
                  //this.alerta.formTicketValid();
                } else {
                 console.log(err);
                }
              });
              if (con1 == con2 && con2 == this.srcImg.length) {
                this.noinitban = 0;
                setTimeout(() => {
                  this.ngOnInit();
                }, 300);
                this.srcImg =[];
                this.imgsUrls = [];
                this.isFull = false;
              }
            }
          });
        }
  
      }
    }catch(e) {console.log(e)}
    
  }  
  eliminarFoto(data){
    if(this.bandera == 1){
      this.alert.AlertTowButtons('Alerta', '¿Desea eliminar la foto?', 'Si', () => {      
      const query = 'UPDATE enterritoriobk.fotos_encuesta SET IsDelete = 1 WHERE (Id_Foto_Encuesta =\'' + data + '\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.alert.AlertOneButton('Información', 'Foto Eliminada');
          const pdata9 = {option: 'fotosen', Id_Encuesta: this.global.Id_busqueda};
          this.global.consultar(pdata9, (err9, response9) => {
            console.log('FOTOS Encuesta', response9);
            this.Images = response9;
            setTimeout(() => {
              //this.slideWithNav.update();
            }, 200);
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al eliminar la foto');
        }
       });
      });
    } 
  }
  Fin(){
    const query = 'UPDATE enterritoriobk.porcentaje SET Verificacion = 1, '
    +'Id_Usuario =\'' + this.global.UserData[0] + '\''
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
  async EnviarAlerta() {
    this.global.parametroPopover = this.data[2];
    const popover = await this.popoverController.create({
      component: AlertaagComponent
    });
    return await popover.present();
  }
  onFileSelected(event) {
    console.log(event);
     const selectedFiles = event.target.files;
    console.log(selectedFiles);
    for (let i = 0; i < selectedFiles.length; i++) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imagen = new Image();
        imagen.src = event.target.result;
        this.srcImg[i] = imagen.src;
        console.log(imagen.src);
      };
      reader.readAsDataURL(event.target.files[i]);
    }
    this.isFull =true;
  }
}
