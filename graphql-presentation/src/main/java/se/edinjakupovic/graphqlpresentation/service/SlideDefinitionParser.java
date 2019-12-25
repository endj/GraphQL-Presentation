package se.edinjakupovic.graphqlpresentation.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.ResourceUtils;
import se.edinjakupovic.graphqlpresentation.model.Page;

import java.awt.*;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
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
        List<String[]> pageLines = splitByPage(lines);
        return pageLines.stream().map(this::createPage).collect(Collectors.toList());
    }


    private Page createPage(String[] lines) {
        List<String> bulletPoints = new ArrayList<>();
        String header = "";
        String image = "";

        for (String line:lines) {
            if(line.startsWith(HEADER)) {
                header = line.split(HEADER)[1];
            }
            if(line.startsWith(BULLET_POINT)) {
                bulletPoints.add(line.replace(BULLET_POINT, ""));
            }
            if(line.startsWith(IMAGE_START)) {
                String fileName = line.replace(IMAGE_START, "");
                image = imageService.loadImageAsString(fileName);
            }
        }

        return Page.builder()
                .header(header)
                .id(UUID.randomUUID())
                .bulletPoints(bulletPoints)
                .image(image)
                .build();
    }

    private List<String[]> splitByPage(String[] lines) {
        List<String[]> definitions = new ArrayList<>();
        int start = 0, end = 0;
        for (int i = 0; i < lines.length; i++, end++) {
            if (lines[i].startsWith(END_OF_PAGE)) {
                definitions.add(Arrays.copyOfRange(lines, start, end));
                start = end;
            }
        }
        return definitions;
    }


}
