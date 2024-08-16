import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { Autor } from '../models/autor.models';
import { Noticia } from '../models/noticia.models';
import { error } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-noticia',
  templateUrl: './agregar-noticia.page.html',
  styleUrls: ['./agregar-noticia.page.scss'],
})
export class AgregarNoticiaPage implements OnInit {

  Autores: Autor[] = [];
  noticia: Noticia = new Noticia();
  esEditable: boolean = false;
  url: string = '';

  constructor(private noticiaServices: NoticiasService, 
              private route: Router,
              public loadingController: LoadingController,
              public toastController: ToastController,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.url = JSON.parse(this.activatedRoute.snapshot.params.noticiaEditar).responses
    console.log(this.url);
    
    // if (JSON.parse(this.activatedRoute.snapshot.params.noticiaEditar) != undefined) {
    //   this.noticia = new Noticia(JSON.parse(this.activatedRoute.snapshot.params.noticiaEditar));
    //   this.esEditable = true;
    // }

    this.getAutores();
  }


  getAutores(){
    this.noticiaServices.getAutores().subscribe((resultados)=>{
      this.Autores = resultados;
      console.log(this.Autores);
    })
  }

  async guardarNoticia(){
    console.log(this.noticia);

    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });
    await loading.present();

    this.noticiaServices.agregarNoticia(this.noticia).subscribe(()=>{
      console.log("Guardo");
      loading.dismiss();
      this.mostrarMensaje('Noticia Guardada');
      this.route.navigate(['/listado-noticias']);
      this.noticia = new Noticia(null);
      

    }, error => {
      console.log(error);
      this.mostrarMensaje('Ocurrio un error');
      loading.dismiss();
    });
  }

  async editarNoticia(){
    console.log(this.noticia);

    const loading = await this.loadingController.create({
      message: 'Editando...'
    });
    await loading.present();

    this.noticiaServices.editarNoticia(this.noticia).subscribe(()=>{
      loading.dismiss();
      this.mostrarMensaje('Noticia Editada');
      this.route.navigate(['/listado-noticias']);

    }, error => {
      console.log(error);
      this.mostrarMensaje('Ocurrio un error');
      loading.dismiss();
    });
  }

  async mostrarMensaje(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  
}
