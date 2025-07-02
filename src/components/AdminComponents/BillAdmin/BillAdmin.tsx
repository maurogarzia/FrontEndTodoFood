import { useEffect } from 'react'
import { useStoreBill } from '../../../Store/useStoreBill'
import style from './BillAdmin.module.css'

export const BillAdmin = () => {

    const {bills, fetchBill} = useStoreBill()

    useEffect(() => {
        fetchBill()
    },[])

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitleAndButton}>
                <h1>Categorías</h1>
                <button>Agregar</button>
            </div>
            <div className={style.entityTable}>
                <table className={style.table}>
                    <thead>
                        <tr>
                             <th>Id</th>
                            <th>Id usuario</th>
                            <th>Nombre comprador</th>
                            <th>DNI comprador</th>
                            <th>Direccion comprador</th>
                            <th>Fecha de la compra</th>
                            <th>Descuento aplicado</th>
                            <th>Confirmacion de pago</th>
                            <th>Total</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills?.map((bill) => (
                            <tr key={bill.id}>
                                <td>{bill.id}</td>
                                <td>{bill.user?.id}</td>
                                <td>{bill.buyerName}</td>
                                <td>{bill.buyerDni}</td>
                                <td>{bill.buyerAddress}</td>
                                <td>{bill.datePurchase}</td>
                                <td>{bill.totalDiscount ? bill.totalDiscount : 'Sin descuento'}</td>
                                <td>{bill.confirmed ? 'Si' : 'No'}</td>
                                <td>{bill.total}</td>

                                <td>
                                    <div className={style.actionButtons}>
                                        <button>Editar</button>
                                        <button>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}