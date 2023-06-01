import 'package:application/bloc/cart/cart_bloc.dart';
import 'package:application/bloc/user/user_bloc.dart';
import 'package:application/utils/view_switcher.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase("http://10.0.2.2:8090");
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<UserBloc>(
          create: (context) => UserBloc(),
        ),
        BlocProvider<CartBloc>(
          create: (context) => CartBloc(),
        ),
      ],
      child: MaterialApp(
        title: 'Bloc',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSwatch(
            accentColor: Colors.black,
            backgroundColor: Colors.white,
          ),
          appBarTheme: const AppBarTheme(elevation: 0),
          useMaterial3: true,
          buttonTheme: const ButtonThemeData(buttonColor: Colors.black),
        ),
        home: const ViewSwitcher(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
