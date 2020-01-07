package se.edinjakupovic.graphqlpresentation.service.theme;

import se.edinjakupovic.graphqlpresentation.model.Font;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static se.edinjakupovic.graphqlpresentation.service.theme.FontTheme.MONO;
import static se.edinjakupovic.graphqlpresentation.service.theme.FontTheme.MONO_LIGHT;
import static se.edinjakupovic.graphqlpresentation.service.theme.FontTheme.PRESENTATION;
import static se.edinjakupovic.graphqlpresentation.service.theme.FontTheme.PRESENTATION_LIGHT;

public class FontService {
    private static final Map<FontTheme, Font> fontMap = new ConcurrentHashMap<>();

    static {
        fontMap.put(MONO,
                Font.builder()
                        .size("55px")
                        .family("monospace")
                        .colour("black").build());
        fontMap.put(MONO_LIGHT,
                Font.builder()
                        .size("55px")
                        .family("monospace")
                        .colour("white").build());
        fontMap.put(PRESENTATION,
                Font.builder()
                        .size("65px")
                        .family("verdana")
                        .colour("black").build());
        fontMap.put(PRESENTATION_LIGHT,
                Font.builder()
                        .size("65px")
                        .family("verdana")
                        .colour("white").build());
    }

    public Font getFontTheme(FontTheme fontTheme) {
        return fontMap.get(fontTheme);
    }

}
