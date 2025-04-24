import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { AddTask } from './components/AddTask'
import { ListTask } from './components/ListTask'
import { Tarea as TareaType } from './types/Tarea'
import './App.css'

function App() {

  // Cargar tareas desde localStorage al iniciar
  const [tareas, setTareas] = useState<TareaType[]>(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (nuevaTarea: TareaType) => {
    // Si la tarea ya existe (tiene ID), actualizarla
    if (tareas.some(t => t.id === nuevaTarea.id)) {
      setTareas(tareas.map(tarea => 
        tarea.id === nuevaTarea.id ? nuevaTarea : tarea
      ));
    } else {
      // Si es una nueva tarea, agregarla
      setTareas([...tareas, nuevaTarea]);
    }
  };

  const eliminarTarea = (id: string) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  return (
    <>
      <Header/>
      <main className='bg-zinc-800 h-dvh pt-28'>
        <AddTask onAgregarTarea={agregarTarea}/>
        <ListTask tareas={tareas} onAgregarTarea={agregarTarea} onEliminarTarea={eliminarTarea} />
      </main>
    </>
  )
}

export default App
