package se.edinjakupovic.graphqlpresentation.resolvers;

import com.coxautodev.graphql.tools.GraphQLResolver;
import se.edinjakupovic.graphqlpresentation.model.Colour;
import se.edinjakupovic.graphqlpresentation.model.Font;
import se.edinjakupovic.graphqlpresentation.model.Theme;
import se.edinjakupovic.graphqlpresentation.service.theme.ColourService;
import se.edinjakupovic.graphqlpresentation.service.theme.ColourTheme;
import se.edinjakupovic.graphqlpresentation.service.theme.FontService;
import se.edinjakupovic.graphqlpresentation.service.theme.FontTheme;

public class ThemeResolver implements GraphQLResolver<Theme> {

    private final ColourService colourService;
    private final FontService fontService;

    public ThemeResolver(ColourService colourService, FontService fontService) {
        this.fontService = fontService;
        this.colourService = colourService;
    }

    public Colour colour(Theme theme, ColourTheme colourTheme) {
        return colourService.getColourTheme(colourTheme);
    }

    public Font font(Theme theme, FontTheme fontTheme) {
        if (fontTheme == null) {
            return fontService.getFontTheme(FontTheme.PRESENTATION);
        }
        return fontService.getFontTheme(fontTheme);
    }
}
