---------------------------------user table------------------------------------

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT,
    role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
    gender CHAR(1) CHECK (gender IN ('M', 'F')) DEFAULT NULL,
    age INT CHECK (age >= 0) DEFAULT NULL,
    allergies TEXT[] DEFAULT '{}', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from users;
select * from users where email='john@tothenew.com';

---------------------------------------doctor table-----------------------------------
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    YOE INT CHECK (YOE >= 0) NOT NULL, -- Years of Experience 
    picture_url TEXT NOT NULL,
    speciality VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    NOR INT DEFAULT 10, -- Number of Reviews
    rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL 
);
ALTER TABLE doctors 
ADD COLUMN gender VARCHAR(10) CHECK (gender IN ('Male', 'Female'));

INSERT INTO doctors (name, title, YOE, picture_url, speciality, address, NOR, rating, gender) VALUES
('Dr. John Smith', 'Cardiologist', 15, 'https://randomuser.me/api/portraits/men/1.jpg', 'Cardiology', '123 Heart St, NY', 10, 5, 'Male'),
('Dr. Emily Johnson', 'Neurologist', 10, 'https://randomuser.me/api/portraits/women/1.jpg', 'Neurology', '456 Brain Ave, LA', 10, 4, 'Female'),
('Dr. Michael Brown', 'Dermatologist', 8, 'https://randomuser.me/api/portraits/men/2.jpg', 'Dermatology', '789 Skin Rd, TX', 10, 5, 'Male'),
('Dr. Sarah Wilson', 'Pediatrician', 12, 'https://randomuser.me/api/portraits/women/2.jpg', 'Pediatrics', '321 Child St, FL', 10, 4, 'Female'),
('Dr. Daniel Martinez', 'Orthopedic Surgeon', 20, 'https://randomuser.me/api/portraits/men/3.jpg', 'Orthopedics', '654 Bone St, IL', 10, 5, 'Male'),
('Dr. Olivia Taylor', 'Ophthalmologist', 7, 'https://randomuser.me/api/portraits/women/3.jpg', 'Ophthalmology', '987 Eye St, WA', 10, 3, 'Female'),
('Dr. David Anderson', 'General Surgeon', 14, 'https://randomuser.me/api/portraits/men/4.jpg', 'Surgery', '741 Scalpel St, NV', 10, 4, 'Male'),
('Dr. Sophia Thomas', 'Endocrinologist', 9, 'https://randomuser.me/api/portraits/women/4.jpg', 'Endocrinology', '852 Hormone St, CO', 10, 5, 'Female'),
('Dr. James Garcia', 'Psychiatrist', 11, 'https://randomuser.me/api/portraits/men/5.jpg', 'Psychiatry', '963 Mind St, AZ', 10, 4, 'Male'),
('Dr. Isabella Martinez', 'Dentist', 6, 'https://randomuser.me/api/portraits/women/5.jpg', 'Dentistry', '159 Tooth St, GA', 10, 3, 'Female'),
('Dr. William White', 'Oncologist', 18, 'https://randomuser.me/api/portraits/men/6.jpg', 'Oncology', '753 Cancer St, MI', 10, 5, 'Male'),
('Dr. Charlotte Harris', 'Nephrologist', 13, 'https://randomuser.me/api/portraits/women/6.jpg', 'Nephrology', '357 Kidney St, PA', 10, 4, 'Female'),
('Dr. Benjamin Clark', 'Pulmonologist', 10, 'https://randomuser.me/api/portraits/men/7.jpg', 'Pulmonology', '258 Lung St, OH', 10, 3, 'Male'),
('Dr. Ava Lewis', 'Gynecologist', 12, 'https://randomuser.me/api/portraits/women/7.jpg', 'Gynecology', '147 Women St, OR', 10, 4, 'Female'),
('Dr. Henry Hall', 'Urologist', 16, 'https://randomuser.me/api/portraits/men/8.jpg', 'Urology', '369 Bladder St, WI', 10, 5, 'Male'),
('Dr. Mia Allen', 'Hematologist', 8, 'https://randomuser.me/api/portraits/women/8.jpg', 'Hematology', '753 Blood St, MN', 10, 3, 'Female'),
('Dr. Jacob Young', 'Gastroenterologist', 14, 'https://randomuser.me/api/portraits/men/9.jpg', 'Gastroenterology', '852 Stomach St, SC', 10, 4, 'Male'),
('Dr. Amelia King', 'Neurologist', 10, 'https://randomuser.me/api/portraits/women/9.jpg', 'Neurology', '963 Brain St, VA', 10, 5, 'Female'),
('Dr. Ethan Wright', 'Dermatologist', 9, 'https://randomuser.me/api/portraits/men/10.jpg', 'Dermatology', '654 Skin St, MO', 10, 3, 'Male'),
('Dr. Harper Scott', 'Pediatrician', 7, 'https://randomuser.me/api/portraits/women/10.jpg', 'Pediatrics', '951 Child St, TN', 10, 4, 'Female'),
('Dr. Logan Green', 'Cardiologist', 15, 'https://randomuser.me/api/portraits/men/11.jpg', 'Cardiology', '357 Heart St, MA', 10, 5, 'Male'),
('Dr. Lily Baker', 'Ophthalmologist', 11, 'https://randomuser.me/api/portraits/women/11.jpg', 'Ophthalmology', '753 Eye St, IN', 10, 3, 'Female'),
('Dr. Jackson Adams', 'Psychiatrist', 10, 'https://randomuser.me/api/portraits/men/12.jpg', 'Psychiatry', '852 Mind St, KY', 10, 4, 'Male'),
('Dr. Abigail Gonzalez', 'General Surgeon', 17, 'https://randomuser.me/api/portraits/women/12.jpg', 'Surgery', '159 Scalpel St, OK', 10, 5, 'Female'),
('Dr. Carter Nelson', 'Endocrinologist', 13, 'https://randomuser.me/api/portraits/men/13.jpg', 'Endocrinology', '369 Hormone St, UT', 10, 3, 'Male'),
('Dr. Grace Carter', 'Oncologist', 12, 'https://randomuser.me/api/portraits/women/13.jpg', 'Oncology', '951 Cancer St, MS', 10, 4, 'Female'),
('Dr. Lucas Rivera', 'Urologist', 8, 'https://randomuser.me/api/portraits/men/14.jpg', 'Urology', '753 Bladder St, IA', 10, 5, 'Male'),
('Dr. Scarlett Foster', 'Gynecologist', 10, 'https://randomuser.me/api/portraits/women/14.jpg', 'Gynecology', '258 Women St, KS', 10, 3, 'Female'),
('Dr. Nathan Perez', 'Pulmonologist', 14, 'https://randomuser.me/api/portraits/men/15.jpg', 'Pulmonology', '369 Lung St, AL', 10, 4, 'Male'),
('Dr. Victoria Ross', 'Gastroenterologist', 9, 'https://randomuser.me/api/portraits/women/15.jpg', 'Gastroenterology', '753 Stomach St, NE', 10, 5, 'Female');

