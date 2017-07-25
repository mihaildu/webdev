-- sql script to create db used by test2/notes.php
-- to run this: mysql -u root -p < notes.sql
DROP DATABASE IF EXISTS notes;
CREATE DATABASE notes;
USE notes;

-- InnoDB is used by default
CREATE TABLE Users (
       id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
       username VARCHAR(128) NOT NULL,
       email VARCHAR(255),
       -- TODO how to force a fixed (e.g. 41) hash value here
       -- similar to mysql.user
       -- 64 should allow for different hashing algos (e.g. sha256)
       password CHAR(64) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE Notes (
       id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
       uid INT NOT NULL,
       title VARCHAR(255) NOT NULL,
       text TEXT NOT NULL,

       -- INDEX allows for faster searches after uid
       INDEX (uid),

       -- if user with uid gets deleted, delete all the notes
       -- if an admin changes the id for some user, update uid as well
       -- since id in Users is auto_increment, on update will be rarely useful
       -- this will also forbid insertion with non-existent user ids
       CONSTRAINT FOREIGN KEY (uid) REFERENCES Users (id)
		  ON DELETE CASCADE
		  ON UPDATE CASCADE
);

-- use a new user for this
-- this will create the user if it doesn't exist
GRANT ALL PRIVILEGES ON notes.* TO 'notes_user'@'localhost'
     IDENTIFIED BY 'notes_password';

-- you might also want to delete the previous if you already
-- have one with the same name; if so, uncomment the following

-- DROP PROCEDURE IF EXISTS notes.drop_user_if_exists;

-- DELIMITER $$
-- CREATE PROCEDURE notes.drop_user_if_exists()
-- BEGIN
-- 	DECLARE foo BIGINT DEFAULT 0;
-- 	SELECT COUNT(*) INTO foo FROM mysql.user
-- 	       WHERE User = 'notes_user' and Host = 'localhost';
-- 	IF foo > 0 THEN
-- 	   DROP USER 'notes_user'@'localhost';
-- 	END IF;
-- END ;$$
-- DELIMITER ;

-- CALL notes.drop_user_if_exists();
