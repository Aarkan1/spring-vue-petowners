package com.example.demo.services;

import com.google.gson.Gson;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SocketService {

  Gson gson = new Gson();

  /**
   * Här sparar vi alla anslutna klienter, så vi sedan kan loopa
   * genom dessa för att skicka ett meddelande till dem.
   *
   * Varför vi använder en CopyOnWriteArrayList istället för en ArrayList
   * så är det för att denna lista kommer Spring att hantera med flera
   * olika threads(trådar). För att innehållet inte ska bli korrupt
   * när det läggs till eller tas bort sessioner från listan
   * så behöver vi använda en speciell list-typ som skyddar mot detta.
   *
   * Hint hint:
   * Gör om listan till en HashMap, så får ni kontroll om vilken
   * session som hör ihop med vilken klient...
   * Notera: Ni måste fortfarande skydda HashMap:en mot concurrency
   */
  private List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

  public void sendToOne(WebSocketSession webSocketSession, String message) throws IOException {
    webSocketSession.sendMessage(new TextMessage(message));
  }

  public void sendToOne(WebSocketSession webSocketSession, Object obj, Class klass) throws IOException {
    sendToOne(webSocketSession, gson.toJson(obj, klass)); // same as JSON.stringify
  }

  /**
   * I Java kan man använda överlagrade metoder.
   * Dessa skiljer sig att de har exakt samma namn,
   * men parametrarna är annorlunda.
   *
   * Den metod som matchar parametrarna kommer att köras.
   * */
  public void sendToAll(Object obj, Class klass) {
    sendToAll(gson.toJson(obj, klass));
  }

  /**
   * sendToAll kommer loopa genom alla sessioner och skicka
   * ett meddelande till alla anslutna klienter
   * */
  public void sendToAll(String message) {
    TextMessage msg = new TextMessage(message);
    for(WebSocketSession webSocketSession : sessions) {
      try {
        webSocketSession.sendMessage(msg);
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  public void addSession(WebSocketSession session) {
    sessions.add(session);
  }

  public void removeSession(WebSocketSession session) {
    sessions.remove(session);
  }
}