import { Action } from '@ngrx/store';
import { Product } from '../products/product';

export enum ProductEnumType {

  TOGGLE_PRODUCT_CODE = '[Product] toggle product code',
  SET_CURRENT_PRODUCT = '[Product] Set current product'
}



export class ToggleProductCode implements Action {

  readonly type = ProductEnumType.TOGGLE_PRODUCT_CODE;
  constructor(public payload: boolean ) { }
}

export class SetCurrentProduct implements Action {

  readonly type = ProductEnumType.SET_CURRENT_PRODUCT;
  constructor(public payload: Product ) { }
}

export type ProductActions = ToggleProductCode | SetCurrentProduct ;
