
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "../index.css";
import {v4} from "uuid";
import App from "../App";
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import "./DataTableDemo.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { addProducts,deleteProducts } from './Actions/action';
import store from '../store';
import { ADD_PRODUCTS,DELETE_PRODUCTS } from './Actions/actionTypes';
import { connect } from 'react-redux'




const Form =({addProducts,deleteProducts})=>{
    const [code , setCode] = useState("");
    const [name , setName] = useState("");
    const [price , setPrice] = useState("");
    const [category , setCategory] = useState("");
    const [products,setProducts] = useState([]);

    const usestyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));
      const useicons = makeStyles((theme) => ({
        root: {
          color: theme.palette.text.primary,
        },
      }));
      
   
    const classes = usestyles();
    const icon = useicons();


    //let newProduct = {​​}​​;



    const handleSubmit= e =>{
      e.preventDefault()
      if(code==="" || name==="" || price ==="" || category ===""){
          return alert("please fill the values"); 
      }
     

let constantVal  = {
  code: code, 
  name: name, 
  price: price,
  category: category, 
  id: v4()
}
/*
let getProducts = localStorage.getItem('products')

console.log('localStorage.getItem(products)',localStorage.getItem('products'))
if(getProducts === '[]' || getProducts === undefined || getProducts === '' ||  getProducts === null)
{
  getProducts = [];
}

else{
  getProducts=JSON.parse(getProducts);
}
  

getProducts.push(constantVal);


      newProduct= {​​ 
        code: code, 
        name: name, 
        price: price,
        category: category, 
        id: v4() }​​ 
      localStorage.setItem('products', JSON.stringify(getProducts) )
      
      console.log('localStorage.getItem(products)',JSON.parse(localStorage.getItem('products'))) */

      addProducts(constantVal);
      setCode("");
      setName("")
      setPrice("");
      setCategory("");



  }

  const toast = useRef(null);
    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'price', header: 'Price' }
    ];

    
  let originalRows = {};

    const dataTableFuncMap = {
       
        'products': setProducts
    };
  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...products[event.index] };
}

const onRowEditCancel = (event) => {
    let product = [...products];
    products[event.index] = originalRows[event.index];
    delete originalRows[event.index];

    setProducts(products);
}



const onEditorValueChange = (productsKey, props, value) => {
    let updatedproducts = [...props.value];
    updatedproducts[props.rowIndex][props.field] = value;
    dataTableFuncMap[`${productsKey}`](updatedproducts);
}

const inputTextEditor = (productsKey, props, field) => {
    return <InputText type="text" value={props.rowData[field]} onChange={(e) => onEditorValueChange(productsKey, props, e.target.value)} />;
}

const codeEditor = (productsKey, props) => {
    return inputTextEditor(productsKey, props, 'code');
}

const nameEditor = (productsKey, props) => {
    return inputTextEditor(productsKey, props, 'name');
}

const priceEditor = (productsKey, props) => {
    return inputTextEditor(productsKey, props, 'price');
}



const categoryEditor = (productsKey, props) => {
  return inputTextEditor(productsKey, props, 'category');
}




    return(
      <div>
      <div className="datatable-editing-demo">
      <Toast ref={toast} />

      <div className="card">
      
          <DataTable value={store.products} editMode="row" dataKey="id" onRowEditInit={onRowEditInit} onRowEditCancel={onRowEditCancel}>
              <Column field='code' header="Code"  editor={(props) => codeEditor('products', props)}></Column>
              <Column field='name' header="Name" editor={(props) => nameEditor('products', props)}></Column>
              <Column field='price' header="Price" editor={(props) => priceEditor('products', props)}></Column>
              <Column field='category' header="category" editor={(props) => categoryEditor('products', props)}></Column>
              
              


              <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
              <span className="float-right">
                  <DeleteIcon onClick={() => deleteProducts(products.id)}/> 
              </span>  
          </DataTable>

      </div>
      <div>

      </div>
  </div>
        <div>
            <form  className={classes.root} noValidate autoComplete="off">
                <TextField  type="text"
                 name="code"
                 value={code}
                 onChange={e => setCode(e.target.value)}
                 className="code" id="standard-basic" label="code" />
                <span></span>
                <TextField
                type="text"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                 className="name" id="standard-basic" label="name" />
                <span></span>
                <TextField 
                type="number"
                name="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="price" id="standard-basic" label="price" />
                <span></span>
                <TextField 
                type="text"
                name="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="category" id="standard-basic" label="Category" />
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Add
                </Button>

            </form>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => ({
    products: state.products,
  });
  
const mapDispatchToProps = (dispatch) => ({
    addProducts: (products) => {
      dispatch(addProducts(products));
    },
    deleteProducts:(id) =>{
        dispatch(deleteProducts(id));
    }
  });

export default connect(mapStateToProps,mapDispatchToProps)(Form);