import React, { useEffect, useState } from 'react'
import Product from './Product'

const ListProduct = () => {
    const [listProducts,setListProducts]=useState([])
    const [categories,setCategories]=useState()
    const [currentcategorie, setCurrentCategorie] = useState(undefined)
    const [searchInput,setSeachInput]=useState(undefined)

    const getCategories=()=>{
        
        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(response => setCategories(response))
    }
    const getProducts=()=>{
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(response => setListProducts(response))
    }
    useEffect(()=>{
        getCategories()
        getProducts()
    },[])


    const displayCategories = () => {
        // Check if categories exist before mapping
        if (!categories) {
            return null; // or return a loading indicator
        }
    
        return (
            <>
                <button type="button" className={ 'btn ' + (!currentcategorie ? 'btn-dark mx-1 rounded' : 'btn-secondary mx-1 rounded')} onClick={()=>setCurrentCategorie(undefined)}>All</button>
                {categories.map((category, key) =>
                    <button key={key}
                            className={ 'btn ' + (currentcategorie === category ? 'btn-dark mx-1 rounded' : 'btn-secondary mx-1 rounded')}
                            onClick={(e) => {
                                e.preventDefault()
                                setCurrentCategorie(category)
                            }}>
                        {category}
                    </button>
                )}
            </>
            
        )
    }

    const displayProducts=()=>{
        let productsTemp=listProducts
        if (searchInput !== undefined) {
            productsTemp = listProducts.filter(product =>
                product.title.toLowerCase().includes(searchInput.toLowerCase())
                || product.id.toString().includes(searchInput)
                || product.description.includes(searchInput)
                || product.category.includes(searchInput)
            )
        }
        if (currentcategorie !== undefined) {
            productsTemp = productsTemp.filter(product => product.category === currentcategorie)
        }
        if (productsTemp.length > 0) {
            return productsTemp.map((product, key) => {
                return <Product product={product} key={key}/>
            })
        }
        return <tr>
            <td colSpan={7}> No Items</td>
        </tr>
        
    }
    const handleSearch=(e)=>{
        e.preventDefault();
        console.log(searchInput)
        let inputValue=document.querySelector('#search-input').value
        setSeachInput(inputValue)
    }
    
    
    return (
        <div className='container-fuild m-1 '>
            
            <div className="search w-100 bg-dark text-light p-2">
                <form className='row'>
                    <div className='col-2'>
                        <h1 className=''>My store</h1>
                    </div>
                    <div className="col-10 row align-items-center" role="group" >
                        <div className='col-8 mx-2'>
                            <input type="text" id='search-input' className='form-control' />
                        </div>
                        <button type="submit" className='col-1 btn btn-secondary  mx-2' onClick={handleSearch}>Search</button>
                        <button type='reset' className='col-1 btn btn-secondary mx-2' onClick={()=>setSeachInput(undefined)}>reset</button>
                    </div>
                    
                </form>
            </div>
            <div className="row justify-content-between align-items-center my-2" >
                <div className="col-12 btn-group g-2 justify-content-between my-2" role="group" aria-label="Button group">
                    {displayCategories()}
                </div>
                
            </div>

            <div className="listProducts">
                <h3>List des produits</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Categorie</th>
                            <th>Image</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayProducts()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListProduct
