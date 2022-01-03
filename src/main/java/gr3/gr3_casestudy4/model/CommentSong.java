package gr3.gr3_casestudy4.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table
@Entity
public class CommentSong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime time;

    @ManyToOne
    private User user;
    @ManyToOne
    private Song song;

    public CommentSong() {
    }


    public CommentSong(Long id, String content, LocalDateTime time, User user, Song song) {
        this.id = id;
        this.content = content;
        this.time = time;
        this.user = user;
        this.song = song;
    }

    public CommentSong(String content, LocalDateTime time, User user, Song song) {
        this.content = content;
        this.time = time;
        this.user = user;
        this.song = song;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }
}
