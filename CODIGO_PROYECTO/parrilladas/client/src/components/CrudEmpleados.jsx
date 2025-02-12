import axios from "axios";
import React, { useState, useEffect } from "react";

import Modal from "./Modal";

import "../styles/CrudEmpleados.css";
import ComboBox from "./ComboBox";

const CrudEmpleados = () => {

    const [empleados, setEmpleados] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [selectedCargo, setSelectedCargo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchEmpleados();
    })

    const fetchEmpleados = async () => {
      try{
        axios.get("http://localhost:4000/api/empleado")
        .then((response) => {
            setEmpleados(response.data);
        })
      }
      catch (error) {
        console.error("Error al obtener empleados", error);
      }
    }

    const empleadosPorCargo = {};

    empleados.forEach((empleado) => {
      if (!empleadosPorCargo[empleado.CARGO_EMP]) {
        empleadosPorCargo[empleado.CARGO_EMP] = [];
      }
      empleadosPorCargo[empleado.CARGO_EMP].push(empleado);
    });

    const handleAgregarEmpleado = () => {
      if (usuario && password && selectedCargo) {
       
    
        axios.post("http://localhost:4000/api/empleado", {
          usuario,
          password,
          selectedCargo
      })
          .then((response) => {
            fetchEmpleados();
          })
          .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
          });
      } else {
        console.error("Alguno de los valores es null o undefined.");
      }
    }
    

    return (
        <>
        <button className="AgregarPlato" onClick={() => setMostrar(true)}>Agregar nuevo Empleado</button>
        
        <div className="CrudEmpleados">
        {Object.keys(empleadosPorCargo).map((cargo) => (
          <div key={cargo} className="CargoSection">
            <h2>{cargo}</h2>
            <div className="CadaEmpleado">
            {empleadosPorCargo[cargo].map((empleado) => (
              <div key={empleado.ID_EMP} className="Tarjeta-empleado">
                <p>Usuario: {empleado.USUARIO_EMP} &nbsp;</p>
                <p>Contraseña: {empleado.CONTRASENA_EMP} &nbsp;</p>
              </div>
            ))}
                </div>
          </div>
        ))}
        </div>
  
        <Modal isOpen={mostrar} onClose={() => setMostrar(false)}>
            <div className="ModalEmpleados">
            <h1>Agregar Nuevo Empleado</h1>
            <div className="nuevoEmpleado">
                <p><h3>Usuario:</h3>
                <input type="text" maxLength={30} onChange={(e) => setUsuario(e.target.value)}/></p>
                <p><h3>Contraseña:</h3>
                <input type="text" maxLength={30} onChange={(e) => setPassword(e.target.value)}/></p>
                <p><h3>Cargo:</h3>
                <ComboBox mode={'cargos'} initialText={'Seleccione un Cargo'} onSelectChange={(value) => {
                    setSelectedCargo(value);
                  }}></ComboBox></p>
                <button className="botonCrud" onClick={handleAgregarEmpleado}>Agregar</button>
            </div>
            </div>
        </Modal>
        </>
    )
}

export default CrudEmpleados;