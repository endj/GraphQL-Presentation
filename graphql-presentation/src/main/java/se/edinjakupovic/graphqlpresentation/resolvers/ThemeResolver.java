package se.edinjakupovic.graphqlpresentation.resolvers;

import com.coxautodev.graphql.tools.GraphQLResolver;
import se.edinjakupovic.graphqlpresentation.model.Colour;
import se.edinjakupovic.graphqlpresentation.model.Font;
import se.edinjakupovic.graphqlpresentation.model.Theme;
import se.edinjakupovic.graphqlpresentation.service.theme.ColourService;
import se.edinjakupovic.graphqlpresentation.service.theme.ColourTheme;
import se.edinjakupovic.graphqlpresentation.service.theme.FontService;
import se.edinjakupovic.graphqlpresentation.service.theme.FontTheme;

import java.util.Objects;

public class ThemeResolver implements GraphQLResolver<Theme> {

    private final ColourService colourService;
    private final FontService fontService;

    public ThemeResolver(ColourService colourService, FontService fontService) {
        this.fontService = fontService;
        this.colourService = colourService;
    }

    public Colour colour(Theme theme, ColourTheme colourTheme) {

        if (colourTheme == null) {
            return Objects.requireNonNullElse(theme.getColour(), colourService.getColourTheme(ColourTheme.LIGHT));
        }
        return colourService.getColourTheme(colourTheme);
    }

    public Font font(Theme theme, FontTheme fontTheme) {
        return fontService.getFontTheme(Objects.requireNonNullElse(fontTheme, FontTheme.PRESENTATION));
    }
}
