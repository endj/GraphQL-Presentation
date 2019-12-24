package se.edinjakupovic.graphqlpresentation.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Colour {
    String primary;
    String secondary;
    String accent;
}
