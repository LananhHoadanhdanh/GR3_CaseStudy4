package gr3.gr3_casestudy4.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    private String description;
    private String mp3file;
    private String image;
    private int status;
    private LocalDateTime createTime;

    @ManyToOne
    private User user;

    @Column(length = 10000)
    private String lyrics;

    @ManyToOne
    private Singer singer;

    public Song() {
    }

    public Song(String name, String description, String mp3file, String image, int status, LocalDateTime createTime, User user, String lyrics, Singer singer) {
        this.name = name;
        this.description = description;
        this.mp3file = mp3file;
        this.image = image;
        this.status = status;
        this.createTime = createTime;
        this.user = user;
        this.lyrics = lyrics;
        this.singer = singer;
    }

    public Song(Long id, String name, String description, String mp3file, String image, int status, LocalDateTime createTime, User user, String lyrics, Singer singer) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.mp3file = mp3file;
        this.image = image;
        this.status = status;
        this.createTime = createTime;
        this.user = user;
        this.lyrics = lyrics;
        this.singer = singer;
    }

    public Song(String name, String description, String lyrics, Singer singer, User user) {
        this.name = name;
        this.description = description;
        this.lyrics = lyrics;
        this.singer = singer;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMp3file() {
        return mp3file;
    }

    public void setMp3file(String mp3file) {
        this.mp3file = mp3file;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public Singer getSinger() {
        return singer;
    }

    public void setSinger(Singer singer) {
        this.singer = singer;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
