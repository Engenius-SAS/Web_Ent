import { Injectable } from '@angular/core';
import { ajax } from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
NetCheck;
DescargaInicial = false;
UserData;
Id_Encuesta;
Images;
ImagesF;
Proyectos;
Id_Proyecto;
// VARIABLES TABLAS
Funcionarios;
Estados;
TipoFotos;
Elementos;
ElementosAmb;
Lugares;
Pendientes;
FotosP;
Editadas;
datodept;
FamiliaGlobal;
Id_busqueda;
data1 = new Array();
  constructor() { }
 
  CheckInternet(respuesta) {
    const pdata1 = {option: 'inter'};
    console.log(pdata1);
    ajax({data: pdata1,	cache: false,	dataType: 'json',	type:  'post',
    url: 'http://demo.engenius.co/DatabaseUIB.php',
    success( data ) {
    console.log('Datos Recibidos:', data);
    },
    error( errorThrown ) {
    console.log(JSON.stringify(errorThrown));
    }
    }).then((response) => {
      console.log('internet', response);
      if (response == 'TRUE') {
        this.NetCheck = true;
        respuesta(true);
      }
    }).catch((err) => {
      console.log('Error', err);
      this.NetCheck = false;
      respuesta(false);
    });
  }

  consultar(datos, respuesta) {
    console.log('Consultando');
    ajax({data: datos,	cache: false,	dataType: 'json',	type:  'post',
    // url: 'https://modulovisitas.explorandoando.co/PHP/DatabaseUIB.php',
    url: 'https://www.php.engenius.com.co/DatabaseE.php',
    success( data, textStatus ) {
      console.warn('bien', data, textStatus);
    },
    error(  ) {
      console.warn('mal');
    }
    }).then((response) => {
      respuesta(null, response);
    }).catch((err) => {
      respuesta(err);
    });
  }
}
