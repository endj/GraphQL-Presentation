package se.edinjakupovic.graphqlpresentation.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class SlidesConfig {

    @Value("${presentation.file}")
    private String file;

    @Value("${presentation.title}")
    private String title;

    @Value("${presentation.font.size}")
    private String fontSize;

    @Value("${presentation.font.family}")
    private String fontFamiliy;

    @Value("${presentation.font.colour}")
    private String fontColour;

    @Value("${presentation.author.first-name}")
    private String firstName;

    @Value("${presentation.author.last-name}")
    private String lastName;

    @Value("${presentation.author.age}")
    private int age;

}
