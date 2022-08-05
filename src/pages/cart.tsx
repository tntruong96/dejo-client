import CartItem from '@components/cart/cart-item';
import { IItemCart } from '@interfaces/cart.interface';
import { getItems, selectSubtotal, selectTotal } from '@redux/store/cart/cartSlice';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import empty from '@public/images/empty-cart.svg';
import Image from 'next/image'
import { useRouter } from 'next/router';
import SummaryCart from '@components/cart/summary';
import { useMemo } from 'react';


const Cart = () => {
    const cartItem: IItemCart[] = useSelector(getItems);
    const route = useRouter();
    

    const memoSelectTotal = useMemo(() => selectTotal, [])
    const memoSelectSubTotal = useMemo(() => selectSubtotal ,[])
    const subTotal = useSelector(memoSelectSubTotal);
    const total = useSelector(memoSelectTotal);


    useEffect(() => {
        // console.log(total)
    }, [])


    const handlePromodeCode = (promodeCode: string) => {
        console.log(promodeCode)
    }

    return cartItem.length ? (
        <section className='p-5 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-16'>
            <div className='col-span-2'>
                <CartItem items={cartItem }/>
            </div>
            <div>
                <SummaryCart subtotal={subTotal} total={total} handlePromodeCode={handlePromodeCode}/>
            </div>
        </section>
    ): (
        <section className='w-full p-5 flex flex-col items-center justify-center'>
           <div>
            <Image width={400} height={400} src={empty} alt={"Empty!"}/>
           </div>
           <div>
            <h3>Nothing products&apos;s in your cart</h3>
            <button onClick={() => route.push('/products')} className='btn'>Continue to shopping</button>
           </div>
        </section>
    );
};

export default Cart;