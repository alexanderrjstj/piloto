import React, { useState} from 'react'
import { Tarea as TareaType } from '../types/Tarea'

interface AddTaskProps {
  onAgregarTarea: (tarea: TareaType) => void
}

export const AddTask = ({ onAgregarTarea }: AddTaskProps) => {

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState (new Date());
  const [etiqueta, setEtiqueta] = useState('');
  const [prioridad, setPrioridad] = useState<'baja' | 'media' | 'alta'>('');
  
  // Función para abrir el modal
  function showModal() {
    // Usamos TypeScript para definir el tipo de 'modal' como HTMLDialogElement
    const modal = document.querySelector('#Form') as HTMLDialogElement;
    if (modal) {
      modal.showModal(); // Abre el modal
    }
  }

  // Función para cerrar el modal
  function closeModal(event: React.MouseEvent) {
    event.preventDefault(); // Prevenir comportamiento por defecto (si es un formulario)
    const modal = document.querySelector('#Form') as HTMLDialogElement;
    if (modal) {
      modal.close(); // Cierra el modal
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titulo.trim()) {
      const nuevaTarea: TareaType = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        fecha,
        etiqueta: etiqueta.trim(),
        prioridad,
        completada: false
      };
      onAgregarTarea(nuevaTarea);
      setTitulo('');
      setDescripcion('');
      setFecha(new Date());
      setEtiqueta('');
      setPrioridad('');
    }

    const modal = document.querySelector('#Form') as HTMLDialogElement;
    if (modal) {
      modal.close(); // Cierra el modal
    }
  };


  return (
    <>
      {/* El div que abre el modal al hacer clic */}
      <div
        onClick={showModal}
        className='bg-zinc-700 hover:bg-zinc-600 w-64 justify-between rounded-2xl p-4 flex items-center gap-2 mx-auto cursor-pointer transition-all duration-300 ease-in-out'
      >
        <h3 className='text-zinc-200 text-xl'>Agregar nueva tarea</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path
            className='stroke-zinc-200'
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 6.722v10.556M17.278 12H6.722M12 21.5a9.5 9.5 0 1 0 0-19a9.5 9.5 0 0 0 0 19"
          />
        </svg>
      </div>

      {/* Modal (diálogo) que se abrirá */}
      <dialog id='Form' className='m-auto bg-zinc-700 rounded-2xl p-10'>
        <form onSubmit={handleSubmit}>
          <h3 className='text-white uppercase text-3xl text-center mb-8'>Nueva tarea</h3>
          <div className="flex space-x-4 flex-col">
            <div className="flex flex-col space-y-2 mb-6 mr-0">
                <label className="text-lg text-white font-bold" htmlFor="titulo">Título</label>
                <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título de la tarea..."
                className="flex-1 px-4 py-2 rounded-xl bg-neutral-800 text-white border-none focus:outline-none"
                required
                />
            </div>
            <div className="flex flex-col space-y-2 mb-6 mr-0">
                <label className="text-lg text-white font-bold" htmlFor="descripcion">Descripción</label>
                <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción de la tarea..."
                className="w-full px-4 py-2 rounded-xl bg-neutral-800 text-white border-none focus:outline-none"
                rows={3}
                />
            </div>
            <div className="flex flex-col space-y-2 mb-6 mr-0">
                <label className="text-lg text-white font-bold" htmlFor="descripcion">Fecha límite</label>
                <input
                type='date'
                value={fecha.toISOString().slice(0, 10)}
                onChange={(e) => setFecha(new Date(e.target.value))}
                className="w-full px-4 py-2 rounded-xl bg-neutral-800 text-white border-none focus:outline-none"
                />
            </div>
            <div className="flex flex-col space-y-2 mb-6 mr-0">
                <label className="text-lg text-white font-bold" htmlFor="prioridad">Prioridad</label>
                {/* <select
                    value={prioridad}
                    onChange={(e) => setPrioridad(e.target.value as 'baja' | 'media' | 'alta')}
                    className="px-4 py-2 w-60 rounded-xl bg-neutral-700 text-white border-none focus:outline-none hover:bg-neutral-600 transition-colors duration-200 cursor-pointer appearance-none"
                >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                </select> */}
                <div className="flex w-full">
                    <button 
                        type="button" 
                    className={`px-4 py-2 w-60 rounded-bl-xl rounded-tl-xl text-white border-2 ${
                        prioridad === 'baja' 
                        ? 'bg-green-600 border-green-400 font-bold shadow-lg' 
                        : 'bg-neutral-800 border-transparent hover:bg-neutral-700'
                    } transition-all duration-200 cursor-pointer`}
                    onClick={() => setPrioridad('baja')}    
                    >
                        Baja
                    </button>
                    <button 
                        type="button" 
                        className={`px-4 py-2 w-60 text-white border-2 ${
                            prioridad === 'media' 
                            ? 'bg-yellow-600 border-yellow-400 font-bold shadow-lg' 
                            : 'bg-neutral-800 border-transparent hover:bg-neutral-700'
                        } transition-all duration-200 cursor-pointer`}
                        onClick={() => setPrioridad('media')}
                    >
                        Media
                    </button>
                    <button 
                        type="button" 
                        className={`px-4 py-2 w-60 rounded-br-xl rounded-tr-xl text-white border-2 ${
                            prioridad === 'alta' 
                            ? 'bg-red-600 border-red-400 font-bold shadow-lg' 
                            : 'bg-neutral-800 border-transparent hover:bg-neutral-700'
                        } transition-all duration-200 cursor-pointer`}
                        onClick={() => setPrioridad('alta')}
                    >
                        Alta
                    </button>
                </div>
                <div className="w-full">
                    <div className="flex w-full flex-col space-y-2">
                        <label className="text-lg text-white font-bold" htmlFor="etiqueta">Etiqueta</label>
                        <input
                        type="text"
                        value={etiqueta}
                        onChange={(e) => setEtiqueta(e.target.value)}
                        placeholder="Etiqueta..."
                        className="flex-1 px-4 py-2 w-full rounded-xl bg-neutral-800 text-white border-none focus:outline-none"
                        />
                    </div>
                </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="px-6 py-2 transition-all duration-300 cursor-pointer text-white w-44 bg-zinc-600 rounded-lg hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            >
              Agregar
            </button>
            <button
              onClick={closeModal}
              className="px-6 py-2 transition-all duration-300 cursor-pointer text-white w-44 bg-zinc-800 rounded-lg hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
