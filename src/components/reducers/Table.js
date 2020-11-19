import { ADD_PRODUCTS,DELETE_PRODUCTS } from '../Actions/actionTypes';

const initialState =[];


export default (state=initialState,action)=>{
    switch(action.type){
        case ADD_PRODUCTS :
            return [...state,action.payload];
        case DELETE_PRODUCTS:
            return state.filter((product)=> product.id !== action.payload);
        default:
            return state;

    }
}


