package com.example.demo.entities;

import com.google.gson.annotations.Expose;

public class SocketEvent {
  public String action;
  @Expose(deserialize = false)
  public String payload;
}
