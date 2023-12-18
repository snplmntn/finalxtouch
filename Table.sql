CREATE DATABASE People;
CREATE TABLE tblpeople (
FIRSTNAME VARCHAR(100),
USERNAME VARCHAR(100) ,
EMAIL VARCHAR(100) ,
PW VARCHAR(100),
ORDERNAME  VARCHAR(100),
QUANTITY INT,
ADDRESS VARCHAR(100)
);

INSERT INTO tblpeople ( FIRSTNAME, USERNAME, EMAIL, PW, ORDERNAME, QUANTITY, ADDRESS)
VALUES 

('Schlyntz' , 'Tempest' , 'schlyntzdeguzman@gmail.com' , 'buratlover690317' , 'Crinkles' , '3' ,  'tagaLundun bai na bai' ),
('Sean' , 'SnPlMntn' , 'seanpogi123@gmail.com' , 'girlfriendnisean' , 'Carrot Cupcakes' , '1' ,  'etivac' ),
('Dian' , 'Psychoscient' , 'adrianjosephsalim@gmail.com' , 'PsychoscientSakalam' , 'Tofu Dumplings' , '5' ,  'dyan sa tabi' ),
('Alsem' , 'Nheileta' , 'alsemburatmalaki@gmail.com' , 'ItsMeNheil' , 'Blueberry Muffins' , '3' ,  'Burkina Faso, Batangas' ),
('Geena' , 'Catzuki' , 'Geenamaenuesca@gmail.com' , 'IloveCats<333' , 'Kangkong Chips ni Josh Mojica' , '3' ,  'Seoultan Kudarat' );


SELECT * FROM tblpeople;
