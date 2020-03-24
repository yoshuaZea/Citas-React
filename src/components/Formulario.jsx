import React, { Fragment, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

const Formulario = ({crearCita}) => {

    // Crear state de citas
    const [ cita, setCita ] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    const [ error, setError ] = useState(false)

    // Función que se ejecuta cada vez que escribe el usuario en el input
    const handleChange = e => {
        setCita({
            ...cita, // Clonar objeto/array
            [e.target.name] : e.target.value // Asinar al state el valor según el nombre
        })
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita

    // Cuando el usuario presiona botón agregar cita
    const agregarCita = e => {
        e.preventDefault()
        
        // Validaciones
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            setError(true)
            return;
        }

        // Eliminar mensaje de error previo
        setError(false)

        // Asignar un ID
        cita.id = uuidv4()
        
        // Crear la cita 
        crearCita(cita)

        // Reiniciar el form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }


    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={ agregarCita }
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota"
                    onChange={ handleChange }
                    value={mascota}
                />
                <label>Nombre del dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño de la mascota"
                    onChange={ handleChange }
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={ handleChange }
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={ handleChange }
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    placeholder="Síntomas que presenta la mascota"
                    onChange={ handleChange }
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    )

}

// Documentar componente
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired    
}
 
export default Formulario