import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { addToCartSuccess, updateAmountSuccess } from './actions';

import { formatPrice } from '../../../utils/formatPrice';

function* addToCart({ id }) {
  const prodExist = yield select(state => state.cart.find(p => p.id === id));

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = prodExist ? prodExist.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.warning(`Você pediu ${amount}, mas eu tenho ${stockAmount}`);
    return;
  }

  if (prodExist) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      formatPrice: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;
  const prod = yield select(state => state.cart.find(p => p.id === id));
  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.warning(`Você pediu ${amount}, mas eu tenho ${stockAmount}`);
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('ADD_TO_CART_REQUEST', addToCart),
  takeLatest('UPDATE_AMOUNT_REQUEST', updateAmount),
]);
