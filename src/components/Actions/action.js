import {ADD_PRODUCTS,DELETE_PRODUCTS} from './actionTypes';


export const addProducts = (product) =>({
    type:ADD_PRODUCTS,
    payload:product,
});

export const deleteProducts = (id) =>({
    type:DELETE_PRODUCTS,
    payload:id,
});


