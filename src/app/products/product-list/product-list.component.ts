import { ProductActions, SetCurrentProduct } from './../../MyStore/action-store';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select, State, Action } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import { ToggleProductCode } from '../../MyStore/action-store';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  // constructor(private productService: ProductService) { }
  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(

      selectedProduct => ( this.selectedProduct = selectedProduct)
    );

    this.productService
      .getProducts()
      .subscribe(
        (products: Product[]) => (this.products = products),
        (err: any) => (this.errorMessage = err.error)
      );

    // select('products')
    // this.store.pipe(select(state=>state.ks_products)).subscribe(product => {
    //   debugger;

    //   if (product) {

    //     this.displayCode = product.showProductCode
    //   }

    // })

    this.store
      .pipe(select(fromProduct.getShowProductCode))
      .subscribe(showProdCode => {
        if (showProdCode) {
          this.displayCode = showProdCode;
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {

    // Generic dispacher
    // this.store.dispatch({
    //   type: 'TOGGLE_PRODUCT_CODE',
    //   payload: value
    // });

    // type safe genric dispacher

   this.store.dispatch(new ToggleProductCode(value));

  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
   debugger;
    //this.productService.changeSelectedProduct(product);
 this.store.dispatch(new SetCurrentProduct(product));
  }
}
