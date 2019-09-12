import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { ProductActions, ProductEnumType } from '../../MyStore/action-store';

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}
//key store
export interface State extends fromRoot.State {
  ks_products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

const getProductFeatureState = createFeatureSelector<ProductState>(
  'ks_products'
);

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProduct.id
);

export const combineSelectors = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, productId) => state.products.find(p => p.id == productId)
);

// const initialState  = {} as ProductState;
// initialState.showProductCode = true;
// initialState.products= [];

export function reducer( state: ProductState = initialState, action: ProductActions): ProductState {

  switch (action.type) {
    case ProductEnumType.TOGGLE_PRODUCT_CODE :
      return {
        ...state,
        showProductCode: action.payload
      };
      case ProductEnumType.SET_CURRENT_PRODUCT :
        return {
          ...state,
          currentProduct : action.payload
        };


    default:
      return state;
  }
}