SELECT * FROM doctors;

select * FROM doctors 
WHERE name ILIKE '%Sophia%';



------------------------------disease table ---------------------------------
CREATE TABLE disease (
    id SERIAL PRIMARY KEY,
    disease_name VARCHAR(255) NOT NULL,
    speciality VARCHAR(255) NOT NULL -- The medical speciality /exepertise
);
INSERT INTO disease (disease_name, speciality) VALUES
('Hypertension', 'Cardiology'),
('Alzheimer’s', 'Neurology'),
('Diabetes', 'Endocrinology'),
('Osteoporosis', 'Orthopedics'),
('Eczema', 'Dermatology'),
('Asthma', 'Pulmonology'),
('Gastritis', 'Gastroenterology'),
('Glaucoma', 'Ophthalmology'),
('Leukemia', 'Hematology'),
('Arthritis', 'Rheumatology'),
('Migraine', 'Neurology'),
('Bronchitis', 'Pulmonology'),
('Kidney Stones', 'Nephrology'),
('Depression', 'Psychiatry'),
('Multiple Sclerosis', 'Neurology');

SELECT * FROM disease;


----------------------------appointments table --------------------------
CREATE TYPE location_enum AS ENUM ('offline', 'online');
CREATE TYPE status_enum AS ENUM ('approved', 'declined', '');

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    slot TIMESTAMP NOT NULL,
    doctor_id INT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    location_type location_enum DEFAULT 'online',
    status status_enum DEFAULT ''
);
SELECT * FROM appointments;
SELECT * FROM appointments WHERE doctor_id = 5 AND DATE(slot) = '2025-04-01' AND status = 'approved';




------------------------------------------doctor and disease table joined-----------------------
CREATE VIEW doctor_disease_view AS
SELECT 
    d.id AS doctor_id
    d.name AS doctor_name,
    d.title,
    d.picture_url AS picture,
    d.speciality AS expertise,
    d.YOE AS experience,
    d.rating AS rating,
    d.gender,
	d.address AS address,
    di.disease_name
FROM doctors d
LEFT JOIN disease di ON d.speciality = di.speciality ;

select * from doctor_disease_view; 

SELECT * from doctor_disease_view order by rating desc;

---------------------------------reviews table ---------------------------

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    doctor_id INT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    review TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from reviews;

---------------------------------practice queries---------------------------
SELECT COUNT(*) FROM doctors WHERE 1 = 1;

SELECT * FROM doctors JOIN disease ON doctors.speciality = disease.speciality LIMIT 20;

CREATE VIEW doctor_view AS
SELECT 
    d.id AS doctor_id,
    d.name AS doctor_name,
    d.title,
    d.picture_url AS picture,
    d.speciality AS expertise,
    d.YOE AS experience,
    d.rating,
    d.gender,
    d.address,
    STRING_AGG(di.disease_name, ', ') AS diseases_name
FROM doctors d
LEFT JOIN disease di ON d.speciality = di.speciality
GROUP BY d.id, d.name, d.title, d.picture_url, d.speciality, d.YOE, d.rating, d.gender, d.address;

drop view doctor_view;

CREATE VIEW d_view AS
SELECT 
    d.id AS doctor_id DISTINCT,
    d.name AS doctor_name,
    d.title,
    d.picture_url AS picture,
    d.speciality AS expertise,
    d.YOE AS experience,
    d.rating AS rating,
    d.gender,
	d.address AS address,
    di.disease_name
FROM doctors d
LEFT JOIN disease di ON d.speciality = di.speciality ;


CREATE VIEW appointments_view AS
SELECT 
    a.id AS id,
	d.id AS doctor_id,
    d.name AS doctor_name,
    u.name AS user_name,
    a.location_type,
    a.slot,
    a.status
FROM appointments a
JOIN doctors d ON a.doctor_id = d.id
JOIN users u ON a.user_id = u.id;

drop view appointments_view;


SELECT * FROM appointments_view WHERE status=''