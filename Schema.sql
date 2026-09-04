REATE DATABASE IF NOT EXISTS Biblioteca_Antoo;
USE Biblioteca_Antoo;


CREATE TABLE IF NOT EXISTS libros (
  id_libros INT AUTO_INCREMENT PRIMARY KEY, 
  titulo VARCHAR(150) NOT NULL,              
  autor VARCHAR(100) NOT NULL,               
  disponible BOOLEAN DEFAULT TRUE,           
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

RUE);INSERT INTO libros (titulo, autor, genero, disponible) VALUES
('Cien años de soledad', 'Gabriel García Márquez', 'Novela', TRUE),
('1984', 'George Orwell', 'Ciencia ficción', TRUE),
('El Principito', 'Antoine de Saint-Exupéry', 'Fábula', FALSE),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 'Novela clásica', TRUE)
