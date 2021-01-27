import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { LoadingService } from '../loading.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from '../database.service';
import { GlobalService } from '../global.service';
import { AlertService } from '../alert.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import * as moment from 'moment';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  fileTransfer: FileTransferObject = this.transfer.create();
  Predio;
  nombreProyecto;
  Consentimiento;
  Porcentaje;
  MTransporte;
  Encabezado;
  Encuestadores;
  FotosF;
  FotosEnc;
  Encuestas;
  Vivienda;
  Servicios;
  Racional;
  Datosper;
  Sociodemo;
  Energia;
  Economia;
  Transportev;
  Ubicacion;
  Termi;
  constructor(public statusbar: StatusBar,
              public menuCtrl: MenuController,
              public navCtrl: NavController,
              public loading: LoadingService,
              public db: DatabaseService,
              private transfer: FileTransfer,
              public global: GlobalService,
              public alert: AlertService,
              private file: File,
              private spinner: NgxSpinnerService,
              private androidPermissions: AndroidPermissions) {
    this.statusbar.backgroundColorByHexString('003566');
    this.global.CheckInternet(() => {
    });
  }

  ngOnInit() {
    this.spinner.show();
    console.log('USUARIO INFO', this.global.UserData);
    if(this.global.UserData == undefined || this.global.UserData == [] || this.global.UserData == null){
      this.loading.LoadingNormal('Cargando...', 3);
    setTimeout(() => {
      this.navCtrl.navigateRoot('/login');
    }, 500);
    }else{
    for (let i = 0; i < this.global.Proyectos.length; i++) {
       if(this.global.Id_Proyecto == this.global.Proyectos[i].Id_Proyecto){
        this.nombreProyecto = this.global.Proyectos[i].nombre;
      }else{
        continue;
      }  
    }
    setTimeout(() => {
      this.menuCtrl.enable(true);
      
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.MANAGE_DOCUMENTS).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.MANAGE_DOCUMENTS)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.MANAGE_DOCUMENTS]);
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    this.spinner.hide();
    }, 500);
    
    /*
    this.loading.LoadingNormal('Cargando Información...');
    setTimeout(() => {
      this.db.ContarEncuestas();
      this.db.ContarEncuestasE();
      this.db.ContarFotos();
      this.db.loadEncabezado((data) => {
        console.log("loadEncabezado");
        this.db.loadUbicacion((data1) => {
          this.db.loadDatosper((data2) => {
            this.db.loadPredio((data3) => {
              this.db.loadEnergia((data4) => {
                this.db.loadVivienda((data5) => {
                  this.db.loadfotos_firma((data6) => {
                    this.db.loadServicios((data7) => {
                      this.db.loadRacional((data8) => {
                        this.db.loadSociodemo((data9) => {
                         this.db.loadfotos_encuesta((data10) => {
                            this.db.loadEconomia((data11) => {
                              this.db.loadEncuestador((data12) => {
                                this.db.loadConsentimiento((data13) => {
                                  this.db.loadTransporte((data14) => {
                                    this.db.loadTermi((data15) => {
                                      this.db.loadfotos_transporte((data16) => {
                                        this.Encabezado = data;
                                        this.Ubicacion = data1;
                                        this.Datosper = data2;
                                        this.Predio = data3;
                                        this.Energia = data4;
                                        this.Vivienda = data5;
                                        this.FotosF = data6;
                                        this.Servicios = data7;
                                        this.Racional = data8;
                                        this.Sociodemo = data9;
                                        this.FotosEnc = data10;
                                        this.Economia = data11;
                                        this.Encuestadores = data12;
                                        this.Consentimiento = data13;
                                        this.Transportev = data14;
                                        this.Termi = data15;
                                        this.MTransporte = data16;
                                        this.loading.HideLoading();
                                        console.log("HideLoading");
                                      });
                                    });
                                  });
                                });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
        });
      });
    }, 200);*/
  }
  }

  Registrar() {
    this.loading.LoadingNormal('Cargando...', 3);
    setTimeout(() => {
      this.navCtrl.navigateRoot('/map');
    }, 500);
  }

  IElectrica() {
    this.loading.LoadingNormal('Cargando...', 3);
    setTimeout(() => {
      this.navCtrl.navigateRoot('/list');
    }, 500);
  }
  Cienaga() {
    this.loading.LoadingNormal('Cargando...', 3);
    setTimeout(() => {
      this.navCtrl.navigateRoot('/list-cienaga');
    }, 500);
  }
  RevisionA() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.navCtrl.navigateRoot('/listalerta');
    }, 500);
  }

  RevisionE() {
    this.loading.LoadingNormal('Cargando...', 3);
    setTimeout(() => {
      this.navCtrl.navigateRoot('/listverifi');
    }, 500);
  }

  Seguimiento() {
    this.loading.LoadingNormal('Cargando...', 3);
    setTimeout(() => {
      this.navCtrl.navigateRoot('/seguimiento');
    }, 500);
  }

  Continuar() {
    setTimeout(() => {
      this.navCtrl.navigateRoot('/conti');
    }, 500);
  }

  NewUser() {
    this.loading.LoadingNormal('Cargando...', 3);
    this.navCtrl.navigateRoot('/ruser');
  }

  Transporte() {
    this.loading.LoadingNormal('Cargando...', 3);
    this.navCtrl.navigateRoot('/transporte');
  }

  Comunidad() {
    setTimeout(() => {
      this.navCtrl.navigateRoot('/selectcomu');
    }, 500);
  }

  ActualizarP() {
    this.loading.LoadingNormal('Actualizandooo...', 3);
    setTimeout(() => {
      /*
      this.db.ContarEncuestas();
      this.db.ContarFotos();
      this.db.ContarEncuestasE();*/
    }, 500);
  }


  IAmbiental() {
    this.loading.LoadingNormal('Cargando...', 3);
    setTimeout(() => {
      this.navCtrl.navigateRoot('/amb');
    }, 500);
  }
/*
Sincronizar() {
  this.loading.LoadingNormal('Sincronizando Datos...');
  setTimeout(() => {
    if (this.Encabezado.length == 0 && this.Ubicacion.length == 0 && this.Datosper.length == 0 &&
       this.Predio.length == 0 && this.Energia.length == 0 && this.Vivienda.length == 0 &&
       this.FotosF.length == 0 && this.Servicios.length == 0 && this.Racional.length == 0 &&
       this.Sociodemo.length == 0 && this.FotosEnc.length == 0 && this.Economia.length == 0) {
      this.loading.HideLoading();
      this.alert.AlertOneButton('Información', 'No hay Datos Para Sincronizar');
    } else {
      this.SincronizarEncabezado((response) => {
        if (response) {
          this.SincronizarUbicacion((response3) => {
            if (response3) {
              this.SincronizarDatosper((response6) => {
                if (response6) {
                  this.SincronizarPredio((response7) => {
                    if (response7) {
                      this.SincronizarEnergia((response8) => {
                        if (response8) {
                          this.SincronizarVivienda((response9) => {
                            if (response9) {
                              //this.SincFotos_Firma((response10) => {
                                //if (response10) {
                                  this.SincronizarServicios((response11) => {
                                    if (response11) {
                                      this.SincronizarRacional((response12) => {
                                        if (response12) {
                                          this.SincronizarSociodemo((response13) => {
                                            if (response13) {
                                              //this.SincFotos_Encuesta((response14) => {
                                                //if (response14) {
                                                  this.SincronizarEconomia((response15) => {
                                                    if (response15) {                                                      
                                                      this.SincronizarEncuestadores((response16) => {
                                                        if (response16) {                                                      
                                                          this.SincronizarConsentimiento((response17) => {
                                                            if (response17) {                                                      
                                                              this.SincronizarTerm((response18) => {
                                                                if (response18) {                                                      
                                                                  this.SincronizarTransporte((response19) => {
                                                                    if (response19) {                                                      
                                                                      setTimeout(() => {
                                                                        this.loading.HideLoading();
                                                                        this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor', 'Ok', () => {
                                                                        this.ngOnInit();
                                                                        });
                                                                        }, 500);
                                                                      }
                                                                    });
                                                                  }
                                                               });
                                                            }
                                                          });
                                                        }
                                                      });
                                                    }
                                                  });
                                                //}
                                              //});
                                            }
                                          });
                                        }
                                      });
                                    }
                                  });
                                //}
                              //});
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }, 400);
}



SincronizarFotos() {
  let Text = 'Sincronizando Fotos...';
  this.loading.LoadingNormal(Text, 120);
  setTimeout(() => {
    if (this.FotosF.length == 0 && this.FotosEnc.length == 0) {
      this.loading.HideLoading();
      this.alert.AlertOneButton('Información', 'No hay Fotos Para Sincronizar');
    } else {          
                  Text = 'Sincronizando Fotos Firmas...';
                  this.SincFotos_Firma((response5) => {
                    if (response5) {
                      Text = 'Sincronizando Fotos Encuesta...';
                      this.SincFotos_Encuesta((response16) => {
                        if (response16) {
                          Text = 'Sincronizando Fotos Transporte...';
                          this.SincFotos_Transporte((response17) => {
                            if (response17) {
                              setTimeout(() => {
                                this.loading.HideLoading();
                                this.alert.AlertOneButton('Información', 'Fotos Subidas al Servidor', 'Ok', () => {
                                  this.ngOnInit();
                                });
                              }, 500);
                            }
                          });
                        }
                      });
            }
          });
    }
  }, 400);
}*/
/*
  SincronizarEncabezado(cb) {
      let var1 = 0;
      let var2 = 0;
      let var3 = 0;
      if (this.Encabezado.length == 0) {
        cb(true);
      } else {
      this.Encabezado.map(element => {
        if (element.upload == 0) {
          var1++;
          console.log('Para Subir - Encabezado');
          const query = 'INSERT INTO enterritoriobk.encabezado (Id_Encabezado,Id_Encuesta,Id_Proyecto_Funcionario,Num_formulario,Dia,Mes,Año)' +
          ' VALUES (\'' + element.Id_Encabezado + '\',\'' + element.Id_Encuesta + '\', \'' + element.Id_Proyecto_Funcionario + '\',\''
          + element.Num_formulario + '\',\'' + element.Dia + '\',\'' + element.Mes + '\',\'' + element.Año + '\');';
          const pdata1 = {option: 'insertar', texto: query};
          this.global.consultar(pdata1, (err, response) => {
            console.log(response, query);
            if (err == null && response == true) {
              this.db.deleteencabezado(element.Id_Encabezado).then((respuesta) => {
                var2++;
                console.log('Respuesta UPDATE', respuesta);
                if (var1 == var2) {
                  cb(true);
                }
              }).catch((error) => {
                console.log('ERRORRRRRRR', error);
                var2++;
                if (var1 == var2) {
                  cb(true);
                }
              });
            } else {
              this.alert.AlertOneButton('Error', 'Error al subir registro');
            }
          });
        } else {
          console.log('No Subir - Encabezado');
          var3++;
          if (var3 == this.Encabezado.length) {
            cb(true);
            // this.loading.HideLoading();
            // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
          }
        }
      });
    }
  }*/

