import React, { Fragment, useState, useEffect } from 'react';

// Importar componentes
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {

  // Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales) citasIniciales = [] // Si no hay citas, array vacío

  // Arreglo citas
  const [ citas, setCitas ] = useState(citasIniciales)

  // useEffect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'))

    if(citasIniciales) localStorage.setItem('citas', JSON.stringify(citas))
    else localStorage.setItem('citas', JSON.stringify([]))

  }, [citas])

  // Función que toma citas actuales y agrega la nueva
  const crearCita = cita => {
    setCitas([ ...citas, cita ])
  }

  // Función para eliminar una cita por ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    setCitas(nuevasCitas)
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'Agenda una cita' : 'Administra tus citas'

  return (
    <Fragment>
      <h1>Hola React</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {
              citas.length === 0
              ? <p className="sin-citas">Aún no tienes ninguna cita</p>
              : citas.map(cita => (
                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
