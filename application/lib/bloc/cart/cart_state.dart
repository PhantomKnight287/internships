part of 'cart_bloc.dart';

@immutable
abstract class CartState {}

class CartInitial extends CartState {
  final List<CartItem> products = [];
  CartInitial();
}

class CartWithItems extends CartState {
  final List<CartItem> products;
  CartWithItems(this.products);
}
