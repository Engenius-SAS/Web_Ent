import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { LoadingService } from '../loading.service';
import { AlertService } from '../alert.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ruser',
  templateUrl: './ruser.page.html',
  styleUrls: ['./ruser.page.scss'],
})
export class RuserPage implements OnInit {
  Nombre;
  Apellido;
  Documento;
  Usuario;
  Contrasena;
 celular;
 fijo;
 correo;
 ciudadorigen;
  constructor(public navCtrl: NavController, public global: GlobalService, public loading: LoadingService, public alert: AlertService) { }

  ngOnInit() {
  }

  Guardar() {
    this.loading.LoadingNormal('Creando Usuario...');
    setTimeout(() => {
      if (this.Nombre == undefined || this.Nombre == '' || this.Apellido == undefined || this.Apellido == '' || this.Documento == undefined || this.Documento == '' || this.Usuario == undefined || this.Usuario == '' || this.Contrasena == undefined || this.Contrasena == '') {
        this.loading.HideLoading();
        this.alert.AlertOneButton('Información', 'Campos Vacios');
      } else {
        const query = 'INSERT INTO Enterritorio.funcionarios (nombre,apellido,username,celular,fijo,correo,ciudad_origen,documento,password,estado,IsDelete,fecha_creacion)' +
        ' VALUES (\'' +
        this.Nombre + '\',\'' +
        this.Apellido + '\', \'' +
        this.Usuario + '\',\'' +
        this.celular + '\',\'' +
        this.fijo + '\',\'' +
        this.correo + '\',\'' +
        this.ciudadorigen + '\',\'' +
        this.Documento + '\',MD5(\'' + this.Contrasena + '\'),\'' + 1 + '\',\'' + 0 + '\',NOW());';
        const pdata1 = {option: 'insertar', texto: query};
        this.global.consultar(pdata1, (err, response) => {
          console.log(response, query);
          if (err == null && response == true) {
            const pdata3 = {option: 'idusuario', usuario: this.Usuario};
            console.log(pdata3);
            this.global.consultar(pdata3, (err3, response3) => {
              console.log(response3);
              if (err3 == null && response3.length != 0) {
                const query2 = 'INSERT INTO Enterritorio.proyectos_funcionarios (Id_Funcionario, Id_Proyecto, IsDelete)' +
            ' VALUES (\''+response3[0][0]+'\',\'1\',\'0\');';
                const pdata2 = {option: 'insertar', texto: query2};
                this.global.consultar(pdata2, (err2, response2) => {
              console.log(response2, query2);
              if (err2 == null && response2 == true) {
                this.loading.HideLoading();
                this.alert.AlertOneButton('Información', 'Funcionario Creado Correctamente', 'Ok', () => {
                  // this.loading.LoadingNormal('Cargando...', 3);
                  this.navCtrl.navigateRoot('/home');
                });
              } else {
                this.loading.HideLoading();
                this.alert.AlertOneButton('Error', 'No se pudo asociar el funcionario al proyecto');
              }
            });
              } else {
                this.loading.HideLoading();
                this.alert.AlertOneButton('Error', 'No se pudo consultar el Funcionario');
              }
            });

          } else {
            this.loading.HideLoading();
            this.alert.AlertOneButton('Error', 'No se pudo crear el Funcionario');
          }
        });
      }
    }, 400);
  }

}