/*
SincronizarEncabezadoE(cb) {
    let var1 = 0; // datos sin subir
    let var2 = 0; // datos que se van subiendo
    let var3 = 0; // datos que no se han podido subir
    if (this.Encabezado.length == 0) {
      cb(true);
    } else {
    this.Encabezado.map(element => {
      if (element.edit == 1) {
        var1++;
        const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.encabezado WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
        this.global.consultar(pdata2, (err5, response5) => {
          console.log(response5, 'DELETE');
          if (err5 == null && response5 == true) {
            console.log('Para Subir - caracteristicas_predio'); // quiery remoto - en servidor
            const query = 'INSERT INTO enterritoriobk.encabezado (Id_Encabezado,Id_Encuesta,Id_Proyecto_Funcionario,Num_formulario,Dia,Mes,Año,upload,edit)' +
            ' VALUES (\'' + element.Id_Encabezado + '\',\'' 
            + element.Id_Encuesta + '\', \''
            + element.Id_Proyecto_Funcionario + '\',\''
            + element.Num_formulario + '\',\'' 
            + element.Dia + '\',\'' 
            + element.Mes + '\',\'' 
            + element.Año + '\',\''
            + 1 + '\',\'' 
            + 0 +');';
            const pdata1 = {option: 'insertar', texto: query};
            this.global.consultar(pdata1, (err, response) => {
              console.log(response, query);
              if (err == null && response == true) {
                this.db.deleteencabezado(element.Id_Encabezado).then((respuesta) => {
                  var2++;
                  console.log('Respuesta UPDATE Encabezado ', respuesta);
                  if (var1 == var2) {
                    cb(true);
                  }
                }).catch((error) => {
                  console.log('ERRORRRRRRR Encabezado', error);
                  var2++;
                  if (var1 == var2) {
                    cb(true);
                  }
                });
              } else {
                this.alert.AlertOneButton('Error', 'Error al subir registro Encabezado');
              }
            });
          }
        });
      } else {
        console.log('No Subir - Encabezado');
        var3++;
        if (var3 == this.Encabezado.length) {
          cb(true);
          // this.loading.HideLoading();
          // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
        }
      }
    });
    }
    }

  
  SincronizarUbicacion(cb) {
    let var1 = 0; // datos sin subir
    let var2 = 0; // datos que se van subiendo
    let var3 = 0; // datos que no se han podido subir
    if (this.Ubicacion.length == 0) {
      cb(true);
    } else {
    this.Ubicacion.map(element => {
      if (element.upload == 0) {
        var1++;
        console.log('Para Subir - Ubicación'); // quiery remoto - en servidor
        const query = 'INSERT INTO enterritoriobk.ubicacion (Id_Ubicación, Id_Encuesta, Id_Proyecto_Funcionario, U_latitud, U_longitud, U_altitud, U_depto, U_codigo_depto, U_municipio, U_codigo_municipio,U_vereda,U_corregimiento,Tipo_proyecto)' +
        ' VALUES (\'' + element.Id_Ubicación + '\',\''
        + element.Id_Encuesta + '\', \''
        + element.Id_Proyecto_Funcionario + '\',\''
        + element.U_latitud + '\',\''
        + element.U_longitud + '\',\''
        + element.U_altitud + '\',\''
        + element.U_depto + '\',\''
        + element.U_codigo_depto + '\',\''
        + element.U_municipio + '\',\''
        + element.U_codigo_municipio + '\',\''
        + element.U_vereda + '\',\''
        + element.U_corregimiento + '\',\''
        + element.Tipo_proyecto + '\');';
        const pdata1 = {option: 'insertar', texto: query};
        this.global.consultar(pdata1, (err, response) => {
          console.log(response, query);
          if (err == null && response == true) {
            this.db.deleteubicacion(element.Id_Ubicación).then((respuesta) => {
              var2++;
              console.log('Respuesta UPDATE Ubicación ', respuesta);
              if (var1 == var2) {
                cb(true);
              }
            }).catch((error) => {
              console.log('ERRORRRRRRR Ubicación', error);
              var2++;
              if (var1 == var2) {
                cb(true);
              }
            });
          } else {
            this.alert.AlertOneButton('Error', 'Error al subir registro Ubicación');
          }
        });
      } else {
        console.log('No Subir - Ubicación');
        var3++;
        if (var3 == this.Ubicacion.length) {
          cb(true);
          // this.loading.HideLoading();
          // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
        }
      }
    });
  }
}

SincronizarUbicacionE(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Ubicacion.length == 0) {
    cb(true);
  } else {
  this.Ubicacion.map(element => {
    if (element.edit == 1) {
      var1++;
      const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.ubicacion WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
      this.global.consultar(pdata2, (err5, response5) => {
        console.log(response5, 'DELETE');
        if (err5 == null && response5 == true) {
          console.log('Para Subir - Ubicación'); // quiery remoto - en servidor
          const query = 'INSERT INTO enterritoriobk.ubicacion (Id_Ubicación, Id_Encuesta, Id_Proyecto_Funcionario, U_latitud, U_longitud, U_altitud, U_depto, U_codigo_depto, U_municipio, U_codigo_municipio,U_vereda,U_corregimiento,Tipo_proyecto, upload, edit)' +
        ' VALUES (\'' + element.Id_Ubicación + '\',\''
        + element.Id_Encuesta + '\', \''
        + element.Id_Proyecto_Funcionario + '\',\''
        + element.U_latitud + '\',\''
        + element.U_longitud + '\',\''
        + element.U_altitud + '\',\''
        + element.U_depto + '\',\''
        + element.U_codigo_depto + '\',\''
        + element.U_municipio + '\',\''
        + element.U_codigo_municipio + '\',\''
        + element.U_vereda + '\',\''
        + element.U_corregimiento + '\',\''
        + element.Tipo_proyecto + '\','
        + 1 + '\','
        + 0 +');';
          const pdata1 = {option: 'insertar', texto: query};
          this.global.consultar(pdata1, (err, response) => {
            console.log(response, query);
            if (err == null && response == true) {
              this.db.deleteubicacion(element.Id_Ubicación).then((respuesta) => {
                var2++;
                console.log('Respuesta UPDATE Ubicación ', respuesta);
                if (var1 == var2) {
                  cb(true);
                }
              }).catch((error) => {
                console.log('ERRORRRRRRR Ubicación', error);
                var2++;
                if (var1 == var2) {
                  cb(true);
                }
              });
            } else {
              this.alert.AlertOneButton('Error', 'Error al subir registro Ubicación');
            }
          });
        }
      });
    } else {
      console.log('No Subir - Ubicación');
      var3++;
      if (var3 == this.Ubicacion.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarDatosper(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Datosper.length == 0) {
    cb(true);
  } else {
  this.Datosper.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - Tratamiento datos personales'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.tratamiento_DP (Id_TratamientoDP, Id_Encuesta, Id_Proyecto_Funcionario, Autorizacion, Edificacion, Tipo_institucion, Tipo_institucion_otro_cual, Uso_viv_inst)' +
      ' VALUES (\'' + element.Id_TratamientoDP + '\',\''
      + element.Id_Encuesta + '\', \''
      + element.Id_Proyecto_Funcionario + '\',\''
      + element.Autorizacion + '\',\''
      + element.Edificacion + '\',\''
      + element.Tipo_institucion + '\',\''
      + element.Tipo_institucion_otro_cual + '\',\''
      + element.Uso_viv_inst + '\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deletedatosper(element.Id_TratamientoDP).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Tratamiento_DP ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Tratamiento_DP', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Tratamiento_DP');
        }
      });
    } else {
      console.log('No Subir - Tratamiento_DP');
      var3++;
      if (var3 == this.Datosper.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarDatosperE(cb) {
let var1 = 0; // datos sin subir
let var2 = 0; // datos que se van subiendo
let var3 = 0; // datos que no se han podido subir
if (this.Datosper.length == 0) {
  cb(true);
} else {
this.Datosper.map(element => {
  if (element.edit == 1) {
    var1++;
    const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.tratamiento_DP WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
    this.global.consultar(pdata2, (err5, response5) => {
      console.log(response5, 'DELETE');
      if (err5 == null && response5 == true) {
        console.log('Para Subir - tratamiento_DP'); // quiery remoto - en servidor
        const query = 'INSERT INTO enterritoriobk.tratamiento_DP (Id_TratamientoDP, Id_Encuesta, Id_Proyecto_Funcionario, Autorizacion, Edificacion, Tipo_institucion, Tipo_institucion_otro_cual, Uso_viv_inst, upload, edit)' +
      ' VALUES (\'' + element.Id_TratamientoDP + '\',\''
      + element.Id_Encuesta + '\', \''
      + element.Id_Proyecto_Funcionario + '\',\''
      + element.Autorizacion + '\',\''
      + element.Edificacion + '\',\''
      + element.Tipo_institucion + '\',\''
      + element.Tipo_institucion_otro_cual + '\',\''
      + element.Uso_viv_inst + '\',\''
      + 1 + '\','
      + 0 +');';
        const pdata1 = {option: 'insertar', texto: query};
        this.global.consultar(pdata1, (err, response) => {
          console.log(response, query);
          if (err == null && response == true) {
            this.db.deletedatosper(element.Id_TratamientoDP).then((respuesta) => {
              var2++;
              console.log('Respuesta UPDATE tratamiento_DP ', respuesta);
              if (var1 == var2) {
                cb(true);
              }
            }).catch((error) => {
              console.log('ERRORRRRRRR tratamiento_DP', error);
              var2++;
              if (var1 == var2) {
                cb(true);
              }
            });
          } else {
            this.alert.AlertOneButton('Error', 'Error al subir registro tratamiento_DP');
          }
        });
      }
    });
  } else {
    console.log('No Subir - tratamiento_DP');
    var3++;
    if (var3 == this.Datosper.length) {
      cb(true);
      // this.loading.HideLoading();
      // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
    }
  }
});
}
}

SincronizarPredio(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Predio.length == 0) {
    cb(true);
  } else {
  this.Predio.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - Predio'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.caracteristicas_predio (Id_CaracteristicaP, Id_Encuesta, Id_Proyecto_Funcionario, Uso_predio, Estrato_predio)' +
      ' VALUES (\'' + element.Id_CaracteristicaP + '\',\''
      + element.Id_Encuesta + '\', \''
      + element.Id_Proyecto_Funcionario + '\',\''
      + element.Uso_predio + '\',\''
      + element.Estrato_predio + '\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deletepredio(element.Id_CaracteristicaP).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Predio ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Predio', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Predio');
        }
      });
    } else {
      console.log('No Subir - Predio');
      var3++;
      if (var3 == this.Predio.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarPredioE(cb) {
let var1 = 0; // datos sin subir
let var2 = 0; // datos que se van subiendo
let var3 = 0; // datos que no se han podido subir
if (this.Predio.length == 0) {
  cb(true);
} else {
this.Predio.map(element => {
  if (element.edit == 1) {
    var1++;
    const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.caracteristicas_predio WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
    this.global.consultar(pdata2, (err5, response5) => {
      console.log(response5, 'DELETE');
      if (err5 == null && response5 == true) {
        console.log('Para Subir - caracteristicas_predio'); // quiery remoto - en servidor
        const query = 'INSERT INTO enterritoriobk.caracteristicas_predio (Id_CaracteristicaP, Id_Encuesta, Id_Proyecto_Funcionario, Uso_predio, Estrato_predio, upload, edit)' +
      ' VALUES (\'' + element.Id_CaracteristicaP + '\',\''
      + element.Id_Encuesta + '\', \''
      + element.Id_Proyecto_Funcionario + '\',\''
      + element.Uso_predio + '\',\''
      + element.Estrato_predio + '\',\''
      + 1 + '\','
      + 0 +');';
        const pdata1 = {option: 'insertar', texto: query};
        this.global.consultar(pdata1, (err, response) => {
          console.log(response, query);
          if (err == null && response == true) {
            this.db.deletepredio(element.Id_CaracteristicaP).then((respuesta) => {
              var2++;
              console.log('Respuesta UPDATE caracteristicas_predio ', respuesta);
              if (var1 == var2) {
                cb(true);
              }
            }).catch((error) => {
              console.log('ERRORRRRRRR caracteristicas_predio', error);
              var2++;
              if (var1 == var2) {
                cb(true);
              }
            });
          } else {
            this.alert.AlertOneButton('Error', 'Error al subir registro caracteristicas_predio');
          }
        });
      }
    });
  } else {
    console.log('No Subir - caracteristicas_predio');
    var3++;
    if (var3 == this.Predio.length) {
      cb(true);
      // this.loading.HideLoading();
      // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
    }
  }
});
}
}

SincronizarViviendaE(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Vivienda.length == 0) {
    console.log('Posicion Vacia - Vivienda');
    cb(true);
  } else {
  this.Vivienda.map(element => {
    if (element.edit == 1) {
      var1++;
      const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.datos_vivienda_I WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
      this.global.consultar(pdata2, (err5, response5) => {
        console.log(response5, 'DELETE');
        if (err5 == null && response5 == true) {
      console.log('Para Subir - Vivienda'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.datos_vivienda_I(Id_Dato_Vivienda , Id_Encuesta , Id_Proyecto_Funcionario, Nombre_comunidad , Territorialidad , Tenencia_posesion , Hogares_vivienda , Personas_vivienda , Paredes_exteriores , Techo_cubierta , Pisos , Afectacion_inundacion , Afectacion_avalancha , Afectacion_hundimiento , Afectacion_tormentas,upload,edit)' +
      ' VALUES (\''
      +	element.Id_Dato_Vivienda 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario 	+	'\',\''
      +	element.Nombre_comunidad 	+	'\',\''
      +	element.Territorialidad 	+	'\',\''
      +	element.Tenencia_posesion 	+	'\',\''
      +	element.Hogares_vivienda 	+	'\',\''
      +	element.Personas_vivienda 	+	'\',\''
      +	element.Paredes_exteriores 	+	'\',\''
      +	element.Techo_cubierta 	+	'\',\''
      +	element.Pisos 	+	'\',\''
      +	element.Afectacion_inundacion 	+	'\',\''
      +	element.Afectacion_avalancha 	+	'\',\''
      +	element.Afectacion_hundimiento 	+	'\',\''
      +	element.Afectacion_tormentas 	+	'\',\''
      + 1 + '\',\''
      + 0 + ');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deletevivienda(element.idvivienda).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Vivienda ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Vivienda', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Vivienda');
          this.db.deletevivienda(element.idvivienda).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Vivienda ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Vivienda', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        }
      });
        }
      });
    } else {
      console.log('No Subir - Vivienda');
      var3++;
      if (var3 == this.Vivienda.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarRacionalE(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Racional.length == 0) {
    console.log('Posicion Vacia - URE');
    cb(true);
  } else {
  this.Racional.map(element => {
    if (element.edit == 1) {
      var1++;
      const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.URE WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
      this.global.consultar(pdata2, (err5, response5) => {
        console.log(response5, 'DELETE');
        if (err5 == null && response5 == true) {
      console.log('Para Subir - Energia2'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.URE(Id_URE , Id_Encuesta , Id_Proyecto_Funcionario , Uso_adecuado_energia , Escuchado_uso_racional_energia , Conocer_generacionyuso_energia , Temas_generacionyuso_energia , Compartir_saberes , upload,edit)' +
      ' VALUES (\''
      +	element.Id_URE 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario	+	'\',\''
      +	element.Uso_adecuado_energia 	+	'\',\''
      +	element.Escuchado_uso_racional_energia 	+	'\',\''
      +	element.Conocer_generacionyuso_energia 	+	'\',\''
      +	element.Temas_generacionyuso_energia 	+	'\',\''
      +	element.Compartir_saberes 	+	'\',\''
      + 1 + '\',\''
      + 0 + ');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deleteracional(element.Id_URE).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE URE ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR URE', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro URE');
        }
      });
        }
      });
    } else {
      console.log('No Subir - URE');
      var3++;
      if (var3 == this.Racional.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarVivienda(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Vivienda.length == 0) {
    console.log('Posicion Vacia - Vivienda');
    cb(true);
  } else {
  this.Vivienda.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - Vivienda'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.datos_vivienda_I(Id_Dato_Vivienda , Id_Encuesta , Id_Proyecto_Funcionario, Nombre_comunidad , Territorialidad , Tenencia_posesion , Hogares_vivienda , Personas_vivienda , Paredes_exteriores , Techo_cubierta , Pisos , Afectacion_inundacion , Afectacion_avalancha , Afectacion_hundimiento , Afectacion_tormentas)' +
      ' VALUES (\''
      +	element.Id_Dato_Vivienda 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario 	+	'\',\''
      +	element.Nombre_comunidad 	+	'\',\''
      +	element.Territorialidad 	+	'\',\''
      +	element.Tenencia_posesion 	+	'\',\''
      +	element.Hogares_vivienda 	+	'\',\''
      +	element.Personas_vivienda 	+	'\',\''
      +	element.Paredes_exteriores 	+	'\',\''
      +	element.Techo_cubierta 	+	'\',\''
      +	element.Pisos 	+	'\',\''
      +	element.Afectacion_inundacion 	+	'\',\''
      +	element.Afectacion_avalancha 	+	'\',\''
      +	element.Afectacion_hundimiento 	+	'\',\''
      +	element.Afectacion_tormentas 	+	'\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deletevivienda(element.Id_Dato_Vivienda).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Vivienda ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Vivienda', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Vivienda');
        }
      });
    } else {
      console.log('No Subir - Vivienda');
      var3++;
      if (var3 == this.Vivienda.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarEconomia(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Economia.length == 0) {
    console.log('Posicion Vacia - Economia');
    cb(true);
  } else {
  this.Economia.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - Economia'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.economia (Id_Economia, Id_Encuesta, Id_Proyecto_Funcionario, Ganaderia_caza_silvicultura_pesca, Explotacion_minas_canteras, Fabricacion_articulos_textiles_prendas_vestir, Construccion, Venta_productos_no_fabricados_hogar , Elaboracion_procesamiento_alimentos_bebidas, Servicio_restaurante_bar_similares, Alojamiento, Arrendamientos, Servicios_actividades_reparacion_mantenimiento, Servicios_artisticos_peluqueria, Elaboracion_artesanias, Empleo_integrantes_familia, Agricultura, Fuente_ingreso_otro_cual, Cultivo1, Cultivo2 , Cultivo3, Cultivo4, Gastos_mes_arriendo, Gastos_mes_acueducto, Gastos_mes_alcantarillado , Gastos_mes_gas, Gastos_mes_salud , Gastos_mes_transporte, Gastos_mes_educacion,Gastos_mes_alimentacion,Gastos_mes_recreacion,Gastos_mes_vestuario,Gastos_mes_energia_electrica,Gastos_mes_otro_cual,Gastos_mes_total,Gastos_mes_otro_ban )' +
      ' VALUES (\''
      +	element.Id_Economia 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario 	+	'\',\''
      +	element.Ganaderia_caza_silvicultura_pesca 	+	'\',\''
      +	element.Explotacion_minas_canteras 	+	'\',\''
      +	element.Fabricacion_articulos_textiles_prendas_vestir 	+	'\',\''
      +	element.Construccion 	+	'\',\''
      +	element.Venta_productos_no_fabricados_hogar 	+	'\',\''
      +	element.Elaboracion_procesamiento_alimentos_bebidas 	+	'\',\''
      +	element.Servicio_restaurante_bar_similares 	+	'\',\''
      +	element.Alojamiento 	+	'\',\''
      +	element.Arrendamientos 	+	'\',\''
      +	element.Servicios_actividades_reparacion_mantenimiento 	+	'\',\''
      +	element.Servicios_artisticos_peluqueria 	+	'\',\''
      +	element.Elaboracion_artesanias 	+	'\',\''
      +	element.Empleo_integrantes_familia 	+	'\',\''
      +	element.Agricultura 	+	'\',\''
      +	element.Fuente_ingreso_otro_cual 	+	'\',\''
      +	element.Cultivo1 	+	'\',\''
      +	element.Cultivo2 	+	'\',\''
      +	element.Cultivo3 	+	'\',\''
      +	element.Cultivo4 	+	'\',\''
      +	element.Gastos_mes_arriendo 	+	'\',\''
      +	element.Gastos_mes_acueducto 	+	'\',\''
      +	element.Gastos_mes_alcantarillado 	+	'\',\''
      +	element.Gastos_mes_gas 	+	'\',\''
      +	element.Gastos_mes_salud 	+	'\',\''
      +	element.Gastos_mes_transporte 	+	'\',\''
      +	element.Gastos_mes_educacion 	+	'\',\''
      +	element.Gastos_mes_alimentacion 	+	'\',\''
      +	element.Gastos_mes_recreacion 	+	'\',\''
      +	element.Gastos_mes_vestuario 	+	'\',\''
      +	element.Gastos_mes_energia_electrica 	+	'\',\''
      +	element.Gastos_mes_otro_cual 	+	'\',\''
      +	element.Gastos_mes_total 	+	'\',\''
      +	element.Gastos_mes_otro_ban 	+	'\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deleteEconomia(element.Id_Economia).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Economia ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Economia', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Economia');
        }
      });
    } else {
      console.log('No Subir - Economia');
      var3++;
      if (var3 == this.Economia.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarServicios(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Servicios.length == 0) {
    console.log('Posicion Vacia - Servicios');
    cb(true);
  } else {
  this.Servicios.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - Servicios'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.servicios_publicos(Id_Servicio_Publico , Id_Encuesta , Id_Proyecto_Funcionario , Telefono_fijo_propio , Telefono_fijo_comunitario , Celular , Internet_comunitario , Internet_propio , Ninguna_anteriores , Acueducto_domiciliario_publico , Medidor_agua , Pila_medidor_agua_publica , Aljibe,Rio_quebrada_manantial_nacimiento,Pozo_dentro_vivienda,Agua_lluvia,Carrotanque,Aguatero_embotellada_bolsa,Inodoro_conectado_alcantarillado,Inodoro_conectado_pozo_septico,Inodoro_sin_conexion,Letrina,Vivienda_institucion_sin_servicio_sanitario,Sanitario_inodoro_otro_cual,Gas)' +
      ' VALUES (\''
      +	element.Id_Servicio_Publico	+	'\',\''
      +	element.Id_Encuesta	+	'\',\''
      +	element.Id_Proyecto_Funcionario	+	'\',\''
      +	element.Telefono_fijo_propio	+	'\',\''
      +	element.Telefono_fijo_comunitario	+	'\',\''
      +	element.Celular	+	'\',\''
      +	element.Internet_comunitario	+	'\',\''
      +	element.Internet_propio	+	'\',\''
      +	element.Ninguna_anteriores	+	'\',\''
      +	element.Acueducto_domiciliario_publico	+	'\',\''
      +	element.Medidor_agua	+	'\',\''
      +	element.Pila_medidor_agua_publica	+	'\',\''
      +	element.Aljibe	+	'\',\''
      +	element.Rio_quebrada_manantial_nacimiento	+	'\',\''
      +	element.Pozo_dentro_vivienda	+	'\',\''
      +	element.Agua_lluvia	+	'\',\''
      +	element.Carrotanque	+	'\',\''
      +	element.Aguatero_embotellada_bolsa	+	'\',\''
      +	element.Inodoro_conectado_alcantarillado	+	'\',\''
      +	element.Inodoro_conectado_pozo_septico	+	'\',\''
      +	element.Inodoro_sin_conexion	+	'\',\''
      +	element.Letrina	+	'\',\''
      +	element.Vivienda_institucion_sin_servicio_sanitario	+	'\',\''
      +	element.Sanitario_inodoro_otro_cual	+	'\',\''
      +	element.Gas	+	'\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deleteservicios(element.Id_Servicio_Publico).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Servicios ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Servicios', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Servicios');
        }
      });
    } else {
      console.log('No Subir - Servicios');
      var3++;
      if (var3 == this.Servicios.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarEconomiaE(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Economia.length == 0) {
    console.log('Posicion Vacia - Economia');
    cb(true);
  } else {
  this.Economia.map(element => {
    if (element.edit == 1) {
      var1++;
      const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.economia WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
      this.global.consultar(pdata2, (err5, response5) => {
      console.log(response5, 'DELETE');
      if (err5 == null && response5 == true) {
        console.log('Para Subir - Economia'); // quiery remoto - en servidor
        const query = 'INSERT INTO enterritoriobk.economia (Id_Economia, Id_Encuesta, Id_Proyecto_Funcionario, Ganaderia_caza_silvicultura_pesca, Explotacion_minas_canteras, Fabricacion_articulos_textiles_prendas_vestir, Construccion, Venta_productos_no_fabricados_hogar , Elaboracion_procesamiento_alimentos_bebidas, Servicio_restaurante_bar_similares, Alojamiento, Arrendamientos, Servicios_actividades_reparacion_mantenimiento, Servicios_artisticos_peluqueria, Elaboracion_artesanias, Empleo_integrantes_familia, Agricultura, Fuente_ingreso_otro_cual, Cultivo1, Cultivo2 , Cultivo3, Cultivo4, Gastos_mes_arriendo, Gastos_mes_acueducto, Gastos_mes_alcantarillado , Gastos_mes_gas, Gastos_mes_salud , Gastos_mes_transporte, Gastos_mes_educacion,Gastos_mes_alimentacion,Gastos_mes_recreacion,Gastos_mes_vestuario,Gastos_mes_energia_electrica,Gastos_mes_otro_cual,Gastos_mes_total,Gastos_mes_otro_ban )' +
      ' VALUES (\''
      +	element.Id_Economia 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario 	+	'\',\''
      +	element.Ganaderia_caza_silvicultura_pesca 	+	'\',\''
      +	element.Explotacion_minas_canteras 	+	'\',\''
      +	element.Fabricacion_articulos_textiles_prendas_vestir 	+	'\',\''
      +	element.Construccion 	+	'\',\''
      +	element.Venta_productos_no_fabricados_hogar 	+	'\',\''
      +	element.Elaboracion_procesamiento_alimentos_bebidas 	+	'\',\''
      +	element.Servicio_restaurante_bar_similares 	+	'\',\''
      +	element.Alojamiento 	+	'\',\''
      +	element.Arrendamientos 	+	'\',\''
      +	element.Servicios_actividades_reparacion_mantenimiento 	+	'\',\''
      +	element.Servicios_artisticos_peluqueria 	+	'\',\''
      +	element.Elaboracion_artesanias 	+	'\',\''
      +	element.Empleo_integrantes_familia 	+	'\',\''
      +	element.Agricultura 	+	'\',\''
      +	element.Fuente_ingreso_otro_cual 	+	'\',\''
      +	element.Cultivo1 	+	'\',\''
      +	element.Cultivo2 	+	'\',\''
      +	element.Cultivo3 	+	'\',\''
      +	element.Cultivo4 	+	'\',\''
      +	element.Gastos_mes_arriendo 	+	'\',\''
      +	element.Gastos_mes_acueducto 	+	'\',\''
      +	element.Gastos_mes_alcantarillado 	+	'\',\''
      +	element.Gastos_mes_gas 	+	'\',\''
      +	element.Gastos_mes_salud 	+	'\',\''
      +	element.Gastos_mes_transporte 	+	'\',\''
      +	element.Gastos_mes_educacion 	+	'\',\''
      +	element.Gastos_mes_alimentacion 	+	'\',\''
      +	element.Gastos_mes_recreacion 	+	'\',\''
      +	element.Gastos_mes_vestuario 	+	'\',\''
      +	element.Gastos_mes_energia_electrica 	+	'\',\''
      +	element.Gastos_mes_otro_cual 	+	'\',\''
      +	element.Gastos_mes_total 	+	'\',\''
      +	element.Gastos_mes_otro_ban 	+	'\');';
        const pdata1 = {option: 'insertar', texto: query};
        this.global.consultar(pdata1, (err, response) => {
          console.log(response, query);
          if (err == null && response == true) {
            this.db.deleteEconomia(element.Id_Economia).then((respuesta) => {
              var2++;
              console.log('Respuesta UPDATE Economia ', respuesta);
              if (var1 == var2) {
                cb(true);
              }
            }).catch((error) => {
              console.log('ERRORRRRRRR Economia', error);
              var2++;
              if (var1 == var2) {
                cb(true);
              }
            });
          } else {
            this.alert.AlertOneButton('Error', 'Error al subir registro Economia');
          }
        });
      }
    });
    } else {
      console.log('No Subir - Economia');
      var3++;
      if (var3 == this.Economia.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarServiciosE(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Servicios.length == 0) {
    console.log('Posicion Vacia - Servicios');
    cb(true);
  } else {
  this.Servicios.map(element => {
    if (element.edit == 1) {
      var1++;
      const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.servicios_publicos WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
      this.global.consultar(pdata2, (err5, response5) => {
      console.log(response5, 'DELETE');
      if (err5 == null && response5 == true) {
        console.log('Para Subir - Servicios'); // quiery remoto - en servidor
        const query = 'INSERT INTO enterritoriobk.servicios_publicos(Id_Servicio_Publico , Id_Encuesta , Id_Proyecto_Funcionario , Telefono_fijo_propio , Telefono_fijo_comunitario , Celular , Internet_comunitario , Internet_propio , Ninguna_anteriores , Acueducto_domiciliario_publico , Medidor_agua , Pila_medidor_agua_publica , Aljibe,Rio_quebrada_manantial_nacimiento,Pozo_dentro_vivienda,Agua_lluvia,Carrotanque,Aguatero_embotellada_bolsa,Inodoro_conectado_alcantarillado,Inodoro_conectado_pozo_septico,Inodoro_sin_conexion,Letrina,Vivienda_institucion_sin_servicio_sanitario,Sanitario_inodoro_otro_cual,Gas , upload,edit)' +
      ' VALUES (\''
      +	element.Id_Servicio_Publico	+	'\',\''
      +	element.Id_Encuesta	+	'\',\''
      +	element.Id_Proyecto_Funcionario	+	'\',\''
      +	element.Telefono_fijo_propio	+	'\',\''
      +	element.Telefono_fijo_comunitario	+	'\',\''
      +	element.Celular	+	'\',\''
      +	element.Internet_comunitario	+	'\',\''
      +	element.Internet_propio	+	'\',\''
      +	element.Ninguna_anteriores	+	'\',\''
      +	element.Acueducto_domiciliario_publico	+	'\',\''
      +	element.Medidor_agua	+	'\',\''
      +	element.Pila_medidor_agua_publica	+	'\',\''
      +	element.Aljibe	+	'\',\''
      +	element.Rio_quebrada_manantial_nacimiento	+	'\',\''
      +	element.Pozo_dentro_vivienda	+	'\',\''
      +	element.Agua_lluvia	+	'\',\''
      +	element.Carrotanque	+	'\',\''
      +	element.Aguatero_embotellada_bolsa	+	'\',\''
      +	element.Inodoro_conectado_alcantarillado	+	'\',\''
      +	element.Inodoro_conectado_pozo_septico	+	'\',\''
      +	element.Inodoro_sin_conexion	+	'\',\''
      +	element.Letrina	+	'\',\''
      +	element.Vivienda_institucion_sin_servicio_sanitario	+	'\',\''
      +	element.Sanitario_inodoro_otro_cual	+	'\',\''
      +	element.Gas	+	'\',\''
      + 1 + '\',\''
      + 0 + ');';
        const pdata1 = {option: 'insertar', texto: query};
        this.global.consultar(pdata1, (err, response) => {
          console.log(response, query);
          if (err == null && response == true) {
            this.db.deleteservicios(element.Id_Servicio_Publico).then((respuesta) => {
              var2++;
              console.log('Respuesta UPDATE Servicios ', respuesta);
              if (var1 == var2) {
                cb(true);
              }
            }).catch((error) => {
              console.log('ERRORRRRRRR Servicios', error);
              var2++;
              if (var1 == var2) {
                cb(true);
              }
            });
          } else {
            this.alert.AlertOneButton('Error', 'Error al subir registro Servicios');
          }
        });
      }
    });
    } else {
      console.log('No Subir - Servicios');
      var3++;
      if (var3 == this.Servicios.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarSociodemoE(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Sociodemo.length == 0) {
    console.log('Posicion Vacia - Sociocultural12');
    cb(true);
  } else {
  this.Sociodemo.map(element => {
    if (element.edit == 1) {
      var1++;
      const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.c_sociodemograficas WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
      this.global.consultar(pdata2, (err5, response5) => {
      console.log(response5, 'DELETE');
      if (err5 == null && response5 == true) {
      console.log('Para Subir - Sociodemográficas'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.c_sociodemograficas(Id_CaracteristicaS , Id_Encuesta , Id_Proyecto_Funcionario , Parentesco , Anos_cumplidos , Permanencia_vivienda , Sexo , Ocupacion , Ingresos_vivienda , Nivel_educacion , Reconocimiento , Registro_victimas , Lengua_nativa , Nombre_lengua_nativa , Problemas_uso_lena , Organizacion , Nombre_organizacion , Labores_Lab_domesticas_ninas , Labores_pagosycompras_ninas , Labores_lab_finca_ninas , Labores_transporte_ninas , Labores_admon_finca_ninas , Labores_comercia_ninas , Labores_estudia_ninas , Labores_formacion_hijos_ninas , Labores_cuiado_mayores_enfermos_ninas , Labores_otro_cual_ninas , Labores_Lab_domesticas_ninos , Labores_pagosycompras_ninos,Labores_lab_finca_ninos,Labores_transporte_ninos,Labores_admon_finca_ninos,Labores_comercia_ninos,Labores_estudia_ninos,Labores_formacion_hijos_ninos,Labores_cuiado_mayores_enfermos_ninos,Labores_otro_cual_ninos,Labores_Lab_domesticas_mujeres,Labores_pagosycompras_mujeres,Labores_lab_finca_mujeres,Labores_transporte_mujeres,Labores_admon_finca_mujeres,Labores_comercia_mujeres,Labores_estudia_mujeres,Labores_formacion_hijos_mujeres,Labores_cuiado_mayores_enfermos_mujeres,Labores_otro_cual_mujeres,Labores_Lab_domesticas_hombres,Labores_pagosycompras_hombres,Labores_lab_finca_hombres,Labores_transporte_hombres,Labores_admon_finca_hombres,Labores_comercia_hombres,Labores_estudia_hombres,Labores_formacion_hijos_hombres,Labores_cuiado_mayores_enfermos_hombres,Labores_otro_cual_hombres , upload,edit)' +
      ' VALUES (\''
      +	element.Id_CaracteristicaS 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario 	+	'\',\''
      +	element.Parentesco 	+	'\',\''
      +	element.Anos_cumplidos 	+	'\',\''
      +	element.Permanencia_vivienda 	+	'\',\''
      +	element.Sexo 	+	'\',\''
      +	element.Ocupacion 	+	'\',\''
      +	element.Ingresos_vivienda 	+	'\',\''
      +	element.Nivel_educacion 	+	'\',\''
      +	element.Reconocimiento 	+	'\',\''
      +	element.Registro_victimas 	+	'\',\''
      +	element.Lengua_nativa 	+	'\',\''
      +	element.Nombre_lengua_nativa 	+	'\',\''
      +	element.Problemas_uso_lena 	+	'\',\''
      +	element.Organizacion 	+	'\',\''
      +	element.Nombre_organizacion 	+	'\',\''
      +	element.Labores_Lab_domesticas_ninas 	+	'\',\''
      +	element.Labores_pagosycompras_ninas 	+	'\',\''
      +	element.Labores_lab_finca_ninas 	+	'\',\''
      +	element.Labores_transporte_ninas 	+	'\',\''
      +	element.Labores_admon_finca_ninas 	+	'\',\''
      +	element.Labores_comercia_ninas 	+	'\',\''
      +	element.Labores_estudia_ninas 	+	'\',\''
      +	element.Labores_formacion_hijos_ninas 	+	'\',\''
      +	element.Labores_cuiado_mayores_enfermos_ninas 	+	'\',\''
      +	element.Labores_otro_cual_ninas 	+	'\',\''
      +	element.Labores_Lab_domesticas_ninos 	+	'\',\''
      +	element.Labores_pagosycompras_ninos 	+	'\',\''
      +	element.Labores_lab_finca_ninos 	+	'\',\''
      +	element.Labores_transporte_ninos 	+	'\',\''
      +	element.Labores_admon_finca_ninos 	+	'\',\''
      +	element.Labores_comercia_ninos 	+	'\',\''
      +	element.Labores_estudia_ninos 	+	'\',\''
      +	element.Labores_formacion_hijos_ninos 	+	'\',\''
      +	element.Labores_cuiado_mayores_enfermos_ninos 	+	'\',\''
      +	element.Labores_otro_cual_ninos 	+	'\',\''
      +	element.Labores_Lab_domesticas_mujeres 	+	'\',\''
      +	element.Labores_pagosycompras_mujeres 	+	'\',\''
      +	element.Labores_lab_finca_mujeres 	+	'\',\''
      +	element.Labores_transporte_mujeres 	+	'\',\''
      +	element.Labores_admon_finca_mujeres 	+	'\',\''
      +	element.Labores_comercia_mujeres 	+	'\',\''
      +	element.Labores_estudia_mujeres 	+	'\',\''
      +	element.Labores_formacion_hijos_mujeres 	+	'\',\''
      +	element.Labores_cuiado_mayores_enfermos_mujeres 	+	'\',\''
      +	element.Labores_otro_cual_mujeres 	+	'\',\''
      +	element.Labores_Lab_domesticas_hombres 	+	'\',\''
      +	element.Labores_pagosycompras_hombres 	+	'\',\''
      +	element.Labores_lab_finca_hombres 	+	'\',\''
      +	element.Labores_transporte_hombres 	+	'\',\''
      +	element.Labores_admon_finca_hombres 	+	'\',\''
      +	element.Labores_comercia_hombres 	+	'\',\''
      +	element.Labores_estudia_hombres 	+	'\',\''
      +	element.Labores_formacion_hijos_hombres 	+	'\',\''
      +	element.Labores_cuiado_mayores_enfermos_hombres 	+	'\',\''
      +	element.Labores_otro_cual_hombres 	+	'\',\''
      + 1 + '\',\''
      + 0 + ');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deletesociodemo(element.idsociocultural12 ).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Sociodemográficas ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Sociodemográficas', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Sociodemográficas');
        }
      });
      }
    });
    } else {
      console.log('No Subir - Sociodemográficas');
      var3++;
      if (var3 == this.Sociodemo.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarEnergiaE(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Energia.length == 0) {
    console.log('Posicion Vacia - Energia');
    cb(true);
  } else {
  this.Energia.map(element => {
    if (element.edit == 1) {
      var1++;
      const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.energia WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
      this.global.consultar(pdata2, (err5, response5) => {
      console.log(response5, 'DELETE');
      if (err5 == null && response5 == true) {
        console.log('Para Subir - Energia'); // quiery remoto - en servidor
        const query = 'INSERT INTO enterritoriobk.energia(Id_Energia , Id_Encuesta , Id_Proyecto_Funcionario , FE_electrica , FE_cocinar_gaspropano_consumo_mes , FE_cocinar_gasnatural_consumo_mes , FE_cocinar_gasolina_consumo_mes , FE_cocinar_kerosene_consumo_mes , FE_cocinar_petroleo_consumo_mes , FE_cocinar_alcohol_consumo_mes , FE_cocinar_carbon_mineral_consumo_mes , FE_cocinar_lena_comprada_consumo_mes , FE_cocinar_lena_auto_apropiada_consumo_mes , FE_cocinar_residuos_agro_consumo_mes , FE_cocinar_otro_consumo_mes , FE_cocinar_gaspropano_costo_mes , FE_cocinar_gasnatural_costo_mes , FE_cocinar_gasolina_costo_mes , FE_cocinar_kerosene_costo_mes , FE_cocinar_petroleo_costo_mes , FE_cocinar_alcohol_costo_mes , FE_cocinar_carbon_mineral_costo_mes , FE_cocinar_lena_comprada_costo_mes , FE_cocinar_lena_auto_apropiada_costo_mes , FE_cocinar_residuos_agro_costo_mes , FE_cocinar_otro_cual_costo_mes , FE_cocinar_prefiere, FE_cocinar_otros_ban, FE_iluminar_bateria_consumo_mes , FE_iluminar_planta_gasolina_consumo_mes , FE_iluminar_kerosene_consumo_mes , FE_iluminar_petroleo_consumo_mes , FE_iluminar_alcohol_consumo_mes , FE_iluminar_planta_diesel_consumo_mes , FE_iluminar_velas_consumo_mes , FE_iluminar_otro_consumo_mes , FE_iluminar_bateria_costo_mes , FE_iluminar_planta_gasolina_costo_mes , FE_iluminar_kerosene_costo_mes , FE_iluminar_petroleo_costo_mes , FE_iluminar_alcohol_costo_mes , FE_iluminar_planta_diesel_costo_mes , FE_iluminar_velas_costo_mes , FE_iluminar_otro_costo_mes , FE_iluminar_bateria_localizacion , FE_iluminar_planta_gasolina_localizacion , FE_iluminar_kerosene_localizacion , FE_iluminar_petroleo_localizacion , FE_iluminar_alcohol_localizacion,FE_iluminar_planta_diesel_localizacion,FE_iluminar_velas_localizacion,FE_iluminar_otro_localizacion, FE_iluminar_otro_ban, FE_iluminar_usa,Equipos_aire_acondicionado_tiene,Equipos_ventilador_tiene,Equipos_radio_tiene,Equipos_televisor_tiene,Equipos_dvd_tiene,Equipos_computador_tiene,Equipos_impresora_tiene,Equipos_celular_tiene,Equipos_motobomba_tiene,Equipos_licuadora_tiene,Equipos_nevera_tiene,Equipos_congelador_tiene,Equipos_iluminacion_tiene,Equipos_emprendimiento_tiene,Equipos_otros_tiene,Equipos_aire_acondicionado_necesita,Equipos_ventilador_necesita,Equipos_radio_necesita,Equipos_televisor_necesita,Equipos_dvd_necesita,Equipos_computador_necesita,Equipos_impresora_necesita,Equipos_celular_necesita,Equipos_motobomba_necesita,Equipos_licuadora_necesita,,Equipos_nevera_necesita,Equipos_congelador_necesita,Equipos_iluminacion_necesita,Equipos_emprendimiento_necesita,Equipos_otros_necesita,Contaminacion_ruido,Contaminacion_olores,Planea_implementar_proyecto,Cual_proyecto,Requiere_energia_proyecto, tarifa_mensual, Voluntad_de_pago)' +
      ' VALUES (\''
      +	element.Id_Energia 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario 	+	'\',\''
      +	element.FE_electrica 	+	'\',\''
      +	element.FE_cocinar_gaspropano_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_gasnatural_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_gasolina_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_kerosene_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_petroleo_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_alcohol_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_carbon_mineral_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_lena_comprada_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_lena_auto_apropiada_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_residuos_agro_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_otro_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_gaspropano_costo_mes 	+	'\',\''
      +	element.FE_cocinar_gasnatural_costo_mes 	+	'\',\''
      +	element.FE_cocinar_gasolina_costo_mes 	+	'\',\''
      +	element.FE_cocinar_kerosene_costo_mes 	+	'\',\''
      +	element.FE_cocinar_petroleo_costo_mes 	+	'\',\''
      +	element.FE_cocinar_alcohol_costo_mes 	+	'\',\''
      +	element.FE_cocinar_carbon_mineral_costo_mes 	+	'\',\''
      +	element.FE_cocinar_lena_comprada_costo_mes 	+	'\',\''
      +	element.FE_cocinar_lena_auto_apropiada_costo_mes 	+	'\',\''
      +	element.FE_cocinar_residuos_agro_costo_mes 	+	'\',\''
      +	element.FE_cocinar_otro_cual_costo_mes 	+	'\',\''
      +	element.FE_cocinar_prefiere 	+	'\',\''
      +	element.FE_cocinar_otros_ban 	+	'\',\''
      +	element.FE_iluminar_bateria_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_planta_gasolina_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_kerosene_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_petroleo_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_alcohol_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_planta_diesel_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_velas_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_otro_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_bateria_costo_mes 	+	'\',\''
      +	element.FE_iluminar_planta_gasolina_costo_mes 	+	'\',\''
      +	element.FE_iluminar_kerosene_costo_mes 	+	'\',\''
      +	element.FE_iluminar_petroleo_costo_mes 	+	'\',\''
      +	element.FE_iluminar_alcohol_costo_mes 	+	'\',\''
      +	element.FE_iluminar_planta_diesel_costo_mes 	+	'\',\''
      +	element.FE_iluminar_velas_costo_mes 	+	'\',\''
      +	element.FE_iluminar_otro_costo_mes 	+	'\',\''
      +	element.FE_iluminar_bateria_localizacion 	+	'\',\''
      +	element.FE_iluminar_planta_gasolina_localizacion 	+	'\',\''
      +	element.FE_iluminar_kerosene_localizacion 	+	'\',\''
      +	element.FE_iluminar_petroleo_localizacion 	+	'\',\''
      +	element.FE_iluminar_alcohol_localizacion 	+	'\',\''
      +	element.FE_iluminar_planta_diesel_localizacion 	+	'\',\''
      +	element.FE_iluminar_velas_localizacion 	+	'\',\''
      +	element.FE_iluminar_otro_localizacion 	+	'\',\''
      +	element.FE_iluminar_otro_ban 	+	'\',\''
      +	element.FE_iluminar_usa 	+	'\',\''
      +	element.Equipos_aire_acondicionado_tiene 	+	'\',\''
      +	element.Equipos_ventilador_tiene 	+	'\',\''
      +	element.Equipos_radio_tiene 	+	'\',\''
      +	element.Equipos_televisor_tiene 	+	'\',\''
      +	element.Equipos_dvd_tiene 	+	'\',\''
      +	element.Equipos_computador_tiene 	+	'\',\''
      +	element.Equipos_impresora_tiene 	+	'\',\''
      +	element.Equipos_celular_tiene 	+	'\',\''
      +	element.Equipos_motobomba_tiene 	+	'\',\''
      +	element.Equipos_licuadora_tiene 	+	'\',\''
      +	element.Equipos_nevera_tiene 	+	'\',\''
      +	element.Equipos_congelador_tiene 	+	'\',\''
      +	element.Equipos_iluminacion_tiene 	+	'\',\''
      +	element.Equipos_emprendimiento_tiene 	+	'\',\''
      +	element.Equipos_otros_tiene 	+	'\',\''
      +	element.Equipos_aire_acondicionado_necesita 	+	'\',\''
      +	element.Equipos_ventilador_necesita 	+	'\',\''
      +	element.Equipos_radio_necesita 	+	'\',\''
      +	element.Equipos_televisor_necesita 	+	'\',\''
      +	element.Equipos_dvd_necesita 	+	'\',\''
      +	element.Equipos_computador_necesita 	+	'\',\''
      +	element.Equipos_impresora_necesita 	+	'\',\''
      +	element.Equipos_celular_necesita 	+	'\',\''
      +	element.Equipos_motobomba_necesita 	+	'\',\''
      +	element.Equipos_licuadora_necesita 	+	'\',\''
      +	element.Equipos_nevera_necesita 	+	'\',\''
      +	element.Equipos_congelador_necesita 	+	'\',\''
      +	element.Equipos_iluminacion_necesita 	+	'\',\''
      +	element.Equipos_emprendimiento_necesita 	+	'\',\''
      +	element.Equipos_otros_necesita 	+	'\',\''
      +	element.Contaminacion_ruido 	+	'\',\''
      +	element.Contaminacion_olores 	+	'\',\''
      +	element.Planea_implementar_proyecto 	+	'\',\''
      +	element.Cual_proyecto 	+	'\',\''
      +	element.Requiere_energia_proyecto 	+	'\',\''
      +	element.tarifa_mensual 	+	'\',\''
      +	element.Voluntad_de_pago 	+	'\');';
        const pdata1 = {option: 'insertar', texto: query};
        this.global.consultar(pdata1, (err, response) => {
          console.log(response, query);
          if (err == null && response == true) {
            this.db.deleteEnergia(element.idenergia).then((respuesta) => {
              var2++;
              console.log('Respuesta UPDATE Energia ', respuesta);
              if (var1 == var2) {
                cb(true);
              }
            }).catch((error) => {
              console.log('ERRORRRRRRR Energia', error);
              var2++;
              if (var1 == var2) {
                cb(true);
              }
            });
          } else {
            this.alert.AlertOneButton('Error', 'Error al subir registro Energia');
          }
        });
      }
    });
    } else {
      console.log('No Subir - Energia');
      var3++;
      if (var3 == this.Energia.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarRacional(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Racional.length == 0) {
    console.log('Posicion Vacia - URE');
    cb(true);
  } else {
  this.Racional.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - URE'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.URE(Id_URE , Id_Encuesta , Id_Proyecto_Funcionario , Uso_adecuado_energia , Escuchado_uso_racional_energia , Conocer_generacionyuso_energia , Temas_generacionyuso_energia , Compartir_saberes)' +
      ' VALUES (\''
      +	element.Id_URE 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario	+	'\',\''
      +	element.Uso_adecuado_energia 	+	'\',\''
      +	element.Escuchado_uso_racional_energia 	+	'\',\''
      +	element.Conocer_generacionyuso_energia 	+	'\',\''
      +	element.Temas_generacionyuso_energia 	+	'\',\''
      +	element.Compartir_saberes 	+	'\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deleteracional(element.Id_URE).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE URE ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR URE', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro URE');
        }
      });
    } else {
      console.log('No Subir - URE');
      var3++;
      if (var3 == this.Racional.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarTerm(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Termi.length == 0) {
    console.log('Posicion Vacia - Porcentaje');
    cb(true);
  } else {
  this.Termi.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - Porcentaje'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.porcentaje(Id , Id_Encuesta , Id_Proyecto_Funcionario , Porcentaje , IsTerm , Fecha_Term)' +
      ' VALUES (\''
      +	element.Id 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario	+	'\',\''
      +	element.Porcentaje 	+	'\',\''
      +	element.IsTerm 	+	'\',\''
      +	element.Fecha_Term 	+	'\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deletetermi(element.Id).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE URE ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Porcentaje', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Porcentaje');
        }
      });
    } else {
      console.log('No Subir - Porcentaje');
      var3++;
      if (var3 == this.Termi.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarTransporte(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Transportev.length == 0) {
    console.log('Posicion Vacia - Transporte');
    cb(true);
  } else {
    this.Transportev.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - Transporte'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.transporte(Id_Transporte,Id_Proyecto_Funcionario,Id_Lugares,Costo_viaje,Medio_viaje,Tiempo_viaje,Fecha)' +
      ' VALUES (\''
      +	element.Id_Transporte 	+	'\',\''
      +	element.Id_Proyecto_Funcionario	+	'\',\''
      +	element.Id_Lugares 	+	'\',\''
      +	element.Costo_viaje 	+	'\',\''
      +	element.Medio_viaje 	+	'\',\''
      +	element.Tiempo_viaje 	+	'\',\''
      +	element.Fecha 	+	'\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deletetransporte(element.Id_Transporte).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Transporte ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Transporte', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Transporte');
        }
      });
    } else {
      console.log('No Subir - Transporte');
      var3++;
      if (var3 == this.Transportev.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarSociodemo(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Sociodemo.length == 0) {
    console.log('Posicion Vacia - c_sociodemograficas');
    cb(true);
  } else {
  this.Sociodemo.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - Sociodemográficas'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.c_sociodemograficas(Id_CaracteristicaS , Id_Encuesta , Id_Proyecto_Funcionario , Parentesco , Anos_cumplidos , Permanencia_vivienda , Sexo , Ocupacion , Ingresos_vivienda , Nivel_educacion , Reconocimiento , Registro_victimas , Lengua_nativa , Nombre_lengua_nativa , Problemas_uso_lena , Organizacion , Nombre_organizacion , Labores_Lab_domesticas_ninas , Labores_pagosycompras_ninas , Labores_lab_finca_ninas , Labores_transporte_ninas , Labores_admon_finca_ninas , Labores_comercia_ninas , Labores_estudia_ninas , Labores_formacion_hijos_ninas , Labores_cuiado_mayores_enfermos_ninas , Labores_otro_cual_ninas , Labores_Lab_domesticas_ninos , Labores_pagosycompras_ninos,Labores_lab_finca_ninos,Labores_transporte_ninos,Labores_admon_finca_ninos,Labores_comercia_ninos,Labores_estudia_ninos,Labores_formacion_hijos_ninos,Labores_cuiado_mayores_enfermos_ninos,Labores_otro_cual_ninos,Labores_Lab_domesticas_mujeres,Labores_pagosycompras_mujeres,Labores_lab_finca_mujeres,Labores_transporte_mujeres,Labores_admon_finca_mujeres,Labores_comercia_mujeres,Labores_estudia_mujeres,Labores_formacion_hijos_mujeres,Labores_cuiado_mayores_enfermos_mujeres,Labores_otro_cual_mujeres,Labores_Lab_domesticas_hombres,Labores_pagosycompras_hombres,Labores_lab_finca_hombres,Labores_transporte_hombres,Labores_admon_finca_hombres,Labores_comercia_hombres,Labores_estudia_hombres,Labores_formacion_hijos_hombres,Labores_cuiado_mayores_enfermos_hombres,Labores_otro_cual_hombres)' +
      ' VALUES (\''
      +	element.Id_CaracteristicaS 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario 	+	'\',\''
      +	element.Parentesco 	+	'\',\''
      +	element.Anos_cumplidos 	+	'\',\''
      +	element.Permanencia_vivienda 	+	'\',\''
      +	element.Sexo 	+	'\',\''
      +	element.Ocupacion 	+	'\',\''
      +	element.Ingresos_vivienda 	+	'\',\''
      +	element.Nivel_educacion 	+	'\',\''
      +	element.Reconocimiento 	+	'\',\''
      +	element.Registro_victimas 	+	'\',\''
      +	element.Lengua_nativa 	+	'\',\''
      +	element.Nombre_lengua_nativa 	+	'\',\''
      +	element.Problemas_uso_lena 	+	'\',\''
      +	element.Organizacion 	+	'\',\''
      +	element.Nombre_organizacion 	+	'\',\''
      +	element.Labores_Lab_domesticas_ninas 	+	'\',\''
      +	element.Labores_pagosycompras_ninas 	+	'\',\''
      +	element.Labores_lab_finca_ninas 	+	'\',\''
      +	element.Labores_transporte_ninas 	+	'\',\''
      +	element.Labores_admon_finca_ninas 	+	'\',\''
      +	element.Labores_comercia_ninas 	+	'\',\''
      +	element.Labores_estudia_ninas 	+	'\',\''
      +	element.Labores_formacion_hijos_ninas 	+	'\',\''
      +	element.Labores_cuiado_mayores_enfermos_ninas 	+	'\',\''
      +	element.Labores_otro_cual_ninas 	+	'\',\''
      +	element.Labores_Lab_domesticas_ninos 	+	'\',\''
      +	element.Labores_pagosycompras_ninos 	+	'\',\''
      +	element.Labores_lab_finca_ninos 	+	'\',\''
      +	element.Labores_transporte_ninos 	+	'\',\''
      +	element.Labores_admon_finca_ninos 	+	'\',\''
      +	element.Labores_comercia_ninos 	+	'\',\''
      +	element.Labores_estudia_ninos 	+	'\',\''
      +	element.Labores_formacion_hijos_ninos 	+	'\',\''
      +	element.Labores_cuiado_mayores_enfermos_ninos 	+	'\',\''
      +	element.Labores_otro_cual_ninos 	+	'\',\''
      +	element.Labores_Lab_domesticas_mujeres 	+	'\',\''
      +	element.Labores_pagosycompras_mujeres 	+	'\',\''
      +	element.Labores_lab_finca_mujeres 	+	'\',\''
      +	element.Labores_transporte_mujeres 	+	'\',\''
      +	element.Labores_admon_finca_mujeres 	+	'\',\''
      +	element.Labores_comercia_mujeres 	+	'\',\''
      +	element.Labores_estudia_mujeres 	+	'\',\''
      +	element.Labores_formacion_hijos_mujeres 	+	'\',\''
      +	element.Labores_cuiado_mayores_enfermos_mujeres 	+	'\',\''
      +	element.Labores_otro_cual_mujeres 	+	'\',\''
      +	element.Labores_Lab_domesticas_hombres 	+	'\',\''
      +	element.Labores_pagosycompras_hombres 	+	'\',\''
      +	element.Labores_lab_finca_hombres 	+	'\',\''
      +	element.Labores_transporte_hombres 	+	'\',\''
      +	element.Labores_admon_finca_hombres 	+	'\',\''
      +	element.Labores_comercia_hombres 	+	'\',\''
      +	element.Labores_estudia_hombres 	+	'\',\''
      +	element.Labores_formacion_hijos_hombres 	+	'\',\''
      +	element.Labores_cuiado_mayores_enfermos_hombres 	+	'\',\''
      +	element.Labores_otro_cual_hombres 	+	'\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deletesociodemo(element.Id_CaracteristicaS ).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Sociodemográficas ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Sociodemográficas', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Sociodemográficas');
        }
      });
    } else {
      console.log('No Subir - Sociodemográficas');
      var3++;
      if (var3 == this.Sociodemo.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarEnergia(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Energia.length == 0) {
    console.log('Posicion Vacia - Energia');
    cb(true);
  } else {
  this.Energia.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - Energia'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.energia(Id_Energia , Id_Encuesta , Id_Proyecto_Funcionario , FE_electrica , FE_cocinar_gaspropano_consumo_mes , FE_cocinar_gasnatural_consumo_mes , FE_cocinar_gasolina_consumo_mes , FE_cocinar_kerosene_consumo_mes , FE_cocinar_petroleo_consumo_mes , FE_cocinar_alcohol_consumo_mes , FE_cocinar_carbon_mineral_consumo_mes , FE_cocinar_lena_comprada_consumo_mes , FE_cocinar_lena_auto_apropiada_consumo_mes , FE_cocinar_residuos_agro_consumo_mes , FE_cocinar_otro_consumo_mes , FE_cocinar_gaspropano_costo_mes , FE_cocinar_gasnatural_costo_mes , FE_cocinar_gasolina_costo_mes , FE_cocinar_kerosene_costo_mes , FE_cocinar_petroleo_costo_mes , FE_cocinar_alcohol_costo_mes , FE_cocinar_carbon_mineral_costo_mes , FE_cocinar_lena_comprada_costo_mes , FE_cocinar_lena_auto_apropiada_costo_mes , FE_cocinar_residuos_agro_costo_mes , FE_cocinar_otro_cual_costo_mes , FE_cocinar_prefiere, FE_cocinar_otros_ban, FE_iluminar_bateria_consumo_mes , FE_iluminar_planta_gasolina_consumo_mes , FE_iluminar_kerosene_consumo_mes , FE_iluminar_petroleo_consumo_mes , FE_iluminar_alcohol_consumo_mes , FE_iluminar_planta_diesel_consumo_mes , FE_iluminar_velas_consumo_mes , FE_iluminar_otro_consumo_mes , FE_iluminar_bateria_costo_mes , FE_iluminar_planta_gasolina_costo_mes , FE_iluminar_kerosene_costo_mes , FE_iluminar_petroleo_costo_mes , FE_iluminar_alcohol_costo_mes , FE_iluminar_planta_diesel_costo_mes , FE_iluminar_velas_costo_mes , FE_iluminar_otro_costo_mes , FE_iluminar_bateria_localizacion , FE_iluminar_planta_gasolina_localizacion , FE_iluminar_kerosene_localizacion , FE_iluminar_petroleo_localizacion , FE_iluminar_alcohol_localizacion,FE_iluminar_planta_diesel_localizacion,FE_iluminar_velas_localizacion,FE_iluminar_otro_localizacion, FE_iluminar_otro_ban, FE_iluminar_usa,Equipos_aire_acondicionado_tiene,Equipos_ventilador_tiene,Equipos_radio_tiene,Equipos_televisor_tiene,Equipos_dvd_tiene,Equipos_computador_tiene,Equipos_impresora_tiene,Equipos_celular_tiene,Equipos_motobomba_tiene,Equipos_licuadora_tiene,Equipos_nevera_tiene,Equipos_congelador_tiene,Equipos_iluminacion_tiene,Equipos_emprendimiento_tiene,Equipos_otros_tiene,Equipos_aire_acondicionado_necesita,Equipos_ventilador_necesita,Equipos_radio_necesita,Equipos_televisor_necesita,Equipos_dvd_necesita,Equipos_computador_necesita,Equipos_impresora_necesita,Equipos_celular_necesita,Equipos_motobomba_necesita,Equipos_licuadora_necesita,Equipos_nevera_necesita,Equipos_congelador_necesita,Equipos_iluminacion_necesita,Equipos_emprendimiento_necesita,Equipos_otros_necesita,Contaminacion_ruido,Contaminacion_olores,Planea_implementar_proyecto,Cual_proyecto,Requiere_energia_proyecto, tarifa_mensual, Voluntad_de_pago)' +
      ' VALUES (\''
      +	element.Id_Energia 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario 	+	'\',\''
      +	element.FE_electrica 	+	'\',\''
      +	element.FE_cocinar_gaspropano_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_gasnatural_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_gasolina_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_kerosene_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_petroleo_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_alcohol_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_carbon_mineral_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_lena_comprada_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_lena_auto_apropiada_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_residuos_agro_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_otro_consumo_mes 	+	'\',\''
      +	element.FE_cocinar_gaspropano_costo_mes 	+	'\',\''
      +	element.FE_cocinar_gasnatural_costo_mes 	+	'\',\''
      +	element.FE_cocinar_gasolina_costo_mes 	+	'\',\''
      +	element.FE_cocinar_kerosene_costo_mes 	+	'\',\''
      +	element.FE_cocinar_petroleo_costo_mes 	+	'\',\''
      +	element.FE_cocinar_alcohol_costo_mes 	+	'\',\''
      +	element.FE_cocinar_carbon_mineral_costo_mes 	+	'\',\''
      +	element.FE_cocinar_lena_comprada_costo_mes 	+	'\',\''
      +	element.FE_cocinar_lena_auto_apropiada_costo_mes 	+	'\',\''
      +	element.FE_cocinar_residuos_agro_costo_mes 	+	'\',\''
      +	element.FE_cocinar_otro_cual_costo_mes 	+	'\',\''
      +	element.FE_cocinar_prefiere 	+	'\',\''
      +	element.FE_cocinar_otros_ban 	+	'\',\''
      +	element.FE_iluminar_bateria_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_planta_gasolina_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_kerosene_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_petroleo_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_alcohol_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_planta_diesel_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_velas_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_otro_consumo_mes 	+	'\',\''
      +	element.FE_iluminar_bateria_costo_mes 	+	'\',\''
      +	element.FE_iluminar_planta_gasolina_costo_mes 	+	'\',\''
      +	element.FE_iluminar_kerosene_costo_mes 	+	'\',\''
      +	element.FE_iluminar_petroleo_costo_mes 	+	'\',\''
      +	element.FE_iluminar_alcohol_costo_mes 	+	'\',\''
      +	element.FE_iluminar_planta_diesel_costo_mes 	+	'\',\''
      +	element.FE_iluminar_velas_costo_mes 	+	'\',\''
      +	element.FE_iluminar_otro_costo_mes 	+	'\',\''
      +	element.FE_iluminar_bateria_localizacion 	+	'\',\''
      +	element.FE_iluminar_planta_gasolina_localizacion 	+	'\',\''
      +	element.FE_iluminar_kerosene_localizacion 	+	'\',\''
      +	element.FE_iluminar_petroleo_localizacion 	+	'\',\''
      +	element.FE_iluminar_alcohol_localizacion 	+	'\',\''
      +	element.FE_iluminar_planta_diesel_localizacion 	+	'\',\''
      +	element.FE_iluminar_velas_localizacion 	+	'\',\''
      +	element.FE_iluminar_otro_localizacion 	+	'\',\''
      +	element.FE_iluminar_otro_ban 	+	'\',\''
      +	element.FE_iluminar_usa 	+	'\',\''
      +	element.Equipos_aire_acondicionado_tiene 	+	'\',\''
      +	element.Equipos_ventilador_tiene 	+	'\',\''
      +	element.Equipos_radio_tiene 	+	'\',\''
      +	element.Equipos_televisor_tiene 	+	'\',\''
      +	element.Equipos_dvd_tiene 	+	'\',\''
      +	element.Equipos_computador_tiene 	+	'\',\''
      +	element.Equipos_impresora_tiene 	+	'\',\''
      +	element.Equipos_celular_tiene 	+	'\',\''
      +	element.Equipos_motobomba_tiene 	+	'\',\''
      +	element.Equipos_licuadora_tiene 	+	'\',\''
      +	element.Equipos_nevera_tiene 	+	'\',\''
      +	element.Equipos_congelador_tiene 	+	'\',\''
      +	element.Equipos_iluminacion_tiene 	+	'\',\''
      +	element.Equipos_emprendimiento_tiene 	+	'\',\''
      +	element.Equipos_otros_tiene 	+	'\',\''
      +	element.Equipos_aire_acondicionado_necesita 	+	'\',\''
      +	element.Equipos_ventilador_necesita 	+	'\',\''
      +	element.Equipos_radio_necesita 	+	'\',\''
      +	element.Equipos_televisor_necesita 	+	'\',\''
      +	element.Equipos_dvd_necesita 	+	'\',\''
      +	element.Equipos_computador_necesita 	+	'\',\''
      +	element.Equipos_impresora_necesita 	+	'\',\''
      +	element.Equipos_celular_necesita 	+	'\',\''
      +	element.Equipos_motobomba_necesita 	+	'\',\''
      +	element.Equipos_licuadora_necesita 	+	'\',\''
      +	element.Equipos_nevera_necesita 	+	'\',\''
      +	element.Equipos_congelador_necesita 	+	'\',\''
      +	element.Equipos_iluminacion_necesita 	+	'\',\''
      +	element.Equipos_emprendimiento_necesita 	+	'\',\''
      +	element.Equipos_otros_necesita 	+	'\',\''
      +	element.Contaminacion_ruido 	+	'\',\''
      +	element.Contaminacion_olores 	+	'\',\''
      +	element.Planea_implementar_proyecto 	+	'\',\''
      +	element.Cual_proyecto 	+	'\',\''
      +	element.Requiere_energia_proyecto 	+	'\',\''
      +	element.tarifa_mensual 	+	'\',\''
      +	element.Voluntad_de_pago 	+	'\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deleteEnergia(element.Id_Energia).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Energia ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Energia', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Energia');
        }
      });
    } else {
      console.log('No Subir - Energia');
      var3++;
      if (var3 == this.Energia.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarFotosFE(cb) {
}

SincronizarFotosEncE(cb) { 
}

SincronizarEncuestadores(cb) {
  let var1 = 0;
  let var2 = 0;
  let var3 = 0;
  if (this.Encuestadores.length == 0) {
    cb(true);
  } else {
  this.Encuestadores.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - Encuestadores');
      const query = 'INSERT INTO enterritoriobk.encuestadores (Id_Encuestador,Id_Proyecto_Funcionario,Id_Encuesta,Nombre_encuestador,Telefono_celular_encuestador,Telefono_fijo_encuestador,Correo_encuestador,Ciudad_vive_encuestador)' +
      ' VALUES (\'' + element.Id_Encuestador + '\',\'' 
      + element.Id_Proyecto_Funcionario + '\', \'' 
      + element.Id_Encuesta + '\',\''
      + element.Nombre_encuestador + '\',\'' 
      + element.Telefono_celular_encuestador + '\',\'' 
      + element.Telefono_fijo_encuestador + '\',\'' 
      + element.Correo_encuestador + '\',\''
      + element.Ciudad_vive_encuestador + '\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deleteencuestadores(element.Id_Encuesta).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro');
        }
      });
    } else {
      console.log('No Subir - Encuestadores');
      var3++;
      if (var3 == this.Encuestadores.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarEncuestadoresE(cb) {
let var1 = 0; // datos sin subir
let var2 = 0; // datos que se van subiendo
let var3 = 0; // datos que no se han podido subir
if (this.Encuestadores.length == 0) {
  console.log('Posicion Vacia - Encuestadores');
  cb(true);
} else {
this.Encuestadores.map(element => {
  if (element.edit == 1) {
    var1++;
    const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.encuestadores WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
    this.global.consultar(pdata2, (err5, response5) => {
    console.log(response5, 'DELETE');
    if (err5 == null && response5 == true) {
      console.log('Para Subir - Energia'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.encuestadores (Id_Encuestador,Id_Proyecto_Funcionario,Id_Encuesta,Nombre_encuestador,Telefono_celular_encuestador,Telefono_fijo_encuestador,Correo_encuestador,Ciudad_vive_encuestador,upload,edit)' +
      ' VALUES (\'' + element.Id_Encuestador + '\',\'' 
      + element.Id_Proyecto_Funcionario + '\', \'' 
      + element.Id_Encuesta + '\',\''
      + element.Nombre_encuestador + '\',\'' 
      + element.Telefono_celular_encuestador + '\',\'' 
      + element.Telefono_fijo_encuestador + '\',\'' 
      + element.Correo_encuestador + '\',\''
      + element.Ciudad_vive_encuestador + '\',\'' 
      + 1 + '\',\''
      + 0 + ');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deleteencuestadores(element.Id_Encuestador).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Encuestadores ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Encuestadores', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Encuestadores');
        }
      });
    }
  });
  } else {
    console.log('No Subir - Encuestadores');
    var3++;
    if (var3 == this.Encuestadores.length) {
      cb(true);
      // this.loading.HideLoading();
      // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
    }
  }
});
}
}

SincronizarConsentimiento(cb) {
  let var1 = 0;
  let var2 = 0;
  let var3 = 0;
  if (this.Consentimiento.length == 0) {
    cb(true);
  } else {
  this.Consentimiento.map(element => {
    if (element.upload == 0) {
      var1++;
      console.log('Para Subir - consentimiento');
      const query = 'INSERT INTO enterritoriobk.consentimiento (Id_Consentimiento,Id_Encuesta,Id_Proyecto_Funcionario,Nombre_beneficiario_usuario,Nombre_encuestado,Telefono_celular_encuestado,Telefono_fijo_encuestado,Cedula_encuestado,Correo_encuestado,Constancia_uso_datos,Explicado_posible_solucion,Explicado_beneficio_limitacion,Aprobacion_proyecto,Autorizacion_fotos_videos,Firma,Cedula_firma,Comentarios_encuestador,Reaccion_preguntas,Reaccion_proyecto)' +
      ' VALUES (\'' + element.Id_Consentimiento + '\',\'' 
      + element.Id_Encuesta + '\', \'' 
      + element.Id_Proyecto_Funcionario + '\',\''
      + element.Nombre_beneficiario_usuario + '\',\'' 
      + element.Nombre_encuestado + '\',\'' 
      + element.Telefono_celular_encuestado + '\',\'' 
      + element.Telefono_fijo_encuestado + '\',\''
      + element.Cedula_encuestado + '\',\'' 
      + element.Correo_encuestado + '\',\'' 
      + element.Constancia_uso_datos + '\', \'' 
      + element.Explicado_posible_solucion + '\',\''
      + element.Explicado_beneficio_limitacion + '\',\'' 
      + element.Aprobacion_proyecto + '\',\'' 
      + element.Autorizacion_fotos_videos + '\',\'' 
      + element.Firma + '\',\''
      + element.Cedula_firma + '\',\'' 
      + element.Comentarios_encuestador + '\',\'' 
      + element.Reaccion_preguntas + '\',\''
      + element.Reaccion_proyecto + '\');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deleteconsentimiento(element.Id_Consentimiento).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Consentimiento');
        }
      });
    } else {
      console.log('No Subir - Consentimiento');
      var3++;
      if (var3 == this.Consentimiento.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
}
}

SincronizarConsentimientoE(cb) {
let var1 = 0; // datos sin subir
let var2 = 0; // datos que se van subiendo
let var3 = 0; // datos que no se han podido subir
if (this.Consentimiento.length == 0) {
  console.log('Posicion Vacia - Consentimiento');
  cb(true);
} else {
this.Consentimiento.map(element => {
  if (element.edit == 1) {
    var1++;
    const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.consentimiento WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
    this.global.consultar(pdata2, (err5, response5) => {
    console.log(response5, 'DELETE');
    if (err5 == null && response5 == true) {
      console.log('Para Subir - Energia'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.consentimiento (Id_Consentimiento,Id_Encuesta,Id_Proyecto_Funcionario,Nombre_beneficiario_usuario,Nombre_encuestado,Telefono_celular_encuestado,Telefono_fijo_encuestado,Cedula_encuestado,Correo_encuestado,Constancia_uso_datos,Explicado_posible_solucion,Explicado_beneficio_limitacion,Aprobacion_proyecto,Autorizacion_fotos_videos,Firma,Cedula_firma,Comentarios_encuestador,Reaccion_preguntas,Reaccion_proyecto,upload,edit)' +
      ' VALUES (\'' + element.Id_Consentimiento + '\',\'' 
      + element.Id_Encuesta + '\', \'' 
      + element.Id_Proyecto_Funcionario + '\',\''
      + element.Nombre_beneficiario_usuario + '\',\'' 
      + element.Nombre_encuestado + '\',\'' 
      + element.Telefono_celular_encuestado + '\',\'' 
      + element.Telefono_fijo_encuestado + '\',\''
      + element.Cedula_encuestado + '\',\'' 
      + element.Correo_encuestado + '\',\'' 
      + element.Constancia_uso_datos + '\', \'' 
      + element.Explicado_posible_solucion + '\',\''
      + element.Explicado_beneficio_limitacion + '\',\'' 
      + element.Aprobacion_proyecto + '\',\'' 
      + element.Autorizacion_fotos_videos + '\',\'' 
      + element.Firma + '\',\''
      + element.Cedula_firma + '\',\'' 
      + element.Comentarios_encuestador + '\',\'' 
      + element.Reaccion_preguntas + '\',\''
      + element.Reaccion_proyecto + '\',\'' 
      + 1 + '\',\''
      + 0 + ');';
      const pdata1 = {option: 'insertar', texto: query};
      this.global.consultar(pdata1, (err, response) => {
        console.log(response, query);
        if (err == null && response == true) {
          this.db.deleteconsentimiento(element.Id_TratamientoDP).then((respuesta) => {
            var2++;
            console.log('Respuesta UPDATE Consentimiento ', respuesta);
            if (var1 == var2) {
              cb(true);
            }
          }).catch((error) => {
            console.log('ERRORRRRRRR Consentimiento', error);
            var2++;
            if (var1 == var2) {
              cb(true);
            }
          });
        } else {
          this.alert.AlertOneButton('Error', 'Error al subir registro Consentimiento');
        }
      });
    }
  });
  } else {
    console.log('No Subir - Consentimiento');
    var3++;
    if (var3 == this.Consentimiento.length) {
      cb(true);
      // this.loading.HideLoading();
      // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
    }
  }
});
}
}

SincronizarTermiE(cb) {
  let var1 = 0; // datos sin subir
  let var2 = 0; // datos que se van subiendo
  let var3 = 0; // datos que no se han podido subir
  if (this.Termi.length == 0) {
    console.log('Posicion Vacia - Porcentaje');
    cb(true);
  } else {
  this.Termi.map(element => {
    if (element.edit == 1) {
      var1++;
      const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.porcentaje WHERE Id_Encuesta = \'' + element.Id_Encuesta + '\''};
      this.global.consultar(pdata2, (err5, response5) => {
      console.log(response5, 'DELETE');
      if (err5 == null && response5 == true) {
        console.log('Para Subir - Porcentaje'); // quiery remoto - en servidor
        console.log('Para Subir - Porcentaje'); // quiery remoto - en servidor
      const query = 'INSERT INTO enterritoriobk.porcentaje(Id , Id_Encuesta , Id_Proyecto_Funcionario , Porcentaje , IsTerm , Fecha_Term)' +
      ' VALUES (\''
      +	element.Id 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario	+	'\',\''
      +	element.Porcentaje 	+	'\',\''
      +	element.IsTerm 	+	'\',\''
      +	element.Fecha_Term 	+	'\',\'' 
      + 1 + '\',\''
      + 0 + ');';
        const pdata1 = {option: 'insertar', texto: query};
        this.global.consultar(pdata1, (err, response) => {
          console.log(response, query);
          if (err == null && response == true) {
            this.db.deletetermi(element.Id).then((respuesta) => {
              var2++;
              console.log('Respuesta UPDATE Porcentaje ', respuesta);
              if (var1 == var2) {
                cb(true);
              }
            }).catch((error) => {
              console.log('ERRORRRRRRR Porcentaje', error);
              var2++;
              if (var1 == var2) {
                cb(true);
              }
            });
          } else {
            this.alert.AlertOneButton('Error', 'Error al subir registro Porcentaje');
          }
        });
      }
    });
    } else {
      console.log('No Subir - Porcentaje');
      var3++;
      if (var3 == this.Termi.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    }
  });
  }
  }

SincronizarTransporteE(cb) {
    let var1 = 0; // datos sin subir
    let var2 = 0; // datos que se van subiendo
    let var3 = 0; // datos que no se han podido subir
    if (this.MTransporte.length == 0) {
      console.log('Posicion Vacia - Transporte');
      cb(true);
    } else {
    this.MTransporte.map(element => {
      if (element.edit == 1) {
        var1++;
        const pdata2 = {option: 'insertar', texto: 'DELETE FROM enterritoriobk.transporte WHERE Id_Transporte = \'' + element.Id_Transporte + '\''};
        this.global.consultar(pdata2, (err5, response5) => {
        console.log(response5, 'DELETE');
        if (err5 == null && response5 == true) {
          console.log('Para Subir - Transporte'); // quiery remoto - en servidor
          console.log('Para Subir - Transporte'); // quiery remoto - en servidor
          const query = 'INSERT INTO enterritoriobk.transporte(Id_Transporte,Id_Proyecto_Funcionario,Id_Lugares,Costo_viaje,Medio_viaje,Tiempo_viaje,Fecha)' +
          ' VALUES (\''
          +	element.Id_Transporte 	+	'\',\''
          +	element.Id_Proyecto_Funcionario	+	'\',\''
          +	element.Id_Lugares 	+	'\',\''
          +	element.Costo_viaje 	+	'\',\''
          +	element.Medio_viaje 	+	'\',\''
          +	element.Tiempo_viaje 	+	'\',\''
          +	element.Fecha 	+	'\');';
          const pdata1 = {option: 'insertar', texto: query};
          this.global.consultar(pdata1, (err, response) => {
            console.log(response, query);
            if (err == null && response == true) {
              this.db.deletetransporte(element.Id_Transporte).then((respuesta) => {
                var2++;
                console.log('Respuesta UPDATE Transporte ', respuesta);
                if (var1 == var2) {
                  cb(true);
                }
              }).catch((error) => {
                console.log('ERRORRRRRRR Transporte', error);
                var2++;
                if (var1 == var2) {
                  cb(true);
                }
              });
            } else {
              this.alert.AlertOneButton('Error', 'Error al subir registro Transporte');
            }
          });
        }
      });
      } else {
        console.log('No Subir - Transporte');
        var3++;
        if (var3 == this.MTransporte.length) {
          cb(true);
          // this.loading.HideLoading();
          // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
        }
      }
    });
    }
    }
*/
Backup() {
  this.loading.LoadingNormal('Generando Archivo');
  /*
  this.db.ExportDababase((data) => {
    data = data.toString();
    const nombre = 'BACKUP' + this.global.UserData.Id_Proyecto_Funcionario + '_' + moment().format('x') + '.txt';
    setTimeout(() => {
      this.file.writeFile(this.file.externalRootDirectory, nombre, data, {replace: true})
      .then((res) => {
        console.log(res);
        this.loading.HideLoading();
        this.alert.AlertOneButton('Información', 'Archivo Generado Correctamente');
      })
      .catch((err) => {
        console.error(err);
        this.loading.HideLoading();
        this.alert.AlertOneButton('Error', 'Archivo No Generado');
    });
    }, 500);
  });*/
}

