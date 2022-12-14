const socket = io.connect();

const fecha = new Date();
const hoy = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`
const hora = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`

function renderChat(data){
    const html = data.map((elem, index)=>{
        return(`<div><strong style="color: blue;"> ${elem.author}</strong>
        <em style="color:brown">[${ hoy} ${hora}]</em>:
        <em style="color: green; ">${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function renderProducts(data){
    const html = data.map((elem, index)=>{
        return(`<tr>
            <td>${elem.title}</td>
            <td>${elem.price}</td>
            <td><img width="77" height="77" src=${elem.thumbnail}></td>
            </tr>`)
        })
    document.getElementById('tabla').innerHTML = html
}


const form = document.getElementById("products-form")
form.addEventListener('submit', e=>{
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value   
    };
    socket.emit('nuevo-producto', producto);
    return false;
})

// function addProduct(e){
//     const producto = {
//         title: document.getElementById('title').value,
//         price: document.getElementById('price').value,
//         thumbnail: document.getElementById('thumbnail').value   
//     };
//     socket.emit('nuevo-producto', producto);
//     return false;
// }

function addMessage(e){
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

socket.on('productos', data =>{
    fetch('../views/partials/tabla.ejs')
    .then(response => response.json())
    .then(renderProducts(data))
    .catch(error => console.log(error))
})


socket.on('messages', function(data) {
     renderChat(data)
 })