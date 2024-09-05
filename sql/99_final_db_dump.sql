USE home_db;

SET PERSIST local_infile = 1;

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `homes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `street_address` VARCHAR(255) NOT NULL UNIQUE,
  `state` VARCHAR(50) DEFAULT NULL,
  `zip` VARCHAR(10) DEFAULT NULL,
  `sqft` FLOAT DEFAULT NULL,
  `beds` INT DEFAULT NULL,
  `baths` INT DEFAULT NULL,
  `list_price` FLOAT DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `userhomes` (
  `user_id` INT NOT NULL,
  `home_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`home_id`) REFERENCES `homes`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`user_id`, `home_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `users` (`username`, `email`)
SELECT DISTINCT `username`, `email`
FROM `user_home`;

INSERT INTO `homes` (`street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)
SELECT DISTINCT `street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`
FROM `user_home`;

INSERT INTO `userhomes` (`user_id`, `home_id`)
SELECT u.id, h.id
FROM `user_home` uh
JOIN `users` u ON uh.username = u.username
JOIN `homes` h ON uh.street_address = h.street_address;

DROP TABLE IF EXISTS `user_home`;