/*
  SincFotos_Elec(cb) {
      let var1 = 0;
      let var2 = 0;
      let var3 = 0;
      if (this.FotosE.length == 0) {
        cb(true);
      } else {
      this.FotosE.map(element => {
        if (element.upload == 0) {
          var1++;
          this.upload(element.idfoto, element.rutalocal, 'fotos_elec', (state, resultado) => {
            console.log('respuesta foto', state, resultado);
            if (state) {
              console.log('Para Subir - Fotos_Elect');
              const query = 'INSERT INTO enterritoriobk.fotos_elec (idfoto,idpro_funcionario,idelemento,rutalocal,rutaserver,estado,fecha,upload)' +
              ' VALUES (\'' + element.idfoto + '\',\'' + element.idpro_funcionario + '\', \'' + element.idelemento + '\',\''
              + element.rutalocal + '\',\'' + resultado + '\',\'' + element.estado + '\',\'' + element.fecha + '\','
              + 1 + ');';
              const pdata1 = {option: 'insertar', texto: query};
              this.global.consultar(pdata1, (err, response) => {
                console.log(response, query);
                if (err == null && response == true) {
                  this.db.deletefotos_elec(element.idfoto, resultado).then((respuesta) => {
                    var2++;
                    console.log('Respuesta UPDATE', respuesta);
                    if (var1 == var2) {
                      cb(true);
                      // this.loading.HideLoading();
                      // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                    }
                  }).catch((error) => {
                    console.log('ERRORRRRRRR', error);
                    var2++;
                    if (var1 == var2) {
                      cb(true);
                     // this.loading.HideLoading();
                      // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                    }
                  });
                } else {
                  this.alert.AlertOneButton('Error', 'Error al subir registro');
                }
              });
            }
          });
        } else {
          console.log('No Subir - Fotos_Elect');
          var3++;
          if (var3 == this.FotosE.length) {
            cb(true);
            // this.loading.HideLoading();
            // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
          }
        }
      });
    }
  }

  SincFotos_Amb(cb) {
      let var1 = 0;
      let var2 = 0;
      let var3 = 0;
      if (this.FotosA.length == 0) {
        cb(true);
      } else {
      this.FotosA.map(element => {
        if (element.upload == 0) {
          var1++;
          this.upload(element.idfoto, element.rutalocal, 'fotos_amb', (state, resultado) => {
            console.log('respuesta foto', state, resultado);
            if (state) {
              console.log('Para Subir - Fotos_AMB');
              const query = 'INSERT INTO enterritoriobk.fotos_amb (idfoto,idpro_funcionario,idambiental,rutalocal,rutaserver,estado,fecha,upload)' +
              ' VALUES (\'' + element.idfoto + '\',\'' + element.idpro_funcionario + '\', \'' + element.idambiental + '\',\''
              + element.rutalocal + '\',\'' + resultado + '\',\'' + element.estado + '\',\'' + element.fecha + '\','
              + 1 + ');';
              const pdata1 = {option: 'insertar', texto: query};
              this.global.consultar(pdata1, (err, response) => {
                console.log(response, query);
                if (err == null && response == true) {
                  this.db.deletefotos_amb(element.idfoto, resultado).then((respuesta) => {
                    var2++;
                    console.log('Respuesta UPDATE', respuesta);
                    if (var1 == var2) {
                      cb(true);
                      // this.loading.HideLoading();
                      // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                    }
                  }).catch((error) => {
                    console.log('ERRORRRRRRR', error);
                    var2++;
                    if (var1 == var2) {
                      cb(true);
                     // this.loading.HideLoading();
                      // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                    }
                  });
                } else {
                  this.alert.AlertOneButton('Error', 'Error al subir registro');
                }
              });
            }
          });
        } else {
          console.log('No Subir - Fotos_Amb');
          var3++;
          if (var3 == this.FotosA.length) {
            cb(true);
            // this.loading.HideLoading();
            // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
          }
        }
      });
    }
  }*/
