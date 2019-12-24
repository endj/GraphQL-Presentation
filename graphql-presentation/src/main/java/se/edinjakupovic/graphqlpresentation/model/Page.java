package se.edinjakupovic.graphqlpresentation.model;

import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Value
@Builder
public class Page {
    List<String> bulletPoints;
    String header;
    UUID id;
}
