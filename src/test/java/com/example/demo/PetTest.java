package com.example.demo;


import com.example.demo.entities.Pet;
import com.example.demo.repositories.PetRepo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.security.RunAs;

import static org.assertj.core.api.Assertions.assertThat;

//@RunWith(SpringRunner.class)
//@DataJpaTest
//public class PetTest {
//
//  @Autowired
//  private TestEntityManager entityManager;
//
//  @Autowired
//  private PetRepo petRepo;
//
//  @Test
//  public void testFindById() {
//    Pet trisse = new Pet();
//    trisse.setName("Trisse");
////    trisse.setId(1);
//
//    entityManager.persist(trisse);
//    entityManager.flush();
//
//    Pet found = petRepo.findById(1);
//
//    assertThat(found.getId()).isEqualTo(1);
//  }
//}
