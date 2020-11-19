import React , {useState,useEffect} from 'react';
import './index.css';
import Form from "./components/form";
import store from './store';
import  {Provider}  from 'react-redux'




function App() {
  

 

  
 /*useEffect(() => {
      
    const localproducts= localStorage.getItem("products");
    
    if(localproducts){
    setProducts(JSON.parse(localproducts));
}
}, []);*/

/*const addProducts = async product =>{
  setProducts([...products,product])
}*/


  /*useEffect(()=>{
    localStorage.setItem("products",products);
  },[products]);
  */



  

  return(

    <Provider store={store}>
         <div>
            
            <Form />
        </div>
    </Provider>
        

  )
}

export default App;
