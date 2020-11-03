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
  Images = new Array();
  ImagesF = new Array();
  constructor(
    public navCtrl: NavController,
    public loading: LoadingService,
    public global: GlobalService,
    public alert: AlertService) {
    this.global.FamiliaGlobal = new Array();
     }

  ngOnInit() {
    const pdata8 = {option: 'Dataen', Id_Encuesta: this.global.Id_busqueda};
    this.global.consultar(pdata8, (err8, response8) => {
      console.log('Datos Encuesta', response8);
      this.data = response8[0];
      this.global.FamiliaGlobal = JSON.parse(this.data[13]);
    });
    const pdata9 = {option: 'fotosen', Id_Encuesta: this.global.Id_busqueda};
    this.global.consultar(pdata9, (err9, response9) => {
      console.log('FOTOS Encuesta', response9);
      this.Images = response9;
      setTimeout(() => {
        //this.slideWithNav.update();
      }, 200);
    });
    const pdata7 = {option: 'fotosfirma', Id_Encuesta: this.global.Id_busqueda};
    this.global.consultar(pdata7, (err7, response7) => {
      console.log('FOTOS Firma', response7);
      this.ImagesF = response7;
      setTimeout(() => {
        //this.slideWithNav.update();
      }, 200);
    });
  }
}
/*SELECT A.*,B.*,C.*,D.*,E.*,F.*,G.*,H.*,I.*,J.*,K.*,M.* FROM enterritoriobk.encabezado A
INNER JOIN enterritoriobk.c_sociodemograficas B ON A.Id_Encuesta = B.Id_Encuesta
INNER JOIN enterritoriobk.caracteristicas_predio C ON A.Id_Encuesta = C.Id_Encuesta
INNER JOIN enterritoriobk.consentimiento D ON A.Id_Encuesta = D.Id_Encuesta
INNER JOIN enterritoriobk.datos_vivienda_I E ON A.Id_Encuesta = E.Id_Encuesta
INNER JOIN enterritoriobk.economia F ON A.Id_Encuesta = F.Id_Encuesta
INNER JOIN enterritoriobk.energia G ON A.Id_Encuesta = G.Id_Encuesta
INNER JOIN enterritoriobk.servicios_publicos H ON A.Id_Encuesta = H.Id_Encuesta
INNER JOIN enterritoriobk.tratamiento_DP I ON A.Id_Encuesta = I.Id_Encuesta
INNER JOIN enterritoriobk.ubicacion J ON A.Id_Encuesta = J.Id_Encuesta
INNER JOIN enterritoriobk.URE K ON A.Id_Encuesta = K.Id_Encuesta
INNER JOIN enterritoriobk.proyectos_funcionarios L ON A.Id_Proyecto_Funcionario = L.Id_Proyecto_Funcionario
INNER JOIN enterritoriobk.funcionarios M ON M.Id_Funcionario = L.Id_Funcionario
WHERE A.isdelete = 0 AND A.Id_Encuesta = '234-1599533153335' */