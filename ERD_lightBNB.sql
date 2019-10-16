CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  password TEXT
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT,
  description TEXT,
  cost_per_night INTEGER,
  parking_spaces INTEGER,
  number_of_bathrooms INTEGER,
  number_of_bedrooms INTEGER,
  small_thumbnail_photo url,
  large_cover_photo url,
  country TEXT,
  street TEXT,
  city TEXT,
  province TEXT,
  post_code VARCHAR
  status_active BOOLEAN NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY NOT NULL,
  start_date DATE,
  end_date DATE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
)

CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  message TEXT,
  rating INTEGER (rating between 0 and 6)
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  reservation_id INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
)