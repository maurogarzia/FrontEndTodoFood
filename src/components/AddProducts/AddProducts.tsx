import { useEffect, useState } from 'react'
import style from './AddProducts.module.css'
import { useStoreProducts } from '../../Store/useStoreProducts'
import { useStorePromotion } from '../../Store/useStorePromotions'
import type { IProductsDetails } from '../../types/IProductsDetails'
import { getAllProductsDetails } from '../../cruds/crudProductDetails'
import type { IPromotionDetails } from '../../types/IPromotionDetails'
import { getAllPromotionDetails } from '../../cruds/crudPromotionDetails'
import type { ICart } from '../../types/ICart'
import { ErrorAlert } from '../../utils/ErrorAlert'
import { useStoreCart } from '../../Store/useStoreCart'
import { SuccesAlerts } from '../../utils/SuccesAlert'
import { handleNavigate } from '../../Routes/navigationService'
import { useStoreUser } from '../../Store/useStoreUsers'


export const AddProducts = () => {

    const {activeProduct, setActiveProduct} = useStoreProducts()
    const {activePromotion, setActivePromotion} = useStorePromotion()
    const {addProduct} = useStoreCart()
    const {loginUser} = useStoreUser()

    const [detailsProduct, setDetailsProduct] = useState<IProductsDetails[]>() // Estado para detalles del producto
    const [detailsPromotion, setDetailsPromotion] = useState<IPromotionDetails[]>() // Estado para detalles de la promocion

    const [detail, setDetail] = useState<IProductsDetails | IPromotionDetails>()
    const [price, setPrice] = useState<number>(0)
    const [counter, setCounter] = useState<number>(1) // Estado para el contador 


    // UseEffect para que buscar los detalles
    useEffect(() => {

        const searchDetails = async() => {
            // Busco los detalles del producto
            if (activeProduct && !activePromotion){
                const search = await getAllProductsDetails()
                setDetailsProduct(search.filter((s : IProductsDetails) => s.product.id === activeProduct.id))

            // Busco los detalle de promocion
            } else if(!activeProduct && activePromotion){
                const search = await getAllPromotionDetails()
                const filtered = search.filter((s : IPromotionDetails) => s.promotion.id === activePromotion?.id)

                setDetailsPromotion(filtered)
                if (filtered.length > 0) {
                    setDetail(filtered[0])  // usar directamente el resultado
                    setBasePrice(filtered[0].price)
                }
}

        }
        
        searchDetails()
        
    },[activeProduct, activePromotion])

    const [basePrice, setBasePrice] = useState<number>(0)

    // UseEffect para que al refrescar no se pierda el producto
    useEffect(() => {
        const savedProduct = localStorage.getItem("productOption") 
        const savedPromotion = localStorage.getItem("promotionOption")

        if (savedProduct) {
            setActiveProduct(JSON.parse(savedProduct))
            setActivePromotion(null) // limpiar la promo si había
        } else if (savedPromotion) {
            setActivePromotion(JSON.parse(savedPromotion))
            setActiveProduct(null) // limpiar el producto si había
        }

        setPrice(counter * basePrice)
    }, [counter, basePrice])
    
    
    // Funcion para manejar el contador
    const handleCounter = (action : string) => {
        if (action === 'add'){
            const newCounter = counter + 1
            setCounter(newCounter)
            handlePrice(newCounter)
        } else if (action === 'remove'){
            if (counter === 1) return
            const newCounter = counter - 1
            setCounter(newCounter)
            handlePrice(newCounter)
        }
    }

    // Funcion para controlar el precio
    const handlePrice = (priceDetail : number) => {
        console.log(priceDetail);
        setPrice(counter * priceDetail)
    } 

    const handleAddToCart = () => {

        if (!detail) return ErrorAlert('Error', 'No se eligio un tamaño')
        if (!loginUser) return ErrorAlert('Error', 'Debes loguearte para agregar productos al carrito')

        if (activeProduct && !activePromotion) {

            // Armo carrito
            const cart : ICart = {
                quantity : counter,
                price : price,
                type: 'product',
                detail : detail
            }
            
            console.log(cart);
            
            addProduct(cart!)

            SuccesAlerts('Agregado!', 'Agregado al carrito')
            handleNavigate('/cart')

        } else if (!activeProduct && activePromotion){

            // Amo carrito
            const cart : ICart = {   
                quantity: counter,
                price: price,
                type: 'promotion',
                detail: detail
            }

            console.log();
            
            addProduct(cart!)

            SuccesAlerts('Agregado!', 'Agregado al carrito')
            handleNavigate('/cart')
        }
    }
 
    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTop}>

                <div className={style.conainerImage}>
                    <img src={activeProduct !== null ? activeProduct.image.url : activePromotion?.image.url} alt="" />

                    <div className={style.quantityAndPrice}>

                        <div className={style.counter}>
                            <span onClick={() => handleCounter('remove')} className="material-symbols-outlined">remove</span>
                            <p>{counter}</p>
                            <span onClick={() => handleCounter('add')} className="material-symbols-outlined">add</span>
                        </div>

                        <div className={style.price}>
                            <p>$ {price}</p>
                        </div>
                        
                    </div>
                    <button onClick={handleAddToCart}>Añadir al Carrito</button>
                </div>

                <div className={style.containerData}>
                    <h1>{activeProduct !== null ? activeProduct.name : activePromotion?.name}</h1>
                    <p>{activeProduct !== null ? activeProduct.description : activePromotion?.description}</p>

                    {activeProduct ? 
                        <div className={style.containerOption}>
                            <h2>Seleccionar Tamaño</h2>

                            {detailsProduct?.map((d) => (
                                <button key={d.id} onClick={() => {setBasePrice(d.price), setDetail(d)}}>{d.size.name}</button>
                            ))}
                        </div>
                        : 
                        <div className={style.containerOption}>
                            <h2>Componentes</h2>
                            {detailsPromotion?.map(d => (
                                d.unitaryDetails.map((det) => (
                                    <button >{det.quantity} {det.productDetails.product.name} {det.productDetails.product.name}</button>
                                ))
                            ))}
                        </div>}
                        
                </div>

            </div>
            
        </div>
    )
} 