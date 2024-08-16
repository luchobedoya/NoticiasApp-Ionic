import { Autor } from './autor.models';

export interface Noticia {
    noticiaID: number;
    titulo: string;
    descripcion: string;
    contenido: string;
    fecha: Date;
    autorID: number;
    autor: Autor;
}

export class Noticia {
    noticiaID: number;
    titulo: string;
    descripcion: string;
    contenido: string;
    fecha: Date;
    autorID: number;
    autor: Autor;

    constructor(datos?: Noticia){
        if (datos != null) {
            this.noticiaID = datos.noticiaID;
            this.titulo = datos.titulo;
            this.descripcion = datos.descripcion;
            this.contenido = datos.contenido;
            this.fecha = datos.fecha;
            this.autor = datos.autor;
            this.autorID = datos.autorID;
            return
        }else {
            this.noticiaID = this.noticiaID;
            this.titulo = this.titulo;
            this.descripcion = this.descripcion;
            this.contenido = this.contenido;
            this.fecha = this.fecha;
            this.autor = this.autor;
            this.autorID = this.autorID;
        }

    }

}

