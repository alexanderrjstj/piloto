import { useState } from 'react';
import { Tarea as TareaType } from '../types/Tarea';

interface TareaProps {
  tarea: TareaType;
  onToggleCompletada: (id: string) => void;
  onEliminar: (id: string) => void;
  onEditar: (id: string, tareaActualizada: Partial<TareaType>) => void;
}

export const Tarea = ({ tarea, onToggleCompletada, onEliminar, onEditar }: TareaProps) => {
  const [editando, setEditando] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(tarea.titulo);
  const [nuevaDescripcion, setNuevaDescripcion] = useState(tarea.descripcion);
  const [nuevaFecha, setNuevaFecha] = useState(tarea.fecha);
  const [nuevaEtiqueta, setNuevaEtiqueta] = useState(tarea.etiqueta);
  const [nuevaPrioridad, setNuevaPrioridad] = useState(tarea.prioridad);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditar(tarea.id, {
      titulo: nuevoTitulo,
      descripcion: nuevaDescripcion,
      fecha: nuevaFecha,
      etiqueta: nuevaEtiqueta,
      prioridad: nuevaPrioridad
    });
    setEditando(false);
  };

  const getColorPrioridad = (prioridad: string) => {
    switch (prioridad) {
      case 'baja':
        return 'bg-green-100 text-green-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'alta':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col p-4 dark:bg-neutral-800 bg-white w-full rounded-xl shadow mb-4">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center w-full space-x-4">
          <input
            type="checkbox"
            checked={tarea.completada}
            onChange={() => onToggleCompletada(tarea.id)}
            className="w-4 h-4 cursor-pointer text-blue-600 rounded"
          />
          {editando ? (
            <form onSubmit={handleSubmit} className="flex-1 w-70 space-y-2">
              <input
                type="text"
                value={nuevoTitulo}
                onChange={(e) => setNuevoTitulo(e.target.value)}
                className="w-full px-2 py-1 rounded-xl focus:outline-none dark:bg-neutral-700 bg-neutral-200 dark:text-white"
                required
              />
              <input
                type="text"
                value={nuevaEtiqueta}
                onChange={(e) => setNuevaEtiqueta(e.target.value)}
                className="w-full px-2 py-1 rounded-xl focus:outline-none dark:bg-neutral-700 bg-neutral-200 dark:text-white"
                placeholder="Etiqueta"
              />
              <input
                type='date'
                value={nuevaFecha.toString().slice(0, 10)}
                onChange={(e) => setNuevaFecha(new Date(e.target.value))}
                className="w-full px-4 py-2 rounded-xl dark:bg-neutral-700 bg-neutral-200 dark:text-white border-none focus:outline-none"
                />
              {/* <select
                value={nuevaPrioridad}
                onChange={(e) => setNuevaPrioridad(e.target.value as 'baja' | 'media' | 'alta')}
                className="w-full px-2 py-1 rounded-xl focus:outline-none bg-neutral-600 text-white"
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select> */}
              <div className="flex w-full">
              <button 
                    type="button" 
                className={`px-4 py-2 w-60 rounded-bl-xl rounded-tl-xl dark:text-white border-2 ${
                    nuevaPrioridad === 'baja' 
                    ? 'bg-green-600 border-green-400 text-white font-bold shadow-lg' 
                    : 'dark:bg-neutral-700 bg-zinc-200 hover:bg-neutral-300 border-transparent dark:hover:bg-neutral-600'
                } transition-all duration-200 cursor-pointer`}
                onClick={() => setNuevaPrioridad('baja')}    
                >
                    Baja
                </button>
                <button 
                    type="button" 
                    className={`px-4 py-2 w-60 dark:text-white border-2 ${
                        nuevaPrioridad === 'media' 
                        ? 'bg-yellow-600 border-yellow-400 text-white font-bold shadow-lg' 
                        : 'dark:bg-neutral-700 bg-zinc-200 hover:bg-neutral-300 border-transparent dark:hover:bg-neutral-600'
                    } transition-all duration-200 cursor-pointer`}
                    onClick={() => setNuevaPrioridad('media')}
                >
                    Media
                </button>
                <button 
                    type="button" 
                    className={`px-4 py-2 w-60 rounded-br-xl rounded-tr-xl dark:text-white border-2 ${
                        nuevaPrioridad === 'alta' 
                        ? 'bg-red-600 border-red-400 text-white font-bold shadow-lg' 
                        : 'dark:bg-neutral-700 bg-zinc-200 hover:bg-neutral-300 border-transparent dark:hover:bg-neutral-600'
                    } transition-all duration-200 cursor-pointer`}
                    onClick={() => setNuevaPrioridad('alta')}
                >
                    Alta
                </button>
              </div>
              <textarea
                value={nuevaDescripcion}
                onChange={(e) => setNuevaDescripcion(e.target.value)}
                className="w-full px-2 py-1 rounded-xl focus:outline-none dark:bg-neutral-700 bg-neutral-200 dark:text-white"
                rows={3}
                placeholder="Descripción"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  className="px-3 py-1 text-sm cursor-pointer dark:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 cursor-pointer text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition-all duration-300"
                >
                  Guardar
                </button>
              </div>
            </form>
          ) : (
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className={`${tarea.completada ? 'line-through text-neutral-400 md:max-w-[80%] max-w-[60%]' : 'dark:text-white font-medium md:max-w-[80%] max-w-[60%]'}`}>
                  {tarea.titulo}
                </span>
                {tarea.etiqueta && (
                  <span className="px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded-full">
                    #{tarea.etiqueta}
                  </span>
                )}
              </div>
              {tarea.descripcion && (
                <p className="mt-1 mb-3 max-w-[90%] text-sm dark:text-zinc-300 text-zinc-500">{tarea.descripcion}</p>
              )}
              <span className={`px-2 py-0.5 text-xs rounded-full ${getColorPrioridad(tarea.prioridad)}`}>
                {tarea.fecha.toString().slice(0, 10)}
              </span>
            </div>
          )}
        </div>
        {!editando && (
          <div className="flex space-x-2">
            <button
              onClick={() => setEditando(true)}
              className="px-2 py-1 bg-blue-600 rounded-lg text-sm cursor-pointer text-white hover:bg-blue-800 transition-all duration-300"
            >
              Editar
            </button>
            <button
              onClick={() => onEliminar(tarea.id)}
              className="px-2 py-1 bg-red-600 rounded-lg text-sm cursor-pointer text-white hover:bg-red-800 transition-all duration-300"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};