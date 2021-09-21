import React, { Component } from 'react'
import ProductRow from './ProductRow'


class ProductTable extends Component {
    constructor(props) {
        super(props)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleDestroy(id) {
        this.props.onDestroy(id)
    }

    handleUpdate(product) {
        this.props.onUpdate(product)
    }

    render() {
        let productsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid])
        let rows = []

        productsArray.forEach((product) => {
            if (product.product.name.indexOf(this.props.filterText) === -1) {
                return
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.id}
                    onDestroy={this.handleDestroy}
                    onUpdate={this.handleUpdate}></ProductRow>
            )
        })

        return (
            <div>
                <table className="table table-striped table-sm">
                    <thead className="bg-dark">
                        <tr class="text-primary">
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Product  Price</th>
                            <th>No.of Item present</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable