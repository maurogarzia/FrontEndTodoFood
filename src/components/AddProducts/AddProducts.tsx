import { useEffect, useState } from 'react'
import style from './AddProducts.module.css'
import { useStoreProducts } from '../../Store/useStoreProducts'
import { useStorePromotion } from '../../Store/useStorePromotions'
import type { IProductsDetails } from '../../types/IProductsDetails'
import { getAllProductsDetails } from '../../cruds/crudProductDetails'
import type { IPromotionDetails } from '../../types/IPromotionDetails'
import { getAllPromotionDetails } from '../../cruds/crudPromotionDetails'


export const AddProducts = () => {

    const {activeProduct, setActiveProduct} = useStoreProducts()
    const {activePromotion, setActivePromotion} = useStorePromotion()

    const [detailsProduct, setDetailsProduct] = useState<IProductsDetails[]>() // Estado para detalles del producto
    const [detailsPromotion, setDetailsPromotion] = useState<IPromotionDetails[]>() // Estado para detalles de la promocion
    const [price, setPrice] = useState<number>(0)
    const [counter, setCounter] = useState<number>(1) // Estado para el contador 


    useEffect(() => {

        const searchDetails = async() => {
            // Busco los detalles del producto
            if (activeProduct && !activePromotion){
                const search = await getAllProductsDetails()
                setDetailsProduct(search.filter((s : IProductsDetails) => s.product.id === activeProduct.id))

            // Busco los detalle de promocion
            } else if(!activeProduct && activePromotion){
                const search = await getAllPromotionDetails()
                setDetailsPromotion(search.filter((s : IPromotionDetails) => s.promotion.id === activePromotion?.id))
            }
        }
        
        searchDetails()
        
    },[activeProduct, activePromotion])

    const [basePrice, setBasePrice] = useState<number>(0)

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

    const handlePrice = (priceDetail : number) => {
        console.log(priceDetail);
        setPrice(counter * priceDetail)
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
                    <button>Añadir al Carrito</button>
                </div>

                <div className={style.containerData}>
                    <h1>{activeProduct !== null ? activeProduct.name : activePromotion?.name}</h1>
                    <p>{activeProduct !== null ? activeProduct.description : activePromotion?.description}</p>

                    {activeProduct ? 
                        <div className={style.containerOption}>
                            <h2>Seleccionar Tamaño</h2>

                            {detailsProduct?.map((d) => (
                                <button key={d.id} onClick={() => setBasePrice(d.price)}>{d.size.name}</button>
                            ))}
                        </div>
                        : 
                        <div className={style.containerOption}>
                            <h2>Componentes</h2>
                            {detailsPromotion?.map(d => (
                                d.unitaryDetails.map((det) => (
                                    <button>{det.quantity} {det.productDetails.product.name} {det.productDetails.product.name}</button>
                                ))
                            ))}
                        </div>}
                        
                </div>

            </div>
            
        </div>
    )
} 