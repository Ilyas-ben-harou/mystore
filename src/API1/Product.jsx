import React from 'react'

const Product = ({key,product}) => {
    return (
        <tr key={key}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.price}$</td>
            <td>{product.description.slice(0,255)}</td>
            <td><span  className='badge badge-pill bg-dark'>{product.category}</span></td>
            <td><img src={product.image} width='150px' alt="" /></td>
            <td><span className='badge badge-pill bg-dark'>{product.rating.rate}/5</span></td>
        </tr>
    )
}

export default Product
