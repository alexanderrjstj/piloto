export interface Tarea {
    id: string;
    titulo: string;
    descripcion: string;
    fecha: Date;
    etiqueta: string;
    prioridad: 'baja' | 'media' | 'alta';
    completada: boolean;
  } 