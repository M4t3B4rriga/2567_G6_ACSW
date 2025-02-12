import  {HeaderAdmin}  from "../components/headerAdmin";
import React, { useEffect, useState } from 'react';

import  CrudPlatos  from "../components/CrudPlatos.jsx";
import CrudIngredientes from "../components/CudIngredientes.jsx";

import '../styles/admin.css'
import CrudEmpleados from "../components/CrudEmpleados";
import Configuraciones from "../components/Configuraciones";

const AddPlatos = () => {
    const [modo, setModo] = useState("Empleados");

    useEffect(() => {
        document.title = 'Administrador - Kandela';
      }, []);

    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);
    }
    
    return(
        <>
            <HeaderAdmin/>
            <div className="navAdmin">
                <button onClick={()=>cambiarModo('Platos')} style={{borderBottomColor: modo!=="Platos" ? "gray" : 'orange', borderLeft: 'none', borderBottomLeftRadius: '5px'}} className= {modo!=="Platos" ? '' : 'Activo'}>Platos</button>
                <button onClick={()=>cambiarModo('Ingredientes')} style={{borderBottomColor: modo!=="Ingredientes" ? "gray" : 'orange'}} className= {modo!=="Ingredientes" ? '' : 'Activo'}>Ingredientes</button>
                <button onClick={()=>cambiarModo('Empleados')} style={{borderBottomColor: modo!=="Empleados" ? "gray" : 'orange'}} className= {modo!=="Empleados" ? '' : 'Activo'}>Empleados</button>
                <button onClick={()=>cambiarModo('Configuraciones')} style={{borderBottomColor: modo!=="Configuraciones" ? "gray" : 'orange', borderRight: 'none', borderBottomRightRadius: '5px'}} className= {modo!=="Configuraciones" ? '' : 'Activo'}>Configuraciones</button>
            </div>
           { modo==='Platos' ? <CrudPlatos/> : 
             modo ==='Ingredientes' ? <CrudIngredientes/> : 
             modo === 'Empleados' ? <CrudEmpleados/> : <Configuraciones/>}
        </>
    )
}

export default AddPlatos;