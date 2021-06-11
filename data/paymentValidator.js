
function validate(payment) {
    return payment.numeroTarjeta == "1111222233334444" &&
    payment.fechaExpiracion == "2121" &&
    payment.nroCVV == "123";
}
export default {validate}