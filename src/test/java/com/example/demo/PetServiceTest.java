package com.example.demo;

import com.example.demo.entities.Pet;
import com.example.demo.repositories.PetRepo;
import com.example.demo.services.PetService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;

//@RunWith(SpringRunner.class)
//public class PetServiceTest {
//
//  @TestConfiguration
//  static class PetServiceTestContextConfiguration {
//
//    @Bean
//    public PetService petService() {
//      return new PetService();
//    }
//  }
//
//  @Autowired
//  private PetService petService;
//
//  @MockBean
//  private PetRepo petRepo;
//
//  @Before
//  public void setup() {
//    Pet trisse = new Pet();
//    trisse.setName("Trisse");
//
//    Mockito.when(petRepo.findAllBySpeciesIgnoreCase(trisse.getSpecies()))
//            .thenReturn(Arrays.asList(trisse));
//  }
//
//  @Test
//  public void testFindById() {
//    int id = 1;
//
//    Pet found = petService.findOnePet(id);
//
//    assertThat(found.getId())
//            .isEqualTo(id);
//  }
//}
