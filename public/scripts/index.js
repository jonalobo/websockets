function render(data){
  const html = data.map((e, index) => {
    return (`<div><strong>${e.author}</strong>:[<em>${e.date}</em>]:<em>${e.text}</em></div>`)
  }).join ( '    ' )
  console.log(data)
  document.getElementById('msn').innerHTML = html
}

const socket = io.connect()
socket.on('messages', function(data){
  render(data)
})
const enviarSms = document.getElementById('enviarMsn')

enviarSms.addEventListener('click',()=>{
  addmessage()
})
const date = new Date()
function addmessage(e) {
  const texto = document.getElementById('letras')

  const mensaje = {
    author:document.getElementById('correo').value,
    date:date,
    text:texto.value
  }
  console.log(mensaje)
  socket.emit('new-message', mensaje)
}

const btn = document.getElementById("btnIngresar");
const btnVer = document.getElementById("btnVer");

const entradas = document.querySelectorAll("input");

btn.addEventListener("click", () => {

  const nombre = entradas[0].value;
  const precio = entradas[1].value;
  const imagen = entradas[2].value;

  if (nombre != "" && precio != "" && imagen != "") {
    // Ejemplo implementando el metodo POST:
    async function postData(url = "", data = {}) {
      // Opciones por defecto estan marcadas con un *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    postData("http://localhost:8080/productos", { nombre, precio, imagen })
  } else {
    alert('Todos los espacios deben tener información')
  }
});

btnVer.addEventListener('click',(e)=>{
  e.preventDefault()
  window.location.href = "http://localhost:8080/verproductos"
})




