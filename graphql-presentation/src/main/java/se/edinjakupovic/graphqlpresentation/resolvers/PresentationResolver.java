package se.edinjakupovic.graphqlpresentation.resolvers;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import se.edinjakupovic.graphqlpresentation.model.Presentation;
import se.edinjakupovic.graphqlpresentation.service.PresentationService;

import java.util.Collection;
import java.util.UUID;

public class PresentationResolver implements GraphQLQueryResolver {

    private final PresentationService presentationService;

    public PresentationResolver(PresentationService presentationService) {
        this.presentationService = presentationService;
    }

    public Collection<Presentation> presentations() {
        return presentationService.getAllPresentations();
    }

    public Presentation presentation(UUID id) {
        return presentationService.getPresentation(id);
    }
}
