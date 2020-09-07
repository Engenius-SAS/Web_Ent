import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { GlobalService } from '../global.service';
import { LoadingService } from '../loading.service';
import { NavController, ActionSheetController } from '@ionic/angular';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.page.html',
  styleUrls: ['./comunidad.page.scss'],
})

export class ComunidadPage implements OnInit {
  Departamento;
  Municipio;
  foto1;
  Vereda;
  Comuni;
  constructor(public db: DatabaseService,
              public global: GlobalService,
              public loading: LoadingService,
              public navCtrl: NavController,
              public alert: AlertService,
              public action: ActionSheetController) { }

  ngOnInit() {
  }

  Anterior() {
    this.alert.AlertTowButtons('Información', '¿Desea salir?, Se guardará la información hasta este punto', 'Si', () => {
    this.navCtrl.navigateRoot('/selectcomu');
    });
  }

}
