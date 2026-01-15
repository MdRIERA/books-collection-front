const botonBooks=document.getElementById('searchBtnBooks')
const botonUsers=document.getElementById('searchBtnUsers')
const lista=document.getElementById('lista')
const API_BACK='http://localhost:3002'


async function fetchData(ruta){
    try{
        const response= await fetch(`${API_BACK}${ruta}`)
        const data= await response.json()
        return data
    }catch(error){
        
    }
}

botonBooks.addEventListener('click',async ()=>{
    const libros= await fetchData('/books')
    renderBooks(libros)
})
botonUsers.addEventListener('click',async ()=>{
    const usuarios= await fetchData('/users')
    renderUsers(usuarios)
})

function renderBooks(data){
     lista.innerHTML = "";
    data.forEach((libro) =>{
        const titulo=libro.titulo
        const autor=libro.autor
        const img=libro.imagen
        const fecha=libro.fechaPublicacion
        const li=document.createElement('li')
        li.innerHTML =`
        <h3>${titulo}</h3>
        <img src="${img}" alt="${titulo}">
        <p>${autor}</p>
        <p>${fecha}</p>`
        lista.appendChild(li)
    }) 
}

function renderUsers(data) {
  lista.innerHTML = "";
  data.forEach((user) => {
    const nombre = `${user.nombre} ${user.apellidos}`;
    console.log(nombre)
    const correo = user.correo;
    const coleccion = user.coleccion || [];
    const wishlist = user.wishlist || [];
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${nombre}</h3>
      <p>${correo}</p>
      <h4>Colección</h4>
      <ul>
        ${coleccion.map(libro => `<li>${libro}</li>`).join("")}
      </ul>
      <h4>Wishlist</h4>
      <ul>
        ${wishlist.map(libro => `<li>${libro}</li>`).join("")}
      </ul>
    `;
    lista.appendChild(li);
  });
}

