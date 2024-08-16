import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia.models';
import { catchError, tap, map } from 'rxjs/operators';
import { Autor } from '../models/autor.models';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(public http: HttpClient) { }


  public getNoticias(): Observable<Noticia[]>{
    return this.http.get<Noticia[]>("https://localhost:44390/api/Noticia/obtener");
  }

  public getNoticiasByID(NoticiaID: number): Observable<Noticia>{
    return this.http.get<Noticia>("https://localhost:44390/api/Noticia/obtenerID/" + NoticiaID);
  }

  public deleteNoticia(noticiaid: number): Observable<boolean>{
    return this.http.delete<boolean>("https://localhost:44390/api/Noticia/eliminar/" + noticiaid)
    .pipe(
      tap(data => console.log('deleteNoticia' + noticiaid)));
  }


  public getAutores(): Observable<Autor[]>{
    return this.http.get<Autor[]>("https://localhost:44390/api/Noticia/listadoAutores");
  }

  public agregarNoticia(noticia: Noticia): Observable<boolean>{
    return this.http.post<boolean>("https://localhost:44390/api/Noticia/agregar", noticia);
  }
  

  public editarNoticia(noticia: Noticia): Observable<boolean>{
    return this.http.put<boolean>("https://localhost:44390/api/Noticia/editar/", noticia);
  }

}
