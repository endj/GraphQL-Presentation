package se.edinjakupovic.graphqlpresentation.service;

import lombok.SneakyThrows;
import org.springframework.util.Base64Utils;
import org.springframework.util.ResourceUtils;

import java.nio.file.Files;

public class ImageService {
    @SneakyThrows
    public String loadImageAsBase64String(String fileName) {
        byte[] bytes = Files.readAllBytes(ResourceUtils.getFile("classpath:slides/images/" + fileName).toPath());
        return Base64Utils.encodeToString(bytes);
    }
}
