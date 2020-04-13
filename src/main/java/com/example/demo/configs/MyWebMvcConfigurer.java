package com.example.demo.configs;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import javax.sql.DataSource;
import java.io.IOException;

@Configuration
class MyWebMvcConfigurer implements WebMvcConfigurer {
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**")
            .addResourceLocations("file:src/main/resources/static/")
            .setCacheControl(CacheControl.noCache())
            // this must be set to false to override
            // the need to restart Spring on new uploads
            .resourceChain(false)
            .addResolver(new PathResourceResolver() {
              @Override
              protected Resource getResource(String resourcePath,
                                             Resource location) throws IOException {
                Resource requestedResource = location.createRelative(resourcePath);
                return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
                        : new ClassPathResource("/static/index.html");

                /**
                 * Går vi till serverns IP och PORT, http://localhost:4000,
                 * så får vi den index.html som ligger direkt i /static-mappen.
                 * Denna .html-fil får vi på alla url:er vi går till,
                 * förutom de rest-routes vi skapar i våra controllers.
                 *
                 * Går vi till http://localhost:4000/rest/pets så får vi listan
                 * med pets tillbaka, och inte vår index.html
                 */
              }
            });
  }

  @Bean
  public DataSource dataSource() {
    DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
    dataSourceBuilder.driverClassName("org.sqlite.JDBC");
    dataSourceBuilder.url("jdbc:sqlite:pets-and-owners.db");
    return dataSourceBuilder.build();
  }
}