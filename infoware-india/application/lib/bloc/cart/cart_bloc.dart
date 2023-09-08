import 'package:application/models/product.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:meta/meta.dart';
part 'cart_event.dart';
part 'cart_state.dart';

class CartItem extends ProductResponse {
  int quantity;
  final ProductResponse product;
  CartItem({required this.quantity, required this.product})
      : super(
          category: product.category,
          description: product.description,
          image: product.image,
          name: product.name,
          price: product.price,
          id: product.id,
        );
}

class CartBloc extends Bloc<CartEvent, CartState> {
  CartBloc() : super(CartInitial()) {
    on<CartAddEvent>(
      (event, emit) {
        final List<CartItem> products = (state).products;
        final ProductResponse product = event.product;
        final int index = products.indexWhere(
          (element) => element.name == product.name,
        );
        if (index == -1) {
          products.add(CartItem(quantity: 1, product: product));
        } else {
          products[index].quantity++;
        }
        emit(CartWithItems(products));
      },
    );
    on<CartQuantityEvent>(
      (event, emit) {
        final List<CartItem> products = (state as CartWithItems).products;
        final ProductResponse product = event.product;
        final int index = products.indexWhere(
          (element) => element.name == product.name,
        );
        products[index].quantity = event.quantity;
        emit(CartWithItems(products));
      },
    );
    on<CartRemoveEvent>(
      (event, emit) {
        final List<CartItem> products = (state as CartWithItems).products;
        final ProductResponse product = event.product;
        final int index = products.indexWhere(
          (element) => element.name == product.name,
        );
        products.removeAt(index);
        emit(CartWithItems(products));
      },
    );
    on<CartClearEvent>(
      (event, emit) {
        emit(CartInitial());
      },
    );
  }
}
