CREATE DATABASE catalogo_712;

USE catalogo_712;

CREATE TABLE products (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
quantity INT,
price DECIMAL(10,2)
);

select * from products;