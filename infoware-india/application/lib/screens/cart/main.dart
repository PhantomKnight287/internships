import 'dart:convert';

import 'package:application/bloc/cart/cart_bloc.dart';
import 'package:application/screens/address/main.dart';
import 'package:application/shared/button.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Cart extends StatefulWidget {
  const Cart({super.key});

  @override
  State<Cart> createState() => _CartState();
}

class _CartState extends State<Cart> {
  Map<String, dynamic>? address;

  @override
  void initState() {
    super.initState();
    _loadAddress();
  }

  Future<void> _loadAddress() async {
    final storage = await SharedPreferences.getInstance();
    final a = storage.getString("address");
    if (a == null) return;
    setState(() {
      address = jsonDecode(a);
    });
    print(address);
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CartBloc, CartState>(
      builder: (context, state) {
        return Scaffold(
          appBar: PreferredSize(
            preferredSize: const Size.fromHeight(60),
            child: AppBar(
              leading: IconButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                icon: const Icon(
                  Icons.arrow_back_ios,
                  size: 20.0,
                ),
              ),
              title: Text(
                "Checkout",
                style: GoogleFonts.outfit(
                  fontSize: 20.0,
                  fontWeight: FontWeight.w600,
                  color: Colors.black,
                ),
              ),
              centerTitle: true,
            ),
          ),
          bottomNavigationBar: context.read<CartBloc>().state.products.isEmpty
              ? null
              : Container(
                  decoration: BoxDecoration(
                    border: Border(
                      top: BorderSide(
                        color: Colors.grey.shade300,
                      ),
                    ),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                    child: AccentButton(
                      child: Text(
                        "Checkout",
                        style: GoogleFonts.outfit(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      onPressed: () {
                        if (address == null) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text("Please Enter Delivery Address"),
                              duration: Duration(seconds: 1),
                              backgroundColor: Colors.red,
                            ),
                          );
                          return;
                        }
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text("Order Placed Successfully"),
                            duration: Duration(seconds: 1),
                            backgroundColor: Colors.green,
                          ),
                        );
                        context.read<CartBloc>().add(
                              CartClearEvent(),
                            );
                      },
                    ),
                  ),
                ),
          body: state.products.isEmpty
              ? Center(
                  child: Text(
                    "No items in cart",
                    style: GoogleFonts.outfit(
                      fontSize: 18,
                      fontWeight: FontWeight.w500,
                      color: Colors.black,
                    ),
                  ),
                )
              : Column(
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.grey.shade200,
                        borderRadius: BorderRadius.circular(5),
                      ),
                      child: SizedBox(
                        width: MediaQuery.of(context).size.width - 20,
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                          child: address != null
                              ? Text(
                                  "${address!['address']}, ${address!['city']}, ${address!['state']}, ${address!['pinCode']}, ${address!['country']}",
                                  style: GoogleFonts.outfit(
                                    color: Colors.black,
                                    fontSize: 18,
                                  ),
                                  textAlign: TextAlign.center,
                                )
                              : TextButton(
                                  onPressed: () {
                                    Navigator.of(context)
                                        .push(
                                          CupertinoPageRoute(
                                            builder: (context) => const CreateNewAddress(),
                                          ),
                                        )
                                        .then(
                                          (value) => _loadAddress(),
                                        );
                                  },
                                  child: Text(
                                    "No Address Found. Click Here to set a delivery address",
                                    style: GoogleFonts.outfit(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.black,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ),
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    ListView.separated(
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        final CartItem item = state.products[index];
                        return Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Card(
                            color: Colors.transparent,
                            margin: EdgeInsets.zero,
                            clipBehavior: Clip.antiAlias,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            elevation: 0,
                            child: Padding(
                              padding: const EdgeInsets.all(5),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                mainAxisSize: MainAxisSize.max,
                                children: [
                                  ClipRRect(
                                    borderRadius: const BorderRadius.all(
                                      Radius.circular(5),
                                    ),
                                    child: Image.network(
                                      item.image,
                                      fit: BoxFit.contain,
                                      height: 100,
                                      width: 130,
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(left: 10),
                                    child: SizedBox(
                                      width: 120,
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            item.name,
                                            style: GoogleFonts.outfit(
                                              fontSize: 16,
                                              fontWeight: FontWeight.w500,
                                              color: Colors.black,
                                            ),
                                            maxLines: 2,
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                          Text(
                                            "\$${double.parse(item.price) * item.quantity}",
                                            style: GoogleFonts.outfit(
                                              fontSize: 14,
                                              fontWeight: FontWeight.w400,
                                              color: Colors.grey.shade600,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  SizedBox(
                                    child: Container(
                                      decoration: BoxDecoration(
                                        border: Border.all(
                                          color: Colors.grey,
                                          width: 1.0,
                                        ),
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                      padding: EdgeInsets.zero,
                                      child: Row(
                                        crossAxisAlignment: CrossAxisAlignment.center,
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        children: [
                                          IconButton(
                                            onPressed: () {
                                              context.read<CartBloc>().add(
                                                    CartQuantityEvent(
                                                      product: item,
                                                      quantity: item.quantity + 1,
                                                    ),
                                                  );
                                            },
                                            icon: const Icon(
                                              Icons.add,
                                              size: 20.0,
                                              color: Colors.blueAccent,
                                            ),
                                            style: ButtonStyle(
                                              shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                                                RoundedRectangleBorder(
                                                  borderRadius: BorderRadius.circular(5.0),
                                                ),
                                              ),
                                            ),
                                          ),
                                          Text(
                                            "${item.quantity}",
                                            style: GoogleFonts.outfit(
                                              fontSize: 14,
                                              fontWeight: FontWeight.w500,
                                              color: Colors.black,
                                            ),
                                          ),
                                          IconButton(
                                            onPressed: () {
                                              if (item.quantity == 1) {
                                                context.read<CartBloc>().add(
                                                      CartRemoveEvent(item),
                                                    );
                                                return;
                                              }
                                              context.read<CartBloc>().add(
                                                    CartQuantityEvent(
                                                      product: item,
                                                      quantity: item.quantity - 1,
                                                    ),
                                                  );
                                            },
                                            padding: EdgeInsets.zero,
                                            icon: Icon(
                                              item.quantity == 1 ? Icons.delete : Icons.remove,
                                              size: 20.0,
                                              color: item.quantity == 1 ? Colors.red : Colors.black,
                                            ),
                                            style: ButtonStyle(
                                              shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                                                RoundedRectangleBorder(
                                                  borderRadius: BorderRadius.circular(5.0),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                      separatorBuilder: (context, index) {
                        return const SizedBox(
                          height: 10,
                        );
                      },
                      itemCount: state.products.length,
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Row(
                        children: [
                          Text(
                            "Subtotal",
                            style: GoogleFonts.outfit(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              color: Colors.black,
                            ),
                          ),
                          const Spacer(),
                          Text(
                            "\$${state.products.fold<double>(
                              0,
                              (previousValue, element) => previousValue + (double.parse(element.price) * element.quantity),
                            )}",
                            style: GoogleFonts.outfit(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              color: Colors.black,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Row(
                        children: [
                          Text(
                            "Delivery Charges",
                            style: GoogleFonts.outfit(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              color: Colors.black,
                            ),
                          ),
                          const Spacer(),
                          // Getting 10% of the total price
                          Text(
                            "\$${state.products.fold<double>(
                              0,
                              (prev, element) => (prev + (double.parse(element.price) * element.quantity) * 0.1).roundToDouble(),
                            )}",
                            style: GoogleFonts.outfit(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              color: Colors.black,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Row(
                        children: [
                          Text(
                            "Total",
                            style: GoogleFonts.outfit(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              color: Colors.black,
                            ),
                          ),
                          const Spacer(),
                          Text(
                            "\$${state.products.fold<double>(
                              0,
                              (prev, element) =>
                                  prev +
                                  (double.parse(element.price) * element.quantity) +
                                  state.products.fold<double>(
                                    0,
                                    (prev, element) => (prev + (double.parse(element.price) * element.quantity) * 0.1).roundToDouble(),
                                  ),
                            )}",
                            style: GoogleFonts.outfit(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              color: Colors.black,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
        );
      },
    );
  }
}
