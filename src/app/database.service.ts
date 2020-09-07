import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable, concat } from 'rxjs';
import { GlobalService } from './global.service';
import { compileBaseDefFromMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  developers = new BehaviorSubject([]);
  products = new BehaviorSubject([]);
  profun= new BehaviorSubject([]);
  encabezado = new BehaviorSubject([]);
  encuestador = new BehaviorSubject([]);
  ubicacion = new BehaviorSubject([]);
  servicios = new BehaviorSubject([]);
  predio = new BehaviorSubject([]);
  racional = new BehaviorSubject([]);
  sociodemo = new BehaviorSubject([]);
  transporte = new BehaviorSubject([]);
  economia = new BehaviorSubject([]);
  energia = new BehaviorSubject([]);
  vivienda = new BehaviorSubject([]);
  consentimiento = new BehaviorSubject([]);
  datosper = new BehaviorSubject([]);
  fotostransporte = new BehaviorSubject([]);
  fotosenc = new BehaviorSubject([]);
  fotosfirma = new BehaviorSubject([]);
  Lugares = new BehaviorSubject([]);
  TipoFotos = new BehaviorSubject([]);
  Proyectos = new BehaviorSubject([]);
  constructor(private plt: Platform,
              private sqlitePorter: SQLitePorter,
              private sqlite: SQLite,
              private http: HttpClient,
              public global: GlobalService) {
    this.plt.ready().then(() => {
      /*
      this.sqlite.create({
        name: 'Enterritorio.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });}*/
    });
  }
/*

ExportDababase(callback) {
this.sqlitePorter.exportDbToSql(this.database).then((response) => {
  console.log(response);
  callback(response);
});
}

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadProducts();
          this.loadprofun();
          this.loadLugares();
          this.loadTipoFotos();
          this.loadProyectos();
          this.loadVivienda((datos) => {
            console.log(datos);
          });
          this.loadSociodemo((datos) => {
            console.log(datos);
          });
          this.loadEconomia((datos) => {
            console.log(datos);
          });
          this.loadEnergia((datos) => {
            console.log(datos);
          });
          this.loadServicios((datos) => {
            console.log(datos);
          });
          this.loadTransporte((datos) => {
            console.log(datos);
          });
          this.loadEncabezado((datos) => {
            console.log(datos);
          });
          this.loadRacional((datos) => {
            console.log(datos);
          });
          this.loadfotos_transporte((data1) => {
            console.log(data1);
          });
          this.loadPredio((datos) => {
            console.log(datos);
          });
          this.loadEncuestador((datos) => {
            console.log(datos);
          });
          this.loadConsentimiento((datos) => {
            console.log(datos);
          });
          this.loadDatosper((datos) => {
            console.log(datos);
          });
          this.loadUbicacion((datos) => {
            console.log(datos);
          });
          this.loadfotos_firma((data1) => {
            console.log(data1);
          });
          this.loadfotos_encuesta((data1) => {
            console.log(data1);
          });
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }


  loadProducts() {
    const query = 'SELECT * FROM funcionarios';
    return this.database.executeSql(query, []).then(data => {
      const products = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          products.push({
            Id_Funcionario: data.rows.item(i).Id_Funcionario,
            nombre: data.rows.item(i).nombre,
            apellido: data.rows.item(i).apellido,
            username: data.rows.item(i).username,
            documento: data.rows.item(i).documento,
            password: data.rows.item(i).password,
            estado: data.rows.item(i).estado,
            fecha_creacion: data.rows.item(i).fecha_creacion,
            celular: data.rows.item(i).celular,
            fijo: data.rows.item(i).fijo,
            correo: data.rows.item(i).correo,
            ciudad_origen: data.rows.item(i).ciudad_origen
           });
        }
      }
      this.products.next(products);
      if (products.length == 0) {
        console.log('SE NECESITA DESCARGA INICIAL');
        this.global.DescargaInicial = true;
      } else {
        this.global.DescargaInicial = false;
      }
      console.log('LOAD FUNCIONARIOS', products);
      this.global.Funcionarios = products;
    });
  }

  loadLugares() {
    const query = 'SELECT * FROM lugares';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push({
            Id_Lugares: data.rows.item(i).Id_Lugares,
            U_codigo_depto: data.rows.item(i).U_codigo_depto,
            Departamento: data.rows.item(i).Departamento,
            U_codigo_municipio: data.rows.item(i).U_codigo_municipio,
            Municipio: data.rows.item(i).Municipio,
            Vereda: data.rows.item(i).Vereda,
            Comunidad: data.rows.item(i).Comunidad,
            Mostrar: data.rows.item(i).Mostrar
           });
        }
      }
      this.Lugares.next(elementos);
      console.log('LOAD LUGARES', elementos);
      this.global.Lugares = elementos;
    });
  }

  loadTipoFotos() {
    const query = 'SELECT * FROM TipoFotos';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push({
            Id_TipoFoto: data.rows.item(i).Id_TipoFoto,
            tipo: data.rows.item(i).tipo,
            descripcion: data.rows.item(i).descripcion
           });
        }
      }
      this.TipoFotos.next(elementos);
      console.log('LOAD TipoFotos', elementos);
      this.global.TipoFotos = elementos;
    });
  }


  loadProyectos() {
    const query = 'SELECT * FROM proyectos';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push({
            Id_Proyecto: data.rows.item(i).Id_Proyecto,
            nombre: data.rows.item(i).nombre,
            descripcion: data.rows.item(i).descripcion,
            contratante: data.rows.item(i).contratante,
            fechainicio: data.rows.item(i).fechainicio,
            fechafin: data.rows.item(i).fechafin
           });
        }
      }
      this.Proyectos.next(elementos);
      console.log('LOAD PROYECTOS', elementos);
      this.global.Proyectos = elementos;
    });
  }


  loadprofun() {
    const query = 'SELECT * FROM proyectos_funcionarios';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push({
            Id_Proyecto_Funcionario: data.rows.item(i).Id_Proyecto_Funcionario,
            Id_Funcionario: data.rows.item(i).Id_Funcionario,
            Id_Proyecto: data.rows.item(i).Id_Proyecto,
            fechainicio: data.rows.item(i).fechainicio,
            fechafinal: data.rows.item(i).fechafinal
           });
        }
      }
      this.profun.next(elementos);
      console.log('LOAD PROYECTOS_FUNCIONARIOS', elementos);
    });
  }
//revisar
  ContarEncuestas() {
    const query = 'SELECT COUNT() as NUM FROM encabezado where upload=0';
    return this.database.executeSql(query, []).then(data => {
      this.global.Pendientes = data.rows.item(0).NUM;
      console.log('NUMERO DE REGISTROS PENDIENTES', data.rows.item(0).NUM);
    });
  }

  addTransporte(data, cb) {
    return this.database.executeSql('INSERT INTO transporte (Id_Transporte,Id_Proyecto_Funcionario,Id_Lugares,Costo_viaje,Medio_viaje,Tiempo_viaje,Fecha,upload) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadTransporte((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }


  addfotos_transporte(data, cb) {
    return this.database.executeSql('INSERT INTO fotos_transporte (idfoto,Id_Proyecto_Funcionario,idlugar,rutalocal,rutaserver,estado,fecha,upload) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadfotos_transporte((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }


  loadfotos_transporte(cb) {
    const query = 'SELECT * FROM fotos_transporte';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.fotostransporte.next(elementos);
      console.log('LOAD FOTOS_Transporte', elementos);
      cb(elementos);
    });
  }

  loadTransporte(datos) {
    const query = 'SELECT * FROM transporte';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.transporte.next(elementos);
      console.log('LOAD Transporte', elementos);
      datos(elementos);
    });
  }

  ContarFotos() {
    this.global.FotosP = 0;
    const query2 = 'SELECT COUNT() as NUM FROM fotos_firma where upload=0';
    return this.database.executeSql(query2, []).then(data => {
      this.global.FotosP = this.global.FotosP + data.rows.item(0).NUM;
      console.log('NUMERO DE FOTOS FIRMA', data.rows.item(0).NUM);
      const query = 'SELECT COUNT() as NUM FROM fotos_encuesta where upload=0';
      return this.database.executeSql(query, []).then(data2 => {
        this.global.FotosP = this.global.FotosP + data2.rows.item(0).NUM;
        console.log('NUMERO DE FOTOS ENCUESTA', data2.rows.item(0).NUM);
      });
    });
    
  }
//revisar
  ContarEncuestasE() {
    const query = 'SELECT COUNT() as NUM FROM encabezado where edit=1';
    return this.database.executeSql(query, []).then(data => {
      this.global.Editadas = data.rows.item(0).NUM;
      console.log('NUMERO DE REGISTROS Editadas', data.rows.item(0).NUM);
    });
  }

  loadEncabezado(datos) {
    const query = 'SELECT * FROM encabezado';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.encabezado.next(elementos);
      console.log('LOAD ENCABEZADO', elementos);
      datos(elementos);
    });
  }

  loadEncuestador(datos) {
    const query = 'SELECT * FROM encuestadores';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.encuestador.next(elementos);
      console.log('LOAD ENCUESTADORES', elementos);
      datos(elementos);
    });
  }

  loadConsentimiento(datos) {
    const query = 'SELECT * FROM consentimiento';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.consentimiento.next(elementos);
      console.log('LOAD CONSENTIMIENTO', elementos);
      datos(elementos);
    });
  }

  loadDatosper(datos) {
    const query = 'SELECT * FROM tratamiento_DP';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.datosper.next(elementos);
      console.log('LOAD TRATAMIENTO_DP', elementos);
      datos(elementos);
    });
  }

  loadUbicacion(datos) {
    const query = 'SELECT * FROM ubicacion';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.ubicacion.next(elementos);
      console.log('LOAD UBICACIÓN', elementos);
      datos(elementos);
    });
  }

  loadServicios(datos) {
    const query = 'SELECT * FROM servicios_publicos';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.servicios.next(elementos);
      console.log('LOAD SERVICIOS_PUBLICOS', elementos);
      datos(elementos);
    });
  }

  loadSociodemo(datos) {
    const query = 'SELECT * FROM c_sociodemograficas';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.sociodemo.next(elementos);
      console.log('LOAD SOCIODEMOGRAFICAS', elementos);
      datos(elementos);
    });
  }

  loadEconomia(datos) {
    const query = 'SELECT * FROM economia';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.economia.next(elementos);
      console.log('LOAD ECONOMIA', elementos);
      datos(elementos);
    });
  }

  loadEnergia(datos) {
    const query = 'SELECT * FROM energia';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.energia.next(elementos);
      console.log('LOAD ENERGIA', elementos);
      datos(elementos);
    });
  }

  loadRacional(datos) {
    const query = 'SELECT * FROM URE';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.racional.next(elementos);
      console.log('LOAD RACIONAL', elementos);
      datos(elementos);
    });
  }

  loadVivienda(datos) {
    const query = 'SELECT * FROM datos_vivienda_I';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.vivienda.next(elementos);
      console.log('LOAD VIVIENDA', elementos);
      datos(elementos);
    });
  }

  loadPredio(datos) {
    const query = 'SELECT * FROM caracteristicas_predio';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.predio.next(elementos);
      console.log('LOAD PREDIO', elementos);
      datos(elementos);
    });
  }
  loadTermi(datos) {
    const query = 'SELECT * FROM porcentaje';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.predio.next(elementos);
      console.log('LOAD PORCENTAJE', elementos);
      datos(elementos);
    });
  }

LoadEnca_Online(cb) {
  if (this.global.NetCheck) {
    const query = 'DELETE FROM encabezado WHERE upload = 1 AND edit = 0;';
    this.database.executeSql(query);
    const pdata1 = {option: 'encabezado', userpro: this.global.UserData.Id_Proyecto_Funcionario};
    this.global.consultar(pdata1, (err, response) => {
      console.log('En Linea', response);
      let va = 0;
      if (response.length != 0) {
      response.forEach(element => {
        this.addEncabezado(element, (res) => {
          if (res) {
            va++;
            if (va == response.length) {
              cb(true);
            }
          }
        });
      });
    } else {
      cb(true);
    }
    });
} else {
  cb(true);
}
}
*/
/*LoadVIVI_Online(cb) {
  if (this.global.NetCheck) {
    const query = 'DELETE FROM viviendapredio_ipse WHERE edit = 0;';
    this.database.executeSql(query);
    const pdata1 = {option: 'vivienda', userpro: this.global.UserData.Id_Proyecto_Funcionario};
    this.global.consultar(pdata1, (err, response) => {
      console.log('En Linea', response);
      let va = 0;
      if (response.length != 0) {
        response.forEach(element => {
        this.addViviendaU(element, (res) => {
          if (res) {
            va++;
            if (va == response.length) {
              cb(true);
            }
          }
        });
      });
      } else {
        cb(true);
      }
    });
} else {
  cb(true);
}
}*/

/*LoadSocio34_Online(cb) {
  if (this.global.NetCheck) {
    const query = 'DELETE FROM sociocultural34_ipse WHERE edit = 0;';
    this.database.executeSql(query);
    const pdata1 = {option: 'sociocultural34', userpro: this.global.UserData.Id_Proyecto_Funcionario};
    this.global.consultar(pdata1, (err, response) => {
      console.log('En Linea', response);
      let va = 0;
      if (response.length != 0) {
        response.forEach(element => {
        this.addSocio34U(element, (res) => {
          if (res) {
            va++;
            if (va == response.length) {
              cb(true);
            }
          }
        });
      });
      } else {
        cb(true);
      }
    });
} else {
  cb(true);
}
}*/

/*LoadEconomia_Online(cb) {
  if (this.global.NetCheck) {
    const query = 'DELETE FROM economia_ipse WHERE edit = 0;';
    this.database.executeSql(query);
    const pdata1 = {option: 'economia', userpro: this.global.UserData.Id_Proyecto_Funcionario};
    this.global.consultar(pdata1, (err, response) => {
      console.log('En Linea', response);
      let va = 0;
      if (response.length != 0) {
        response.forEach(element => {
        this.addEconomia34U(element, (res) => {
          if (res) {
            va++;
            if (va == response.length) {
              cb(true);
            }
          }
        });
      });
      } else {
        cb(true);
      }
    });
} else {
  cb(true);
}
}*/

/*LoadEnergia_Online(cb) {
  if (this.global.NetCheck) {
    const query = 'DELETE FROM energia_ipse WHERE edit = 0;';
    this.database.executeSql(query);
    const pdata1 = {option: 'energia', userpro: this.global.UserData.Id_Proyecto_Funcionario};
    this.global.consultar(pdata1, (err, response) => {
      console.log('En Linea', response);
      let va = 0;
      if (response.length != 0) {
        response.forEach(element => {
        this.addEnergia34U(element, (res) => {
          if (res) {
            va++;
            if (va == response.length) {
              cb(true);
            }
          }
        });
      });
      } else {
        cb(true);
      }
    });
} else {
  cb(true);
}
}*/

/*LoadEnergia2_Online(cb) {
  if (this.global.NetCheck) {
    const query = 'DELETE FROM energia2_ipse WHERE edit = 0;';
    this.database.executeSql(query);
    const pdata1 = {option: 'energia2', userpro: this.global.UserData.Id_Proyecto_Funcionario};
    this.global.consultar(pdata1, (err, response) => {
      console.log('En Linea', response);
      let va = 0;
      if (response.length != 0) {
        response.forEach(element => {
        this.addEnergia234U(element, (res) => {
          if (res) {
            va++;
            if (va == response.length) {
              cb(true);
            }
          }
        });
      });
      } else {
        cb(true);
      }
    });
} else {
  cb(true);
}
}*/

/*LoadRacional_Online(cb) {
  if (this.global.NetCheck) {
    const query = 'DELETE FROM racional_ipse WHERE edit = 0;';
    this.database.executeSql(query);
    const pdata1 = {option: 'racional', userpro: this.global.UserData.Id_Proyecto_Funcionario};
    this.global.consultar(pdata1, (err, response) => {
      console.log('En Linea', response);
      let va = 0;
      if (response.length != 0) {
        response.forEach(element => {
        this.addRacionalU(element, (res) => {
          if (res) {
            va++;
            if (va == response.length) {
              cb(true);
            }
          }
        });
      });
      } else {
        cb(true);
      }
    });
} else {
  cb(true);
}
}*/
/*
LoadFotos(cb) {
  if (this.global.NetCheck) {
    const query = 'DELETE FROM fotos_encuesta WHERE edit = 0 and upload = 1;';
    this.database.executeSql(query);
    const pdata1 = {option: 'fotosencuesta', userpro: this.global.UserData.Id_Proyecto_Funcionario};
    this.global.consultar(pdata1, (err, response) => {
      console.log('En Linea Fotos', response);
      let va = 0;
      if (response.length != 0) {
        response.forEach(element => {
        this.addFotosEncuestaU(element, (res) => {
          if (res) {
            va++;
            if (va == response.length) {
              cb(true);
            }
          }
        });
      });
      } else {
        cb(true);
      }
    });
} else {
  cb(true);
}
}

/*LoadServicios_Online(cb) {
  if (this.global.NetCheck) {
    const query = 'DELETE FROM servicios_ipse WHERE edit = 0;';
    this.database.executeSql(query);
    const pdata1 = {option: 'servicios', userpro: this.global.UserData.Id_Proyecto_Funcionario};
    this.global.consultar(pdata1, (err, response) => {
      console.log('En Linea', response);
      let va = 0;
      if (response.length != 0) {
        response.forEach(element => {
        this.addServiciosU(element, (res) => {
          if (res) {
            va++;
            if (va == response.length) {
              cb(true);
            }
          }
        });
      });
      } else {
        cb(true);
      }
    });
} else {
  cb(true);
}
}*/

/*LoadEncuestas_Online(cb) {
  if (this.global.NetCheck) {
    const query = 'DELETE FROM encuesta_ipse WHERE edit = 0 AND upload = 1;';
    this.database.executeSql(query);
    const pdata1 = {option: 'encuesta', userpro: this.global.UserData.Id_Proyecto_Funcionario};
    this.global.consultar(pdata1, (err, response) => {
      console.log('ENCUESTAS En Linea', response);
      let va = 0;
      if (response.length != 0) {
        response.forEach(element => {
        this.addEncuestasU(element, (res) => {
          if (res) {
            va++;
            if (va == response.length) {
              cb(true);
            }
          }
        });
      });
      } else {
        cb(true);
      }
    });
} else {
  cb(true);
}
}*/
/*
  loadfotos_firma(cb) {
    const query = 'SELECT * FROM fotos_firma';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.fotosfirma.next(elementos);
      console.log('LOAD FOTOS_FIRMA', elementos);
      cb(elementos);
    });
  }

  loadfotos_encuesta(cb) {
    const query = 'SELECT * FROM fotos_encuesta';
    return this.database.executeSql(query, []).then(data => {
      const elementos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          elementos.push(data.rows.item(i));
        }
      }
      this.fotosenc.next(elementos);
      console.log('LOAD FOTOS_ENCUESTA', elementos);
      cb(elementos);
    });
  }

  addProduct(data) {
    return this.database.executeSql('INSERT INTO funcionarios (Id_Funcionario,nombre,apellido,username,documento,password,estado,fecha_creacion, celular, fijo, correo, ciudad_origen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadProducts();
    });
  }

  addFunPro(data) {
    return this.database.executeSql('INSERT INTO proyectos_funcionarios (Id_Proyecto_Funcionario,Id_Funcionario,Id_Proyecto,fechainicio,fechafinal) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      this.loadprofun();
    });
  }

  addLugar(data) {
    return this.database.executeSql('INSERT INTO lugares (Id_Lugares,U_codigo_depto,Departamento,U_codigo_municipio,Municipio,Vereda,Comunidad,Mostrar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadLugares();
    });
  }

  addTipoFotos(data) {
    return this.database.executeSql('INSERT INTO TipoFotos (Id_Tipofoto,tipo,descripcion) VALUES (?, ?, ?)', data).then(data => {
      this.loadTipoFotos();
    });
  }

  addProyectos(data) {
    return this.database.executeSql('INSERT INTO proyectos (Id_Proyecto,nombre,descripcion,contratante,fechainicio,fechafin) VALUES (?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadProyectos();
    });
  }

  addEncabezado(data, cb) {
    return this.database.executeSql('INSERT INTO encabezado (Id_Encabezado,Id_Encuesta,Id_Proyecto_Funcionario,Num_formulario,Dia,Mes,Año,upload,edit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEncabezado((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addServicios(data, cb) {
    return this.database.executeSql('INSERT INTO servicios_publicos (Id_Servicio_Publico,Id_Encuesta,Id_Proyecto_Funcionario,upload,edit) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadServicios((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addSocioDemo(data, cb) {
    return this.database.executeSql('INSERT INTO c_sociodemograficas (Id_CaracteristicaS,Id_Encuesta,Id_Proyecto_Funcionario,upload,edit) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadSociodemo((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addEconomia(data, cb) {
    return this.database.executeSql('INSERT INTO economia (Id_Economia,Id_Encuesta,Id_Proyecto_Funcionario,upload,edit) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEconomia((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addEnergia(data, cb) {
    return this.database.executeSql('INSERT INTO energia (Id_Energia,Id_Encuesta,Id_Proyecto_Funcionario,upload,edit) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEnergia((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addRacional(data, cb) {
    return this.database.executeSql('INSERT INTO URE (Id_URE,Id_Encuesta,Id_Proyecto_Funcionario,upload,edit) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadRacional((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addVivienda(data, cb) {
    return this.database.executeSql('INSERT INTO datos_vivienda_I (Id_Dato_Vivienda,Id_Encuesta,Id_Proyecto_Funcionario,upload,edit) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadVivienda((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addPredio(data, cb) {
    return this.database.executeSql('INSERT INTO caracteristicas_predio (Id_CaracteristicaP , Id_Encuesta , Id_Proyecto_Funcionario ,upload , edit) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(dato => {
      console.log('Respuesta', dato, dato.rowsAffected);
      cb(true);
    });
  }

  addTerm(data, cb) {
    return this.database.executeSql('INSERT INTO porcentaje (Id , Id_Encuesta , Id_Proyecto_Funcionario ,upload , edit ) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(dato => {
      console.log('Respuesta', dato, dato.rowsAffected);
      cb(true);
    });
  }


  addEncuestadores(data, cb) {
    return this.database.executeSql('INSERT INTO encuestadores (Id_Encuestador, Id_Encuesta, Id_Proyecto_Funcionario, upload , edit) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(dato => {
      console.log('Respuesta', dato, dato.rowsAffected);
      cb(true);
    });
  }

  addDatosper(data, cb) {
    return this.database.executeSql('INSERT INTO tratamiento_DP (Id_TratamientoDP, Id_Encuesta, Id_Proyecto_Funcionario, upload , edit) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(dato => {
      console.log('Respuesta', dato, dato.rowsAffected);
      cb(true);
    });
  }

  addConsentimiento(data, cb) {
    return this.database.executeSql('INSERT INTO consentimiento (Id_Consentimiento, Id_Encuesta, Id_Proyecto_Funcionario,upload , edit) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(dato => {
      console.log('Respuesta', dato, dato.rowsAffected);
      cb(true);
    });
  }

  addUbicacion(data, cb) {
    return this.database.executeSql('INSERT INTO ubicacion (Id_Ubicación, Id_Encuesta, Id_Proyecto_Funcionario, U_latitud, U_longitud,U_altitud,U_depto,U_codigo_depto,U_municipio,U_codigo_municipio,U_vereda,U_corregimiento,Tipo_proyecto,  upload , edit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(dato => {
      console.log('Respuesta', dato, dato.rowsAffected);
      cb(true);
    });
  }

  addFotosEncuestaU(data, cb) {
    return this.database.executeSql('INSERT INTO fotos_encuesta (Id_Foto_Encuesta, Id_Encuesta, Id_Proyecto_Funcionario, rutalocal, rutaserver, estado, fecha, upload, edit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(dato => {
      console.log('Respuesta', dato, dato.rowsAffected);
      cb(true);
    });
  }

  addEncabezado2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE encabezado SET Num_formulario = \'' + datos[0] + '\',  Dia = \'' + datos[1] + '\',  Mes  = \'' + datos[2] + 
    '\',  Año = \'' + datos[3] + '\', upload= \'' + datos[4] + '\', edit= \'' + datos[5] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEncabezado((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEncabezado((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addPredio2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE caracteristicas_predio SET Uso_predio = \'' + datos[0] + 
    '\',  Estrato_predio = \'' + datos[1] + 
    '\', upload= \'' + datos[2] + 
    '\', edit= \'' + datos[3] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadPredio((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadPredio((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addTermi2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE porcentaje SET Porcentaje = \'' + datos[0] + 
    '\',  IsTerm = \'' + datos[1] +
    '\',  Fecha_Term = \'' + datos[2] + 
    '\', upload= \'' + datos[3] + 
    '\', edit= \'' + datos[4] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadTermi((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadTermi((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addConsentimiento2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE consentimiento SET Nombre_beneficiario_usuario = \'' + datos[0] + '\',  Nombre_encuestado = \'' + datos[1] + 
    '\', Telefono_celular_encuestado = \'' + datos[2] + '\', Telefono_fijo_encuestado = \'' + datos[3] + 
    '\', Cedula_encuestado = \'' + datos[4] + '\', Correo_encuestado = \'' + datos[5] + '\', Constancia_uso_datos = \'' + datos[6] + 
    '\', Explicado_posible_solucion = \'' + datos[7] + '\', Explicado_beneficio_limitacion = \'' + datos[8] + 
    '\', Aprobacion_proyecto = \'' + datos[9] + '\' , Autorizacion_fotos_videos = \'' + datos[10] + 
    '\', Comentarios_encuestador = \'' + datos[11] + 
    '\', Reaccion_preguntas = \'' + datos[12] + '\' , Reaccion_proyecto = \'' + datos[13] +
    '\', upload= \'' + datos[14] + '\', edit= \'' + datos[15] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadConsentimiento((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadConsentimiento((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addEncuestadores2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE encuestadores SET Nombre_encuestador = \'' + datos[0] + 
    '\' , Telefono_celular_encuestador = \'' + datos[1] +
    '\' , Telefono_fijo_encuestador = \'' + datos[2] + 
    '\' , Correo_encuestador = \'' + datos[3] + 
    '\' , Ciudad_vive_encuestador = \'' + datos[4] + 
    '\', upload= \'' + datos[5] + '\', edit= \'' + datos[6] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEncuestador((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEncuestador((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addDatosper2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE tratamiento_DP SET Autorizacion = \'' + datos[0] + '\',  Edificacion = \'' + datos[1] + 
    '\', Tipo_institucion = \'' + datos[2] + '\', Tipo_institucion_otro_cual = \'' + datos[3] + '\', Uso_viv_inst = \'' + datos[4] + 
    '\', upload= \'' + datos[5] + '\', edit= \'' + datos[6] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadDatosper((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadDatosper((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addUbicacion2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE ubicacion SET U_latitud = \'' + datos[0] + '\',  U_longitud = \'' + datos[1] + 
    '\', U_altitud = \'' + datos[2] + '\', U_depto = \'' + datos[3] + '\', U_codigo_depto = \'' + datos[4] + 
    '\', U_municipio = \'' + datos[5] + '\', U_codigo_municipio = \'' + datos[6] + '\', U_vereda = \'' + datos[7] + 
    '\', U_corregimiento = \'' + datos[8] + '\', Tipo_proyecto = \'' + datos[9] + '\', upload= \'' + datos[10] + 
    '\', edit= \'' + datos[11] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadUbicacion((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadUbicacion((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addVivienda2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE datos_vivienda_I SET Nombre_comunidad = \'' + datos[0] + '\', Territorialidad = \'' + datos[1] + 
    '\', Tenencia_posesion = \'' + datos[2] + '\', Hogares_vivienda = \'' + datos[3] + '\', Personas_vivienda = \'' + datos[4] + 
    '\', Paredes_exteriores = \'' + datos[5] + '\', Techo_cubierta = \'' + datos[6] + '\', Pisos = \'' + datos[7] + 
    '\', Afectacion_inundacion = \'' + datos[8] + '\', Afectacion_avalancha = \'' + datos[9] + '\', Afectacion_hundimiento = \'' + datos[10] + 
    '\', Afectacion_tormentas = \'' + datos[11] + '\', area_predio = \'' + datos[12] + 
    '\', upload= \'' + datos[13] + '\', edit= \'' + datos[14] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadVivienda((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadVivienda((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addServicios2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE servicios_publicos SET Telefono_fijo_propio = \'' + datos[0] + '\', Telefono_fijo_comunitario = \'' + datos[1] + 
    '\', Celular = \'' + datos[2] + '\', Internet_comunitario = \'' + datos[3] + '\', Internet_propio = \'' + datos[4] + 
    '\', Ninguna_anteriores = \'' + datos[5] + '\', Acueducto_domiciliario_publico = \'' + datos[6] + '\', Medidor_agua = \'' + datos[7] + 
    '\', Pila_medidor_agua_publica = \'' + datos[8] + '\', Aljibe = \'' + datos[9] + '\' , Rio_quebrada_manantial_nacimiento = \'' + datos[10] + 
    '\', Pozo_dentro_vivienda = \'' + datos[11] + '\', Agua_lluvia = \'' + datos[12] + '\', Carrotanque = \'' + datos[13] + 
    '\', Aguatero_embotellada_bolsa = \'' + datos[14] + '\', Inodoro_conectado_alcantarillado = \'' + datos[15] + 
    '\', Inodoro_conectado_pozo_septico = \'' + datos[16] + '\', Inodoro_sin_conexion = \'' + datos[17] + '\', Letrina = \'' + datos[18] + 
    '\' , Vivienda_institucion_sin_servicio_sanitario = \'' + datos[19] + '\', Sanitario_inodoro_otro_cual = \'' + datos[20] + 
    '\', Gas = \'' + datos[21] + '\', upload= \'' + datos[22] + '\', edit= \'' + datos[23] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadServicios((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadServicios((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }
//revisar
  addSociodemo2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE c_sociodemograficas SET Parentesco = \'' + datos[0] + '\', Anos_cumplidos= \'' + datos[1] + 
    '\', Permanencia_vivienda= \'' + datos[2] + '\', Sexo= \'' + datos[3] + '\', Ocupacion= \'' + datos[4] + 
    '\', Ingresos_vivienda= \'' + datos[5] + '\', Nivel_educacion= \'' + datos[6] + '\', Reconocimiento= \'' + datos[7] + 
    '\', Registro_victimas= \'' + datos[8] + '\', Lengua_nativa= \'' + datos[9] + '\', Nombre_lengua_nativa= \'' + datos[10] + 
    '\', Problemas_uso_lena= \'' + datos[11] + '\', Organizacion= \'' + datos[12] + 
    '\', Nombre_organizacion= \'' + datos[13] + '\', upload= \'' + datos[14] + '\', edit= \'' + datos[15] + 
    '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadSociodemo((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadSociodemo((data2) => {
        console.log(data2);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addSociodemo2_2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE c_sociodemograficas SET Labores_Lab_domesticas_ninas= \'' + datos[0] + 
    '\', Labores_pagosycompras_ninas= \'' + datos[1] + '\', Labores_lab_finca_ninas= \'' + datos[2] + 
    '\', Labores_transporte_ninas= \'' + datos[3] + '\', Labores_admon_finca_ninas= \'' + datos[4] + 
    '\', Labores_comercia_ninas= \'' + datos[5] + '\', Labores_estudia_ninas= \'' + datos[6] + '\', Labores_formacion_hijos_ninas = \'' + datos[7] + 
    '\', Labores_cuiado_mayores_enfermos_ninas= \'' + datos[8] + '\', Labores_otro_cual_ninas= \'' + datos[9] + 
    '\', Labores_Lab_domesticas_ninos= \'' + datos[10] + '\', Labores_pagosycompras_ninos= \'' + datos[11] + 
    '\', Labores_lab_finca_ninos= \'' + datos[12] + '\', Labores_transporte_ninos= \'' + datos[13] + 
    '\', Labores_admon_finca_ninos= \'' + datos[14] + '\', Labores_comercia_ninos= \'' + datos[15] + 
    '\', Labores_estudia_ninos= \'' + datos[16] + '\', Labores_formacion_hijos_ninos= \'' + datos[17] + 
    '\', Labores_cuiado_mayores_enfermos_ninos= \'' + datos[18] + '\', Labores_otro_cual_ninos= \'' + datos[19] + 
    '\', Labores_Lab_domesticas_mujeres= \'' + datos[20] + '\', Labores_pagosycompras_mujeres= \'' + datos[21] + 
    '\', Labores_lab_finca_mujeres= \'' + datos[22] + '\', Labores_transporte_mujeres= \'' + datos[23] + 
    '\', Labores_admon_finca_mujeres= \'' + datos[24] + '\', Labores_comercia_mujeres= \'' + datos[25] + 
    '\', Labores_estudia_mujeres= \'' + datos[26] + '\', Labores_formacion_hijos_mujeres= \'' + datos[27] + 
    '\', Labores_cuiado_mayores_enfermos_mujeres= \'' + datos[28] + '\', Labores_otro_cual_mujeres= \'' + datos[29] + 
    '\', Labores_Lab_domesticas_hombres= \'' + datos[30] + '\', Labores_pagosycompras_hombres= \'' + datos[31] + 
    '\', Labores_lab_finca_hombres = \'' + datos[32] + '\', Labores_transporte_hombres= \'' + datos[33] + 
    '\', Labores_admon_finca_hombres= \'' + datos[34] + '\', Labores_comercia_hombres= \'' + datos[35] + 
    '\', Labores_estudia_hombres= \'' + datos[36] + '\', Labores_formacion_hijos_hombres= \'' + datos[37] + 
    '\', Labores_cuiado_mayores_enfermos_hombres= \'' + datos[38] + '\', Labores_otro_cual_hombres= \'' + datos[39] + 
    '\', upload= \'' + datos[40] + '\', edit= \'' + datos[41] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadSociodemo((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadSociodemo((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }
  addEconomia2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE economia SET Ganaderia_caza_silvicultura_pesca = \'' + datos[0] + '\', Explotacion_minas_canteras = \'' + datos[1] + 
    '\', Fabricacion_articulos_textiles_prendas_vestir= \'' + datos[2] + '\', Construccion= \'' + datos[3] + 
    '\', Venta_productos_no_fabricados_hogar= \'' + datos[4] + '\', Elaboracion_procesamiento_alimentos_bebidas= \'' + datos[5] + 
    '\', Servicio_restaurante_bar_similares= \'' + datos[6] + '\', Alojamiento= \'' + datos[7] + '\', Arrendamientos= \'' + datos[8] + 
    '\', Servicios_actividades_reparacion_mantenimiento= \'' + datos[9] + '\', Servicios_artisticos_peluqueria= \'' + datos[10] + 
    '\', Elaboracion_artesanias= \'' + datos[11] + '\', Empleo_integrantes_familia= \'' + datos[12] + '\', Agricultura= \'' + datos[13] + 
    '\', Fuente_ingreso_otro_cual= \'' + datos[14] + '\', Cultivo1= \'' + datos[15] + '\', Cultivo2= \'' + datos[16] + 
    '\', Cultivo3= \'' + datos[17] + '\', Cultivo4= \'' + datos[18] + '\', Gastos_mes_arriendo= \'' + datos[19] + 
    '\', Gastos_mes_acueducto= \'' + datos[20] + '\', Gastos_mes_alcantarillado= \'' + datos[21] + '\', Gastos_mes_gas= \'' + datos[22] + 
    '\', Gastos_mes_salud= \'' + datos[23] + '\', Gastos_mes_transporte= \'' + datos[24] + '\' , Gastos_mes_educacion= \'' + datos[25] + 
    '\', Gastos_mes_alimentacion= \'' + datos[26] + '\', Gastos_mes_recreacion= \'' + datos[27] + '\', Gastos_mes_vestuario= \'' + datos[28] + 
    '\', Gastos_mes_energia_electrica= \'' + datos[29] + '\', Gastos_mes_otro_cual= \'' + datos[30] + '\', Gastos_mes_total= \'' + datos[31] + 
    '\', Gastos_mes_otro_ban= \'' + datos[32] + '\', upload= \'' + datos[33] + '\', edit= \'' + datos[34] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEconomia((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEconomia((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addEnergia2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE energia SET FE_electrica = \'' + datos[0] + '\', FE_cocinar_gaspropano_consumo_mes= \'' + datos[1] + 
    '\', FE_cocinar_gasnatural_consumo_mes= \'' + datos[2] + '\', FE_cocinar_gasolina_consumo_mes = \'' + datos[3] + 
    '\', FE_cocinar_kerosene_consumo_mes = \'' + datos[4] + '\', FE_cocinar_petroleo_consumo_mes = \'' + datos[5] + 
    '\', FE_cocinar_alcohol_consumo_mes = \'' + datos[6] + '\', FE_cocinar_carbon_mineral_consumo_mes = \'' + datos[7] + 
    '\', FE_cocinar_lena_comprada_consumo_mes= \'' + datos[8] + '\', FE_cocinar_lena_auto_apropiada_consumo_mes = \'' + datos[9] + 
    '\', FE_cocinar_residuos_agro_consumo_mes= \'' + datos[10] + '\', FE_cocinar_otro_consumo_mes= \'' + datos[11] + 
    '\', FE_cocinar_gaspropano_costo_mes = \'' + datos[12] + '\', FE_cocinar_gasnatural_costo_mes= \'' + datos[13] + 
    '\', FE_cocinar_gasolina_costo_mes = \'' + datos[14] + '\', FE_cocinar_kerosene_costo_mes = \'' + datos[15] + 
    '\', FE_cocinar_petroleo_costo_mes = \'' + datos[16] + '\', FE_cocinar_alcohol_costo_mes = \'' + datos[17] + 
    '\', FE_cocinar_carbon_mineral_costo_mes = \'' + datos[18] + '\', FE_cocinar_lena_comprada_costo_mes = \'' + datos[19] + 
    '\', FE_cocinar_lena_auto_apropiada_costo_mes = \'' + datos[20] + '\', FE_cocinar_residuos_agro_costo_mes = \'' + datos[21] + 
    '\', FE_cocinar_otro_cual_costo_mes = \'' + datos[22] + '\', FE_cocinar_prefiere = \'' + datos[23] + '\', FE_cocinar_otros_ban = \'' + datos[24] +
    '\', FE_iluminar_bateria_consumo_mes = \'' + datos[25] + '\', FE_iluminar_planta_gasolina_consumo_mes = \'' + datos[26] + 
    '\', FE_iluminar_kerosene_consumo_mes = \'' + datos[27] + '\', FE_iluminar_petroleo_consumo_mes = \'' + datos[28] + 
    '\', FE_iluminar_alcohol_consumo_mes = \'' + datos[29] + '\', FE_iluminar_planta_diesel_consumo_mes = \'' + datos[30] + 
    '\', FE_iluminar_velas_consumo_mes = \'' + datos[31] + '\', FE_iluminar_otro_consumo_mes = \'' + datos[32] + 
    '\', FE_iluminar_bateria_costo_mes = \'' + datos[33] + '\', FE_iluminar_planta_gasolina_costo_mes = \'' + datos[34] + 
    '\', FE_iluminar_kerosene_costo_mes = \'' + datos[35] + '\', FE_iluminar_petroleo_costo_mes = \'' + datos[36] + 
    '\', FE_iluminar_alcohol_costo_mes = \'' + datos[37] + '\', FE_iluminar_planta_diesel_costo_mes = \'' + datos[38] + 
    '\', FE_iluminar_velas_costo_mes = \'' + datos[39] + '\', FE_iluminar_otro_costo_mes = \'' + datos[40] + 
    '\', FE_iluminar_bateria_localizacion = \'' + datos[41] + '\', FE_iluminar_planta_gasolina_localizacion = \'' + datos[42] + 
    '\', FE_iluminar_kerosene_localizacion = \'' + datos[43] + '\', FE_iluminar_petroleo_localizacion = \'' + datos[44] + 
    '\', FE_iluminar_alcohol_localizacion = \'' + datos[45] + '\', FE_iluminar_planta_diesel_localizacion = \'' + datos[46] + 
    '\', FE_iluminar_velas_localizacion = \'' + datos[47] + '\', FE_iluminar_otro_localizacion = \'' + datos[48] + 
    '\', FE_iluminar_otro_ban = \'' + datos[49] + '\', FE_iluminar_usa = \'' + datos[50] + '\', tarifa_mensual = \'' + datos[51] + '\', Voluntad_de_pago = \'' + datos[52] + 
    '\', upload= \'' + datos[53] + '\', edit= \'' + datos[54] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEnergia((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEnergia((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addEnergia2_2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE energia SET Equipos_aire_acondicionado_tiene = \'' + datos[0] + 
    '\', Equipos_ventilador_tiene = \'' + datos[1] + '\', Equipos_radio_tiene = \'' + datos[2] + 
    '\', Equipos_televisor_tiene = \'' + datos[3] + '\', Equipos_dvd_tiene = \'' + datos[4] + 
    '\', Equipos_computador_tiene = \'' + datos[5] + '\', Equipos_impresora_tiene = \'' + datos[6] + 
    '\', Equipos_celular_tiene = \'' + datos[7] + '\', Equipos_motobomba_tiene = \'' + datos[8] + 
    '\', Equipos_licuadora_tiene = \'' + datos[9] + '\', Equipos_nevera_tiene = \'' + datos[10] + 
    '\', Equipos_congelador_tiene = \'' + datos[11] + '\', Equipos_iluminacion_tiene = \'' + datos[12] + 
    '\', Equipos_emprendimiento_tiene = \'' + datos[13] + '\', Equipos_otros_tiene = \'' + datos[14] + 
    '\', Equipos_aire_acondicionado_necesita = \'' + datos[15] + '\', Equipos_ventilador_necesita = \'' + datos[16] + 
    '\', Equipos_radio_necesita = \'' + datos[17] + '\', Equipos_televisor_necesita = \'' + datos[18] + 
    '\', Equipos_dvd_necesita = \'' + datos[19] + '\', Equipos_computador_necesita = \'' + datos[20] + 
    '\', Equipos_impresora_necesita = \'' + datos[21] + '\', Equipos_celular_necesita = \'' + datos[22] + 
    '\', Equipos_motobomba_necesita = \'' + datos[23] + '\', Equipos_licuadora_necesita = \'' + datos[24] + 
    '\', Equipos_nevera_necesita = \'' + datos[25] + '\', Equipos_congelador_necesita = \'' + datos[26] + 
    '\', Equipos_iluminacion_necesita = \'' + datos[27] + '\', Equipos_emprendimiento_necesita = \'' + datos[28] + 
    '\', Equipos_otros_necesita = \'' + datos[29] + '\', Contaminacion_ruido = \'' + datos[30] + '\', Contaminacion_olores = \'' + datos[31] +
    '\', Planea_implementar_proyecto = \'' + datos[32] + '\', Cual_proyecto = \'' + datos[33] + '\', Requiere_energia_proyecto = \'' + datos[34] +
    '\', upload= \'' + datos[35] + '\', edit= \'' + datos[36] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEnergia((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEnergia((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

//revisar, respecto al número de hojas
  /*addEnergia2_3(datos, Id_Encuesta, cb) {
    const query = 'UPDATE energia3_ipse SET patiotiene = \'' + datos[0] + '\', patioquiere= \'' + datos[1] + '\', banotiene= \'' + datos[2] + '\', banoquiere= \'' + datos[3] + '\', equipostiene= \'' + datos[4] + '\', equiposquiere= \'' + datos[5] + '\', contamina= \'' + datos[5] + '\', afectan= \'' + datos[7] + '\', fuentesambiente= \'' + datos[8] + '\', emprendimiento= \'' + datos[9] + '\', cualemp= \'' + datos[10] + '\', productivo= \'' + datos[11] + '\', pagar= \'' + datos[12] + '\', mensualmente= \'' + datos[13] + '\', recaudar= \'' + datos[14] + '\' , edit= \'' + datos[15] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEnergia3((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadEnergia3((data) => {
        console.log(data);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }*/
/*
  addRacional2(datos, Id_Encuesta, cb) {
    const query = 'UPDATE URE SET Uso_adecuado_energia = \'' + datos[0] + '\', Escuchado_uso_racional_energia = \'' + datos[1] + 
    '\', Conocer_generacionyuso_energia = \'' + datos[2] + '\', Temas_generacionyuso_energia = \'' + datos[3] + 
    '\', Compartir_saberes = \'' + datos[4] + '\', upload= \'' + datos[5] + '\', edit= \'' + datos[6] + '\' WHERE Id_Encuesta=\'' + Id_Encuesta + '\'';
    console.log('QUERY', query);
    this.database.executeSql(query).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadRacional((data) => {
        console.log(data);
      });
      if (data.rowsAffected > 0 ) {
        cb(true);
      } else {
        cb(false);
      }
    }).catch(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadRacional((data) => {
        console.log(data);
      });
      if (data.rowsAffected > 0) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  deletevivienda(id) {
    const query = 'UPDATE datos_vivienda_I SET upload = 1, edit = 0 WHERE Id_Dato_Vivienda = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deletepredio(id) {
    const query = 'UPDATE caracteristicas_predio SET upload = 1, edit = 0 WHERE Id_CaracteristicaP = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deletetransporte(id) {
    const query = 'UPDATE transporte SET upload = 1 WHERE Id_Transporte = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deletesociodemo(id) {
    const query = 'UPDATE c_sociodemograficas SET upload = 1, edit = 0 WHERE Id_CaracteristicaS  = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deleteEnergia(id) {
    const query = 'UPDATE energia SET upload = 1, edit = 0 WHERE Id_Energia  = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deleteEconomia(id) {
    const query = 'UPDATE economia SET upload = 1, edit = 0 WHERE Id_Economia  = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deleteservicios(id) {
    const query = 'UPDATE servicios_publicos SET upload = 1, edit = 0 WHERE Id_Servicio_Publico = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deleteracional(id) {
    const query = 'UPDATE URE SET upload = 1, edit = 0 WHERE Id_URE = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deletetermi(id) {
    const query = 'UPDATE porcentaje SET upload = 1, edit = 0 WHERE Id = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deleteconsentimiento(id) {
    const query = 'UPDATE consentimiento SET upload = 1, edit = 0 WHERE Id_Consentimiento = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deleteencabezado(id) {
    const query = 'UPDATE encabezado SET upload = 1, edit = 0 WHERE Id_Encabezado = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deleteencuestadores(id) {
    const query = 'UPDATE encuestadores SET upload = 1, edit = 0 WHERE Id_Encuestador = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deletedatosper(id) {
    const query = 'UPDATE tratamiento_DP SET upload = 1, edit = 0 WHERE Id_TratamientoDP = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deleteubicacion(id) {
    const query = 'UPDATE ubicacion SET upload = 1, edit = 0 WHERE Id_Ubicación = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  /*deleteencuesta(id) {
    const query = 'UPDATE encuesta_ipse SET upload = 1, edit = 0 WHERE Id_Encuesta = \'' + id + '\';';
    return this.database.executeSql(query);
  }*/
/*
   deletefotos_encuesta(id, ruta) {
    console.log('ELIMINAR FOTO', id, ruta);
    const query = 'UPDATE fotos_encuesta SET upload = 1, rutaserver = \'' + ruta + '\' WHERE Id_Foto_Encuesta = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deletefotos_transporte(id, ruta) {
    console.log('ELIMINAR FOTO', id, ruta);
    const query = 'UPDATE fotos_transporte SET upload = 1, rutaserver = \'' + ruta + '\' WHERE idfoto = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  deletefotos_firma(id, ruta) {
    console.log('ELIMINAR FOTO', id, ruta);
    const query = 'UPDATE fotos_firma SET upload = 1, rutaserver = \'' + ruta + '\' WHERE Id_Foto_Firma = \'' + id + '\';';
    return this.database.executeSql(query);
  }

  addfotos_encuesta(data, cb) {
    return this.database.executeSql('INSERT INTO fotos_encuesta (Id_Foto_Encuesta, Id_Encuesta,Id_Proyecto_Funcionario,rutalocal,rutaserver,estado,fecha,upload,edit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadfotos_encuesta((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  addfotos_firma(data, cb) {
    return this.database.executeSql('INSERT INTO fotos_firma (Id_Foto_Firma, Id_Encuesta,Id_Proyecto_Funcionario,documento,rutalocal,rutaserver,estado,fecha,upload,edit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      console.log('Respuesta', data, data.rowsAffected);
      this.loadfotos_firma((data1) => {
        console.log(data1);
      });
      if (data.rowsAffected == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

  ExecQuery(query, cb) {
    return this.database.executeSql(query, []).then(data => {
      cb(true, data);
    }).catch(err => {
      console.error('Error al Ejecutar el query', err);
    });
  }
*/
}
