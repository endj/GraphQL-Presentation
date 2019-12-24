package se.edinjakupovic.graphqlpresentation.service;

import lombok.extern.slf4j.Slf4j;
import se.edinjakupovic.graphqlpresentation.model.Page;
import se.edinjakupovic.graphqlpresentation.model.Presentation;

import java.util.Collection;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public class PresentationService {
    private final Map<UUID, Presentation> presentationMap = new ConcurrentHashMap<>();
    private final Map<UUID, Page> pageMap = new ConcurrentHashMap<>();

    public Presentation savePresentation(Presentation presentation) {
        presentationMap.put(presentation.getId(), presentation);
        presentation.getPages().forEach(page -> {
            pageMap.put(page.getId(), page);
        });
        return presentation;
    }

    public Collection<Presentation> getAllPresentations() {
        return presentationMap.values();
    }

    public Presentation getPresentation(UUID id) {
        return presentationMap.get(id);
    }

    public Page getPageById(UUID id) {
        return pageMap.get(id);
    }
}