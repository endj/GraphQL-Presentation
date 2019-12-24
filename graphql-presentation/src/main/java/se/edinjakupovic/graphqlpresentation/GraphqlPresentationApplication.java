package se.edinjakupovic.graphqlpresentation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import se.edinjakupovic.graphqlpresentation.model.*;
import se.edinjakupovic.graphqlpresentation.service.ColourService;
import se.edinjakupovic.graphqlpresentation.service.ColourTheme;
import se.edinjakupovic.graphqlpresentation.service.PresentationService;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Slf4j
@SpringBootApplication
public class GraphqlPresentationApplication implements CommandLineRunner {

    private final PresentationService presentationService;
    private final ColourService colourService;

    public GraphqlPresentationApplication(PresentationService presentationService,
                                          ColourService colourService) {
        this.presentationService = presentationService;
        this.colourService = colourService;
    }

    public static void main(String[] args) {
        SpringApplication.run(GraphqlPresentationApplication.class, args);
    }

    @Override
    public void run(String... args) {
        presentationService.savePresentation(createPresentation());
        presentationService.savePresentation(createPresentation());
        presentationService.savePresentation(createPresentation());
        presentationService.savePresentation(createPresentation());
        presentationService.savePresentation(createPresentation());
        presentationService.savePresentation(createPresentation());
        log.info("Presentations {}", presentationService.getAllPresentations());
    }

    private Presentation createPresentation() {
        return Presentation.builder()
                .id(UUID.randomUUID())
                .title(UUID.randomUUID().toString())
                .author(Author.builder()
                        .age(22)
                        .firstName("ed")
                        .lastName("jak")
                        .id(UUID.randomUUID()).build())
                .meta(Meta.builder()
                        .createdAt(LocalDate.now())
                        .numberOfSlides(22)
                        .build())
                .theme(Theme.builder()
                        .font(Font.builder()
                                .family("roboto")
                                .size("55px")
                                .colour("black")
                                .build())
                        .colour(Math.random() > 0.5 ? colourService.getColourTheme(ColourTheme.DARK) : colourService.getColourTheme(ColourTheme.LIGHT)).build())
                .pages(List.of(
                        Page.builder()
                                .bulletPoints(List.of("hi", "there"))
                                .header("header Text")
                                .id(UUID.randomUUID())
                                .build(),
                        Page.builder()
                                .bulletPoints(List.of("the", "thjis"))
                                .header("antoher header")
                                .id(UUID.randomUUID())
                                .build()))
                .build();
    }
}
