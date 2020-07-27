import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { connect } from 'react-redux';
import {
  removeFromCart,
  updateAmountRequest,
} from '../../store/modules/cart/actions';
import { formatPrice } from '../../utils/formatPrice';

import { Container, ProductTable, Total } from './styles';

function Cart({ cart, dispatch, total }) {
  function increment(prod) {
    dispatch(updateAmountRequest(prod.id, prod.amount + 1));
  }

  function decrement(prod) {
    dispatch(updateAmountRequest(prod.id, prod.amount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Produdo</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(prod => (
            <tr key={prod.id}>
              <td>
                <img src={prod.image} alt={prod.title} />
              </td>
              <td>
                <strong>{prod.title}</strong>
                <span>{prod.priceFormat}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(prod)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={prod.amount} />
                  <button type="button" onClick={() => increment(prod)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{prod.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(prod.id))}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(prod => ({
    ...prod,
    subTotal: formatPrice(prod.price * prod.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, prod) => {
      return total + prod.price * prod.amount;
    }, 0)
  ),
});

export default connect(mapStateToProps)(Cart);
