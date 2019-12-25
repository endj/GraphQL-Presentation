package se.edinjakupovic.graphqlpresentation.config;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import se.edinjakupovic.graphqlpresentation.resolvers.PresentationResolver;
import se.edinjakupovic.graphqlpresentation.service.PresentationService;

@Configuration
public class ResolverConfiguration {

    @Bean
    public GraphQLQueryResolver graphQLQueryResolver(PresentationService presentationService) {
        return new PresentationResolver(presentationService);
    }

}
