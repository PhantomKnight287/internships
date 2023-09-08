part of 'user_bloc.dart';

@immutable
abstract class UserState {}

class UserInitial extends UserState {}

class UserLoggedInState extends UserState {
  final String username;

  UserLoggedInState({
    required this.username,
  });
}

class UserLoggedOutState extends UserState {}
