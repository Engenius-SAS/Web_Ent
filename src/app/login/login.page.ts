import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from '../database.service';
import { AlertService } from '../alert.service';
import { LoadingService } from '../loading.service';
import {Md5} from 'ts-md5/dist/md5';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
User;
Pass;
Recordarme;
Id_Proyecto;

  constructor(public db: DatabaseService,
              private statusBar: StatusBar,
              public menuCtrl: MenuController,
              public navCtrl: NavController,
              public global: GlobalService,
              public alert: AlertService,
              public loading: LoadingService,
              private storage: Storage,
              ) {
    this.statusBar.backgroundColorByHexString('330867');
   }

  ngOnInit() {
    this.storage.get('User').then((val) => {
      this.User = val;
    });
    this.storage.get('Pass').then((val) => {
      this.Pass = val;
    });
    this.storage.get('Id_Proyecto').then((val) => {
      this.Id_Proyecto = val;
    });
    this.storage.get('Recordarme').then((val) => {
      this.Recordarme = val;
    });
    this.global.CheckInternet(() => {
      if (this.global.NetCheck) {
        this.EnLiena();
      } else {
        this.FueraDeLinea();
      }
    });
    this.global.Proyectos = new Array();
    const pdata8 = {option: 'proyectos'};
    this.global.consultar(pdata8, (err8, response8) => {
      console.log('Proyectos', response8);
      if (response8.length != 0) {
        for (let index = 0; index < response8.length; index++) {
            this.global.Proyectos.push({
              Id_Proyecto: response8[index][0],
              nombre: response8[index][1],
              descripcion: response8[index][2],
              contratante: response8[index][3],
              fechainicio: response8[index][4],
              fechafin: response8[index][5]
             });
        }
      }
    });
  }

  Login() {
    this.global.Id_Proyecto = this.Id_Proyecto;
    console.log('Proyecto Seleccionado', this.Id_Proyecto);
    console.log('PROYECTOOOOO', this.Id_Proyecto);
    if (this.User == '' || this.User == undefined || this.Pass == '' || this.Pass == undefined || this.Id_Proyecto == '' || this.Id_Proyecto == undefined) {
        this.alert.AlertOneButton('Información', 'Campos Vacios', ' Ok',
        () => {
          this.ngOnInit();
        }
       );
      } else {
        this.loading.LoadingNormal('Autenticando...');
        setTimeout(() => {
          const contrasena = Md5.hashStr(this.Pass);
          const query = 'SELECT *,(SELECT Id_Proyecto_Funcionario FROM enterritoriobk.proyectos_funcionarios B Where A.Id_Funcionario=B.Id_Funcionario AND B.Id_Proyecto=\'' + this.Id_Proyecto + '\') as Id_Proyecto_Funcionario FROM enterritoriobk.funcionarios A WHERE username=\'' + this.User + '\' AND password=\'' + contrasena + '\';';
          const pdata1 = {option: 'select', texto: query};
          this.global.consultar(pdata1, (err, response) => {
            console.log(response, query);
            this.global.UserData = response[0];
            console.log(query, 'DATA');
            if (response) {
              console.log('UserData', this.global.UserData);
              if (this.Recordarme == false) {
                this.storage.set('User', '');
                this.storage.set('Pass', '');
                this.storage.set('Id_Proyecto', '');
                this.storage.set('Recordarme', false);
              } else if (this.Recordarme == true) {
                this.storage.set('User', this.User);
                this.storage.set('Pass', this.Pass);
                this.storage.set('Id_Proyecto', this.Id_Proyecto);
                this.storage.set('Recordarme', true);
              }
              this.navCtrl.navigateRoot('/home');
              this.loading.HideLoading();
            } else {
              this.alert.AlertOneButton('Información', 'Usuario Contraseña o Proyecto Incorrectos');
              this.loading.HideLoading();
            }
          });
        }, 300);
      }
  }

  EnLiena() {
    console.log('Estoy Online');
    // this.Sincronizar();
  }
  FueraDeLinea() {
    console.log('Sin internet :(');
  }
  NewUser() {
    this.loading.LoadingNormal('Cargando...', 3);
    this.navCtrl.navigateRoot('/ruser');
  }

/*
  Sincronizar() {
    this.loading.LoadingNormal('Descargando Datos');
    setTimeout(() => {
      try {
        this.db.ExecQuery('DELETE FROM funcionarios', (respuesta) => {
          if (respuesta) {
            setTimeout(() => {
            const pdata1 = {option: 'funcionarios'};
            this.global.consultar(pdata1, (err, response) => {
              console.log('Funcionarios', response);
              if (response.length != 0) {
                for (let index = 0; index < response.length; index++) {
                  console.log(response[index]);
                  this.db.addProduct(response[index]);
                }
              }
              this.db.ExecQuery('DELETE FROM proyectos_funcionarios', (respuesta4) => {
                            if (respuesta4) {
                              setTimeout(() => {
                              const pdata4 = {option: 'funpro'};
                              this.global.consultar(pdata4, (err4, response4) => {
                                console.log('Elementos', response4);
                                if (response4.length != 0) {
                                  for (let index = 0; index < response4.length; index++) {
                                    console.log(response4[index]);
                                    this.db.addFunPro(response4[index]);
                                  }
                                }
                                        this.db.ExecQuery('DELETE FROM lugares', (respuesta6) => {
                                          if (respuesta6) {
                                            setTimeout(() => {
                                            const pdata6 = {option: 'lugares'};
                                            this.global.consultar(pdata6, (err6, response6) => {
                                              console.log('Lugares', response6);
                                              if (response6.length != 0) {
                                                for (let index = 0; index < response6.length; index++) {
                                                  console.log(response6[index]);
                                                  this.db.addLugar(response6[index]);
                                                }
                                                this.db.ExecQuery('DELETE FROM TipoFotos', (respuesta7) => {
                                                  if (respuesta7) {
                                                    setTimeout(() => {
                                                    const pdata7 = {option: 'TipoFotos'};
                                                    this.global.consultar(pdata7, (err7, response7) => {
                                                      console.log('TipoFotos', response7);
                                                      if (response7.length != 0) {
                                                        for (let index = 0; index < response7.length; index++) {
                                                          console.log(response7[index]);
                                                          this.db.addTipoFotos(response7[index]);
                                                        }
                                                        this.db.ExecQuery('DELETE FROM proyectos', (respuesta8) => {
                                                          if (respuesta8) {
                                                            setTimeout(() => {
                                                            const pdata8 = {option: 'proyectos'};
                                                            this.global.consultar(pdata8, (err8, response8) => {
                                                              console.log('Proyectos', response8);
                                                              if (response8.length != 0) {
                                                                for (let index = 0; index < response8.length; index++) {
                                                                  console.log(response8[index]);
                                                                  this.db.addProyectos(response8[index]);
                                                                }
                                                                this.loading.HideLoading();
                                                              }
                                                            });
                                                          }, 300);
                                                          }
                                                        });
                                                      }
                                                    });
                                                  }, 300);
                                                  }
                                                });
                                              }
                                            });
                                          }, 300);
                                          }
                                        });
                              });
                            }, 300);
                            }
                          });


            });
            }, 300);
          }
        });
      } catch {
        this.alert.AlertOneButton('Error', 'Hubo Un problema al descargar los datos, Intenta Nuevamente', () => {
          this.ngOnInit();
        });
      }
    }, 300);

  }*/








}
