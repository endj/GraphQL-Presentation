package se.edinjakupovic.graphqlpresentation.service.theme;

import se.edinjakupovic.graphqlpresentation.model.Font;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static se.edinjakupovic.graphqlpresentation.service.theme.FontTheme.*;

public class FontService {
    private static final Map<FontTheme, Font> fontMap = new ConcurrentHashMap<>();

    static {
        fontMap.put(MONO,
                Font.builder()
                        .size("55px")
                        .family("roboto-mono")
                        .colour("black").build());
        fontMap.put(MONO_LIGHT,
                Font.builder()
                        .size("55px")
                        .family("roboto-mono")
                        .colour("white").build());
        fontMap.put(PRESENTATION,
                Font.builder()
                        .size("65px")
                        .family("roboto")
                        .colour("black").build());
        fontMap.put(PRESENTATION_LIGHT,
                Font.builder()
                        .size("65px")
                        .family("roboto")
                        .colour("white").build());
    }

    public Font getFontTheme(FontTheme fontTheme) {
        return fontMap.get(fontTheme);
    }

}
