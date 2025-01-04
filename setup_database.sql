-- Script to set up the database for the Travel Buddy app
-- Ensure the MySQL server is running and you have appropriate permissions

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS travel_buddy;
USE travel_buddy;

-- Step 2: Create the `accommodations` table
CREATE TABLE IF NOT EXISTS accommodations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    check_in_date DATE NOT NULL,
    check_in_time TIME,
    check_out_date DATE NOT NULL,
    check_out_time TIME,
    stayed BOOLEAN DEFAULT false

);

-- Step 3: Create the `places` table
CREATE TABLE IF NOT EXISTS places (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    description TEXT,
    visited BOOLEAN DEFAULT false
);

-- Step 4: Create the `food` table
CREATE TABLE IF NOT EXISTS food (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant VARCHAR(255),
    address VARCHAR(255) NOT NULL,
    description TEXT,
    ate BOOLEAN DEFAULT false
);

-- Step 5: Insert sample data (optional, for testing)
INSERT INTO accommodations (hotel, address, check_in_date, check_in_time, check_out_date, check_out_time)
VALUES ('Sample Hotel', '123 Sample Street', '2025-01-01', '14:00:00', '2025-01-03', '11:00:00');

INSERT INTO places (name, address, description, visited)
VALUES ('Sample Place', '456 Example Ave', 'A great place to visit', false);

INSERT INTO food (restaurant, address, description, ate)
VALUES ('Sample Restaurant', '789 Food Court', 'Best local cuisine', false);
