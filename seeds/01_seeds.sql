-- Users table
INSERT INTO users VALUES (1, 'john', 'john@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users VALUES (2, 'james', 'james@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users VALUES (3, 'sally', 'sally@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

-- Properties table
INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 1, 'Speed Lamp', 'description','https://www.google.com/search?q=coding&sxsrf=ACYBGNQIZQCOHtl6u2Tl_SrmL0Qfs7Terg:1571253576310&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiJg5Lav6HlAhXlkOAKHdXPCZkQ_AUIEigB&biw=1280&bih=721#imgrc=_ISOT8sBxoR-TM:','https://www.google.com/search?q=coding&sxsrf=ACYBGNQIZQCOHtl6u2Tl_SrmL0Qfs7Terg:1571253576310&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiJg5Lav6HlAhXlkOAKHdXPCZkQ_AUIEigB&biw=1280&bih=721#imgrc=DvVSCRL0zuWB7M:', 930, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142', 'true'),
(2, 1, 'Habit Mix', 'description','https://www.google.com/search?q=coding&sxsrf=ACYBGNQIZQCOHtl6u2Tl_SrmL0Qfs7Terg:1571253576310&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiJg5Lav6HlAhXlkOAKHdXPCZkQ_AUIEigB&biw=1280&bih=721#imgrc=_ISOT8sBxoR-TM:','https://www.google.com/search?q=coding&sxsrf=ACYBGNQIZQCOHtl6u2Tl_SrmL0Qfs7Terg:1571253576310&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiJg5Lav6HlAhXlkOAKHdXPCZkQ_AUIEigB&biw=1280&bih=721#imgrc=DvVSCRL0zuWB7M:', 85234, 6, 6, 7, 'Canada', '651 Nami Road', 'Bohbatev', 'Alberta', '83680', 'true');

-- Reservations table
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 2),
('2019-01-04', '2019-02-01', 2, 1),
('2021-10-01', '2021-10-14', 1, 3);

-- Property_reviews table
INSERT INTO property_reviews (rating, message)
VALUES (3, 'message'),
(4, 'message'),
(4, 'message')