/*

  SincFotos_Firma(cb) {
    let var1 = 0;
    let var2 = 0;
    let var3 = 0;
    if (this.FotosF.length == 0) {
      cb(true);
    } else {
    this.FotosF.map(element => {
      if (element.upload == 0) {
        var1++;
        this.upload(element.Id_Encuesta, element.rutalocal, 'fotos_firma', (state, resultado) => {
          console.log('respuesta foto', state, resultado);
          if (state) {
            console.log('Para Subir - Fotos_Firma');
            const query = 'INSERT INTO enterritoriobk.fotos_firma(Id_Foto_Firma , Id_Encuesta , Id_Proyecto_Funcionario , documento , rutalocal , rutaserver , estado , fecha , upload , edit)' +
      ' VALUES (\''
      +	element.Id_Foto_Firma 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario	+	'\',\''
      +	element.documento 	+	'\',\''
      +	element.rutalocal 	+	'\',\''
      +	resultado 	+	'\',\''
      +	element.estado 	+	'\',\''
      +	element.fecha 	+	'\',\''
      + 1 + '\',\''
      + 0 + '\');';
            const pdata1 = {option: 'insertar', texto: query};
            this.global.consultar(pdata1, (err, response) => {
              console.log(response, query);
              if (err == null && response == true) {
                this.db.deletefotos_firma(element.Id_Foto_Firma, resultado).then((respuesta) => {
                  var2++;
                  console.log('Respuesta UPDATE', respuesta);
                  if (var1 == var2) {
                    cb(true);
                    // this.loading.HideLoading();
                    // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                  }
                }).catch((error) => {
                  console.log('ERRORRRRRRR', error);
                  var2++;
                  if (var1 == var2) {
                    cb(true);
                   // this.loading.HideLoading();
                    // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                  }
                });
              } else {
                this.alert.AlertOneButton('Error', 'Error al subir registro');
              }
            });
          }
        });
      } else {
        console.log('No Subir - Fotos_Firma');
        var3++;
        if (var3 == this.FotosF.length) {
          cb(true);
          // this.loading.HideLoading();
          // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
        }
      }
    });
  }
}

SincFotos_Encuesta(cb) {
  let var1 = 0;
  let var2 = 0;
  let var3 = 0;
  if (this.FotosEnc.length == 0) {
    cb(true);
  } else {
  this.FotosEnc.map(element => {
     setTimeout(() => {   if (element.upload == 0) {
        var1++;
        this.upload(element.Id_Foto_Encuesta, element.rutalocal, 'fotos_enc', (state, resultado) => {
          console.log('respuesta foto', state, resultado);
          if (state) {
            console.log('Para Subir - Fotos_Encuesta');
            const query = 'INSERT INTO enterritoriobk.fotos_encuesta(Id_Foto_Encuesta , Id_Encuesta , Id_Proyecto_Funcionario , rutalocal , rutaserver , estado , fecha , upload , edit)' +
      ' VALUES (\''
      +	element.Id_Foto_Encuesta 	+	'\',\''
      +	element.Id_Encuesta 	+	'\',\''
      +	element.Id_Proyecto_Funcionario	+	'\',\''
      +	element.rutalocal 	+	'\',\''
      +	element.rutaserver 	+	'\',\''
      +	element.estado 	+	'\',\''
      +	element.fecha 	+	'\',\''
      + 1 + '\',\''
      + 0 + '\');';
            const pdata1 = {option: 'insertar', texto: query};
            this.global.consultar(pdata1, (err, response) => {
              console.log(response, query);
              if (response == true) {
                console.log('ESTOY AQUIIIIII', element);
                this.db.deletefotos_encuesta(element.Id_Foto_Encuesta, resultado).then((respuesta) => {
                  var2++;
                  console.log('Respuesta UPDATE', respuesta);
                  if (var1 == var2) {
                    cb(true);
                    // this.loading.HideLoading();
                    // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                  }
                }).catch((error) => {
                  console.log('ERRORRRRRRR', error);
                  var2++;
                  if (var1 == var2) {
                    cb(true);
                   // this.loading.HideLoading();
                    // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                  }
                });
              } else {
                this.alert.AlertOneButton('Error', 'Error al subir registro');
                console.log('ESTOY AQUIIIIII', element);
                this.db.deletefotos_encuesta(element.Id_Foto_Encuesta, resultado).then((respuesta1) => {
                  var2++;
                  console.log('Respuesta UPDATE', respuesta1);
                  if (var1 == var2) {
                    cb(true);
                    // this.loading.HideLoading();
                    // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                  }
                }).catch((error) => {
                  console.log('ERRORRRRRRR', error);
                  var2++;
                  if (var1 == var2) {
                    cb(true);
                   // this.loading.HideLoading();
                    // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                  }
                });
              }
            });
          }
        });
    } else {
      console.log('No Subir - Fotos_Encuesta');
      var3++;
      if (var3 == this.FotosEnc.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    } 
  }, 1500);
  });
}
}


SincFotos_Transporte(cb) {
  let var1 = 0;
  let var2 = 0;
  let var3 = 0;
  if (this.MTransporte.length == 0) {
    cb(true);
  } else {
  this.MTransporte.map(element => {
     setTimeout(() => {   
       if (element.upload == 0) {
        var1++;
        this.upload(element.idfoto, element.rutalocal, 'fotos_transporte', (state, resultado) => {
          console.log('respuesta foto', state, resultado);
          if (state) {
            console.log('Para Subir - Fotos_Encuesta');
            const query = 'INSERT INTO enterritoriobk.fotos_transporte(idfoto , Id_Proyecto_Funcionario, idlugar , rutalocal , rutaserver , estado , fecha , upload , edit)' +
      ' VALUES (\''
      +	element.idfoto 	+	'\',\''
      +	element.Id_Proyecto_Funcionario 	+	'\',\''
      +	element.idlugar	+	'\',\''
      +	element.rutalocal 	+	'\',\''
      +	resultado	+	'\',\''
      +	element.estado 	+	'\',\''
      +	element.fecha 	+	'\',\''
      + 1 + '\',\''
      + 0 + '\');';
            const pdata1 = {option: 'insertar', texto: query};
            this.global.consultar(pdata1, (err, response) => {
              console.log(response, query);
              if (response == true) {
                console.log('ESTOY AQUIIIIII', element);
                this.db.deletefotos_transporte(element.idfoto, resultado).then((respuesta) => {
                  var2++;
                  console.log('Respuesta UPDATE', respuesta);
                  if (var1 == var2) {
                    cb(true);
                    // this.loading.HideLoading();
                    // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                  }
                }).catch((error) => {
                  console.log('ERRORRRRRRR', error);
                  var2++;
                  if (var1 == var2) {
                    cb(true);
                   // this.loading.HideLoading();
                    // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                  }
                });
              } else {
                this.alert.AlertOneButton('Error', 'Error al subir registro');
                console.log('ESTOY AQUIIIIII', element);
                this.db.deletefotos_transporte(element.idfoto, resultado).then((respuesta1) => {
                  var2++;
                  console.log('Respuesta UPDATE', respuesta1);
                  if (var1 == var2) {
                    cb(true);
                    // this.loading.HideLoading();
                    // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                  }
                }).catch((error) => {
                  console.log('ERRORRRRRRR', error);
                  var2++;
                  if (var1 == var2) {
                    cb(true);
                   // this.loading.HideLoading();
                    // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
                  }
                });
              }
            });
          }
        });
    } else {
      console.log('No Subir - Fotos_Encuesta');
      var3++;
      if (var3 == this.MTransporte.length) {
        cb(true);
        // this.loading.HideLoading();
        // this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor');
      }
    } 
  }, 1500);
  });
}
}



  upload(name, link, folder, cb) {
    console.log('Info Fotos', name, link);
    const parames = {
    id : 1,
    tipo : 1,
    carpeta : folder
  };
    const options: FileUploadOptions = {
      fileKey: 'file',
      fileName: name + '.jpg',
      mimeType: 'image/jpeg',
      params: parames,
      chunkedMode : false
   };
   console.log('Enviar', options);
    //this.fileTransfer.upload(link, 'https://35.222.210.186//PHP/appuploadIPSE.php', options)
    this.fileTransfer.upload(link, 'https://www.php.engenius.com.co/appuploadE2.php', options)
     .then((data) => {
      if (data.response == 'FAIL' || data.response == 'FAIL2' || data.response == 'SYNC') {
        console.log('Error', 'Error al subir las imagenes al servidor' + data.response);
        this.alert.AlertOneButton('Error', 'Error al subir las imagenes al servidor' + data.response);
        cb(false, null);
      } else {
        console.log('BIEN FOTO');
        cb(true, data.response);
      }
     }, (err) => {
      console.log('MAL FOTO', err);
      cb(false, null);
     });
  }

  SubirCambios() {
    this.loading.LoadingNormal('Sincronizando Datos...');
    setTimeout(() => {
      if (this.Encabezado.length == 0 && this.Ubicacion.length == 0 && this.Datosper.length == 0 &&
         this.Predio.length == 0 && this.Energia.length == 0 && this.Vivienda.length == 0 &&
         this.Servicios.length == 0 && this.Racional.length == 0 && this.Sociodemo.length == 0 &&
         this.Economia.length == 0 && this.Encuestadores.length == 0 && this.Consentimiento.length == 0) {
        this.loading.HideLoading();
        this.alert.AlertOneButton('Información', 'No hay Datos Para Sincronizar');
      } else {
        this.SincronizarEncabezadoE((response6) => {
          if (response6) {
            this.SincronizarUbicacionE((response7) => {
              if (response7) {
                this.SincronizarDatosperE((response8) => {
                  if (response8) {
                    this.SincronizarPredioE((response9) => {
                      if (response9) {
                        this.SincronizarEnergiaE((response10) => {
                          if (response10) {
                            this.SincronizarViviendaE((response11) => {
                              if (response11) {
                                this.SincronizarServiciosE((response12) => {
                                  if (response12) {
                                    this.SincronizarRacionalE((response13) => {
                                      if (response13) {
                                        this.SincronizarSociodemoE((response14) => {
                                          if (response14) {
                                            this.SincronizarEconomiaE((response15) => {
                                              if (response15) {
                                                this.SincronizarEncuestadoresE((response16) => {
                                                  if (response16) {
                                                    this.SincronizarConsentimientoE((response17) => {
                                                      if (response17) {
                                                        this.SincronizarTermiE((response18) => {
                                                          if (response18) {
                                                            this.SincronizarTransporteE((response19) => {
                                                              if (response19) {
                                                                setTimeout(() => {
                                                                  this.loading.HideLoading();
                                                                  this.alert.AlertOneButton('Información', 'Datos Subidos al Servidor', 'Ok', () => {
                                                                    this.ngOnInit();
                                                                  });
                                                                }, 500);
                                                              }
                                                            });
                                                          }
                                                        });
                                                      }
                                                    });
                                                  }
                                                });
                                              }
                                            });
                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    }, 400);
  }
*/
}
