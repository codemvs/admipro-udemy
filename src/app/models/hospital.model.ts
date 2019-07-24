import { Usuario } from './usuario.model';

export class Hospital {
    constructor(
        public _id: string,
        public nombre: string,
        public usuario: Usuario
    ) {}
}
