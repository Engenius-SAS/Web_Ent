import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { LoadingService } from '../loading.service';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';

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
              public loading: LoadingService,
              public global: GlobalService,
              public alert: AlertService) { }

  ngOnInit() {
    const pdata8 = {option: 'Mapa'};
    this.global.consultar(pdata8, (err8, response8) => {
      console.log('PINES MAPA', response8);
      this.Pines = response8;
    });
  }

}
