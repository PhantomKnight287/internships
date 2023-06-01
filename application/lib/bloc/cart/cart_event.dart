part of 'cart_bloc.dart';

@immutable
abstract class CartEvent {}

class CartAddEvent extends CartEvent {
  final ProductResponse product;
  final int quantity;
  CartAddEvent({
    required this.product,
    required this.quantity,
  });
}

class CartRemoveEvent extends CartEvent {
  final ProductResponse product;
  CartRemoveEvent(this.product);
}

class CartClearEvent extends CartEvent {}

class CartQuantityEvent extends CartEvent {
  final ProductResponse product;
  final int quantity;
  CartQuantityEvent({required this.product, required this.quantity});
}
