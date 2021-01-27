import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { LoadingService } from '../loading.service';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';
import * as jsPDF from 'jspdfmifeheros';
import 'jspdf-autotable-mifeheros';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageviewComponent } from '../imageview/imageview.component';
import * as $ from 'jquery';
import 'datatables.net-mifeheros';
import 'datatables.net-bs4';
import 'datatables.net-autofill-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.flash.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-colreorder-bs4';
import 'datatables.net-fixedcolumns-bs4';
import 'datatables.net-fixedheader-bs4';
import 'datatables.net-keytable-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-rowgroup-bs4';
import 'datatables.net-rowreorder-bs4';
import 'datatables.net-scroller-bs4';
import 'datatables.net-searchpanes-bs4';
import 'datatables.net-select-bs4';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
Pines;
Encuesta;
usuario = '0';
Encuestadores = new Array();
Municipios = new Array();
Tables;
users = new Array();
ImagesF = new Array();
searchQuery;
filtro;
municipio;
  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public loading: LoadingService,
    public global: GlobalService,
    public alert: AlertService,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.cargarEnc();
    this.Pines = new Array();
    this.loading.LoadingNormal('Consultando');
    setTimeout(() => {
      const pdata8 = {option: 'Mapa', Id_Proyecto: this.global.Id_Proyecto};
      this.global.consultar(pdata8, (err8, response8) => {
        console.log('PINES MAPA', response8);
        this.loading.HideLoading();
        this.Pines = this.users = response8;
      });
    }, 300);

    }

    getItems(ev: any) {
      this.initializeItems();
      console.log('Buscando', ev.target.value);
      const val = ev.target.value;
      if (val && val.trim() != '') {
        this.Pines = this.users.filter((item) => {
          // tslint:disable-next-line: max-line-length
          return (item[40].toLowerCase().indexOf(val.toLowerCase()) > -1 || item[1].toLowerCase().indexOf(val.toLowerCase()) > -1 || item[13].toLowerCase().indexOf(val.toLowerCase()) > -1 || item[38].toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }

    initializeItems() {
      this.Pines = this.users;
    }
  /*Search(){
    this.Tables = $('Consultar').DataTable({
        'responsive': true,
        'destroy': true,
        'retrieve': true,
        'paging': true,
        'pagingType': 'numbers'
      });
  }*/
  VerDetalles(item) {
    console.log('VERENCUESTA');
    this.global.Id_busqueda = item[0];
    this.navCtrl.navigateRoot('/verencuesta');
  }

Eliminar(item) {
  console.log('ELIMINAR');
  this.global.Id_busqueda = item[0];
  this.alert.AlertTowButtons('Alerta', '¿Desea eliminar la encuesta?', 'Si', () => {
    // this.navCtrl.navigateRoot('/listverifi');
    const query = 'UPDATE enterritoriobk.encabezado SET IsDelete = 1 '
    + ' WHERE (Id_Encuesta =\'' + this.global.Id_busqueda + '\');';
    const pdata1 = {option: 'insertar', texto: query};
    this.global.consultar(pdata1, (err, response) => {
      console.log(response, query);
      if (err == null && response == true) {
        this.alert.AlertOneButton('Información', 'Encuesta eliminada', 'Ok', () => {
         this.ngOnInit();
        });
      } else {
        this.alert.AlertOneButton('Error', 'Error al Eliminar la encuesta');
      }
    });
  });
}
  RevisionEnc(item) {
    console.log('REVISION');
    this.global.Id_busqueda = item[0];
    this.navCtrl.navigateRoot('/revision');
  }

cargarEnc() {
  const pdata9 = {option: 'encu', Id_Proyecto: this.global.Id_Proyecto};
  this.global.consultar(pdata9, (err9, response9) => {
    console.log('ENCUESTADORES', response9);
    this.Encuestadores = response9;
  });
}

  BuscarE() {
    if (this.usuario == '0') {
      this.Pines = new Array();
      this.loading.LoadingNormal('Consultando');
      setTimeout(() => {
      const pdata8 = {option: 'Mapa', Id_Proyecto: this.global.Id_Proyecto};
      this.global.consultar(pdata8, (err8, response8) => {
        console.log('PINES MAPA', response8);
        this.loading.HideLoading();
        this.Pines = response8;
      });
    }, 300);
    } else {
      this.Pines = new Array();
      this.loading.LoadingNormal('Consultando');
      setTimeout(() => {
        const pdata8 = {option: 'Mapa2', userpro: this.usuario, Id_Proyecto: this.global.Id_Proyecto};
        console.log(pdata8);
        this.global.consultar(pdata8, (err8, response8) => {
          console.log('PINES MAPA', response8);
          this.loading.HideLoading();
          this.Pines = response8;
        });
      }, 300);
   } }
    /*BuscarM() {
      this.Pines = new Array();
      this.loading.LoadingNormal('Consultando');
      setTimeout(() => {
        console.log(this.municipio);
        const pdata8 = {option: 'encumun', municipio: this.municipio};
        console.log(pdata8);
        this.global.consultar(pdata8, (err8, response8) => {
          console.log('PINES MUNICIPIO', response8);
          this.loading.HideLoading();
          this.Pines = response8;
        });
      }, 300);
    }

    BuscarME() {
      this.Pines = new Array();
      this.loading.LoadingNormal('Consultando');
      setTimeout(() => {
        const pdata8 = {option: 'encumun2', municipio: this.municipio, userpro: this.usuario};
        console.log(pdata8);
        this.global.consultar(pdata8, (err8, response8) => {
          console.log('PINES MAPA', response8);
          this.loading.HideLoading();
          this.Pines = response8;
        });
      }, 300);
    }*/

  async VerFotos(item) {
    this.global.Id_busqueda = item[0];
    const popover = await this.popoverController.create({
      component: ImageviewComponent,
      translucent: true
    });
    return await popover.present();
  }

  Descargar(item) {
  try {
    console.log('PDF', item[0]);
    this.loading.LoadingNormal('Generando PDF....');
    setTimeout(() => {
      let Lat = new Array();
      let Lon = new Array();
      let Alt = new Array();
      const pdata8 = {option: 'Dataen', Id_Encuesta: item[0]};
      this.global.consultar(pdata8, (err8, response8) => {
        console.log('Datos Encuesta', response8);
        this.Encuesta = response8[0];
        const doc = new jsPDF('p', 'mm', 'legal');
        doc.setFontSize(9);
        const NumForm = item[0];
        const Dia = item[4];
        const Mes = item[5];
        const Ano = item[6];
        if (item[35] == '0' || item[35] == 0  || item[35] == null  || item[35] == 'null') {
          Lat = ['0', '0'];
          Lon = ['0', '0'];
          Alt = ['0', '0'];
        } else {
          Lat = item[35].split('.');
          Lon = item[36].split('.');
          Alt = item[37].split('.');
        }
        const Dept = item[38].toUpperCase();
        const Codept = item[39];
        const Mun = item[40].toUpperCase();
        const Comun = item[41];
        const Ver = item[42].toUpperCase();
        const Cor = item[43].toUpperCase();
        const Pag1 = new Image();
        Pag1.crossOrigin = '';
        Pag1.src = 'assets/imgs/encuesta/p1.png';
        const Pag2 = new Image();
        Pag2.crossOrigin = '';
        Pag2.src = 'assets/imgs/encuesta/p2.png';
        const Pag3 = new Image();
        Pag3.crossOrigin = '';
        Pag3.src = 'assets/imgs/encuesta/p3.png';
        const Pag4 = new Image();
        Pag4.crossOrigin = '';
        Pag4.src = 'assets/imgs/encuesta/p4.png';
        const Pag5 = new Image();
        Pag5.crossOrigin = '';
        Pag5.src = 'assets/imgs/encuesta/p5.png';
        const Pag6 = new Image();
        Pag6.crossOrigin = '';
        Pag6.src = 'assets/imgs/encuesta/p6.png';
        const Pag7 = new Image();
        Pag7.crossOrigin = '';
        Pag7.src = 'assets/imgs/encuesta/p7.png';
        const Pag8 = new Image();
        Pag8.crossOrigin = '';
        Pag8.src = 'assets/imgs/encuesta/p8.png';
        const Pag9 = new Image();
        Pag9.crossOrigin = '';
        Pag9.src = 'assets/imgs/encuesta/p9.png';
        const Pag10 = new Image();
        Pag10.crossOrigin = '';
        Pag10.src = 'assets/imgs/encuesta/p10.png';
        const Pag11 = new Image();
        Pag11.crossOrigin = '';
        Pag11.src = 'assets/imgs/encuesta/p11.png';
        const Pag12 = new Image();
        Pag12.crossOrigin = '';
        Pag12.src = 'assets/imgs/encuesta/p12.png';
        const Pag13 = new Image();
        Pag13.crossOrigin = '';
        Pag13.src = 'assets/imgs/encuesta/p13.png';
        const Pag14 = new Image();
        Pag14.crossOrigin = '';
        Pag14.src = 'assets/imgs/encuesta/p14.png';
        const Pag15 = new Image();
        Pag15.crossOrigin = '';
        Pag15.src = 'assets/imgs/encuesta/p15.png';
        const Firma = new Image();
        this.global.Id_busqueda = item[0];
        Firma.crossOrigin = '';
        Firma.src = 'https://www.php.engenius.com.co/Fotos_ENT/fotos_firma/' + this.global.Id_busqueda + '.jpg';
        setTimeout(() => {
          doc.addImage(Pag1, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.lstext(Lat[0], 76, 176, 7.8);
          doc.lstext(Lon[0], 67, 191, 6);
          doc.lstext(Lat[1], 95, 176, 7.8);
          doc.lstext(Lon[1], 95, 191, 7.8);
          doc.lstext(Alt[0], 72, 206, 11);
          doc.lstext(Dept, 39.5, 229.5, 4.1);
          doc.lstext(Codept, 40, 240, 4.2);
          doc.lstext(Mun, 40, 250, 4.2);
          doc.lstext(Comun, 40, 261, 4.5);
          doc.lstext(Ver, 40, 270, 4.2);
          doc.lstext(Cor, 40, 281.5, 4.2);
          doc.lstext('X', 154, 312, 0);
          doc.addPage();
          console.log('pagina2');
          doc.addImage(Pag2, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.lstext(this.Encuesta[319], 72, 62.5, 0);
          doc.lstext(this.Encuesta[322], 163, 62.5, 0);
          doc.lstext(Mun, 95, 77, 0);
          if (this.Encuesta[283] == 'Si') {
            doc.lstext('X', 116, 108, 0);
          } else {
            doc.lstext('X', 116, 113, 0);
          }
          if (this.Encuesta[284] == 'Institución') {
            doc.lstext('X', 117, 146, 0);
            if (this.Encuesta[285] == 'Comedor/restaurante') {
              doc.lstext('X', 154, 169.5, 0);
            } else if (this.Encuesta[285] == 'Salón comunal') {
              doc.lstext('X', 154, 174.5, 0);
            } else if (this.Encuesta[285] == 'Centro/casa de salud') {
              doc.lstext('X', 154, 179.5, 0);
            } else if (this.Encuesta[285] == 'Escuela/centro educativo') {
              doc.lstext('X', 154, 184.5, 0);
            } else if (this.Encuesta[285] == 'Iglesia') {
              doc.lstext('X', 154, 189.5, 0);
            } else if (this.Encuesta[285] == 'Unidad comunitaria UCA - ICBF') {
              doc.lstext('X', 154, 194.5, 0);
            } else if (this.Encuesta[285] == 'Otro ¿Cuál?') {
              doc.lstext('X', 154, 199.5, 0);
              doc.lstext(this.Encuesta[286], 80, 199.5, 0);
            }
          } else if (this.Encuesta[284] == 'Vivienda') {
            doc.lstext('X', 117, 141, 0);
          }
          if (this.Encuesta[287] == 'Permanente') {
            doc.lstext('X', 119, 223, 0);
          } else {
            doc.lstext('X', 119, 223, 0);
          }
          doc.addPage();
          console.log('pagina3');
          doc.addImage(Pag3, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          if (this.Encuesta[161] == 'No') {
            doc.lstext('X', 136, 53, 0);
          } else {
            doc.lstext('X', 117.5, 53, 0);
          }
          if (this.Encuesta[162] == 'null') {
            doc.text('0', 138, 88, 'center');
          } else {
            doc.text(this.Encuesta[162], 138, 88, 'center');
          }
          if (this.Encuesta[163] == 'null') {
            doc.text('0', 138, 93, 'center');
          } else {
            doc.text(this.Encuesta[163], 138, 93, 'center');
          }
          if (this.Encuesta[164] == 'null') {
            doc.text('0', 138, 98, 'center');
          } else {
            doc.text(this.Encuesta[164], 138, 98, 'center');
          }
          if (this.Encuesta[165] == 'null') {
            doc.text('0', 138, 103, 'center');
          } else {
            doc.text(this.Encuesta[165], 138, 103, 'center');
          }
          if (this.Encuesta[166] == 'null') {
            doc.text('0', 138, 108, 'center');
          } else {
            doc.text(this.Encuesta[166], 138, 108, 'center');
          }
          if (this.Encuesta[167] == 'null') {
            doc.text('0', 138, 113, 'center');
          } else {
            doc.text(this.Encuesta[167], 138, 113, 'center');
          }
          if (this.Encuesta[168] == 'null') {
            doc.text('0', 138, 118, 'center');
          } else {
            doc.text(this.Encuesta[168], 138, 118, 'center');
          }
          if (this.Encuesta[169] == 'null') {
            doc.text('0', 138, 123, 'center');
          } else {
            doc.text(this.Encuesta[169], 138, 123, 'center');
          }
          if (this.Encuesta[170] == 'null') {
            doc.text('0', 138, 128, 'center');
          } else {
            doc.text(this.Encuesta[170], 138, 128, 'center');
          }
          if (this.Encuesta[171] == 'null') {
            doc.text('0', 138, 133, 'center');
          } else {
            doc.text(this.Encuesta[171], 138, 133, 'center');
          }
          if (this.Encuesta[172] == 'null') {
            doc.text('-', 138, 137, 'center');
          } else {
            doc.text(this.Encuesta[172], 138, 138, 'center');
          }

          if (this.Encuesta[173] == 'null') {
            doc.text('0', 178, 88, 'center');
          } else {
            doc.text(this.Encuesta[173], 178, 88, 'center');
          }
          if (this.Encuesta[174] == 'null') {
            doc.text('0', 178, 93, 'center');
          } else {
            doc.text(this.Encuesta[147], 178, 93, 'center');
          }
          if (this.Encuesta[175] == 'null') {
            doc.text('0', 178, 98, 'center');
          } else {
            doc.text(this.Encuesta[175], 178, 98, 'center');
          }
          if (this.Encuesta[176] == 'null') {
            doc.text('0', 178, 103, 'center');
          } else {
            doc.text(this.Encuesta[176], 178, 103, 'center');
          }
          if (this.Encuesta[177] == 'null') {
            doc.text('0', 178, 108, 'center');
          } else {
            doc.text(this.Encuesta[177], 178, 108, 'center');
          }
          if (this.Encuesta[178] == 'null') {
            doc.text('0', 178, 113, 'center');
          } else {
            doc.text(this.Encuesta[178], 178, 113, 'center');
          }
          if (this.Encuesta[179] == 'null') {
            doc.text('0', 178, 118, 'center');
          } else {
            doc.text(this.Encuesta[179], 178, 118, 'center');
          }
          if (this.Encuesta[180] == 'null') {
            doc.text('0', 178, 123, 'center');
          } else {
            doc.text(this.Encuesta[180], 178, 123, 'center');
          }
          if (this.Encuesta[181] == 'null') {
            doc.text('0', 178, 128, 'center');
          } else {
            doc.text(this.Encuesta[181], 178, 128, 'center');
          }
          if (this.Encuesta[182] == 'null') {
            doc.text('0', 178, 133, 'center');
          } else {
            doc.text(this.Encuesta[182], 178, 133, 'center');
          }
          if (this.Encuesta[183] == 'null') {
            doc.text('-', 178, 137, 'center');
          } else {
            doc.text(this.Encuesta[183], 178, 138, 'center');
          }



          if (this.Encuesta[186] == 'null') {
            doc.text('0', 108.5, 186, 'center');
          } else {
            doc.text(this.Encuesta[186], 108.5, 186, 'center');
          }
          if (this.Encuesta[187] == 'null') {
            doc.text('0', 108.5, 191, 'center');
          } else {
            doc.text(this.Encuesta[187], 108.5, 191, 'center');
          }
          if (this.Encuesta[188] == 'null') {
            doc.text('0', 108.5, 196, 'center');
          } else {
            doc.text(this.Encuesta[188], 108.5, 196, 'center');
          }
          if (this.Encuesta[189] == 'null') {
            doc.text('0', 108.5, 201, 'center');
          } else {
            doc.text(this.Encuesta[189], 108.5, 201, 'center');
          }
          if (this.Encuesta[190] == 'null') {
            doc.text('0', 108.5, 206, 'center');
          } else {
            doc.text(this.Encuesta[190], 108.5, 206, 'center');
          }
          if (this.Encuesta[191] == 'null') {
            doc.text('0', 108.5, 211, 'center');
          } else {
            doc.text(this.Encuesta[191], 108.5, 211, 'center');
          }
          if (this.Encuesta[192] == 'null') {
            doc.text('0', 108.5, 216, 'center');
          } else {
            doc.text(this.Encuesta[192], 108.5, 216, 'center');
          }
          if (this.Encuesta[193] == 'null') {
            doc.text('0', 108.5, 223, 'center');
          } else {
            doc.text(this.Encuesta[193], 108.5, 223, 'center');
          }


          if (this.Encuesta[194] == 'null') {
            doc.text('0', 135.5, 186, 'center');
          } else {
            if (parseInt(this.Encuesta[194]) < 1000) {
              doc.text((parseInt(this.Encuesta[194]) * 1000).toString(), 135.5, 186, 'center');
            } else {
              doc.text((parseInt(this.Encuesta[194])).toString(), 135.5, 186, 'center');
            }
          }
          if (this.Encuesta[195] == 'null') {
            doc.text('0', 135.5, 191, 'center');
          } else {
            if (parseInt(this.Encuesta[195]) < 1000) {
              doc.text((parseInt(this.Encuesta[195]) * 1000).toString(), 135.5, 191, 'center');
            } else {
              doc.text((parseInt(this.Encuesta[195])).toString(), 135.5, 191, 'center');
            }
          }
          if (this.Encuesta[196] == 'null') {
            doc.text('0', 135.5, 196, 'center');
          } else {
            if (parseInt(this.Encuesta[196]) < 1000) {
              doc.text((parseInt(this.Encuesta[196]) * 1000).toString(), 135.5, 196, 'center');
            } else {
              doc.text((parseInt(this.Encuesta[196])).toString(), 135.5, 196, 'center');
            }
          }
          if (this.Encuesta[197] == 'null') {
            doc.text('0', 135.5, 201, 'center');
          } else {
            if (parseInt(this.Encuesta[197]) < 1000) {
              doc.text((parseInt(this.Encuesta[197]) * 1000).toString(), 135.5, 201, 'center');
            } else {
              doc.text((parseInt(this.Encuesta[197])).toString(), 135.5, 201, 'center');
            }
            
          }
          if (this.Encuesta[198] == 'null') {
            doc.text('0', 135.5, 206, 'center');
          } else {
            if (parseInt(this.Encuesta[198]) < 1000) {
              doc.text((parseInt(this.Encuesta[198]) * 1000).toString(), 135.5, 206, 'center');
            } else {
              doc.text((parseInt(this.Encuesta[198])).toString(), 135.5, 206, 'center');
            }
            
          }
          if (this.Encuesta[199] == 'null') {
            doc.text('0', 135.5, 211, 'center');
          } else {
            if (parseInt(this.Encuesta[199]) < 1000) {
              doc.text((parseInt(this.Encuesta[199]) * 1000).toString(), 135.5, 211, 'center');
            } else {
              doc.text((parseInt(this.Encuesta[199])).toString(), 135.5, 211, 'center');
            }
            
          }
          if (this.Encuesta[200] == 'null') {
            doc.text('0', 135.5, 216, 'center');
          } else {
            if (parseInt(this.Encuesta[200]) < 1000) {
              doc.text((parseInt(this.Encuesta[200]) * 1000).toString(), 135.5, 216, 'center');
            } else {
              doc.text((parseInt(this.Encuesta[200])).toString(), 135.5, 216, 'center');
            }
            
          }
          if (this.Encuesta[201] == 'null') {
            doc.text('0', 135.5, 223, 'center');
          } else {
            if (parseInt(this.Encuesta[201]) < 1000) {
              doc.text((parseInt(this.Encuesta[201]) * 1000).toString(), 135.5, 223, 'center');
            } else {
              doc.text((parseInt(this.Encuesta[201])).toString(), 135.5, 223, 'center');
            }
            
          }

          if (this.Encuesta[202] == 'Domicilio') {
            doc.text('X', 191, 186, 'center');
          } else if (this.Encuesta[202] == 'Cabecera municipal') {
            doc.text('X', 157, 186, 'center');
          } else if (this.Encuesta[202] == 'Vereda') {
            doc.text('X', 174, 186, 'center');
          }
          if (this.Encuesta[203] == 'Domicilio') {
            doc.text('X', 191, 191, 'center');
          } else if (this.Encuesta[203] == 'Cabecera municipal') {
            doc.text('X', 157, 191, 'center');
          } else if (this.Encuesta[203] == 'Vereda') {
            doc.text('X', 174, 191, 'center');
          }
          if (this.Encuesta[204] == 'Domicilio') {
            doc.text('X', 191, 196, 'center');
          } else if (this.Encuesta[204] == 'Cabecera municipal') {
            doc.text('X', 157, 196, 'center');
          } else if (this.Encuesta[204] == 'Vereda') {
            doc.text('X', 174, 196, 'center');
          }
          if (this.Encuesta[205] == 'Domicilio') {
            doc.text('X', 191, 201, 'center');
          } else if (this.Encuesta[205] == 'Cabecera municipal') {
            doc.text('X', 157, 201, 'center');
          } else if (this.Encuesta[205] == 'Vereda') {
            doc.text('X', 174, 201, 'center');
          }
          if (this.Encuesta[206] == 'Domicilio') {
            doc.text('X', 191, 206, 'center');
          } else if (this.Encuesta[206] == 'Cabecera municipal') {
            doc.text('X', 157, 206, 'center');
          } else if (this.Encuesta[206] == 'Vereda') {
            doc.text('X', 174, 206, 'center');
          }
          if (this.Encuesta[207] == 'Domicilio') {
            doc.text('X', 191, 211, 'center');
          } else if (this.Encuesta[207] == 'Cabecera municipal') {
            doc.text('X', 157, 211, 'center');
          } else if (this.Encuesta[207] == 'Vereda') {
            doc.text('X', 174, 211, 'center');
          }
          if (this.Encuesta[208] == 'Domicilio') {
            doc.text('X', 191, 216, 'center');
          } else if (this.Encuesta[208] == 'Cabecera municipal') {
            doc.text('X', 157, 216, 'center');
          } else if (this.Encuesta[208] == 'Vereda') {
            doc.text('X', 174, 216, 'center');
          }
          if (this.Encuesta[209] == 'Domicilio') {
            doc.text('X', 191, 223, 'center');
          } else if (this.Encuesta[209] == 'Cabecera municipal') {
            doc.text('X', 157, 223, 'center');
          } else if (this.Encuesta[209] == 'Vereda') {
            doc.text('X', 174, 223, 'center');
          }

          if (this.Encuesta[247] == 'Si') {
            doc.text('X', 117, 257.5, 'center');
          } else if (this.Encuesta[247] == 'No') {
            doc.text('X', 117, 262.5, 'center');
          }

          if (this.Encuesta[248] == 'null') {
            doc.text('0', 174, 277, 'center');
          } else {
            if (parseInt(this.Encuesta[248]) < 1000) {
              doc.text((parseInt(this.Encuesta[248]) * 1000).toString(), 174, 277, 'center');
            } else {
              doc.text((parseInt(this.Encuesta[248])).toString(), 174, 277, 'center');
            }
            
          }


          if (this.Encuesta[212] == 'null') {
            doc.text('-', 130, 316, 'center');
          } else if (this.Encuesta[212] == 'false') {
            doc.text('0', 130, 316, 'center');
          } else if (this.Encuesta[212] == 'true') {
            doc.text('1', 130, 316, 'center');
          }
          if (this.Encuesta[213] == 'null') {
            doc.text('-', 130, 321, 'center');
          } else if (this.Encuesta[213] == 'false') {
            doc.text('0', 130, 321, 'center');
          } else if (this.Encuesta[213] == 'true') {
            doc.text('1', 130, 321, 'center');
          }


          doc.addPage();
          console.log('pagina4');
          doc.addImage(Pag4, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);

          if (this.Encuesta[214] == 'null') {
            doc.text('-', 130, 36.5, 'center');
          } else if (this.Encuesta[214] == 'false') {
            doc.text('0', 130, 36.5, 'center');
          } else if (this.Encuesta[214] == 'true') {
            doc.text('1', 130, 36.5, 'center');
          }

          if (this.Encuesta[215] == 'null') {
            doc.text('-', 130, 41.5, 'center');
          } else if (this.Encuesta[215] == 'false') {
            doc.text('0', 130, 41.5, 'center');
          } else if (this.Encuesta[215] == 'true') {
            doc.text('1', 130, 41.5, 'center');
          }
          if (this.Encuesta[216] == 'null') {
            doc.text('-', 130, 46.5, 'center');
          } else if (this.Encuesta[216] == 'false') {
            doc.text('0', 130, 46.5, 'center');
          } else if (this.Encuesta[216] == 'true') {
            doc.text('1', 130, 46.5, 'center');
          }
          if (this.Encuesta[217] == 'null') {
            doc.text('-', 130, 51.5, 'center');
          } else if (this.Encuesta[217] == 'false') {
            doc.text('0', 130, 51.5, 'center');
          } else if (this.Encuesta[217] == 'true') {
            doc.text('1', 130, 51.5, 'center');
          }
          if (this.Encuesta[218] == 'null') {
            doc.text('-', 130, 56.5, 'center');
          } else if (this.Encuesta[218] == 'false') {
            doc.text('0', 130, 56.5, 'center');
          } else if (this.Encuesta[218] == 'true') {
            doc.text('1', 130, 56.5, 'center');
          }
          if (this.Encuesta[219] == 'null') {
            doc.text('-', 130, 61.5, 'center');
          } else if (this.Encuesta[219] == 'false') {
            doc.text('0', 130, 61.5, 'center');
          } else if (this.Encuesta[219] == 'true') {
            doc.text('1', 130, 61.5, 'center');
          }
          if (this.Encuesta[220] == 'null') {
            doc.text('-', 130, 66.5, 'center');
          } else if (this.Encuesta[220] == 'false') {
            doc.text('0', 130, 66.5, 'center');
          } else if (this.Encuesta[220] == 'true') {
            doc.text('1', 130, 66.5, 'center');
          }
          if (this.Encuesta[221] == 'null') {
            doc.text('-', 130, 71.5, 'center');
          } else if (this.Encuesta[221] == 'false') {
            doc.text('0', 130, 71.5, 'center');
          } else if (this.Encuesta[221] == 'true') {
            doc.text('1', 130, 71.5, 'center');
          }
          if (this.Encuesta[222] == 'null') {
            doc.text('-', 130, 76.5, 'center');
          } else if (this.Encuesta[222] == 'false') {
            doc.text('0', 130, 76.5, 'center');
          } else if (this.Encuesta[222] == 'true') {
            doc.text('1', 130, 76.5, 'center');
          }
          if (this.Encuesta[223] == 'null') {
            doc.text('-', 130, 81.5, 'center');
          } else if (this.Encuesta[223] == 'false') {
            doc.text('0', 130, 81.5, 'center');
          } else if (this.Encuesta[223] == 'true') {
            doc.text('1', 130, 81.5, 'center');
          }
          if (this.Encuesta[224] == 'null') {
            doc.text('-', 130, 86.5, 'center');
          } else if (this.Encuesta[224] == 'false') {
            doc.text('0', 130, 86.5, 'center');
          } else if (this.Encuesta[224] == 'true') {
            doc.text('1', 130, 86.5, 'center');
          }
          if (this.Encuesta[225] == 'null') {
            doc.text('-', 130, 91.5, 'center');
          } else if (this.Encuesta[223] == 'false') {
            doc.text('0', 130, 91.5, 'center');
          } else if (this.Encuesta[223] == 'true') {
            doc.text('1', 130, 91.5, 'center');
          }
          if (this.Encuesta[226] == 'null') {
            doc.text('-', 130, 96.5, 'center');
          } else if (this.Encuesta[224] == 'false') {
            doc.text('0', 130, 96.5, 'center');
          } else if (this.Encuesta[224] == 'true') {
            doc.text('1', 130, 96.5, 'center');
          }

          if (this.Encuesta[242] == 'Si') {
            doc.text('X', 117, 189.5, 'center');
          } else if (this.Encuesta[242] == 'No') {
            doc.text('X', 117, 194.5, 'center');
          }
          if (this.Encuesta[245] == 'undefined' || this.Encuesta[245] == 'null') {
            doc.lstext('No Aplica', 20, 209.5, 0);
          } else {
            doc.lstext(this.Encuesta[245], 20, 209.5, 0);
          }
          if (this.Encuesta[246] == 'undefined' || this.Encuesta[246] == 'null' || this.Encuesta[246] == 'No Aplica'|| this.Encuesta[246] == 'No') {
            doc.text('X', 137, 257, 'center');
          } else if (this.Encuesta[246] == 'Si') {
            doc.text('X', 117, 257, 'center');
          }

          if (this.Encuesta[74] == 'Residencial') {
            doc.text('X', 155, 297, 'center');
          } else if (this.Encuesta[74] == 'Negocio') {
            doc.text('X', 155, 302, 'center');
          } else if (this.Encuesta[74] == 'Mixto') {
            doc.text('X', 155, 307, 'center');
          } else if (this.Encuesta[74] == 'Institución' || this.Encuesta[284] == 'Institución') {
            doc.text('X', 155, 312, 'center');
          }




          doc.addPage();
          console.log('pagina5');
          doc.addImage(Pag5, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.setFontSize(10);
          if (this.Encuesta[73] == 'Estrato 1') {
            doc.text('X', 92, 39.5, 'center');
          } else if (this.Encuesta[73] == 'Estrato 2') {
            doc.text('X', 101, 39.5, 'center');
          } else if (this.Encuesta[73] == 'Estrato 3') {
            doc.text('X', 111, 39.5, 'center');
          } else if (this.Encuesta[73] == 'Estrato 4') {
            doc.text('X', 120.5, 39.5, 'center');
          } else if (this.Encuesta[73] == 'Estrato 5') {
            doc.text('X', 130, 39.5, 'center');
          } else if (this.Encuesta[73] == 'Estrato 6') {
            doc.text('X', 139.5, 39.5, 'center');
          }
          doc.setFontSize(9);
          if (this.Encuesta[103] == 'undefined' || this.Encuesta[103] == 'null') {
            doc.lstext('No Aplica', 20, 76.5, 0);
          } else {
            doc.lstext(this.Encuesta[103].replace('-', ''), 20, 76.5, 0);
          }

          if (this.Encuesta[104] == 'Caserío') {
            doc.text('X', 151.5, 115, 'center');
          } else if (this.Encuesta[104] == 'Resguardo indígena') {
            doc.text('X', 151.5, 120, 'center');
          } else if (this.Encuesta[104] == 'Parcialidad o asentamiento indígena fuera del resguardo') {
            doc.text('X', 151.5, 125, 'center');
          } else if (this.Encuesta[104] == 'Territorio colectivo de comunidad negra') {
            doc.text('X', 151.5, 130, 'center');
          } else if (this.Encuesta[104] == 'Territorio de comunidad negra no titulada') {
            doc.text('X', 151.5, 135, 'center');
          } else if (this.Encuesta[104] == 'Territorio ancestral raizal del Archipiélago de San Andrés, Providencia y Santa Catalina') {
            doc.text('X', 151.5, 140, 'center');
          } else if (this.Encuesta[104] == 'Ranchería - Guajira') {
            doc.text('X', 151.5, 146, 'center');
          } else if (this.Encuesta[104] == 'Territorio Palenquero de San Basilio') {
            doc.text('X', 151.5, 151, 'center');
          } else if (this.Encuesta[104] == 'Territorio Gitano - ROM') {
            doc.text('X', 151.5, 156, 'center');
          } else if (this.Encuesta[104] == 'Zona rural') {
            doc.text('X', 151.5, 161, 'center');
          }

          if (this.Encuesta[105] == 'Propia') {
            doc.text('X', 130, 185.5, 'center');
          } else if (this.Encuesta[105] == 'Arriendo') {
            doc.text('X', 130, 190.5, 'center');
          } else if (this.Encuesta[105] == 'Colectiva') {
            doc.text('X', 130, 195.5, 'center');
          }

          if (this.Encuesta[106] == 'null' || this.Encuesta[106] == 'undefined') {
            doc.lstext('00', 127, 218.5, 9.5);
          } else {
            doc.lstext(this.Encuesta[106], 127, 218.5, 9.5);
          }

          if (this.Encuesta[107] == 'null' || this.Encuesta[107] == 'undefined') {
            doc.lstext('00', 127, 237, 9.5);
          } else {
            doc.lstext(this.Encuesta[107], 127, 237, 9.5);
          }

          if (this.Encuesta[108] == 'Bloque, ladrillo, piedra, madera pulida') {
            doc.text('X', 158, 265, 'center');
          } else if (this.Encuesta[108] == 'Concreto') {
            doc.text('X', 158, 270, 'center');
          } else if (this.Encuesta[108] == 'Tapia pisada, bahareque, adobe') {
            doc.text('X', 158, 275, 'center');
          } else if (this.Encuesta[108] == 'Madera burda, tabla, tablón') {
            doc.text('X', 158, 280, 'center');
          } else if (this.Encuesta[108] == 'Material prefabricado') {
            doc.text('X', 158, 285, 'center');
          } else if (this.Encuesta[108] == 'Guadua, caña, esterilla, otros vegetales') {
            doc.text('X', 158, 290, 'center');
          } else if (this.Encuesta[108] == 'Materiales de desecho (zinc, tela, cartón, latas, plásticos, otros)') {
            doc.text('X', 158, 295, 'center');
          } else if (this.Encuesta[108] == 'No tiene paredes') {
            doc.text('X', 158, 300, 'center');
          }



          doc.addPage();
          console.log('pagina6');
          doc.addImage(Pag6, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);

          if (this.Encuesta[109] == 'Paja, palma y otros vegetales') {
            doc.text('X', 158, 30, 'center');
          } else if (this.Encuesta[109] == 'Plancha de cemento, concreto y hormigón') {
            doc.text('X', 158, 35, 'center');
          } else if (this.Encuesta[109] == 'Tejas (barro, asbesto – cemento, metálica o lámina de zinc, plástica)') {
            doc.text('X', 158, 40, 'center');
          } else if (this.Encuesta[109] == 'Material de desecho (tela, cartón, latas, plástico, otros)') {
            doc.text('X', 158, 45, 'center');
          }

          if (this.Encuesta[110] == 'Alfombra o tapete de pared a pared') {
            doc.text('X', 155, 78, 'center');
          } else if (this.Encuesta[110] == 'Mármol, parqué, madera pulida y lacada') {
            doc.text('X', 155, 83, 'center');
          } else if (this.Encuesta[110] == 'Baldosa, vinilo, tableta, ladrillo, laminado') {
            doc.text('X', 155, 88, 'center');
          } else if (this.Encuesta[110] == 'Cemento, gravilla') {
            doc.text('X', 155, 93, 'center');
          } else if (this.Encuesta[110] == 'Madera burda, tabla, tablón, otro vegetal') {
            doc.text('X', 155, 98, 'center');
          } else if (this.Encuesta[110] == 'Tierra, arena, barro') {
            doc.text('X', 155, 103, 'center');
          }

          if (this.Encuesta[111] == 'Si') {
            doc.text('X', 143.5, 125.5, 'center');
          } else if (this.Encuesta[111] == 'No') {
            doc.text('X', 162, 125.5, 'center');
          }

          if (this.Encuesta[112] == 'Si') {
            doc.text('X', 143.5, 130.5, 'center');
          } else if (this.Encuesta[112] == 'No') {
            doc.text('X', 162, 130.5, 'center');
          }

          if (this.Encuesta[113] == 'Si') {
            doc.text('X', 143.5, 135.5, 'center');
          } else if (this.Encuesta[113] == 'No') {
            doc.text('X', 162, 135.5, 'center');
          }

          if (this.Encuesta[114] == 'Si') {
            doc.text('X', 143.5, 140.5, 'center');
          } else if (this.Encuesta[113] == 'No') {
            doc.text('X', 162, 140.5, 'center');
          }
          if (this.Encuesta[114] == 'Si') {
            doc.text('X', 143.5, 145.5, 'center');
          } else if (this.Encuesta[114] == 'No') {
            doc.text('X', 162, 145.5, 'center');
          }

          if (this.Encuesta[115] == 'null' || this.Encuesta[115] == 'undefined' || this.Encuesta[115] == null) {
            doc.lstext('00', 121, 163.5, 10);
          } else {
            doc.lstext(this.Encuesta[115], 121, 163.5, 10);
          }


          if (this.Encuesta[255] == 'true') {
            doc.text('X', 150.5, 199, 'center');
          } else if (this.Encuesta[256] == 'true') {
            doc.text('X', 150.5, 204, 'center');
          } else if (this.Encuesta[257] == 'true') {
            doc.text('X', 150.5, 209, 'center');
          } else if (this.Encuesta[258] == 'true') {
            doc.text('X', 150.5, 214, 'center');
          } else if (this.Encuesta[259] == 'true') {
            doc.text('X', 150.5, 219, 'center');
          } else if (this.Encuesta[260] == 'true') {
            doc.text('X', 150.5, 224, 'center');
          }

          if (this.Encuesta[261] == 'true') {
            doc.text('X', 107.5, 254, 'center');
          } else if (this.Encuesta[263] == 'true') {
            doc.text('X', 107.5, 260, 'center');
          } else if (this.Encuesta[264] == 'true') {
            doc.text('X', 107.5, 265, 'center');
          } else if (this.Encuesta[265] == 'true') {
            doc.text('X', 107.5, 270, 'center');
          } else if (this.Encuesta[266] == 'true') {
            doc.text('X', 107.5, 275, 'center');
          } else if (this.Encuesta[267] == 'true') {
            doc.text('X', 107.5, 280, 'center');
          } else if (this.Encuesta[268] == 'true') {
            doc.text('X', 107.5, 285, 'center');
          } else if (this.Encuesta[269] == 'true') {
            doc.text('X', 107.5, 290, 'center');
          }

          if (this.Encuesta[262] == 'null' || this.Encuesta[262] == 'undefined') {
            doc.text('X', 191, 254, 'center');
          } else if (this.Encuesta[262] == 'true') {
            doc.text('X', 176, 254, 'center');
          } else if (this.Encuesta[262] == 'false') {
            doc.text('X', 191, 254, 'center');
          }

          if (this.Encuesta[270] == 'true') {
            doc.text('X', 150.5, 316, 'center');
          } else if (this.Encuesta[271] == 'true') {
            doc.text('X', 150.5, 321, 'center');
          }

          doc.addPage();
          console.log('pagina7');
          doc.addImage(Pag7, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          console.log('Parentesco', this.Encuesta[13]);
          doc.setFontSize(10);
          let hijos = 0;
          if (this.Encuesta[13] == '-' || this.Encuesta[13] == null || this.Encuesta[13] == 'null' || this.Encuesta[13] == 'NULL') {

          } else {
            let Parentesco = JSON.parse(this.Encuesta[13]);
            for (let index = 0; index < Parentesco.length; index++) {
              if (Parentesco[index].Parentesco == 'Jefe (a) de hogar') {
                doc.setFontSize(5);
                doc.lstext(Parentesco[index].Escolaridad, 141, 150, 0);
                doc.setFontSize(8);
                doc.lstext(Parentesco[index].Ocupacion, 162, 150, 0);
                doc.setFontSize(9);
                doc.lstext(Parentesco[index].Registro, 129, 150, 0);
                doc.lstext(Parentesco[index].Edad.toString(), 109, 150, 0);
                doc.lstext(Parentesco[index].Genero, 85, 150, 0);
              } else if (Parentesco[index].Parentesco == 'Pareja, esposo(a), cónyuge, compañero(a)') {
                doc.setFontSize(5);
                doc.lstext(Parentesco[index].Escolaridad, 141, 156, 0);
                doc.setFontSize(8);
                doc.lstext(Parentesco[index].Ocupacion, 162, 156, 0);
                doc.setFontSize(9);
                doc.lstext(Parentesco[index].Registro, 129, 156, 0);
                doc.lstext(Parentesco[index].Edad.toString(), 109, 156, 0);
                doc.lstext(Parentesco[index].Genero, 85, 156, 0);
              } else if (Parentesco[index].Parentesco == 'Hijo(a), hijastro(a)') {
                if (hijos == 0) {
                  doc.setFontSize(5);
                  doc.lstext(Parentesco[index].Escolaridad, 141, 162, 0);
                  doc.setFontSize(8);
                  doc.lstext(Parentesco[index].Ocupacion, 162, 162, 0);
                  doc.setFontSize(9);
                  doc.lstext(Parentesco[index].Registro, 129, 162, 0);
                  doc.lstext(Parentesco[index].Edad.toString(), 109, 162, 0);
                  doc.lstext(Parentesco[index].Genero, 85, 162, 0);
                } else if (hijos == 1) {
                  doc.setFontSize(5);
                  doc.lstext(Parentesco[index].Escolaridad, 141, 167, 0);
                  doc.setFontSize(8);
                  doc.lstext(Parentesco[index].Ocupacion, 162, 167, 0);
                  doc.setFontSize(9);
                  doc.lstext(Parentesco[index].Registro, 129, 167, 0);
                  doc.lstext(Parentesco[index].Edad.toString(), 109, 167, 0);
                  doc.lstext(Parentesco[index].Genero, 85, 167, 0);
                } else if (hijos == 2) {
                  doc.setFontSize(5);
                  doc.lstext(Parentesco[index].Escolaridad, 141, 172, 0);
                  doc.setFontSize(8);
                  doc.lstext(Parentesco[index].Ocupacion, 162, 172, 0);
                  doc.setFontSize(9);
                  doc.lstext(Parentesco[index].Registro, 129, 172, 0);
                  doc.lstext(Parentesco[index].Edad.toString(), 109, 172, 0);
                  doc.lstext(Parentesco[index].Genero, 85, 172, 0);
                } else if (hijos == 3) {
                  doc.setFontSize(5);
                  doc.lstext(Parentesco[index].Escolaridad, 141, 177, 0);
                  doc.setFontSize(8);
                  doc.lstext(Parentesco[index].Ocupacion, 162, 177, 0);
                  doc.setFontSize(9);
                  doc.lstext(Parentesco[index].Registro, 129, 177, 0);
                  doc.lstext(Parentesco[index].Edad.toString(), 109, 177, 0);
                  doc.lstext(Parentesco[index].Genero, 85, 177, 0);
                } else if (hijos == 4) {
                  doc.setFontSize(5);
                  doc.lstext(Parentesco[index].Escolaridad, 141, 182, 0);
                  doc.setFontSize(8);
                  doc.lstext(Parentesco[index].Ocupacion, 162, 182, 0);
                  doc.setFontSize(9);
                  doc.lstext(Parentesco[index].Registro, 129, 182, 0);
                  doc.lstext(Parentesco[index].Edad.toString(), 109, 182, 0);
                  doc.lstext(Parentesco[index].Genero, 85, 182, 0);
                } else if (hijos == 5) {
                  doc.setFontSize(5);
                  doc.lstext(Parentesco[index].Escolaridad, 141, 187, 0);
                  doc.setFontSize(8);
                  doc.lstext(Parentesco[index].Ocupacion, 162, 187, 0);
                  doc.setFontSize(9);
                  doc.lstext(Parentesco[index].Registro, 129, 187, 0);
                  doc.lstext(Parentesco[index].Edad.toString(), 109, 187, 0);
                  doc.lstext(Parentesco[index].Genero, 85, 187, 0);
                }
                hijos = hijos + 1;
              } else if (Parentesco[index].Parentesco == 'Nieto(a)') {
                doc.setFontSize(5);
                doc.lstext(Parentesco[index].Escolaridad, 141, 192, 0);
                doc.setFontSize(8);
                doc.lstext(Parentesco[index].Ocupacion, 162, 192, 0);
                doc.setFontSize(9);
                doc.lstext(Parentesco[index].Registro, 129, 192, 0);
                doc.lstext(Parentesco[index].Edad.toString(), 109, 192, 0);
                doc.lstext(Parentesco[index].Genero, 85, 192, 0);
              } else if (Parentesco[index].Parentesco == 'Padre o madre, padrastro, madrastra') {
                doc.setFontSize(5);
                doc.lstext(Parentesco[index].Escolaridad, 141, 197, 0);
                doc.setFontSize(8);
                doc.lstext(Parentesco[index].Ocupacion, 162, 197, 0);
                doc.setFontSize(9);
                doc.lstext(Parentesco[index].Registro, 129, 197, 0);
                doc.lstext(Parentesco[index].Edad.toString(), 109, 197, 0);
                doc.lstext(Parentesco[index].Genero, 85, 197, 0);
              } else if (Parentesco[index].Parentesco == 'Suegro(a)') {
                doc.setFontSize(5);
                doc.lstext(Parentesco[index].Escolaridad, 141, 202, 0);
                doc.setFontSize(8);
                doc.lstext(Parentesco[index].Ocupacion, 162, 202, 0);
                doc.setFontSize(9);
                doc.lstext(Parentesco[index].Registro, 129, 202, 0);
                doc.lstext(Parentesco[index].Edad.toString(), 109, 202, 0);
                doc.lstext(Parentesco[index].Genero, 85, 202, 0);
              } else if (Parentesco[index].Parentesco == 'Hermano(a), hermanastro(a)') {
                doc.setFontSize(5);
                doc.lstext(Parentesco[index].Escolaridad, 141, 207, 0);
                doc.setFontSize(8);
                doc.lstext(Parentesco[index].Ocupacion, 162, 207, 0);
                doc.setFontSize(9);
                doc.lstext(Parentesco[index].Registro, 129, 207, 0);
                doc.lstext(Parentesco[index].Edad.toString(), 109, 207, 0);
                doc.lstext(Parentesco[index].Genero, 85, 207, 0);
              } else if (Parentesco[index].Parentesco == 'Yerno, nuera') {
                doc.setFontSize(5);
                doc.lstext(Parentesco[index].Escolaridad, 141, 212, 0);
                doc.setFontSize(8);
                doc.lstext(Parentesco[index].Ocupacion, 162, 212, 0);
                doc.setFontSize(9);
                doc.lstext(Parentesco[index].Registro, 129, 212, 0);
                doc.lstext(Parentesco[index].Edad.toString(), 109, 212, 0);
                doc.lstext(Parentesco[index].Genero, 85, 212, 0);
              } else if (Parentesco[index].Parentesco == 'Otro(a) pariente del (de la) jefe (a)') {
                doc.setFontSize(5);
                doc.lstext(Parentesco[index].Escolaridad, 141, 217, 0);
                doc.setFontSize(8);
                doc.lstext(Parentesco[index].Ocupacion, 162, 217, 0);
                doc.setFontSize(9);
                doc.lstext(Parentesco[index].Registro, 129, 217, 0);
                doc.lstext(Parentesco[index].Edad.toString(), 109, 217, 0);
                doc.lstext(Parentesco[index].Genero, 85, 217, 0);
              } else if (Parentesco[index].Parentesco == 'Otro(a) no pariente') {
                doc.setFontSize(5);
                doc.lstext(Parentesco[index].Escolaridad, 141, 222, 0);
                doc.setFontSize(8);
                doc.lstext(Parentesco[index].Ocupacion, 162, 222, 0);
                doc.setFontSize(9);
                doc.lstext(Parentesco[index].Registro, 129, 222, 0);
                doc.lstext(Parentesco[index].Edad.toString(), 109, 222, 0);
                doc.lstext(Parentesco[index].Genero, 85, 222, 0);
              }
            }
          }


          doc.setFontSize(10);
          if (this.Encuesta[272] == 'true') {
            doc.text('X', 150.5, 31, 'center');
          } else if (this.Encuesta[273] == 'true') {
            doc.text('X', 150.5, 35, 'center');
          } else if (this.Encuesta[274] == 'true') {
            doc.text('X', 150.5, 40, 'center');
          } else if (this.Encuesta[275] != '-') {
            doc.text('X', 150.5, 45, 'center');
          }

          if (this.Encuesta[276] == 'Pipeta / Cilindro') {
            doc.text('X', 152, 68, 'center');
          } else if (this.Encuesta[276] == 'Gasoducto') {
            doc.text('X', 152, 73, 'center');
          } else if (this.Encuesta[276] == 'No tiene servicio de gas') {
            doc.text('X', 152, 78, 'center');
          }

          if (this.Encuesta[15] == 'Permanente') {
            doc.text('X', 145, 243, 'center');
          } else if (this.Encuesta[15] == 'Temporal') {
            doc.text('X', 145, 248, 'center');
          }

          if (this.Encuesta[18] == 'Si') {
            doc.text('X', 118, 270.5, 'center');
          } else if (this.Encuesta[18] == 'No') {
            doc.text('X', 137, 270.5, 'center');
          }

          if (this.Encuesta[20] == 'Indígena') {
            doc.text('X', 152, 298, 'center');
          } else if (this.Encuesta[20] == 'Gitano (a) (ROM)') {
            doc.text('X', 152, 303, 'center');
          } else if (this.Encuesta[20] == 'Raizal de San Andrés, Providencia y Santa Catalina') {
            doc.text('X', 152, 308, 'center');
          } else if (this.Encuesta[20] == 'Palenquero (a) de San Basilio') {
            doc.text('X', 152, 313, 'center');
          } else if (this.Encuesta[20] == 'Negro (a), mulato (a), afrodescendiente, afrocolombiano (a)') {
            doc.text('X', 152, 318, 'center');
          } else if (this.Encuesta[20] == 'Ninguno de los anteriores') {
            doc.text('X', 152, 323, 'center');
          }


          doc.addPage();
          console.log('pagina8');
          doc.addImage(Pag8, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);


          if (this.Encuesta[22] == 'Si') {
            doc.text('X', 117, 64.5, 'center');
          } else if (this.Encuesta[22] == 'No') {
            doc.text('X', 117, 69.5, 'center');
          }

          if (this.Encuesta[23] == 'undefined' || this.Encuesta[23] == 'null') {
            doc.lstext('No Aplica', 20, 81, 0);
          } else {
            doc.lstext(this.Encuesta[23].replace('-', ''), 20, 81, 0);
          }


          if (this.Encuesta[24] == 'Si') {
            doc.text('X', 118, 120, 'center');
          } else if (this.Encuesta[24] == 'No') {
            doc.text('X', 137, 120, 'center');
          }

          if (this.Encuesta[25] == 'Si') {
            doc.text('X', 117, 144, 'center');
          } else if (this.Encuesta[25] == 'No') {
            doc.text('X', 117, 149, 'center');
          }

          if (this.Encuesta[26] == 'undefined' || this.Encuesta[26] == 'null') {
            doc.lstext('No Aplica', 20, 166, 0);
          } else {
            doc.lstext(this.Encuesta[26].replace('-', ''), 20, 166, 0);
          }

          if (this.Encuesta[27] == 'true') {
            doc.text('X', 135.3, 218, 'center');
          } else {

          }
          if (this.Encuesta[28] == 'true') {
            doc.text('X', 135.3, 223, 'center');
          } else {

          }
          if (this.Encuesta[29] == 'true') {
            doc.text('X', 135.3, 228, 'center');
          } else {

          }
          if (this.Encuesta[30] == 'true') {
            doc.text('X', 135.3, 234, 'center');
          } else {

          }
          if (this.Encuesta[31] == 'true') {
            doc.text('X', 135.3, 239, 'center');
          } else {

          }
          if (this.Encuesta[32] == 'true') {
            doc.text('X', 135.3, 244, 'center');
          } else {

          }
          if (this.Encuesta[33] == 'true') {
            doc.text('X', 135.3, 249, 'center');
          } else {

          }
          if (this.Encuesta[34] == 'true') {
            doc.text('X', 135.3, 254, 'center');
          } else {

          }
          if (this.Encuesta[35] == 'true') {
            doc.text('X', 135.3, 259, 'center');
          } else {

          }
// ------------------------------------------------------------
          if (this.Encuesta[37] == 'true') {
            doc.text('X', 152, 218, 'center');
          } else {

          }
          if (this.Encuesta[38] == 'true') {
            doc.text('X', 152, 223, 'center');
          } else {

          }
          if (this.Encuesta[39] == 'true') {
            doc.text('X', 152, 228, 'center');
          } else {

          }
          if (this.Encuesta[40] == 'true') {
            doc.text('X', 152, 234, 'center');
          } else {

          }
          if (this.Encuesta[41] == 'true') {
            doc.text('X', 152, 239, 'center');
          } else {

          }
          if (this.Encuesta[42] == 'true') {
            doc.text('X', 152, 244, 'center');
          } else {

          }
          if (this.Encuesta[43] == 'true') {
            doc.text('X', 152, 249, 'center');
          } else {

          }
          if (this.Encuesta[44] == 'true') {
            doc.text('X', 152, 254, 'center');
          } else {

          }
          if (this.Encuesta[45] == 'true') {
            doc.text('X', 152, 259, 'center');
          } else {

          }

          // ------------------------------------------------------------
          if (this.Encuesta[47] == 'true') {
            doc.text('X', 168, 218, 'center');
          } else {

          }
          if (this.Encuesta[48] == 'true') {
            doc.text('X', 168, 223, 'center');
          } else {

          }
          if (this.Encuesta[49] == 'true') {
            doc.text('X', 168, 228, 'center');
          } else {

          }
          if (this.Encuesta[50] == 'true') {
            doc.text('X', 168, 234, 'center');
          } else {

          }
          if (this.Encuesta[51] == 'true') {
            doc.text('X', 168, 239, 'center');
          } else {

          }
          if (this.Encuesta[52] == 'true') {
            doc.text('X', 168, 244, 'center');
          } else {

          }
          if (this.Encuesta[53] == 'true') {
            doc.text('X', 168, 249, 'center');
          } else {

          }
          if (this.Encuesta[54] == 'true') {
            doc.text('X', 168, 254, 'center');
          } else {

          }
          if (this.Encuesta[55] == 'true') {
            doc.text('X', 168, 259, 'center');
          } else {

          }

          // ------------------------------------------------------------
          if (this.Encuesta[57] == 'true') {
            doc.text('X', 184, 218, 'center');
          } else {

          }
          if (this.Encuesta[58] == 'true') {
            doc.text('X', 184, 223, 'center');
          } else {

          }
          if (this.Encuesta[59] == 'true') {
            doc.text('X', 184, 228, 'center');
          } else {

          }
          if (this.Encuesta[60] == 'true') {
            doc.text('X', 184, 234, 'center');
          } else {

          }
          if (this.Encuesta[61] == 'true') {
            doc.text('X', 184, 239, 'center');
          } else {

          }
          if (this.Encuesta[62] == 'true') {
            doc.text('X', 184, 244, 'center');
          } else {

          }
          if (this.Encuesta[63] == 'true') {
            doc.text('X', 184, 249, 'center');
          } else {

          }
          if (this.Encuesta[64] == 'true') {
            doc.text('X', 184, 254, 'center');
          } else {

          }
          if (this.Encuesta[65] == 'true') {
            doc.text('X', 184, 259, 'center');
          } else {

          }



          doc.addPage();
          console.log('pagina9');
          doc.addImage(Pag9, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          if (this.Encuesta[122] == 'true') {
            doc.text('X', 150.5, 30, 'center');
          }
          if (this.Encuesta[123] == 'true') {
            doc.text('X', 150.5, 35, 'center');
          }
          if (this.Encuesta[124] == 'true') {
            doc.text('X', 150.5, 40, 'center');
          }
          if (this.Encuesta[125] == 'true') {
            doc.text('X', 150.5, 45, 'center');
          }
          if (this.Encuesta[126] == 'true') {
            doc.text('X', 150.5, 50, 'center');
          }
          if (this.Encuesta[127] == 'true') {
            doc.text('X', 150.5, 55, 'center');
          }
          if (this.Encuesta[128] == 'true') {
            doc.text('X', 150.5, 60, 'center');
          }
          if (this.Encuesta[129] == 'true') {
            doc.text('X', 150.5, 65, 'center');
          }
          if (this.Encuesta[130] == 'true') {
            doc.text('X', 150.5, 70, 'center');
          }
          if (this.Encuesta[131] == 'true') {
            doc.text('X', 150.5, 75, 'center');
          }
          if (this.Encuesta[132] == 'true') {
            doc.text('X', 150.5, 80, 'center');
          }
          if (this.Encuesta[133] == 'true') {
            doc.text('X', 150.5, 85, 'center');
          }
          if (this.Encuesta[134] == 'true') {
            doc.text('X', 150.5, 90, 'center');
          }
          if (this.Encuesta[135] == 'true') {
            doc.text('X', 150.5, 95, 'center');
          }
          if (this.Encuesta[136] != '-' && this.Encuesta[136] != 'null') {
            doc.text('X', 150.5, 100, 'center');
            doc.lstext(this.Encuesta[136], 80, 100, 0);
          }
          if (this.Encuesta[137] == 'null' || this.Encuesta[137] == '-') {
            doc.lstext('No Registra', 45, 115.5, 0);
          } else {
            doc.lstext(this.Encuesta[137], 45, 115.5, 0);
          }
          if (this.Encuesta[138] == 'null' || this.Encuesta[138] == '-') {
            doc.lstext('No Registra', 45, 120.5, 0);
          } else {
            doc.lstext(this.Encuesta[138], 45, 120.5, 0);
          }
          if (this.Encuesta[139] == 'null' || this.Encuesta[139] == '-') {
            doc.lstext('No Registra', 45, 125.5, 0);
          } else {
            doc.lstext(this.Encuesta[139], 45, 125.5, 0);
          }
          if (this.Encuesta[140] == 'null' || this.Encuesta[140] == '-') {
            doc.lstext('No Registra', 45, 130.5, 0);
          } else {
            doc.lstext(this.Encuesta[140], 45, 130.5, 0);
          }
          if (this.Encuesta[141] == 'null' || this.Encuesta[141] == '-') {
            doc.lstext('No Registra', 130, 158, 0);
          } else {
            doc.lstext(this.Encuesta[141], 130, 158, 0);
          }
          if (this.Encuesta[142] == 'null' || this.Encuesta[142] == '-') {
            doc.lstext('No Registra', 130, 163, 0);
          } else {
            doc.lstext(this.Encuesta[142], 130, 163, 0);
          }
          if (this.Encuesta[143] == 'null' || this.Encuesta[143] == '-') {
            doc.lstext('No Registra', 130, 168, 0);
          } else {
            doc.lstext(this.Encuesta[143], 130, 168, 0);
          }
          if (this.Encuesta[144] == 'null' || this.Encuesta[144] == '-') {
            doc.lstext('No Registra', 130, 173, 0);
          } else {
            doc.lstext(this.Encuesta[144], 130, 173, 0);
          }
          if (this.Encuesta[145] == 'null' || this.Encuesta[145] == '-') {
            doc.lstext('No Registra', 130, 178, 0);
          } else {
            doc.lstext(this.Encuesta[145], 130, 178, 0);
          }
          if (this.Encuesta[146] == 'null' || this.Encuesta[146] == '-') {
            doc.lstext('No Registra', 130, 183, 0);
          } else {
            doc.lstext(this.Encuesta[146], 130, 183, 0);
          }
          if (this.Encuesta[147] == 'null' || this.Encuesta[147] == '-') {
            doc.lstext('No Registra', 130, 188, 0);
          } else {
            doc.lstext(this.Encuesta[147], 130, 188, 0);
          }
          if (this.Encuesta[148] == 'null' || this.Encuesta[148] == '-') {
            doc.lstext('No Registra', 130, 193, 0);
          } else {
            doc.lstext(this.Encuesta[148], 130, 193, 0);
          }
          if (this.Encuesta[149] == 'null' || this.Encuesta[149] == '-') {
            doc.lstext('No Registra', 130, 198, 0);
          } else {
            doc.lstext(this.Encuesta[149], 130, 198, 0);
          }
          if (this.Encuesta[150] == 'null' || this.Encuesta[150] == '-') {
            doc.lstext('No Registra', 130, 203, 0);
          } else {
            doc.lstext(this.Encuesta[150], 130, 203, 0);
          }
          if (this.Encuesta[151] == 'null' || this.Encuesta[151] == '-') {
            doc.lstext('No Registra', 130, 208, 0);
          } else {
            doc.lstext(this.Encuesta[151], 130, 208, 0);
          }
          if (this.Encuesta[152] == 'null' || this.Encuesta[152] == '-' || this.Encuesta[154] == 'undefined') {
            doc.lstext('0', 130, 213, 0);
          } else {
            doc.lstext(this.Encuesta[152], 130, 213, 0);
          }
          if (this.Encuesta[154] == 'null' || this.Encuesta[154] == '-' || this.Encuesta[154] == 'undefined') {
            doc.lstext('No Registra', 85, 213, 0);
          } else {
            doc.lstext(this.Encuesta[154], 85, 213, 0);
          }
          if (this.Encuesta[153] == 'null' || this.Encuesta[153] == '-') {
            doc.lstext('0', 130, 218, 0);
          } else {
            doc.lstext(this.Encuesta[153], 130, 218, 0);
          }
          if (this.Encuesta[310] == 'Si') {
            doc.text('X', 121.5, 263, 'center');
          } else if (this.Encuesta[310] == 'No') {
            doc.text('X', 121.5, 268, 'center');
          } else if (this.Encuesta[310] == 'No aplica') {
            doc.text('X', 121.5, 273, 'center');
          }
          if (this.Encuesta[311] == 'Si') {
            doc.text('X', 118.5, 307, 'center');
          } else if (this.Encuesta[311] == 'No') {
            doc.text('X', 137.5, 307, 'center');
          }


          doc.addPage();
          doc.addImage(Pag10, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          if (this.Encuesta[312] == 'Si') {
            doc.text('X', 120, 41, 'center');
          } else if (this.Encuesta[312] == 'No') {
            doc.text('X', 120, 41, 'center');
          }
          if (this.Encuesta[313] == 'null' || this.Encuesta[313] == '-') {
            doc.lstext('No Registra', 20, 65, 0);
          } else {
            doc.lstext(this.Encuesta[313], 20, 65, 0);
          }
          if (this.Encuesta[314] == 'Si') {
            doc.text('X', 118.5, 111, 'center');
          } else if (this.Encuesta[314] == 'No') {
            doc.text('X', 137.5, 111, 'center');
          }

          doc.addPage();
          doc.addImage(Pag11, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          if (this.Encuesta[81] == 'null' || this.Encuesta[81] == '-') {
            doc.lstext('No Registra', 20, 84, 0);
          } else {
            doc.lstext(this.Encuesta[81], 20, 84, 0);
          }
          if (this.Encuesta[82] == 'null' || this.Encuesta[82] == '-') {
            doc.lstext('No Registra', 20, 111, 0);
          } else {
            doc.lstext(this.Encuesta[82], 20, 111, 0);
          }
          if (this.Encuesta[83] == 'null' || this.Encuesta[83] == '-') {
            doc.lstext('No Registra', 111, 106, 0);
          } else {
            doc.lstext(this.Encuesta[83], 111, 106, 0);
          }
          if (this.Encuesta[84] == 'null' || this.Encuesta[84] == '-') {
            doc.lstext('No Registra', 111, 117, 0);
          } else {
            doc.lstext(this.Encuesta[84], 111, 117, 0);
          }
          if (this.Encuesta[85] == 'null' || this.Encuesta[85] == '-') {
            doc.lstext('No Registra', 20, 128, 0);
          } else {
            doc.lstext(this.Encuesta[85], 20, 128, 0);
          }
          if (this.Encuesta[86] == 'null' || this.Encuesta[86] == '-') {
            doc.lstext('No Registra', 111, 128, 0);
          } else {
            doc.lstext(this.Encuesta[86], 111, 128, 0);
          }
          if (this.Encuesta[87] == 'true') {
            doc.text('X', 159.5, 170.5, 'center');
          } else {
          doc.text('X', 185.5, 170.5, 'center');
          }
          if (this.Encuesta[88] == 'true') {
            doc.text('X', 159.5, 180.4, 'center');
          } else {
          doc.text('X', 185.5, 180.4, 'center');
          }
          if (this.Encuesta[89] == 'true') {
            doc.text('X', 159.5, 190, 'center');
          } else {
          doc.text('X', 185.5, 190, 'center');
          }
          if (this.Encuesta[90] == 'true') {
            doc.text('X', 159.5, 200, 'center');
          } else {
          doc.text('X', 185.5, 200, 'center');
          }
          if (this.Encuesta[91] == 'true') {
            doc.text('X', 159.5, 210, 'center');
          } else {
          doc.text('X', 185.5, 210, 'center');
          }
          doc.text('X', 180.5, 259.5, 'center');
          if (this.Encuesta[85] == 'null' || this.Encuesta[85] == '-') {
            doc.lstext('No Registra', 111, 290, 0);
          } else {
            doc.lstext(this.Encuesta[85], 111, 290, 0);
          }
          /*this.global.Id_busqueda = item[0];
          const pdata7 = {option: 'fotosfirma', Id_Encuesta: this.global.Id_busqueda};
          this.global.consultar(pdata7, (err7, response7) => {
          console.log('FOTOS Firma', response7);
          this.ImagesF = response7;
          setTimeout(() => {
            
          }, 200);
          });          */
          doc.addImage(Firma, 'JPG', 30, 235, 65, 80);

          doc.addPage();
          doc.addImage(Pag12, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          if (this.Encuesta[319] == 'null' || this.Encuesta[319] == '-') {
            doc.lstext('No Registra', 20, 64, 0);
          } else {
            doc.lstext(this.Encuesta[319], 20, 64, 0);
          }
          if (this.Encuesta[320] == 'null' || this.Encuesta[320] == '-') {
            doc.lstext('', 20, 69, 0);
          } else {
            doc.lstext(this.Encuesta[320], 20, 69, 0);
          }
          if (this.Encuesta[326] == 'null' || this.Encuesta[326] == '-') {
            doc.lstext('No Registra', 115, 60, 0);
          } else {
            doc.lstext(this.Encuesta[326], 115, 60, 0);
          }
          if (this.Encuesta[327] == 'null' || this.Encuesta[327] == '-') {
            doc.lstext('No Registra', 115, 74, 0);
          } else {
            doc.lstext(this.Encuesta[327], 115, 74, 0);
          }
          // console.log(this.Encuesta[329]);
          if (this.Encuesta[329] == null || this.Encuesta[329] == '-' || this.Encuesta[329] == 'NULL') {
            doc.lstext('No Registra', 115, 90, 0);
          } else {
            doc.lstext(this.Encuesta[329], 115, 90, 0);
          }
          if (this.Encuesta[328] == 'null' || this.Encuesta[328] == '-' || this.Encuesta[328] == '--') {
            doc.lstext('No Registra', 20, 90, 0);
          } else {
            doc.lstext(this.Encuesta[328], 20, 90, 0);
          }
          if (this.Encuesta[95] == 'Reactivo') {
            doc.text('X', 121, 121, 'center');
          } else if (this.Encuesta[95] == 'Propositivo') {
            doc.text('X', 121, 116, 'center');
          }
          if (this.Encuesta[96] == 'Desconfiado') {
            doc.text('X', 121, 145, 'center');
          } else if (this.Encuesta[96] == 'Motivado') {
            doc.text('X', 121, 149.5, 'center');
          } else if (this.Encuesta[96] == 'Indiferente') {
            doc.text('X', 121, 154.5, 'center');
          }
          if (this.Encuesta[94] == 'null' || this.Encuesta[94] == '-') {
            doc.lstext('No Registra', 25, 173.5, 0);
          } else {
            doc.lstext(this.Encuesta[94], 25, 173.5, 0);
          }

          doc.addPage();
          doc.addImage(Pag13, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.addPage();
          doc.addImage(Pag14, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.addPage();
          doc.addImage(Pag15, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          setTimeout(() => {
            doc.save('ZNI-' + item[0] + '.pdf');
            this.loading.HideLoading();
          }, 200);
        }, 200);
      });
    }, 300);
  } catch (error) {
    this.loading.HideLoading();
    this.alert.AlertOneButton('Error', 'Error al Generar el Reporte', 'Ok');
  }
  }

}
