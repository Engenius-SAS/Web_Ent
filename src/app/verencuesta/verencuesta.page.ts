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
/*SELECT A.*,B.*,C.*,D.*,E.*,F.*,G.*,H.*,I.*,J.*,K.*,M.* FROM Enterritorio.encabezado A
INNER JOIN Enterritorio.c_sociodemograficas B ON A.Id_Encuesta = B.Id_Encuesta
INNER JOIN Enterritorio.caracteristicas_predio C ON A.Id_Encuesta = C.Id_Encuesta
INNER JOIN Enterritorio.consentimiento D ON A.Id_Encuesta = D.Id_Encuesta
INNER JOIN Enterritorio.datos_vivienda_I E ON A.Id_Encuesta = E.Id_Encuesta
INNER JOIN Enterritorio.economia F ON A.Id_Encuesta = F.Id_Encuesta
INNER JOIN Enterritorio.energia G ON A.Id_Encuesta = G.Id_Encuesta
INNER JOIN Enterritorio.servicios_publicos H ON A.Id_Encuesta = H.Id_Encuesta
INNER JOIN Enterritorio.tratamiento_DP I ON A.Id_Encuesta = I.Id_Encuesta
INNER JOIN Enterritorio.ubicacion J ON A.Id_Encuesta = J.Id_Encuesta
INNER JOIN Enterritorio.URE K ON A.Id_Encuesta = K.Id_Encuesta
INNER JOIN Enterritorio.proyectos_funcionarios L ON A.Id_Proyecto_Funcionario = L.Id_Proyecto_Funcionario
INNER JOIN Enterritorio.funcionarios M ON M.Id_Funcionario = L.Id_Funcionario
WHERE A.isdelete = 0 AND A.Id_Encuesta = '234-1599533153335' */