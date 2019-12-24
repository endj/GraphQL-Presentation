package se.edinjakupovic.graphqlpresentation.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Font {
    String family;
    String size;
    String colour;
}
