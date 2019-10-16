SELECT avg(reservations.end_date - reservations.start_date) as average_duration
FROM reservations;