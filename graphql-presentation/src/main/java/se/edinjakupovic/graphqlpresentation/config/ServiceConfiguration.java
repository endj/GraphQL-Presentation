package se.edinjakupovic.graphqlpresentation.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import se.edinjakupovic.graphqlpresentation.service.ImageService;
import se.edinjakupovic.graphqlpresentation.service.PresentationGenerator;
import se.edinjakupovic.graphqlpresentation.service.PresentationService;
import se.edinjakupovic.graphqlpresentation.service.SlideDefinitionParser;
import se.edinjakupovic.graphqlpresentation.service.theme.ColourService;
import se.edinjakupovic.graphqlpresentation.service.theme.FontService;

@Configuration
public class ServiceConfiguration {

    @Bean
    public PresentationService presentationService() {
        return new PresentationService();
    }

    @Bean
    public ColourService colourService() {
        return new ColourService();
    }

    @Bean
    public FontService fontService() {
        return new FontService();
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
