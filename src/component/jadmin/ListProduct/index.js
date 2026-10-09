import React from 'react';
import './ListProduct.css';
import Headers from '../header';
import Footer from '../Footer';


function ListProduct() {
    return (
        <div>
            <Headers />
            <h1>List of Products</h1>
            {/* Product listing components go here */}
            <Footer />
        </div>
    );
}

export default ListProduct; 