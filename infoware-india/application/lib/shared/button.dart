import 'package:flutter/material.dart';

class AccentButton extends StatelessWidget {
  final Function()? onPressed;
  final Widget child;
  final bool? loading;
  const AccentButton({super.key, this.onPressed, required this.child, this.loading = false});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: loading == true ? null : onPressed,
      style: ButtonStyle(
        backgroundColor: MaterialStateProperty.all<Color>(
          loading == false ? Colors.black : Colors.black.withOpacity(0.5),
        ),
        shape: MaterialStateProperty.all<RoundedRectangleBorder>(
          RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(25.0),
          ),
        ),
      ),
      child: loading == false
          ? child
          : Container(
              width: 24,
              height: 24,
              padding: const EdgeInsets.all(2.0),
              child: const CircularProgressIndicator(
                color: Colors.white,
                strokeWidth: 3,
              ),
            ),
    );
  }
}
