package se.edinjakupovic.graphqlpresentation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import se.edinjakupovic.graphqlpresentation.config.SlidesConfig;
import se.edinjakupovic.graphqlpresentation.model.*;
import se.edinjakupovic.graphqlpresentation.service.ColourService;
import se.edinjakupovic.graphqlpresentation.service.ColourTheme;
import se.edinjakupovic.graphqlpresentation.service.PresentationGenerator;
import se.edinjakupovic.graphqlpresentation.service.PresentationService;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

@Slf4j
@SpringBootApplication
public class GraphqlPresentationApplication implements CommandLineRunner {

    private final PresentationService presentationService;
    private final PresentationGenerator presentationGenerator;
    private final SlidesConfig slidesConfig;
    private final ColourService colourService;

    public GraphqlPresentationApplication(PresentationService presentationService,
                                          PresentationGenerator presentationGenerator,
                                          SlidesConfig slidesConfig,
                                          ColourService colourService) {
        this.presentationService = presentationService;
        this.presentationGenerator = presentationGenerator;
        this.slidesConfig = slidesConfig;
        this.colourService = colourService;
    }

    public static void main(String[] args) {
        SpringApplication.run(GraphqlPresentationApplication.class, args);
    }

    @Override
    public void run(String... args) {
        Presentation graphQlPresentation = createPresentationFromConfig();
        presentationService.savePresentation(graphQlPresentation);
        IntStream.range(0, 10).forEach(x -> presentationService.savePresentation(presentationGenerator.generateRandomPresentation()));
    }

    private Presentation createPresentationFromConfig() {
        List<Page> slidePages = presentationGenerator.generatePresentationSlidesFromFile(slidesConfig.getFile());
        return Presentation.builder()
                .id(UUID.randomUUID())
                .title(slidesConfig.getTitle())
                .author(Author.builder()
                        .id(UUID.randomUUID())
                        .firstName(slidesConfig.getFirstName())
                        .lastName(slidesConfig.getLastName())
                        .age(slidesConfig.getAge())
                        .build())
                .meta(Meta.builder()
                        .createdAt(LocalDate.now())
                        .numberOfSlides(slidePages.size())
                        .build())
                .theme(Theme.builder()
                        .font(Font.builder()
                                .size(slidesConfig.getFontSize())
                                .colour(slidesConfig.getFontColour())
                                .family(slidesConfig.getFontFamiliy())
                                .build())
                        .colour(colourService.getColourTheme(ColourTheme.GREEN))
                        .build())
                .pages(slidePages)
                .build();
    }

}
