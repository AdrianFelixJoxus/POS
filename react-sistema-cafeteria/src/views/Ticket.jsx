export default function Ticket() {
  return (
    <div className="flex flex-row justify-center items-center">
        <div className="">
            <img 
                src="/img/logotazacafe.png" 
                alt="imagen logotipo"
                className="w-48 mb-5 flex justify-self-center"
            />
        <p className="font-semibold text-xl text-black text-center">ticket de venta</p>
        <p className="font-semibold text-xl text-black text-center ">Tijuana</p>
        <p className="text-center">17/10/2026 <span> 18:10:00</span> am</p>
        <div className="grid grid-cols-3 justify-items-center mt-2">
            <p className="font-semibold">CANT</p>
            <p className="font-semibold">PRODUCTO</p>
            <p className="font-semibold">$$</p>
        </div>
        <p className="text-center font-semibold uppercase">GRACIAS POR SU COMPRA</p>
        </div>
    </div>
  )
}