package com.example.demo;

import com.example.demo.controllers.PetController;
import com.example.demo.entities.Pet;
import com.example.demo.services.PetService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@RunWith(SpringRunner.class)
//@WebMvcTest(PetController.class)
//public class PetControllerTest {
//
//  @Autowired
//  private MockMvc mvc;
//
//  @MockBean
//  private PetService petService;
//
//  @Test
//  public void testGetAllPets() throws Exception {
//    Pet trisse = new Pet();
//    trisse.setName("Trisse");
//
//    List<Pet> pets = Arrays.asList(trisse);
//
//    given(petService.findAllPets()).willReturn(pets);
//
//    mvc.perform(get("/rest/pets")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", hasSize(1)))
//                .andExpect((ResultMatcher) jsonPath("$[0].name", is(trisse.getName())));
//  }
//
//}
