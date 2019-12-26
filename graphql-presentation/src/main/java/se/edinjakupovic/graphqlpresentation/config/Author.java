package se.edinjakupovic.graphqlpresentation.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "presentation.author")
@Data
public class Author {
    private String firstName;
    private String lastName;
    private int age;
}
