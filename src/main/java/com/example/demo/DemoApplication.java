package com.example.demo;

import com.example.demo.entities.SocketExample;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);

//		SocketExample socket1 = new SocketExample();
//		socket1.message = "Hello";
//
//		SocketExample socket2 = new SocketExample();
//		socket2.message = "Hello again";
//
//		SocketExample socket3 = (SocketExample) JSON.get().clone(socket2);
//
//		System.out.println(socket1.message);
//		System.out.println(socket2.message);
//
//		String socket1String = JSON.get().stringify(socket1);
//		System.out.println(socket1String);
//
//		String socket2String = JSON.get().stringify(socket2);
//		System.out.println(socket2String);
//
//		SocketExample fromString = (SocketExample) JSON.get().parse(socket1String, SocketExample.class);
//		System.out.println(fromString.message);
//
//		socket3.message = "Changed message";
//
//		System.out.println(socket2.message);
//		System.out.println(socket3.message);

	}

}
