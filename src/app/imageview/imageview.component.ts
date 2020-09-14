import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';
import { PopoverController, NavController, IonSlides } from '@ionic/angular';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-imageview',
  templateUrl: './imageview.component.html',
  styleUrls: ['./imageview.component.scss']
})
export class ImageviewComponent implements OnInit {
  //@ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
Images = new Array();
  constructor(public global: GlobalService,
              private popoverController: PopoverController,
              public navCtrl: NavController,
              private cdr: ChangeDetectorRef) {
              }

  ngOnInit() {
    const pdata8 = {option: 'fotosen', Id_Encuesta: this.global.Id_busqueda};
    this.global.consultar(pdata8, (err8, response8) => {
      console.log('FOTOS Encuesta', response8);
      this.Images = response8;
      setTimeout(() => {
        //this.slideWithNav.update();
      }, 200);
    });
  }



  Cerrar() {
    this.Images = new Array();
    //this.slideWithNav.update();
    //this.slideWithNav.update();
    this.popoverController.dismiss();
  }
}
