package se.edinjakupovic.graphqlpresentation.config;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.coxautodev.graphql.tools.GraphQLResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import se.edinjakupovic.graphqlpresentation.model.Theme;
import se.edinjakupovic.graphqlpresentation.resolvers.QueryResolver;
import se.edinjakupovic.graphqlpresentation.resolvers.ThemeResolver;
import se.edinjakupovic.graphqlpresentation.service.theme.ColourService;
import se.edinjakupovic.graphqlpresentation.service.theme.FontService;
import se.edinjakupovic.graphqlpresentation.service.PresentationService;

@Configuration
public class ResolverConfiguration {

    @Bean
    public GraphQLQueryResolver graphQLQueryResolver(PresentationService presentationService) {
        return new QueryResolver(presentationService);
    }

    @Bean
    public GraphQLResolver<Theme> colourGraphQLResolver(ColourService colourService, FontService fontService) {
        return new ThemeResolver(colourService, fontService);
    }

}
