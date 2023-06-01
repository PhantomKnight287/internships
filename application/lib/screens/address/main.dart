import 'dart:convert';

import 'package:application/shared/button.dart';
import 'package:application/shared/input.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CreateNewAddress extends StatefulWidget {
  const CreateNewAddress({super.key});

  @override
  State<CreateNewAddress> createState() => _CreateNewAddressState();
}

class _CreateNewAddressState extends State<CreateNewAddress> {
  final TextEditingController _nameController = TextEditingController(),
      _emailController = TextEditingController(),
      _phoneController = TextEditingController(),
      _addressController = TextEditingController(),
      _cityController = TextEditingController(),
      _stateController = TextEditingController(),
      _pincodeController = TextEditingController(),
      _countryController = TextEditingController();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        scrolledUnderElevation: 0,
        leading: IconButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          icon: const Icon(
            Icons.arrow_back_ios,
            size: 20,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 20,
                ),
                Text(
                  "Create New Address",
                  style: GoogleFonts.outfit(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                  textAlign: TextAlign.left,
                ),
                Text(
                  "Please fill up the form below to create a new address",
                  style: GoogleFonts.outfit(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                    color: Colors.black,
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                InputField(
                  hintText: "Name",
                  keyboardType: TextInputType.name,
                  controller: _nameController,
                  validator: (p0) {
                    if (p0!.isEmpty) {
                      return "Name cannot be empty";
                    }
                    return null;
                  },
                ),
                const SizedBox(
                  height: 10,
                ),
                InputField(
                  hintText: "Email",
                  keyboardType: TextInputType.emailAddress,
                  controller: _emailController,
                  validator: (p0) {
                    if (p0!.isEmpty) {
                      return "Email cannot be empty";
                    }
                    return EmailValidator.validate(p0) ? null : "Invalid Email";
                  },
                ),
                const SizedBox(
                  height: 10,
                ),
                InputField(
                  hintText: "Phone",
                  keyboardType: TextInputType.phone,
                  controller: _phoneController,
                  validator: (p0) {
                    if (p0!.isEmpty) {
                      return "Phone cannot be empty";
                    }
                    return null;
                  },
                ),
                const SizedBox(
                  height: 10,
                ),
                InputField(
                  hintText: "Address",
                  keyboardType: TextInputType.streetAddress,
                  controller: _addressController,
                  validator: (p0) {
                    if (p0!.isEmpty) {
                      return "Address cannot be empty";
                    }
                    return null;
                  },
                ),
                const SizedBox(
                  height: 10,
                ),
                InputField(
                  hintText: "City",
                  keyboardType: TextInputType.streetAddress,
                  controller: _cityController,
                  validator: (p0) {
                    if (p0!.isEmpty) {
                      return "City cannot be empty";
                    }
                    return null;
                  },
                ),
                const SizedBox(
                  height: 10,
                ),
                InputField(
                  hintText: "State",
                  keyboardType: TextInputType.streetAddress,
                  controller: _stateController,
                  validator: (p0) {
                    if (p0!.isEmpty) {
                      return "State cannot be empty";
                    }
                    return null;
                  },
                ),
                const SizedBox(
                  height: 10,
                ),
                InputField(
                  hintText: "Country",
                  keyboardType: TextInputType.number,
                  controller: _countryController,
                  validator: (p0) {
                    if (p0!.isEmpty) {
                      return "Name of country cannot be empty";
                    }
                    return null;
                  },
                ),
                const SizedBox(
                  height: 10,
                ),
                InputField(
                  hintText: "Pincode",
                  keyboardType: TextInputType.number,
                  controller: _pincodeController,
                  validator: (p0) {
                    if (p0!.isEmpty) {
                      return "Pincode cannot be empty";
                    }
                    return null;
                  },
                ),
                const SizedBox(
                  height: 10,
                ),
                SizedBox(
                  width: MediaQuery.of(context).size.width,
                  child: AccentButton(
                    onPressed: () async {
                      if (_formKey.currentState!.validate()) {
                        final storage = await SharedPreferences.getInstance();
                        storage.setString(
                          "address",
                          jsonEncode(
                            {
                              "name": _nameController.text,
                              "email": _emailController.text,
                              "phone": _phoneController.text,
                              "address": _addressController.text,
                              "state": _stateController.text,
                              "city": _cityController.text,
                              "country": _countryController.text,
                              "pinCode": _pincodeController.text
                            },
                          ),
                        );
                        Navigator.of(context).pop();
                      }
                    },
                    child: Text(
                      "Create Address",
                      style: GoogleFonts.outfit(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
