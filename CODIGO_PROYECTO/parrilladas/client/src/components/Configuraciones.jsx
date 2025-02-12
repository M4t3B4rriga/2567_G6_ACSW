import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/CrudEmpleados.css";

const Configuraciones = () => {
    const [PrecioExtra, setPrecioExtra] = useState(0);
    const [NumMesas, setNumMesas] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:4000/api/settings")
            .then((response) => {
                // Obtén los valores iniciales desde la respuesta
                const uniquePrecio = response.data[0].PRECIO_EXTRA_SE;
                const uniqueMesas = response.data[0].NUM_MESAS_SE;
                setPrecioExtra(uniquePrecio);
                setNumMesas(uniqueMesas);
            })
    }, [])

    const handleUpdate = () => {
        // Realiza una solicitud para actualizar los valores en el servidor
        axios.put("http://localhost:4000/api/settings", {
            PRECIO_EXTRA_SE: PrecioExtra,
            NUM_MESAS_SE: NumMesas
        })
        .then((response) => {
            // Manejar la respuesta después de la actualización
            console.log("Datos actualizados correctamente");
        })
        .catch((error) => {
            // Manejar errores
            console.error("Error al actualizar datos: ", error);
        });
    };

    return (
        <div className="Configuraciones">
            <section>
                Valor de tarrinas: &nbsp; &nbsp;
                <input type="text" value={PrecioExtra} onChange={(e) => setPrecioExtra(e.target.value)} />
                <br />
                <br />
                Numero de mesas: &nbsp;
                <input type="text" value={NumMesas} onChange={(e) => setNumMesas(e.target.value)} />
            </section>

            <button onClick={handleUpdate}>Actualizar</button>
        </div>
    )
}

export default Configuraciones;
