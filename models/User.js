"use strict";

/*
1. Tạo Class User

Đầu tiên, bạn cần tạo một Class User để đại diện cho thông tin của người dùng. Class này sẽ gồm các trường cơ bản như sau:

firstName và lastName (họ và tên người dùng)
username
password
Bạn cần tạo Class User gồm constructor với các trường như trên.
*/
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    pageSize = 10,
    category = "Business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize;
    this.category = category;
  }
}

class Todo {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
