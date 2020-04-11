package se.edinjakupovic.graphqlpresentation.service;

import se.edinjakupovic.graphqlpresentation.model.Page;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class SlideDefinitionParser {
    private static final String END_OF_PAGE = "-";
    private static final String IMAGE_START = "[";
    private static final String HEADER = "#";
    private static final String BULLET_POINT = "*";

    private final ImageService imageService;

    public SlideDefinitionParser(ImageService imageService) {
        this.imageService = imageService;
    }

    public List<Page> parseFileToPresentation(String slideDefinition) {
        String[] lines = slideDefinition.split(System.lineSeparator());
        return splitByPage(lines).stream().map(this::createPage).collect(Collectors.toList());
    }

    private Page createPage(String[] lines) {
        List<String> bulletPoints = new ArrayList<>();
        Page.PageBuilder builder = Page.builder();

        for (String line : lines) {
            if (line.startsWith(HEADER)) {
                builder = builder.header(line.split(HEADER)[1]);
            }
            if (line.startsWith(BULLET_POINT)) {
                bulletPoints.add(line.replace(BULLET_POINT, ""));
            }
            if (line.startsWith(IMAGE_START)) {
                String fileName = line.replace(IMAGE_START, "");
                builder = builder.image(imageService.loadImageAsBase64String(fileName));
            }
        }
        return builder
                .id(UUID.randomUUID())
                .bulletPoints(bulletPoints)
                .build();
    }

    private List<String[]> splitByPage(String[] lines) {
        List<String[]> definitions = new ArrayList<>();
        int start = 0;
        int end = 0;
        for (int i = 0; i < lines.length; i++, end++) {
            if (lines[i].startsWith(END_OF_PAGE)) {
                definitions.add(Arrays.copyOfRange(lines, start, end));
                start = end;
            }
        }
        return definitions;
    }
}
