  var apiUrl = 'https://api.yumserver.com/16989/products';
  function obtenerproducto()
  {
    fetch(apiUrl)
    .then(response => response.json())
    .then(mostrarproducto)
    .catch(error => console.error(error));
  }
  
  function mostrarproducto(productos)
  {
    let html=``;
    for(let i=0;i<productos.length;i++)
    {
      console.log(productos[i].titulo)
      html+=`
      <tr>
      <td><b>${productos[i].idcod}</b></td>
      <td><b>${productos[i].titulo}</b></td>
      <td><b>${productos[i].precioPeso}</b></td>
      <td><b>${productos[i].precioDolar}</b></td>
      <td><b>${productos[i].fecha}</b></td>
      <td><button onclick="productoEliminado('${productos[i].idcod}')">Borrar</button></td>
      <td><button onclick="modificarProducto('${productos[i].idcod}')">modificar</button></td>
      </tr>

      `;
    }
    document.getElementById('resultados').innerHTML=html;
  }
  var ids=['lista','nuevo-producto','modificar-producto'];
  
  function Mostrar(_div)
  {
    for(let i=0;i<ids.length;i++)
    {
      document.getElementById(ids[i]).setAttribute('style','display:none');
    }
    document.getElementById(_div).removeAttribute('style');
  }



  function agregarproducto(){  

    let producto = {
      titulo: document.getElementById('titulo').value,
      precioPeso: document.getElementById('precioPeso').value,
      precioDolar: document.getElementById('precioDolar').value,
      fecha: document.getElementById('fecha').value
    };


        fetch(apiUrl, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(producto)
        })
        .then(response => response.text())
        .then(function(texto)
        {
          if(texto.trim()=="OK"){
            alert('se creo con exito el producto')
          Mostrar('lista');
          obtenerproducto();
          
          }
        }
      )
    .catch(error => console.error('El título no puede estar vacío',error));
  }


  function modificarProducto(idcod){

    Mostrar('modificar-producto')
    fetch(apiUrl+'/'+idcod)
    .then(response => response.json())
    .then(productos => {
    document.getElementById('idcod').value=productos.idcod;
    document.getElementById('tiitle').value=productos.titulo;
    document.getElementById('precioPeso1').value=productos.precioPeso;
    document.getElementById('precioDolar1').value=productos.precioDolar;
    document.getElementById('fecha1').value=productos.fecha;



    })
    .catch(error => console.error('Error:', error));
  }
function productomodificado(){
  let recarga={
  idcod: document.getElementById('idcod').value,
  titulo:document.getElementById('tiitle').value,
  precioPeso: document.getElementById('precioPeso1').value,
  precioDolar: document.getElementById('precioDolar1').value,
  fecha:document.getElementById('fecha1').value
  };
  fetch(apiUrl, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(recarga)
    })
      .then(response => response.text())
      .then(function(texto)
        {
          if(texto.trim()=="OK"){
          
          Mostrar('lista');
          obtenerproducto();
          
          }
        })

          .catch(error => console.error('El título no puede estar vacío', error));
}

  function productoEliminado(idcod){
    let producto2 = {
      idcod:idcod
    };
    if (confirm("¿Estás seguro de eliminar el producto?")) { 


    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto2)
    })
      .then(response => response.text())
  
        .then(function(texto)
        {
          if(texto.trim()=="OK"){
          Mostrar('lista');
          obtenerproducto();
          
          } 
        })
        .catch(error => console.error('El idcod no es válido',error));
       
  }}
