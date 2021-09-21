import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'
import axios from 'axios';

const RESET_VALUES = {
    id: '',
    product: {
        productId: '',
        category: '',
        price: '',
        name: '',
        instock: ''
    }
}

class Products extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filterText: '',
            products: {},
            currentProduct: Object.assign({}, RESET_VALUES)
        }

        this.handleFilter = this.handleFilter.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:4000/product/get')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave(product) {
        if (!product.id) {
            product.id = new Date().getTime()
        }
        this.setState((prevState) => {
            let products = prevState.products
            products[product.id] = product
            return { products }
        })
    }

    handleDestroy(productId) {
        this.setState((prevState) => {
            let products = prevState.products
            delete products[productId]
            return { products }
        });
    }

    handleUpdate(product) {
        this.setState((prevState) => {
            prevState.currentProduct = product;
            return { product }
        })
    }

    render() {
        return (
            <div>
                <h1><center>Store Management system</center></h1>
                <Filters
                    onFilter={this.handleFilter}></Filters>
                <ProductTable
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onDestroy={this.handleDestroy}
                    onUpdate={this.handleUpdate}></ProductTable>
                <ProductForm
                    onSave={this.handleSave} product={this.state.currentProduct}></ProductForm>
            </div>
        )
    }
}

export default Products