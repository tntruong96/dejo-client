import { IItemCart } from "@interfaces/cart.interface";
import { createSelector, createSlice, current } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";

interface IState {
    totalNumberItem: number,
    items: IItemCart[],
    subTotal: number,
    totalPrice: number,
    feeShipping: number
}

const initialState: IState = {
    totalNumberItem: 0,
    items: [],
    subTotal: 0,
    totalPrice: 0,
    feeShipping: 0
}

const CartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers: {
        addItem: (state: IState, action) => {
            const existedItems =  state.items.find(item => item.id === action.payload.id )
            if(existedItems){
                const modifyItems = state.items.map(item => {
                    if(item.id === existedItems.id) {
                        item.count += 1
                        item.totalPrice = (Number(item.itemDetail.price) - (Number(item.itemDetail.price) * item.itemDetail.discount / 100)) * item.count;
                    }
                    return item;
                })
                state.items = [...modifyItems];
            }  else {
                state.items = [...state.items,action.payload.item]
            }
        },
        countTotal: (state: IState) => {
            state.totalNumberItem = state.items.reduce((prev, curr) => {
                
                return prev+=curr.count;
            }, 0)
            // const findedItem = current(state).items.fi
        },
        plusItem: (state: IState, action) => {
            const {id} = action.payload;
            state.items = state.items.map(item => {
                if(item.id === id){
                    item.count += 1;
                    item.totalPrice = (Number(item.itemDetail.price) - (Number(item.itemDetail.price) * item.itemDetail.discount / 100)) * item.count ;
                }
                return item;
            } )
        },
        minusItem: (state: IState, action) => {
            const {id} = action.payload;

            state.items = state.items.map(item => {
                if(item.id === id){
                    item.count -= 1;
                    item.totalPrice = (Number(item.itemDetail.price) - (Number(item.itemDetail.price) * item.itemDetail.discount / 100)) * item.count ;
                }
                return item;
            } )
        },
        removeItem: (state: IState, action) => {
            const {id} = action.payload;
            state.items = state.items.filter(item => {
                return item.id !== id; 
            })
        },

        // calculateSubtotal: (state:IState) => {
        //     state.subTotal = state.items.reduce((sum,cur) => {
        //         return sum += cur.totalPrice;
        //     }, 0)
        // }

    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            // console.log('HYDRATE', state, action.payload);
            return {
                ...state,
                ...action.payload.common,
            };
        },
    },
})


export const cartReducer = CartSlice.reducer;

export const {addItem, countTotal, plusItem, minusItem, removeItem} = CartSlice.actions

export const getItems = (state: RootState) => state.cart.items;
export const getTotalItems = (state: RootState) => state.cart.totalNumberItem;
export const getFeeShipping = (state: RootState) => state.cart.feeShipping;


export const selectSubtotal = createSelector(getItems, (items =>items.reduce((sum, cur) => 
{
    return sum += cur.totalPrice;
}
, 0) ))



export const selectTotal = createSelector(selectSubtotal, getFeeShipping, (subTotal, feeShip) => subTotal + feeShip)
