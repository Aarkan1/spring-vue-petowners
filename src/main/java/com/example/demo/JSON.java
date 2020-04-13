package com.example.demo;

import com.google.gson.Gson;

public class JSON {
  private static JSON instance = new JSON();

  private Gson gson = new Gson();

  private JSON() {}

  public static JSON get() {
    return instance;
  }

  public String stringify(Object object) {
    return gson.toJson(object);
  }

  public Object parse(String object, Class klass) {
    return gson.fromJson(object, klass);
  }

  public Object clone(Object object) {
    String stringified = stringify(object);
    return parse(stringified, object.getClass());
  }
//  SocketExample socket1 = new SocketExample();
//  socket1.message = "Hello";
//
//  SocketExample socket2 = new SocketExample();
//  socket2.message = "Hello again";
//
//  SocketExample socket3 = (SocketExample) JSON.get().clone(socket2);
//
//  System.out.println(socket1.message); // "Hello"
//  System.out.println(socket2.message); // "Hello again"
//
//  String socket1String = JSON.get().stringify(socket1);
//  System.out.println(socket1String);
//
//  String socket2String = JSON.get().stringify(socket2);
//  System.out.println(socket2String);
//
//  SocketExample fromString = (SocketExample) JSON.get().parse(socket1String, SocketExample.class);
//  System.out.println(fromString.message);
//
//  socket3.message = "Changed message";
//
//  System.out.println(socket2.message); // "Hello again"
//  System.out.println(socket3.message); // "Changed message"
}
