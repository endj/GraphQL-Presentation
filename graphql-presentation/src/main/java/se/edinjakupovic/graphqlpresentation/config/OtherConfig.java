package se.edinjakupovic.graphqlpresentation.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import se.edinjakupovic.graphqlpresentation.service.ColourService;
import se.edinjakupovic.graphqlpresentation.service.PresentationService;

@Configuration
public class OtherConfig {

    @Bean
    public PresentationService presentationService() {
        return new PresentationService();
    }

    @Bean
    public ColourService colourService() {
        return new ColourService();
    }
}
