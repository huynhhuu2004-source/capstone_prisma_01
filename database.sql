--Tạo database 
CREATE DATABASE IF NOT EXISTS capstone_orm;

USE capstone_orm;

--Bảng người dùng 
CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- Khóa chính 
  `email` VARCHAR(50) UNIQUE,
  `mat_khau` VARCHAR(255),
  `ho_ten` VARCHAR(100),
  `tuoi`int ,
  `anh_dai_dien` VARCHAR(255),
  
  --template mẫu 
  	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

--Bảng hình ảnh  
CREATE TABLE `hinh_anh` (
  `hinh_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- Khóa chính 
  `ten_hinh` VARCHAR(255),
  `duong_dan` VARCHAR(255),
  `mo_ta` VARCHAR(100),
  `nguoi_dung_id` INT,
  
  -- Khai báo khóa ngoại  
    FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`nguoi_dung_id`), 
  
  --template mẫu 
  	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

--Bảng bình luận 
CREATE TABLE binh_luan (
    `binh_luan_id` INT AUTO_INCREMENT PRIMARY KEY, -- khóa chính 
    `nguoi_dung_id` INT,                            
    `hinh_id` INT,                                  
    `ngay_binh_luan` DATE,                          
    `noi_dung` VARCHAR(255),                        
    
    -- Khai báo khóa ngoại  
    FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`nguoi_dung_id`), 
   
    FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh`(`hinh_id`), 

     --template mẫu 
  	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--Bảng lưu ảnh 
CREATE TABLE luu_anh (
    `nguoi_dung_id` INT,                            
    `hinh_id` INT,                                  
    `ngay_luu` DATE,                                                  
    PRIMARY KEY (`nguoi_dung_id`,`hinh_id`),
    
    -- Khai báo khóa ngoại  
    FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`nguoi_dung_id`), 
   
    FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh`(`hinh_id`), 
    
     --template mẫu 
  	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =========================================
-- DU LIEU AO: nguoi_dung
-- =========================================
INSERT INTO nguoi_dung
(email, mat_khau, ho_ten, tuoi, anh_dai_dien)
VALUES
('user01@gmail.com', '123456', 'Nguyen Van An', 20, 'avatar01.jpg'),
('user02@gmail.com', '123456', 'Tran Thi Binh', 21, 'avatar02.jpg'),
('user03@gmail.com', '123456', 'Le Van Cuong', 22, 'avatar03.jpg'),
('user04@gmail.com', '123456', 'Pham Thi Dung', 20, 'avatar04.jpg'),
('user05@gmail.com', '123456', 'Hoang Van Em', 23, 'avatar05.jpg'),
('user06@gmail.com', '123456', 'Vo Thi Phuong', 21, 'avatar06.jpg'),
('user07@gmail.com', '123456', 'Dang Van Giang', 24, 'avatar07.jpg'),
('user08@gmail.com', '123456', 'Bui Thi Hoa', 22, 'avatar08.jpg'),
('user09@gmail.com', '123456', 'Do Van Khang', 25, 'avatar09.jpg'),
('user10@gmail.com', '123456', 'Ngo Thi Lan', 20, 'avatar10.jpg');


-- =========================================
-- DU LIEU AO: hinh_anh
-- =========================================
INSERT INTO hinh_anh
(ten_hinh, duong_dan, mo_ta, nguoi_dung_id)
VALUES
('Anh phong canh 01', '/images/photo01.jpg', 'Anh phong canh dep', 1),
('Anh phong canh 02', '/images/photo02.jpg', 'Anh phong canh bien', 2),
('Anh gia dinh 01', '/images/photo03.jpg', 'Anh gia dinh', 3),
('Anh du lich 01', '/images/photo04.jpg', 'Anh du lich Da Lat', 4),
('Anh chan dung 01', '/images/photo05.jpg', 'Anh chan dung', 5),
('Anh thien nhien 01', '/images/photo06.jpg', 'Anh thien nhien', 6),
('Anh du lich 02', '/images/photo07.jpg', 'Anh du lich Da Nang', 7),
('Anh gia dinh 02', '/images/photo08.jpg', 'Anh gia dinh hanh phuc', 8),
('Anh chan dung 02', '/images/photo09.jpg', 'Anh chan dung ngoai troi', 9),
('Anh phong canh 03', '/images/photo10.jpg', 'Anh hoang hon', 10);


-- =========================================
-- DU LIEU AO: binh_luan
-- =========================================
INSERT INTO binh_luan
(nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung)
VALUES
(1, 1, '2026-09-01', 'Anh rat dep'),
(2, 2, '2026-09-02', 'Mau anh rat dep'),
(3, 3, '2026-09-03', 'Anh gia dinh rat y nghia'),
(4, 4, '2026-09-04', 'Canh dep qua'),
(5, 5, '2026-09-05', 'Anh chan dung rat dep'),
(6, 6, '2026-09-06', 'Phong canh rat an tuong'),
(7, 7, '2026-09-07', 'Anh dep va ro net'),
(8, 8, '2026-09-08', 'Rat thich buc anh nay'),
(9, 9, '2026-09-09', 'Goc chup rat dep'),
(10, 10, '2026-09-10', 'Anh hoang hon tuyet voi');


-- =========================================
-- DU LIEU AO: luu_anh
-- =========================================
INSERT INTO luu_anh
(nguoi_dung_id, hinh_id, ngay_luu)
VALUES
(1, 1, '2026-09-01'),
(2, 2, '2026-09-02'),
(3, 3, '2026-09-03'),
(4, 4, '2026-09-04'),
(5, 5, '2026-09-05'),
(6, 6, '2026-09-06'),
(7, 7, '2026-09-07'),
(8, 8, '2026-09-08'),
(9, 9, '2026-09-09'),
(10, 10, '2026-09-10');