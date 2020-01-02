package se.edinjakupovic.graphqlpresentation.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "presentation")
@Data
public class PresentationConfig {
    private String file;
    private String title;
    private Font font;
    private Author author;
}
