CREATE DATABASE todo_app;
USE todo_app;

CREATE TABLE todo (
  id integer PRIMARY KEY AUTO_INCREMENT,
  newItem VARCHAR(255) NOT NULL
);
