import { useEffect} from 'react'
import style from './ListProducts.module.css'
import { CardProduct } from '../CardProduct/CardProduct'
import { useStoreProducts } from '../../Store/useStoreProducts'


export const ListProducts = () => {

    const {
        fetchAccompaniment, fetchBurguers, fetchDrinks, fetchVegetarian, accompaniment, drinks, burguers, vegetarian
    } = useStoreProducts()
    
    
    useEffect(() => {
        fetchAccompaniment(),
        fetchBurguers(),
        fetchDrinks(),
        fetchVegetarian()
        
    },[])
    
    return (
        <div className={style.containerPrincipal}>

            <div className={style.containerTitle}>
                <h1>Productos</h1>
            </div>

            <div className={style.containerFilter}>
                <button>Filtrar</button>
            </div>

            <div className={style.products}>
                <h1>Hamburguesas</h1>
                {burguers?.length === 0 
                ? 
                <p>No hay hamburguesas en stock</p> 
                : 
                <div className={style.productList}>
                    {burguers?.map(b => (
                        <CardProduct products={b}/>
                    ))}
                </div>}
            </div>

            <div className={style.products}>
                <h1>Acompañamiento</h1>
                {accompaniment?.length === 0 
                ? 
                <p>No hay acompañamiento en stock</p> 
                : 
                <div className={style.productList}>
                    {accompaniment?.map(b => (
                        <CardProduct products={b}/>
                    ))}
                </div>}
            </div>

            <div className={style.products}>
                <h1>Bebidas</h1>
                {drinks?.length === 0 
                ? 
                <p>No hay bebidas en stock</p> 
                : 
                <div className={style.productList}>
                    {drinks?.map(b => (
                        <CardProduct products={b}/>
                    ))}
                </div>}
            </div>

            <div className={style.products}>
                <h1>Vegetariano</h1>
                {vegetarian?.length === 0 
                ? 
                <p>No hay menú vegetariano en stock</p> 
                : 
                <div className={style.productList}>
                    {vegetarian?.map(b => (
                        <CardProduct products={b}/>
                    ))}
                </div>}
            </div>

        </div>
    )
}