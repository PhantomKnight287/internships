import 'package:application/bloc/user/user_bloc.dart';
import 'package:application/screens/auth/login.dart';
import 'package:application/screens/home/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ViewSwitcher extends StatelessWidget {
  const ViewSwitcher({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<UserBloc, UserState>(
      builder: (context, state) {
        if (state is UserLoggedInState) {
          return const HomeScreen();
        } else if (state is UserInitial) {
          return const LoginScreen();
        } else if (state is UserLoggedOutState) {
          return const Text("User Loggedout");
        }
        return const Text("Unknown state");
      },
    );
  }
}
