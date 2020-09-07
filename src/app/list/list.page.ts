import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { LoadingService } from '../loading.service';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';
import * as jsPDF from 'jspdfmifeheros';
import 'jspdf-autotable-mifeheros';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
Pines;
Encuesta;
  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public loading: LoadingService,
    public global: GlobalService,
    public alert: AlertService) { }

  ngOnInit() {
    this.Pines = new Array();
    this.loading.LoadingNormal('Consultando');
    setTimeout(() => {
      const pdata8 = {option: 'Mapa'};
      this.global.consultar(pdata8, (err8, response8) => {
        console.log('PINES MAPA', response8);
        this.loading.HideLoading();
        this.Pines = response8;
      });
    }, 300);

  }

  Descargar(item) {
    console.log('PDF', item[0]);
    this.loading.LoadingNormal('Generando PDF....');
    setTimeout(() => {
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
        const Lat = item[35].split('.');
        const Lon = item[36].split('.');
        const Alt = item[37].split('.');
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
          doc.lstext(Ver, 40, 270, 4.1);
          doc.lstext(Cor, 40, 281.5, 4.1);
          doc.lstext('X', 154, 312, 0);
          doc.addPage();
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
            doc.text(this.Encuesta[194], 135.5, 186, 'center');
          }
          if (this.Encuesta[195] == 'null') {
            doc.text('0', 135.5, 191, 'center');
          } else {
            doc.text(this.Encuesta[195], 135.5, 191, 'center');
          }
          if (this.Encuesta[196] == 'null') {
            doc.text('0', 135.5, 196, 'center');
          } else {
            doc.text(this.Encuesta[196], 135.5, 196, 'center');
          }
          if (this.Encuesta[197] == 'null') {
            doc.text('0', 135.5, 201, 'center');
          } else {
            doc.text(this.Encuesta[197], 135.5, 201, 'center');
          }
          if (this.Encuesta[198] == 'null') {
            doc.text('0', 135.5, 206, 'center');
          } else {
            doc.text(this.Encuesta[198], 135.5, 206, 'center');
          }
          if (this.Encuesta[199] == 'null') {
            doc.text('0', 135.5, 211, 'center');
          } else {
            doc.text(this.Encuesta[199], 135.5, 211, 'center');
          }
          if (this.Encuesta[200] == 'null') {
            doc.text('0', 135.5, 216, 'center');
          } else {
            doc.text(this.Encuesta[200], 135.5, 216, 'center');
          }
          if (this.Encuesta[201] == 'null') {
            doc.text('0', 135.5, 223, 'center');
          } else {
            doc.text(this.Encuesta[201], 135.5, 223, 'center');
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
            doc.text(this.Encuesta[248], 174, 277, 'center');
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

          if (this.Encuesta[244] == 'Si') {
            doc.text('X', 117, 189.5, 'center');
          } else if (this.Encuesta[244] == 'No') {
            doc.text('X', 117, 194.5, 'center');
          }
          if (this.Encuesta[245] == 'undefined' || this.Encuesta[245] == 'null') {
            doc.lstext('No Aplica', 20, 209.5, 0);
          } else {
            doc.lstext(this.Encuesta[245], 20, 209.5, 0);
          }
          if (this.Encuesta[246] == 'undefined' || this.Encuesta[246] == 'null' || this.Encuesta[246] == 'No Aplica') {
            doc.text('X', 137, 257, 'center');
          } else if (this.Encuesta[246] == 'No') {
            doc.text('X', 117, 257, 'center');
          }


          doc.addPage();
          doc.addImage(Pag5, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.addPage();
          doc.addImage(Pag6, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.addPage();
          doc.addImage(Pag7, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.addPage();
          doc.addImage(Pag8, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.addPage();
          doc.addImage(Pag9, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.addPage();
          doc.addImage(Pag10, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.addPage();
          doc.addImage(Pag11, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.addPage();
          doc.addImage(Pag12, 'PNG', 5, 0, 205, 338);
          doc.text(NumForm, 157, 11);
          doc.lstext(Dia, 147, 16, 3.5);
          doc.lstext(Mes, 164, 16, 3.5);
          doc.lstext(Ano, 183, 16, 3);
          doc.addPage();
          doc.addImage(Pag13, 'PNG', 5, 0, 205, 338);
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
  }

}
