package se.edinjakupovic.graphqlpresentation.service;

import lombok.SneakyThrows;
import org.springframework.util.Base64Utils;
import org.springframework.util.ResourceUtils;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ImageService {
    private static final Map<String, String> imageCache = new ConcurrentHashMap<>();

    public String loadImageAsBase64String(String fileName) {
        return imageCache.computeIfAbsent(fileName, this::encodeImage);
    }

    @SneakyThrows
    private String encodeImage(String fileName) {
        Path path = ResourceUtils.getFile("classpath:slides/images/" + fileName).toPath();
        byte[] bytes = Files.readAllBytes(path);
        return Base64Utils.encodeToString(bytes);
    }
}
