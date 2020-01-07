package se.edinjakupovic.graphqlpresentation.service;

import lombok.SneakyThrows;
import org.springframework.util.ResourceUtils;
import se.edinjakupovic.graphqlpresentation.model.Author;
import se.edinjakupovic.graphqlpresentation.model.Font;
import se.edinjakupovic.graphqlpresentation.model.Meta;
import se.edinjakupovic.graphqlpresentation.model.Page;
import se.edinjakupovic.graphqlpresentation.model.Presentation;
import se.edinjakupovic.graphqlpresentation.model.Theme;
import se.edinjakupovic.graphqlpresentation.service.theme.ColourService;
import se.edinjakupovic.graphqlpresentation.service.theme.ColourTheme;

import java.nio.file.Files;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class PresentationGenerator {

    private static final ThreadLocalRandom random = ThreadLocalRandom.current();
    private final ColourService colourService;
    private final SlideDefinitionParser slideDefinitionParser;

    public PresentationGenerator(ColourService colourService,
                                 SlideDefinitionParser slideDefinitionParser) {
        this.colourService = colourService;
        this.slideDefinitionParser = slideDefinitionParser;
    }


    @SneakyThrows
    public List<Page> generatePresentationSlidesFromFile(String filePath) {
        byte[] bytes = Files.readAllBytes(ResourceUtils.getFile("classpath:" + filePath).toPath());
        String slideDefinition = new String(bytes);
        return slideDefinitionParser.parseFileToPresentation(slideDefinition);
    }

    public Presentation generateRandomPresentation() {
        return Presentation.builder()
                .id(UUID.randomUUID())
                .title(randomTitle())
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
                        .colour(Math.random() > 0.5
                                ? colourService.getColourTheme(ColourTheme.DARK)
                                : colourService.getColourTheme(ColourTheme.LIGHT))
                        .build())
                .pages(createRandomPages())
                .build();
    }

    private List<Page> createRandomPages() {
        int numberOfPages = random.nextInt(1, 5);

        return IntStream.rangeClosed(0, numberOfPages).mapToObj(pages ->
                Page.builder()
                        .bulletPoints(randomBulletPoints(random.nextInt(2, 5)))
                        .header(randomHeader())
                        .id(UUID.randomUUID()).build()
        ).collect(Collectors.toList());
    }

    private List<String> randomBulletPoints(int numberOfPoints) {
        List<String> collect = Arrays.stream(RANDOM_POINTS).collect(Collectors.toList());
        Collections.shuffle(collect);
        return collect.subList(0, numberOfPoints);
    }

    private String randomTitle() {
        return RANDOM_TITLES[random.nextInt(0, RANDOM_TITLES.length - 1)];
    }

    private String randomHeader() {
        return RANDOM_HEADERS[random.nextInt(0, RANDOM_HEADERS.length - 1)];
    }

    private static final String[] RANDOM_POINTS = new String[]{
            "My app is free because I’m monetizing my users’ data.",
            "Move fast and break things ",
            "People need to be able to explicitly choose what they share",
            "I used to work in sales but now I evangelize Microsoft’s products",
            "Apple revolutionized the experience of using headphones when it killed the headphone jack on iPhones",
            "Developer Developer Developers",
            "Ride Sharing Economy",
            "Disrupting disruptions tech tech",
            "Docker inside Docker inside Docker",
            "Kafkaesque Ride Sharing using Kafka",
            "PogoStick based architecture",
            "Avocado as a service: AaaS"
    };

    private static final String[] RANDOM_HEADERS = new String[]{
            "A Netflix for Youtube",
            "Service as a platform",
            "Platform as a API",
            "Service as a Platform as a Service",
            "Cloud learning Blockchain AI"
    };

    private static final String[] RANDOM_TITLES = new String[]{
            "Hyperautomation",
            "Biohacking",
            "Cloud Native Clouds",
            "Computer Vision",
            "Artificial Intelligence",
            "Connected Retail",
            "Blockchain",
            "Quantum Computing",
            "Mobile First",
            "Voice-as-User Interface",
            "Internet of Things"
    };
}
