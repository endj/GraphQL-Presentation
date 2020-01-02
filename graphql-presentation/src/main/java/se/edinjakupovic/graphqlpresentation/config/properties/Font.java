package se.edinjakupovic.graphqlpresentation.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "presentation.font")
@Data
public class Font {
    private String size;
    private String family;
    private String colour;
}
