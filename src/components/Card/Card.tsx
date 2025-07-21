import type { FC } from 'react'
import type { IImage } from '../../types/IImage'
import style from './Card.module.css'

interface ICard {
    image : IImage,
    price : number,
    title : string
}

export const Card :FC<ICard> = ({image, price, title}) => {
    return(
        <div className={style.containerPrincipal}>
            <h3>{title}</h3>
            <img src={image.url} alt="" />

            <div className={style.containerButtons}>
                <button>Pedir</button>
                <button>{price}</button>
            </div>
        </div>
    )
}