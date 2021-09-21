import React, { Component } from 'react'
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

class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.state = {
            product: Object.assign({}, RESET_VALUES),
            errors: {}
        }
    }

    handleChange(e) {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState((prevState) => {
            this.props.product.product[name] = value
            return { product: this.props.product }
        })
    }

    handleSave(e) {
        if (this.props.product.id === '') {
            this.props.onSave(this.state.product);
            axios.post('http://localhost:4000/product/create', this.state.product)
                .then(res => console.log(res.data));
        } else {
            axios.post('http://localhost:4000/product/update', this.props.product)
                .then(res => console.log(res.data));

        }
        window.location.reload(false);
        // reset the form values to blank after submitting
        this.setState({
            product: Object.assign({}, RESET_VALUES),
            errors: {}
        })
        // prevent the form submit event from triggering an HTTP Post
        e.preventDefault()
    }

    render() {
        let currentProd = this.props.product;
        let formHeader = currentProd.id === '' ? "Add a new Product" : "Update product: " + currentProd.product.name
        let buttonLabel = currentProd.id === '' ? "Save" : "Update "
        return (
            <center>
            <form class="form">
                <h4>{formHeader}</h4>
                <p>
                    <label>Product Id<br />
                        <input type="text" className="form-control" name="productId" onChange={this.handleChange} value={currentProd.product.productId} /></label>
                </p>
                <p>
                    <label>Product Name<br />
                        <input type="text" className="form-control" name="name" onChange={this.handleChange} value={currentProd.product.name} /></label>
                </p>
                <p>
                    <label>Product Type<br />
                        <input type="text" className="form-control" name="category" onChange={this.handleChange} value={currentProd.product.category} /></label>
                </p>
                <p>
                    <label>Product Price<br />
                        <input type="text" className="form-control" name="price" onChange={this.handleChange} value={currentProd.product.price} /></label>
                </p>
                <p>
                    <label>No.of Item present<br />
                        <input type="text" className="form-control" name="instock" onChange={this.handleChange} value={currentProd.product.instock} /></label>
                </p>
                <input type="submit" className="btn btn-info" value={buttonLabel} onClick={this.handleSave}></input>
            </form>
            </center>
        )
    }
}

export default ProductForm