package se.edinjakupovic.graphqlpresentation.service;

import se.edinjakupovic.graphqlpresentation.model.Colour;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ColourService {
    private static final Map<ColourTheme, Colour> themeMap = new ConcurrentHashMap<>();

    static {
        themeMap.put(ColourTheme.DARK, Colour.builder()
                        .primary("#2F3640")
                        .secondary("#5E6C80")
                        .accent("#FFE8BD").build());
        themeMap.put(ColourTheme.LIGHT, Colour.builder()
                        .primary("#BDD8FF")
                        .secondary("#D6E7FF")
                        .accent("#495680").build());
        themeMap.put(ColourTheme.GREEN, Colour.builder()
                        .primary("#A7B37B")
                        .secondary("#BCCC83")
                        .accent("#FFDBD6").build());
    }

    public Colour getColourTheme(ColourTheme colourTheme) {
        return themeMap.get(colourTheme);
    }

}
