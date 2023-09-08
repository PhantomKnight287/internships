import 'package:application/bloc/user/user_bloc.dart';
import 'package:application/main.dart';
import 'package:application/screens/auth/login.dart';
import 'package:application/screens/home/main.dart';
import 'package:application/shared/button.dart';
import 'package:application/shared/input.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:pocketbase/pocketbase.dart';
import 'package:shared_preferences/shared_preferences.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool passwordVisible = false;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool loading = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: BlocBuilder<UserBloc, UserState>(
        builder: (context, state) {
          return Center(
            child: Container(
              padding: const EdgeInsets.all(20.0),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Center(
                      child: FlutterLogo(
                        size: 100.0,
                      ),
                    ),
                    const SizedBox(height: 30.0),
                    Text(
                      "Welcome to Bloc!",
                      style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.w500, color: Colors.black),
                      textAlign: TextAlign.left,
                    ),
                    const SizedBox(height: 10.0),
                    InputField(
                      controller: _usernameController,
                      hintText: 'Username',
                      keyboardType: TextInputType.emailAddress,
                      validator: (p0) {
                        if (p0!.isEmpty) {
                          return 'Username is required';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20.0),
                    InputField(
                      hintText: "Password",
                      keyboardType: TextInputType.visiblePassword,
                      controller: _passwordController,
                      obscureText: !passwordVisible,
                      suffixIcon: IconButton(
                        onPressed: () {
                          setState(() {
                            passwordVisible = !passwordVisible;
                          });
                        },
                        icon: Icon(passwordVisible ? Icons.visibility : Icons.visibility_off),
                      ),
                      validator: (p0) {
                        if (p0!.isEmpty) {
                          return 'Password is required';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20.0),
                    Center(
                      child: AccentButton(
                        loading: loading,
                        onPressed: () async {
                          if (_formKey.currentState!.validate()) {
                            setState(() {
                              loading = true;
                            });
                            try {
                              final res = await pb.collection("users").create(body: {
                                "username": _usernameController.text,
                                "password": _passwordController.text,
                                "passwordConfirm": _passwordController.text,
                              });
                              final storage = await SharedPreferences.getInstance();
                              storage.setString("token", pb.authStore.token);
                              context.read<UserBloc>().add(
                                    UserLoggedInEvent(
                                      username: res.data['username'],
                                    ),
                                  );
                              Navigator.of(context).pushReplacement(CupertinoPageRoute(
                                builder: (context) => const HomeScreen(),
                              ));
                            } on ClientException catch (error) {
                              setState(() {
                                loading = false;
                              });

                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(error.response['message'].toString()),
                                  backgroundColor: Colors.red,
                                ),
                              );
                            }
                          }
                        },
                        child: Text(
                          "Register",
                          style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.w500, color: Colors.white),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Text("Already have an account?"),
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).push(
                              CupertinoPageRoute(
                                builder: (context) => const LoginScreen(),
                              ),
                            );
                          },
                          child: const Text("Login"),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
