package com.example.demo.services;

import com.example.demo.configs.MyUserDetailsService;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired
  private UserRepo userRepo;
  @Autowired
  private MyUserDetailsService myUserDetailsService;

  public User findCurrentUser() {
      // the login session is stored between page reloads,
      // and we can access the current authenticated user with this
      String username = SecurityContextHolder.getContext().getAuthentication().getName();
      return userRepo.findByUsername(username);
  }

  public User registerUser(User user) {
    return myUserDetailsService.addUser(user.getUsername(), user.getPassword());
  }
}