// import React, {useEffect} from 'react'
import { Tarea as TareaType } from '../types/Tarea'
import { Tarea } from './Tarea'

interface ListTaskProps {
    tareas: TareaType[];
    onAgregarTarea: (tarea: TareaType) => void;
    onEliminarTarea: (id: string) => void;
}

export const ListTask = ({ tareas, onAgregarTarea, onEliminarTarea }: ListTaskProps) => {

    const toggleCompletada = (id: string) => {
        const tareaActualizada = tareas.find(t => t.id === id);
        if (tareaActualizada) {
            onAgregarTarea({
                ...tareaActualizada,
                completada: !tareaActualizada.completada
            });
        }
    };

    const eliminarTarea = (id: string) => {
        onEliminarTarea(id);
    };

    const editarTarea = (id: string, tareaActualizada: Partial<TareaType>) => {
        const tareaExistente = tareas.find(t => t.id === id);
        if (tareaExistente) {
            onAgregarTarea({
                ...tareaExistente,
                ...tareaActualizada,
                id: tareaExistente.id
            });
        }
    };

    const tareasBaja = tareas.filter(t => t.prioridad === 'baja');
    const tareasMedia = tareas.filter(t => t.prioridad === 'media');
    const tareasAlta = tareas.filter(t => t.prioridad === 'alta');
    return (
        <div className="flex flex-col md:flex-row md:justify-between mt-12 gap-5 px-7">
            <div className="bg-green-600 rounded-2xl md:w-[33%] p-4 h-full">
                <h2 className='text-white font-bold text-2xl uppercase mb-4'>Prioridad Baja</h2>
                {tareasBaja.length > 0 ? (
                    tareasBaja.map((tarea) => (
                        <Tarea
                            key={tarea.id}
                            tarea={tarea}
                            onToggleCompletada={toggleCompletada}
                            onEliminar={eliminarTarea}
                            onEditar={editarTarea}
                        />
                    ))
                ) : (
                    <p className='text-white text-lg'>Sin tareas...</p>
                )}
            </div>
            <div className="bg-yellow-600 rounded-2xl md:w-[33%] p-4 h-full">
                <h2 className='text-white font-bold text-2xl uppercase mb-4'>Prioridad Media</h2>
                {tareasMedia.length > 0 ? (
                    tareasMedia.map((tarea) => (
                        <Tarea
                            key={tarea.id}
                            tarea={tarea}
                            onToggleCompletada={toggleCompletada}
                            onEliminar={eliminarTarea}
                            onEditar={editarTarea}
                        />
                    ))
                ) : (
                    <p className='text-white text-lg'>Sin tareas...</p>
                )}
            </div>
            <div className="bg-red-600 rounded-2xl md:w-[33%] p-4 h-full">
                <h2 className='text-white font-bold text-2xl uppercase mb-4'>Prioridad Alta</h2>
                {tareasAlta.length > 0 ? (
                    tareasAlta.map((tarea) => (
                        <Tarea
                            key={tarea.id}
                            tarea={tarea}
                            onToggleCompletada={toggleCompletada}
                            onEliminar={eliminarTarea}
                            onEditar={editarTarea}
                        />
                    ))
                ) : (
                    <p className='text-white text-lg'>Sin tareas...</p>
                )}
            </div>
        </div>
    );
}
