part of 'cart_bloc.dart';

abstract class CartState {
  List<CartItem> products = [];
}

class CartInitial extends CartState {
  CartInitial();
}

class CartWithItems extends CartState {
  @override
  List<CartItem> products = [];

  CartWithItems(this.products);
}
