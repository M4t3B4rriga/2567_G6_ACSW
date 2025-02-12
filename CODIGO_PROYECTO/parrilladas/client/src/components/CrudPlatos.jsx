import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import ComboBox from "./ComboBox";
import "../styles/Platos/CrudPlatos.css";
import "../styles/Orden.css";

const CrudPlatos = () => {
  const [platos, setPlatos] = useState([]);
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estado, setEstado] = useState("");

  const [foto, setFoto] = useState(null);

  const [mostrar, setMostrar] = useState(false);
  const [mostrarSegundoModal, setMostrarSegundoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIngrediente, setSelectedIngrediente] = useState(null);
  const [categories, setCategories] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [minPrecio, setMinPrecio] = useState("");
  const [maxPrecio, setMaxPrecio] = useState("");



  useEffect(() => {
    // Hacer la solicitud a la API para obtener los platos
    setIsLoading(true); // Iniciar la carga

    axios
      .get("http://localhost:4000/api/platos")
      .then((response) => {
        setPlatos(response.data);
        const uniqueCategories = [...new Set(response.data.map(plato => plato.CATEGORIA_PL))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error al obtener los platos:", error);
      })
      .finally(() => {
        setIsLoading(false); // Finalizar la carga, tanto en caso de éxito como de error
      });

      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Porcentaje de visibilidad para disparar la carga
      });
  
      // Observar todas las imágenes que encuentres en la página
      const images = document.querySelectorAll(".lazy-load-img");
      images.forEach((img) => {
        observer.observe(img);
      });

      return () => {
        observer.disconnect(); // Limpieza al desmontar
      };
      
  }, []);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        img.src = src;
        img.classList.remove("lazy-load-img");
      }
    });
  };
  
  const handleCategoryFilter = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    }
  };

  const filteredPlatosHabilitados = platos.filter(
    (plato) => plato.ESTADO_PL === 1
  );

  const filteredPlatos = filteredPlatosHabilitados.filter(
    (plato) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(plato.CATEGORIA_PL)) &&
      (minPrecio === "" || parseFloat(plato.PRECIO_PL) >= parseFloat(minPrecio)) &&
      (maxPrecio === "" || parseFloat(plato.PRECIO_PL) <= parseFloat(maxPrecio))
  );

  const handleActualizarPlato = (id) => {
    // Validar que al menos un campo esté lleno
    if (!nombre.trim() && !precio && !foto) {
      console.error("Debes cambiar al menos un campo");
      return;
    }


    // Crear un objeto FormData solo con los campos que han sido modificados
    const formData = new FormData();
    formData.append("Nombre", nombre);
    formData.append("Precio", precio.toString());
    formData.append("Categoria", categoria);
    //formData.append("Estado", estado);
    formData.append("Foto", foto);

    // Hacer la solicitud PUT a la API solo si hay cambios
    if (
      nombre !== platoSeleccionado.NOMBRE_PL ||
      precio !== platoSeleccionado.PRECIO_PL ||
      categoria !== platoSeleccionado.CATEGORIA_PL ||
      //estado !== platoSeleccionado.ESTADO_PL ||
      foto !== null
    ) {
      axios
        .put(`http://localhost:4000/api/platos/${id}`, formData)
        .then((response) => {
          console.log("Plato actualizado exitosamente");
          window.location.reload();
          // Resto del código para actualizar los platos
        })
        .catch((error) => {
          console.error("Error al actualizar el plato:", error);
        });
    } else {
      console.log("No se han realizado cambios en el plato");
      setPlatoSeleccionado(null);
      setMostrar(false);
    }
  };

  const handleAgregarPlato = () => {
    // Crear un objeto FormData para enviar la imagen al servidor
    const formData = new FormData();
    formData.append("Nombre", nombre);
    formData.append("Precio", precio);
    formData.append("Categoria", selectedCategoria);
    formData.append("Estado", estado);
    formData.append("Foto", foto);
  
    axios
      .post("http://localhost:4000/api/platos", formData)
      .then((response) => {
        console.log("Plato creado exitosamente");
        setPlatos([...platos, response.data]);
  
        const nuevoIdPlato = response.data.ID_PL;
  
        const nombreIngredienteSeleccionado = selectedIngrediente;
  
        axios
          .get(`http://localhost:4000/ingredientes/nombre/${nombreIngredienteSeleccionado}`)
          .then((response) => {
            const idIngredienteSeleccionado = response.data.id;
  
            const descripcion = "Descripción predeterminada";
            const nombreReceta = response.data.NOMBRE_PL;
  
            const nuevaReceta = {
              id_i: idIngredienteSeleccionado,
              id_pl: nuevoIdPlato,
              peso_re: 100,
              descripcion_re: descripcion,
              nombre_re: nombre,
            };
  
            axios
              .post("http://localhost:4000/recetas", nuevaReceta)
              .then(() => {
                console.log("Receta creada exitosamente");
              })
              .catch((error) => {
                console.error("Error al crear la receta:", error);
              });
  
            handleCerrarSegundoModal();
          })
          .catch((error) => {
            console.error("Error al obtener el ID del ingrediente:", error);
          });
      })
      .catch((error) => {
        console.error("Error al crear el plato:", error);
      });
  };
  

  const handleEditarPlato = (plato) => {
    setPlatoSeleccionado(plato);
    setNombre(plato.NOMBRE_PL);
    setPrecio(plato.PRECIO_PL);
    setCategoria(plato.CATEGORIA_PL);
    //setEstado(plato.ESTADO_PL);
    setFoto(null); // Clear the image selection when editing
    setMostrar(true);
  };
  

  
  const handleCerrarSegundoModal = () => {
    setMostrarSegundoModal(false);
  };


  const handleActualizarEstadoPlato = (idPlato, estadoActual) => {
    console.log('Intentando actualizar estado del plato...');
    
    const nuevoEstado = estadoActual === 1 ? 0 : 1; // Cambiar el estado actual
  
    console.log('Nuevo estado:', nuevoEstado);
    
    // Realizar la solicitud PUT a la API para actualizar solo el estado del plato
    axios
      .put(`http://localhost:4000/api/platos/${idPlato}/estado`, { Estado: nuevoEstado })
      .then((response) => {
        console.log("Estado del plato actualizado exitosamente");
        window.location.reload();
        // Aquí podrías actualizar la lista de platos o realizar las acciones necesarias
      })
      .catch((error) => {
        console.error("Error al actualizar el estado del plato:", error);
      });
  };
  
  
  const platosHabilitados = [];
  const platosDeshabilitados = [];

  // Filtrar los platos según su estado
  platos.forEach((plato) => {
    if (plato.ESTADO_PL === 1) {
      platosHabilitados.push(plato);
    } else {
      platosDeshabilitados.push(plato);
    }
  });
  

  function previsualizarFoto(event) {
    const fotoInput = event.target;
    const fotoPreview = document.getElementById("fotoPreview");
    
    if (fotoInput.files && fotoInput.files[0]) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        fotoPreview.src = e.target.result;
      };
      
      reader.readAsDataURL(fotoInput.files[0]);
    } else {
      fotoPreview.src = "#"; // Limpiar la vista previa si no hay foto seleccionada
    }
  }

  
  return (
    
    <div className="Crud">
      {isLoading ? (
      <div className="loading-screen">Cargando...</div>
    ) : (<>
      <div className="PlatosScreen">
      <div className="PlatosFilter">
        <div className="boxFilter">
          Filtrar por:
          <p>Categoría</p>
          {categories.map((category, index) => (
            <ul key={index}>
              <input
                type="checkbox"
                name={category}  // Usa el nombre de la categoría como el nombre del input
                value={category}
                onChange={(e) => handleCategoryFilter(e.target.value, e.target.checked)}
              />
              {category}
            </ul>
          ))}
          <div className="Precios">
            <p>Precio</p>
            <div className="rango"><label>Min: &nbsp;</label>
            <input
              id="precioRange"
              type="range"
              min="0"
              max={maxPrecio || "10"} // Ajusta este valor según tus necesidades
              step="1"
              value={minPrecio || "0"}
              onChange={(e) => setMinPrecio(e.target.value)}
            /> <label>&nbsp;{minPrecio || "0"}$</label>
            </div>
            <div className="rango"><label>Max: &nbsp; </label>
            <input
              id="precioRange"
              type="range"
              min={minPrecio || "0"}
              max="100" // Ajusta este valor según tus necesidades
              step="1"
              value={maxPrecio || "100"}
              onChange={(e) => setMaxPrecio(e.target.value)}
            /> <label>&nbsp;{maxPrecio || "100"}$</label>
            </div>
          </div>
        </div>
      </div>
      <div className="PlatosTotal">
      <div className="HeaderCrud">
        <h1>Platos Disponibles:</h1>
        <button className="AgregarPlato" onClick={() => setMostrarSegundoModal(true)}>Agregar Nuevo Plato</button>
      </div>
      <ul>
        <div className="Platos">
        {filteredPlatos
        .map((plato) => (
              <li key={plato.ID_PL} className="Plato">
              <p className="recipe-title">{plato.NOMBRE_PL}</p>
              <p className="recipe-desc">Precio: {plato.PRECIO_PL} $ </p>

              <img src={`http://localhost:4000${plato.FOTO_PL}`} alt={plato.NOMBRE_PL} />
            <div className="botonesCrud">
            <button onClick={() => handleEditarPlato(plato)}>Editar</button>
            <button onClick={() => handleActualizarEstadoPlato(plato.ID_PL, plato.ESTADO_PL)}>
              {plato.ESTADO_PL === 1 ? "Deshabilitar" : "Habilitar"} Plato
            </button>
            </div>
          </li>
            ))}
        
        </div>
      </ul>
      <div className="HeaderCrud">
      <h1>Platos deshabilitados:</h1>
      </div>
      <ul>
        <div className="Platos">
        {platosDeshabilitados.map((plato) => (
              <li key={plato.ID_PL} className="Plato">
              <p className="recipe-title">{plato.NOMBRE_PL}</p>
              <p className="recipe-desc">Precio: {plato.PRECIO_PL} $ </p>

              <img src={`http://localhost:4000${plato.FOTO_PL}`} alt={plato.NOMBRE_PL}  style={{filter: "grayscale(1)"}}/>
            <div className="botonesCrud">
              <button onClick={() => handleEditarPlato(plato)}>Editar</button>
              <button onClick={() => handleActualizarEstadoPlato(plato.ID_PL, plato.ESTADO_PL)}>
                {plato.ESTADO_PL === 1 ? "Deshabilitar" : "Habilitar"} Plato
              </button>
            </div>
          </li>
            ))}
        
        </div>
      </ul>
      {platos.length === 0 && <p>No hay platos disponibles.</p>}
      </div>
      </div>
      <Modal isOpen={mostrar} onClose={() => setMostrar(false)}>
        {platoSeleccionado && (
          <div className="SegundoModal">
            <h2>Editar plato:</h2>
            <form>
              <label>Nombre:</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

              <label>Precio:</label>
              <input type="number" value={precio} min={0} onChange={(e) => setPrecio(e.target.value)} />


              <label>Categoria:</label>
              <textarea value={categoria} onChange={(e) => setCategoria(e.target.value)} />
              


              <label>Foto:</label>
              <input type="file" onChange={(e) => setFoto(e.target.files[0])} />

              <button type="button" onClick={() => handleActualizarPlato(platoSeleccionado.ID_PL)}>
                Actualizar Plato
              </button>
            </form>
          </div>
        )}
      </Modal>
      <div className="modalContainer">
        <Modal isOpen={mostrarSegundoModal} onClose={handleCerrarSegundoModal}>
          <div className="SegundoModal">
            <div className="formContainer">
              <form>
                <h1>Agregar nuevo Plato</h1>
                <div className="formSection">
                  <label>Nombre:</label>
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="formSection expanded">
                  <label>Precio:</label>
                  <input type="number" value={precio} min={0} onChange={(e) => setPrecio(e.target.value)} />
                  <label>Categoria:</label>
                  <ComboBox onSelectChange={(value)=> setSelectedCategoria(value)} mode={'categorias'} initialText={"Seleccione una Categoria"}/>
                </div>

                <div className="formSection">
                  <label>Estado:</label>
                  <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="">Seleccione el estado</option>
                    <option value="1">Habilitado</option>
                    <option value="0">Deshabilitado</option>
                  </select>
                </div>

                <div className="formSection">
                  <label>Foto:</label>
                  <input type="file" id="fotoInput" accept="image/*" onChange={(e) => {setFoto(e.target.files[0]); previsualizarFoto(e)}} />
                  <img id="fotoPreview" src="https://us.123rf.com/450wm/blankstock/blankstock2105/blankstock210501928/168934076-sube-el-icono-de-la-l%C3%ADnea-de-fotos-signo-de-miniatura-de-imagen-s%C3%ADmbolo-de-marcador-de-posici%C3%B3n-de.jpg?ver=6" alt="Vista previa de la foto" />
                </div>

                <div className="formSection">
                <label>Ingrediente: &nbsp; </label>
                <ComboBox
                  mode="ingredientes"
                  initialText={"Seleccione el Ingrediente"}
                  onSelectChange={(value) => {
                    setSelectedIngrediente(value);
                  }}
                />
                </div>
                
                <button type="button" onClick={handleAgregarPlato}>
                  Agregar Plato
                </button>
              </form>
            </div>
            <div className="imagenContainer">
            </div>
          </div>
        </Modal>
      </div></>)}
    </div>
  );
};

export default CrudPlatos;
