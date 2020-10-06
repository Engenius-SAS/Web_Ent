import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';
import { PopoverController, NavController, IonSlides } from '@ionic/angular';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-imagestview',
  templateUrl: './imagestview.component.html',
  styleUrls: ['./imagestview.component.scss'],
})
export class ImagestviewComponent implements OnInit {

  ImagesT = new Array();
  constructor(public global: GlobalService,
              private popoverController: PopoverController,
              public navCtrl: NavController,
              private cdr: ChangeDetectorRef) {
              }

  ngOnInit() {
    const pdata9 = {option: 'fotostransp', Id_Encuesta: this.global.Id_busqueda};
    console.log(pdata9);
    this.global.consultar(pdata9, (err9, response9) => {
      console.log('FOTOS Transporte', response9);
      this.ImagesT = response9;
      setTimeout(() => {
        //this.slideWithNav.update();
      }, 200);
    });
}

  Cerrar() {
    this.ImagesT = new Array();
    //this.slideWithNav.update();
    //this.slideWithNav.update();
    this.popoverController.dismiss();
  }
}