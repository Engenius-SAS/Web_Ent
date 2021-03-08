import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { LoadingService } from '../loading.service';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';
import * as jsPDF from 'jspdfmifeheros';
import 'jspdf-autotable-mifeheros';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../excel.service';
@Component({
  selector: 'app-seguimiento-municipios',
  templateUrl: './seguimiento-municipios.page.html',
  styleUrls: ['./seguimiento-municipios.page.scss'],
})
export class SeguimientoMunicipiosPage implements OnInit {
  Municipios = new Array();
  Toexcel = [['Total Encuestas' , 'Encuestas en Alerta' , 'Encuestas Validas', 'Encuestas sin Revisar', 'Identificador', 'Nombre', 'Apellido', 'Usuario']];
  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController,
    public loading: LoadingService,
    public global: GlobalService,
    public alert: AlertService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.spinner.show();
    const pdata9 = {option: 'municipios', Id_Proyecto: this.global.Id_Proyecto};
    this.global.consultar(pdata9, (err9, response9) => {
      console.log('Municipios', response9);
      setTimeout(() => {
        this.spinner.hide();
      }, 300);
      this.Municipios = response9;
    });
  }

  exportAsXLSX() {
    this.spinner.show();
    this.Toexcel = [['Total Encuestas', 'Municipio']];
    for (let p = 0; p < this.Municipios.length; p++) {
      this.Toexcel.push([this.Municipios[p][0], this.Municipios[p][1]]);
    }
    setTimeout(() => {
      this.excelService.exportAsExcelFile2(this.Toexcel, 'Municipios', 'Seguimiento_Municipios');
      setTimeout(() => {
        this.Toexcel = [['Total Encuestas', 'Municipio']];
        this.spinner.hide();
      }, 1000);
    }, 1500);
  }
}
