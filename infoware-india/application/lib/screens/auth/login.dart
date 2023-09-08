import 'package:application/bloc/user/user_bloc.dart';
import 'package:application/main.dart';
import 'package:application/screens/auth/register.dart';
import 'package:application/shared/button.dart';
import 'package:application/shared/input.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:pocketbase/pocketbase.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool passwordVisible = false;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool loading = false;

  void _hydrate() async {
    try {
      final storage = await SharedPreferences.getInstance();
      final token = storage.getString("token");
      if (token == null || token.isEmpty) return;
      pb
          .collection("users")
          .authRefresh(headers: {"authorization": token})
          .then((value) => {
                context.read<UserBloc>().add(
                      UserLoggedInEvent(
                        username: value.record!.data['username'],
                      ),
                    ),
              })
          .catchError((e) => print(e));
    } catch (e) {
      print(e);
    }
  }

  @override
  void initState() {
    super.initState();
    _hydrate();
  }

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
                      "Welcome Back!",
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
                              final res = await pb.collection("users").authWithPassword(
                                    _usernameController.text.trim(),
                                    _passwordController.text.trim(),
                                  );
                              final storage = await SharedPreferences.getInstance();
                              storage.setString("token", res.token);
                              context.read<UserBloc>().add(UserLoggedInEvent(username: res.record!.data['username']));
                            } on ClientException catch (error) {
                              setState(() {
                                loading = false;
                              });
                              if (error.statusCode == 404) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text("User not found"),
                                    backgroundColor: Colors.red,
                                  ),
                                );
                                return;
                              }
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
                          "Login",
                          style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.w500, color: Colors.white),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Text("Don't have an account?"),
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).push(
                              CupertinoPageRoute(
                                builder: (context) => const RegisterScreen(),
                              ),
                            );
                          },
                          child: const Text("Register"),
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
