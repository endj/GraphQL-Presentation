package se.edinjakupovic.graphqlpresentation.model;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDate;

@Value
@Builder
public class Meta {
    int numberOfSlides;
    LocalDate createdAt;
}
