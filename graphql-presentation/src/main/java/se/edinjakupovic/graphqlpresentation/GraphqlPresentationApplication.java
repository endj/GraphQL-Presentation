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
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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
        IntStream.range(0, 10).forEach(x -> presentationService.savePresentation(createPresentation()));
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
                .pages(createRandomPages())
                .build();
    }

    private static List<Page> createRandomPages() {
        Random random = new Random();
        int numberOfPages = Math.max(1, random.nextInt(5));



        return IntStream.rangeClosed(0, Math.max(1, numberOfPages)).mapToObj(x ->
                Page
                        .builder()
                        .bulletPoints(
                                List.of(points[Math.max(0,random.nextInt(points.length)-1)],
                                        points[Math.max(0,random.nextInt(points.length)-1)],
                                        points[Math.max(0,random.nextInt(points.length)-1)])
                        )
                        .header(UUID.randomUUID().toString())
                        .id(UUID.randomUUID()).build()
        ).collect(Collectors.toList());
    }

    static String[] points = new String[]{"How to do that", "Why do that", "xd so muhc","graphql is cool","to test or not","shut up",
    "eventloopp", "steeve balmer","docker cokcer docker","kafkaeqsquq","to,e tp tgo sto sleep","swag"};
}
