import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';
import * as jsPDF from 'jspdfmifeheros';
import 'jspdf-autotable-mifeheros';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage implements OnInit {
  Encuestadores = new Array();

  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController,
    public global: GlobalService,
    private spinner: NgxSpinnerService,
    public alert: AlertService,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.spinner.show();
    if(this.global.Id_Proyecto == undefined){
      this.navCtrl.navigateRoot('/login');
      this.spinner.hide();
    }else{
      setTimeout(() => {
        const pdata9 = {option: 'encuestadores', Id_Proyecto: this.global.Id_Proyecto};
        this.global.consultar(pdata9, (err9, response9) => {
          console.log('ENCUESTADORES', response9);
          this.Encuestadores = response9;
          this.spinner.hide();
        });
      }, 500);
   
    }
  }    
}
