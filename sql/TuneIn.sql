DROP DATABASE IF EXISTS tunein;
CREATE DATABASE tunein;
USE tunein;

CREATE TABLE `users`(
    `id` INT AUTO_INCREMENT NOT NULL,
    `username` VARCHAR(255) UNIQUE NULL,
    `password` VARCHAR(255) NULL,
    `email` VARCHAR(255) UNIQUE NULL,
    `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `upload_at` DATETIME NULL,
    `is_admin` TINYINT(1) NULL DEFAULT 0,
    `prefernces` JSON NULL,
    `remember_token` TINYINT(1) NULL,
    PRIMARY KEY(id)
);

CREATE TABLE `artists`(
    `id` INT KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NULL,
    `cover_image` TEXT NULL,
    `upload_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `albums`(
    `id` INT KEY AUTO_INCREMENT NOT NULL,
    `artist_id` INT NULL,
    `name` VARCHAR(255) NULL,
    `cover_image` TEXT NULL,
    `created_at` DATE NULL,
    `upload_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(artist_id) REFERENCES artists(id)
);

CREATE TABLE `songs`(
    `id` INT KEY AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(255) NULL,
    `artist_id` INT NULL,
    `album_id` INT NULL,
    `track_number` INT NULL,
    `lyrics` TEXT NULL,
    `length` TIME NULL,
    `created_at` DATE NULL,
    `upload_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `youtube_link` VARCHAR(255) NULL,
    FOREIGN KEY(artist_id) REFERENCES artists(id),
    FOREIGN KEY(album_id) REFERENCES albums(id)
);

CREATE TABLE `playlists`(
    `id` INT KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NULL,
    `cover_image` TEXT NULL,
    `created_at` DATETIME NULL,
    `upload_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP
);
;
CREATE TABLE `songs_in_playlist`(
    `id` INT KEY AUTO_INCREMENT NOT NULL,
    `song_id` INT NULL,
    `playlist_id` INT NULL,
    FOREIGN KEY(song_id) REFERENCES songs(id),
    FOREIGN KEY(playlist_id) REFERENCES playlists(id)
);

CREATE TABLE `users_playlist`(
    `id` INT KEY AUTO_INCREMENT NOT NULL,
    `user_id` INT NULL,
    `playlist_id` INT NULL,
	FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(playlist_id) REFERENCES playlists(id)
);

CREATE TABLE `user_song_interaction`(
    `id` INT KEY AUTO_INCREMENT NOT NULL,
    `user_id` INT NULL,
    `song_id` INT NULL,
    `is_liked` TINYINT(1) NULL,
    `play_count` INT NULL,
    `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `playlist_id` INT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(playlist_id) REFERENCES playlists(id),
    FOREIGN KEY(song_id) REFERENCES songs(id)
);