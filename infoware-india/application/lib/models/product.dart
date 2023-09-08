class ProductResponse {
  final String name;
  final String price;
  final String description;
  final String category;
  final String image;
  final String id;
  const ProductResponse({required this.name, required this.price, required this.description, required this.category, required this.image, required this.id});
  factory ProductResponse.fromJSON(String id, Map<String, dynamic> json) {
    return ProductResponse(
      id: id,
      name: json['name'],
      price: json['price'],
      description: json['description'],
      category: json['category'],
      image: json['image'],
    );
  }
}
