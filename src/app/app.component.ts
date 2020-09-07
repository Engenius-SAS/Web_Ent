import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public loading: LoadingService,
    public menuCtrl: MenuController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('330867');
      this.splashScreen.hide();
    });
  }

  PaginaInicial() {
      this.loading.LoadingNormal('Cargando...', 3);
      setTimeout(() => {
        this.navCtrl.navigateRoot('/home');
      }, 500);
  }

  CerrarSesion() {
    this.loading.LoadingNormal('Cerrando Sesión', 3);
    setTimeout(() => {
      this.menuCtrl.enable(false);
      this.navCtrl.navigateRoot('/login');
    }, 500);
  }

  Registrar() {
    this.loading.LoadingNormal('Cargando...', 3);
    setTimeout(() => {
      this.navCtrl.navigateRoot('/select');
    }, 500);
  }

  Continuar() {
    this.loading.LoadingNormal('Cargando...', 3);
    setTimeout(() => {
      this.navCtrl.navigateRoot('/conti');
    }, 500);
  }

}
