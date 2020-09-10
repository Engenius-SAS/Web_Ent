import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { NavController } from '@ionic/angular';
import { LoadingService } from '../loading.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-verencuesta',
  templateUrl: './verencuesta.page.html',
  styleUrls: ['./verencuesta.page.scss'],
})
export class VerencuestaPage implements OnInit {
  Ben = true;
  data = new Array();
  constructor(
    public navCtrl: NavController,
    public loading: LoadingService,
    public global: GlobalService,
    public alert: AlertService) { }

  ngOnInit() {
    const pdata8 = {option: 'Dataen', Id_Encuesta: this.global.Id_busqueda};
    this.global.consultar(pdata8, (err8, response8) => {
      console.log('Datos Encuesta', response8);
      this.data = response8[0];
    });
  }

}
