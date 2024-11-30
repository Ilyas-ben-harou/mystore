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
                product.title.includes(searchInput)
                || product.id.toString().includes(searchInput)
                || product.description.includes(searchInput)
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
        <div className='container-fuild my-1 '>
            <div className="search w-50">
                <form className=' row g-4 align-items-center justify-content-around'>
                    <label className='form-label col-auto'>search</label>
                    <div className='col-auto'>
                        <input type="text" id='search-input' className='form-control' />
                    </div>
                    <button type="submit" className='col-auto btn btn-secondary' onClick={handleSearch}>Search</button>
                    <button type='reset' className='col-auto btn btn-secondary' onClick={()=>setSeachInput(undefined)}>reset</button>
                </form>
            </div>
            <h5>Categories</h5>
            <div className="btn-group g-5  justify-content-between" role="group" aria-label="Button group">
                
                {displayCategories()}
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
