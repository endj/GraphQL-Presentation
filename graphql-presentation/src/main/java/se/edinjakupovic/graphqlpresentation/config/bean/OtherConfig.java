package se.edinjakupovic.graphqlpresentation.config.bean;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import se.edinjakupovic.graphqlpresentation.service.*;

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

    @Bean
    public PresentationGenerator presentationGenerator(ColourService colourService,
                                                       SlideDefinitionParser slideDefinitionParser) {
        return new PresentationGenerator(colourService, slideDefinitionParser);
    }

    @Bean
    public SlideDefinitionParser slideDefinitionParser(ImageService imageService) {
        return new SlideDefinitionParser(imageService);
    }

    @Bean
    public ImageService imageService() {
        return new ImageService();
    }
}
