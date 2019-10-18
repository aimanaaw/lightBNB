const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const values = [`%${email.toLowerCase()}%`];
  return pool.query(`SELECT * FROM users WHERE email LIKE $1`, values)
  .then(res => {
    return res.rows[0];
  })
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `SELECT * FROM users WHERE id = $1`;
  const values = [`${id}`];
  return pool.query(queryString, values)
  .then(res => {
    return res.rows[0];
  })
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [user.name, user.email, user.password])
  .then(res => res.rows[0]);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `SELECT properties.id, properties.title, properties.cost_per_night, reservations.start_date, avg(property_reviews.rating)
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1 AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`
  const values = [guest_id, limit]
  return pool.query(queryString, values)
  .then(res => {
    return getAllProperties(null, 2);
  });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  
  if(options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `JOIN users ON property_reviews.guest_id = users.id WHERE guest_id = $${queryParams.length} `;
  }
  
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
    if(options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night*100}`);
      queryString += `AND cost_per_night > $${queryParams.length} `;
    }
    if(options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night*100}`);
      queryString += ` AND cost_per_night < $${queryParams.length} `;
    }
    
    if(options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `GROUP BY properties.id
      HAVING avg(property_reviews.rating) > $${queryParams.length}
      ORDER BY cost_per_night`
      queryParams.push(limit);
      queryString += `
      LIMIT $${queryParams.length};
      `} else {
        queryParams.push(limit);
        queryString += `
        GROUP BY properties.id
        ORDER BY cost_per_night
        LIMIT $${queryParams.length};
        `;
      }
    console.log(queryString, queryParams);
    
  return pool.query(queryString, queryParams)
  // return pool.query(`SELECT * FROM properties LIMIT $1`, [limit])
  .then(res => {
    return res.rows;
  });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  console.log(property)
  const queryString = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES (${property.owner_id}, '${property.title}', '${property.description}', '${property.thumbnail_photo_url}', '${property.cover_photo_url}', '${property.cost_per_night}', ${property.parking_spaces}, ${property.number_of_bathrooms}, ${property.number_of_bedrooms}, '${property.country}', '${property.street}', '${property.city}', '${property.province}', '${property.post_code}') RETURNING *;`;

  return pool.query(queryString, null)
  .then(res => {
    return res.rows;
  });

  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
}
exports.addProperty = addProperty;
