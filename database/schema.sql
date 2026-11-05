CREATE DATABASE IF NOT EXISTS simplemart;
USE simplemart;

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  community_area VARCHAR(100),
  phone VARCHAR(20),
  rating FLOAT DEFAULT 0,
  profile_photo TEXT
);

CREATE TABLE IF NOT EXISTS items (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(150) NOT NULL DEFAULT '',
  user_id INT NOT NULL,
  category VARCHAR(50),
  mode VARCHAR(20),
  buy_price INT,
  hourly_price INT,
  daily_price INT,
  weekly_price INT,
  description TEXT,
  photos TEXT,
  location VARCHAR(100),
  status VARCHAR(20) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE items ADD COLUMN IF NOT EXISTS item_name VARCHAR(150) NOT NULL DEFAULT '' AFTER item_id;

CREATE TABLE IF NOT EXISTS borrow_requests (
  request_id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT,
  borrower_id INT,
  lender_id INT,
  start_date DATE,
  end_date DATE,
  duration INT,
  total_price INT,
  approved BOOLEAN DEFAULT FALSE,
  return_status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT,
  buyer_id INT,
  seller_id INT,
  amount INT,
  payment_method VARCHAR(50),
  status VARCHAR(20) DEFAULT 'paid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  payment_method VARCHAR(50),
  cardholder_name VARCHAR(100),
  provider_ref VARCHAR(100),
  amount INT,
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat (
  chat_id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT,
  receiver_id INT,
  message TEXT,
  timestamp DATETIME
);

CREATE TABLE IF NOT EXISTS ratings (
  rating_id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT,
  stars INT,
  comment TEXT,
  from_user INT,
  to_user INT
);
