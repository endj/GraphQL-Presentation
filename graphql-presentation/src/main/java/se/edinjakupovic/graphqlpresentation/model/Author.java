package se.edinjakupovic.graphqlpresentation.model;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class Author {
    String firstName;
    String lastName;
    int age;
    UUID id;
}
