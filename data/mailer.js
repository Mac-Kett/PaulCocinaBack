import axios from 'axios';
/*{
    nombre: '',
    apellido: '',
    direccion: '',
    altura: '',
    piso: '',
    codigoPostal: '',
    nombreTarjeta: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    nroCVV: '',
    localidad:'',
    provincia:'',
    pais:'',
    productos: [],
    total: 0,
    estado:'NUEVO'
  }*/
function sendEmails(pedido) {
    if (!pedido) return false
    let text = `Estimado ${pedido.nombre} ${pedido.apellido}:
    Su pedido se recibió correctamente !!!
    muchisisisismismas gracias 

    le estará legando en 24, 48, 72 o mas horas dependiendo de si el cartero esta de vacaciones o no 
    Será entregado en: ${pedido.direccion} ${pedido.altura} ${pedido.piso}
    Si no hay nadie para recibir el pedido, el mismo nos lo quedaremos nosotros.
    Total abonado: ${pedido.total}
    `
    let subject = "Nuevo pedido de PaulCocina.com"
    //Enviar un mail al admin para avisarle y otro al cliente si cargo el campo email
    email("erikmeisel@gmail.com","Tiene un nuevo pedido",text)
    if (!pedido.email) return false
    email(pedido.email,subject,text)
}
function email(to,subject,text){
    let data = {
        to:to,
        subject:subject,
        text: text
    }
    var config = {
        method: 'post',
        url: 'http://mi-comercio.com:3000/ad-hoc-email/send',
        headers: {
            'authorization': 'JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik',
            'Content-Type': 'application/json'
    },
    data : data
    };
    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}
export default {sendEmails}