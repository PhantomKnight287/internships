class ProductResponse {
  final String name;
  final String price;
  final String description;
  final String category;
  final String image;
  const ProductResponse({
    required this.name,
    required this.price,
    required this.description,
    required this.category,
    required this.image,
  });
  factory ProductResponse.fromJSON(Map<String, dynamic> json) {
    return ProductResponse(
      name: json['name'],
      price: json['price'],
      description: json['description'],
      category: json['category'],
      image: json['image'],
    );
  }
}
