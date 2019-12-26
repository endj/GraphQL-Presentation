package se.edinjakupovic.graphqlpresentation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import se.edinjakupovic.graphqlpresentation.config.PresentationConfig;
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
    private final PresentationConfig presentationConfig;
    private final ColourService colourService;

    public GraphqlPresentationApplication(PresentationService presentationService,
                                          PresentationGenerator presentationGenerator,
                                          PresentationConfig presentationConfig,
                                          ColourService colourService) {
        this.presentationService = presentationService;
        this.presentationGenerator = presentationGenerator;
        this.presentationConfig = presentationConfig;
        this.colourService = colourService;
    }

    public static void main(String[] args) {
        SpringApplication.run(GraphqlPresentationApplication.class, args);
    }

    @Override
    public void run(String... args) {
        Presentation presentation = createPresentationFromConfig();
        presentationService.savePresentation(presentation);
        IntStream.range(0, 5)
                .forEach(x -> presentationService.savePresentation(presentationGenerator.generateRandomPresentation()));
    }

    private Presentation createPresentationFromConfig() {
        List<Page> slidePages = presentationGenerator.generatePresentationSlidesFromFile(presentationConfig.getFile());
        return Presentation.builder()
                .id(UUID.randomUUID())
                .title(presentationConfig.getTitle())
                .author(Author.builder()
                        .id(UUID.randomUUID())
                        .firstName(presentationConfig.getAuthor().getFirstName())
                        .lastName(presentationConfig.getAuthor().getLastName())
                        .age(presentationConfig.getAuthor().getAge())
                        .build())
                .meta(Meta.builder()
                        .createdAt(LocalDate.now())
                        .numberOfSlides(slidePages.size())
                        .build())
                .theme(Theme.builder()
                        .font(Font.builder()
                                .size(presentationConfig.getFont().getSize())
                                .colour(presentationConfig.getFont().getColour())
                                .family(presentationConfig.getFont().getFamily())
                                .build())
                        .colour(colourService.getColourTheme(ColourTheme.GREEN))
                        .build())
                .pages(slidePages)
                .build();
    }

}
