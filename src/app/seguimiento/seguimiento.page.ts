import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { LoadingService } from '../loading.service';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';
import * as jsPDF from 'jspdfmifeheros';
import 'jspdf-autotable-mifeheros';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage implements OnInit {
  Encuestadores = new Array();

  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController,
    public loading: LoadingService,
    public global: GlobalService,
    public alert: AlertService,
    public popoverController: PopoverController) { }

  ngOnInit() {
    const pdata9 = {option: 'encuestadores', Id_Proyecto: this.global.Id_Proyecto};
    this.global.consultar(pdata9, (err9, response9) => {
      console.log('ENCUESTADORES', response9);
      this.Encuestadores = response9;
    });
  }    
}
