import React, { Component } from 'react';
import { MdShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';

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

  render() {
    const { products } = this.state;

    return (
      <ProductList>
        {products.map(prod => (
          <li key={prod.id}>
            <img src={prod.image} alt={prod.title} />
            <strong>{prod.title}</strong>
            <span>{prod.priceFormat}</span>

            <button type="button">
              <div>
                <MdShoppingCart size={16} color="#FFF" />
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

export default Home;
