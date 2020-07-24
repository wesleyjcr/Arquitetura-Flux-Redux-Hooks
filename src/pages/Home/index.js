import React, { Component } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { connect } from 'react-redux';

import api from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { addToCart } from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(prod => ({
      ...prod,
      priceFormat: formatPrice(prod.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = prod => {
    const { dispatch } = this.props;

    dispatch(addToCart(prod));
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map(prod => (
          <li key={prod.id}>
            <img src={prod.image} alt={prod.title} />
            <strong>{prod.title}</strong>
            <span>{prod.priceFormat}</span>

            <button type="button" onClick={() => this.handleAddProduct(prod)}>
              <div>
                <MdShoppingCart size={16} color="#FFF" />
                {amount[prod.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, prod) => {
    amount[prod.id] = prod.amount;
    return amount;
  }, {}),
});
export default connect(mapStateToProps)(Home);
