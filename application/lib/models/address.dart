import 'dart:convert';

class Address {
  final String name;
  final String email;
  final String phone;
  final String gender;
  final String country;
  final String state;
  final String city;

  const Address({
    required this.name,
    required this.email,
    required this.phone,
    required this.gender,
    required this.city,
    required this.country,
    required this.state,
  });

  factory Address.fromJSON(Map<String, dynamic> json) {
    return Address(
      name: json['name'],
      email: json['email'],
      phone: json['phone'],
      gender: json['gender'],
      city: json['city'],
      country: json['country'],
      state: json['state'],
    );
  }
  encodeToJSON() {
    return jsonEncode({
      "name": name,
      "email": email,
      "phone": phone,
      "gender": gender,
      "city": city,
      "country": country,
      "state": state,
    });
  }
}
