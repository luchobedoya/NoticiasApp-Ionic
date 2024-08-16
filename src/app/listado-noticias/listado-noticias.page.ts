import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { Autor } from '../models/autor.models';
import { Noticia } from '../models/noticia.models';
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.page.html',
  styleUrls: ['./listado-noticias.page.scss'],
})
export class ListadoNoticiasPage implements OnInit {

  constructor(private noticiasServices: NoticiasService, private route: Router) { }

  Noticias:Noticia[] = [];

  ngOnInit() {
    this.noticiasServices.getNoticias().subscribe((resultado)=>{
      this.Noticias = resultado;
      console.log(this.Noticias);
    }, (error)=>{
      console.log(error);
    });
  }

  irDetalle(noticia: Noticia){
    this.route.navigate(['noticia-detalle', {noticia: JSON.stringify(noticia)}]);
  }

  eliminarNoticia(noticiaId: number, indice: number){
    console.log(noticiaId); 
    this.noticiasServices.deleteNoticia(noticiaId).subscribe(()=>{
      console.log("noticia eliminada");
      this.Noticias.splice(indice,1);
    },
    error=>{
      console.error(error);
    });
  }

  editarNoticia(noticia: Noticia){
    this.route.navigate(['/agregar-noticia', {noticiaEditar: JSON.stringify(noticia)}])
  }



}
