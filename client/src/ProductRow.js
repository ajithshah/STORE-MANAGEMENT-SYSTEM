import React, { Component } from 'react'
import axios from 'axios';
class ProductRow extends Component {
    constructor(props) {
        super(props)
        this.destroy = this.destroy.bind(this)
        this.update = this.update.bind(this)
    }

    destroy() {
        axios.get('http://localhost:4000/product/delete/' + this.props.product.id)
        this.props.onDestroy(this.props.product.id);
        window.location.reload(false);
    }

    update() {
        this.props.onUpdate(this.props.product);
    }

    render() {
        return (
            <tr>
                <td>{this.props.product.product.name}</td>
                <td>{this.props.product.product.category}</td>
                <td>{this.props.product.product.price}</td>
                <td>{this.props.product.product.instock}</td>
                <td className="text-right"><button onClick={this.destroy} className="btn btn-danger">Delete</button></td>
                <td className="text-right"><button onClick={this.update} className="btn btn-success">Update</button></td>

            </tr>
        )
    }
}

export default ProductRow