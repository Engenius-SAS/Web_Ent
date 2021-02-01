import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  latitude = 5.2324649;
  longitude = -73.2988174;
  zoom = 6;
  mapType;
  Seleccion = '0';
  Style;
  Pines;
  constructor(
              public menuCtrl: MenuController,
              public navCtrl: NavController,
              private spinner: NgxSpinnerService,
              public global: GlobalService,
              public alert: AlertService) { }

  ngOnInit() {
    this.spinner.show();
    if(this.global.Id_Proyecto == undefined){
      this.spinner.hide();
      this.navCtrl.navigateRoot('/login');
    }
    setTimeout(() => {
    const pdata8 = {option: 'Mapa', Id_Proyecto: this.global.Id_Proyecto};
    this.global.consultar(pdata8, (err8, response8) => {
      console.log('PINES MAPA', response8);
      this.Pines = response8;
      this.spinner.hide();
    });
    }, 500);
  }

}
