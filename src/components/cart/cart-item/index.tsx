import { IItemCart } from '@interfaces/cart.interface';
import Image from 'next/image';
import React from 'react';
import RowCartItem from '../row-cart-item';

type Props = {
    items: IItemCart[]
}


const CartItem: React.FC<Props> = ({items}) => {
    
    const renderItems = items.map((item,index) =>  (
        <RowCartItem key={index} item={item}/>
    ))
    
    return (
        <div>
            <h3>Items</h3>
            <div>
                {renderItems}
            </div>
        </div>
    );
};

export default CartItem;