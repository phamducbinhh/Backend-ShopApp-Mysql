-- xoá data base
Drop DATABASE IF EXISTS ig_clone;

-- tạo database
CREATE DATABASE ig_clone;

-- dùng database
USE ig_clone;

-- xoá bảng
DROP TABLE IF EXISTS users;

-- tạo bảng user
CREATE TABLE users(
	id INT,
    first_name VARCHAR(255),
	last_name VARCHAR(255),
    age INT,
    birthday DATE
);
-- sửa cột
ALTER TABLE users
MODIFY COLUMN first_name VARCHAR(100),
MODIFY COLUMN last_name VARCHAR(100);

-- thêm cột
ALTER TABLE users
ADD COLUMN type VARCHAR(200) NOT NULL DEFAULT "USER";

-- ràng buộc khoá chính và tự động tăng
ALTER TABLE users
MODIFY COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

-- thêm dữ liệu vào bảng
INSERT INTO users(first_name,last_name,age,birthday,type)
VALUES ("Hào" , "Nguyễn" , 17 , "1996-11-09","ADMIN"),
("Nguyên" , "Nguyễn" , 16 , "1996-11-09","SUPER_ADMIN");

INSERT INTO users(first_name,last_name,age,birthday)
VALUES ("Kha" , "Trần" , 20 , "1996-11-09"),
("Phong" , "Trần" , 21 , "1996-11-09"),
("Huy" , "Nguyễn" , 21 , "1996-11-09"),
("Lâm" , "Cao" , 21 , "1996-11-09"),
("Tiến" , "Lưu" , 21 , "1996-11-09");
-- lấy tất cả user
SELECT * FROM users;
-- lấy tất cả user nhưng chỉ lấy id , first_name , age
SELECT id , first_name , age as tuoi  FROM users;
-- lấy ra các user có độ tuổi lớn hơn hoặc bằng 19
SELECT * FROM users
WHERE users.age >= 19;
-- lấy ra các user có type là ADMIN
SELECT * FROM users
WHERE users.type = "ADMIN";

-- cho bạn có id là số 3 lên chức ADMIN
UPDATE users SET type = "ADMIN"
WHERE users.id = 3;



-- xoá nhân viên có id là số 2.
DELETE FROM users
WHERE users.id = 2;


SELECT * FROM users;

SELECT 
	CONCAT(first_name , " " , last_name) AS username,
    SUBSTR(birthday , 1 , 4) AS yaer_of_birth,
    REPLACE(type , "ADMIN" , "Quản Trị") AS type_edit,
    REVERSE(last_name) AS last_name_reverse,
    UPPER(CONCAT(first_name , " " , last_name)) as username_upper,
	LOWER(CONCAT(first_name , " " , last_name)) as username_lower
FROM users;

-- lấy ra tất cả các họ của user
SELECT DISTINCT last_name FROM users;

-- hãy sắp xếp age theo chiều tăng dần hoặc giảm dần
SELECT * FROM users
ORDER BY age ASC; -- tăng dần
SELECT * FROM users
ORDER BY age DESC; -- giảm dần

-- lấy ra 2 users 
SELECT * FROM users
LIMIT 2;

-- lấy ra các last_name gần giống chữ "Trần"
SELECT * FROM users
WHERE last_name LIKE "%ần%";

-- lập nhóm với last_name
SELECT * FROM users
GROUP BY last_name;





