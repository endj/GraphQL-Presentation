package se.edinjakupovic.graphqlpresentation.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Theme {
    Colour colour;
    Font font;
}
