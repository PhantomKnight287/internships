part of 'user_bloc.dart';

@immutable
abstract class UserEvent {}

class UserLoggedInEvent extends UserEvent {
  final String username;

  UserLoggedInEvent({
    required this.username,
  });
}

class UserLoggedOutEvent extends UserEvent {}
