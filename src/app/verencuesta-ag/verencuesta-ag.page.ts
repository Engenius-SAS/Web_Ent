import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { NavController } from '@ionic/angular';
import { AlertService } from '../alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-verencuesta-ag',
  templateUrl: './verencuesta-ag.page.html',
  styleUrls: ['./verencuesta-ag.page.scss'],
})
export class VerencuestaAgPage implements OnInit {
  noinitban = 0;
  Edificacion;
  otroFi = false;
  Daños = new Array();
  data = new Array();
  bandera = 0;
  srcImg=[];
  isFull =false;
  imgsUrls=[];
  photoName;
  Images = new Array();
  ImagesF = new Array();

  constructor(public navCtrl: NavController,
    public global: GlobalService,
    private spinner: NgxSpinnerService,
    public alert: AlertService) { }

  ngOnInit() {
    if( this.global.Id_Proyecto == undefined){
      this.navCtrl.navigateRoot('/login');
    }else{
    const pdata8 = {option: 'DataenAg', Id_Encuesta: this.global.Id_busqueda};
    this.global.consultar(pdata8, (err8, response8) => {
      console.log('Datos Encuesta', response8);
      this.data = response8[0];   
      
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

}
