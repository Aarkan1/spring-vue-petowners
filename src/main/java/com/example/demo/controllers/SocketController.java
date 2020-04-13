package com.example.demo.controllers;

import com.example.demo.entities.SocketEvent;
import com.example.demo.entities.SocketExample;
import com.example.demo.services.SocketService;
import com.google.gson.Gson;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.TimeZone;

@Controller
public class SocketController extends TextWebSocketHandler {

  // gives us the "same" functions as JSON.stringify/parse
  Gson gson = new Gson();

  // NOTE: Can not use @Autowired here due to WebSocketConfig instantiating the SocketController
  private SocketService socketService;

  /**
   * Vi kan bara använda @Autowired på denna service en gång,
   * så vi måste själva skapa en setter som låter Spring injecta
   * SocketService i denna controller.
   *
   * (Detta gör @Autowired under ytan)
   */
  public void setSocketService(SocketService socketService) {
    this.socketService = socketService;
  }

  @Override
  public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
    // message.getPayload() is where we find our socket object
    System.out.println("Received msg: " + message.getPayload());

    // gson.toJson()      gson.fromJson()
    // JSON.stringify()   JSON.parse()

    /**
     * Map is like an JavaScript object
     * with key: values
     *
     * object = {
     *   action: 'message',
     *   message: 'Some message'
     * }
     *
     * in JS we get value by
     * object.action or object['action'] == 'message'
     * set value by
     * object.action = 'new value' or object['action'] = 'new value'
     *
     *
     * in Java we get the value in a Map by
     * object.get("action") == 'message'
     * set value by
     * object.put("action", "new value")
     *
     */

    Map event = gson.fromJson(message.getPayload(), Map.class);

    String action = event.get("action").toString();
    switch (action) {
      case "message":
        System.out.println("Message:");
        System.out.println(event.get("message").toString());
        break;
      case "bid":
        System.out.println("Bid:");
        System.out.println(event.get("message").toString());
        break;
      default:
        System.out.println("Could not handle action: " + action);
        socketService.sendToOne(session, "Could not handle action: " + action);
    }


    // same as JSON.parse
//    SocketExample socketExample = gson.fromJson(message.getPayload(), SocketExample.class);
//    System.out.println("Action: " + socketExample.action);
//    System.out.println("Message: " + socketExample.message);
//    System.out.println("Timestamp: " + LocalDateTime.ofInstant(Instant.ofEpochMilli(socketExample.timestamp), TimeZone.getDefault().toZoneId()));

//    socketService.sendToAll(socketExample, SocketExample.class);

//    let sendOneObject = {
//      action: "message",
//      message: "Only messages the client that sent the socket event"
//    }

//    Map map = Map.of("action", "message",
//                        "message", "Only messages the client that sent the socket event");
//
//    System.out.println(map);
//
//    socketService.sendToOne(session, gson.toJson(map));

    // Demonstration purpose only: send back "Hello" + same message as received
//    socketService.sendToAll("Hello " + message.getPayload());

    // Example with a generic Map instead of converting the JSON to a specific class
    // Map keysAndValues = new Gson().fromJson(message.getPayload(), Map.class);
    // Get the value of a key named "firstname"
    // String firstname = keysAndValues.get("firstname");
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
//    System.out.println("Logging in");
    socketService.addSession(session);
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
//    System.out.println("Logging out");
    socketService.removeSession(session);
  }
}