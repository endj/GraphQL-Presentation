package se.edinjakupovic.graphqlpresentation.model;

import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Value
@Builder
public class Presentation {
    UUID id;
    String title;
    Author author;
    Theme theme;
    List<Page> pages;
    Meta meta;
}


