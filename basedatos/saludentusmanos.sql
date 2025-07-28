-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-07-2025 a las 03:08:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `saludentusmanos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividadesfisicas`
--

CREATE TABLE `actividadesfisicas` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `tipoactividad` varchar(100) NOT NULL,
  `duracionminutos` int(11) NOT NULL,
  `intensidad` enum('baja','media','alta','') NOT NULL,
  `caloriasquemadas` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actividadesfisicas`
--

INSERT INTO `actividadesfisicas` (`id`, `idUsuario`, `tipoactividad`, `duracionminutos`, `intensidad`, `caloriasquemadas`, `fecha_registro`) VALUES
(1, 1, 'Calentamiento', 3, 'media', 3, '2025-06-02 21:39:22'),
(2, 2, 'Correr', 30, 'alta', 300, '2025-06-02 22:02:03'),
(3, 3, 'Natación', 45, 'media', 450, '2025-06-02 22:02:03'),
(4, 4, 'Trote', 45, 'media', 250, '2025-06-02 22:02:03'),
(5, 5, 'correr', 7, 'alta', 60, '2025-06-03 01:08:59'),
(6, 6, 'Caminata', 45, 'media', 200, '2025-06-17 13:46:13'),
(7, 7, 'Sprint', 20, 'alta', 406, '2025-06-17 22:28:06'),
(8, 8, 'Correr', 25, 'alta', 500, '2025-06-17 22:33:22'),
(9, 9, 'Estiramiento', 10, 'baja', 10, '2025-06-17 22:34:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alimentos`
--

CREATE TABLE `alimentos` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `calorias` int(11) DEFAULT NULL,
  `proteinas` float DEFAULT NULL,
  `grasas` float DEFAULT NULL,
  `carbohidratos` float DEFAULT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alimentos`
--

INSERT INTO `alimentos` (`id`, `idUsuario`, `nombre`, `calorias`, `proteinas`, `grasas`, `carbohidratos`, `fecha`) VALUES
(1, 1, 'Manzana', 52, 0.3, 0.2, 14, '2025-06-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriasaludable`
--

CREATE TABLE `categoriasaludable` (
  `id` int(11) NOT NULL,
  `idCategoria` int(11) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoriasaludable`
--

INSERT INTO `categoriasaludable` (`id`, `idCategoria`, `nombre`) VALUES
(1, 1, 'Vegetariana'),
(2, 2, 'Baja en azúcar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logrosnotificaciones`
--

CREATE TABLE `logrosnotificaciones` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `mensaje` varchar(255) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `tipo` varchar(50) DEFAULT NULL,
  `leido` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `logrosnotificaciones`
--

INSERT INTO `logrosnotificaciones` (`id`, `idUsuario`, `mensaje`, `fecha`, `tipo`, `leido`) VALUES
(1, 1, '¡Felicidades! Alcanzaste tu meta semanal de ejercicio.', '2025-06-23 18:26:36', 'logro', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metas`
--

CREATE TABLE `metas` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `tipometa` varchar(255) NOT NULL COMMENT 'Ej: Pérdida de peso, Ejercicio semanal, Reducción de estrés',
  `valorobjetivo` float NOT NULL COMMENT 'El valor que quiere alcanzar',
  `valoractual` float NOT NULL COMMENT 'El progreso actual',
  `fechainicio` date NOT NULL,
  `fechafin` date NOT NULL,
  `fechacreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metas`
--

INSERT INTO `metas` (`id`, `idUsuario`, `tipometa`, `valorobjetivo`, `valoractual`, `fechainicio`, `fechafin`, `fechacreacion`) VALUES
(1, 1, 'Pérdida de peso', 10, 3.5, '2025-09-01', '2025-11-23', '2025-06-23 22:05:22'),
(2, 2, 'Ejercicio semanal', 5, 2, '2025-10-20', '2025-12-11', '2025-06-23 22:05:22'),
(3, 3, 'Reducción de estrés', 8, 5, '2025-10-01', '2025-12-31', '2025-06-23 22:05:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metasdiarias`
--

CREATE TABLE `metasdiarias` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `valor` decimal(5,2) NOT NULL,
  `unidad` varchar(20) DEFAULT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metasdiarias`
--

INSERT INTO `metasdiarias` (`id`, `idUsuario`, `nombre`, `descripcion`, `tipo`, `valor`, `unidad`, `fecha`) VALUES
(2, 1, 'Caminar 30 minutos', 'Ejercicio cardiovascular diario', 'ejercicio', 30.00, 'minutos', '2025-07-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planescomida`
--

CREATE TABLE `planescomida` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `objetivo` text DEFAULT NULL,
  `caloriasMeta` int(11) DEFAULT NULL,
  `proteinasMeta` int(11) DEFAULT NULL,
  `grasasMeta` int(11) DEFAULT NULL,
  `carbohidratosMeta` int(11) DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planescomida`
--

INSERT INTO `planescomida` (`id`, `idUsuario`, `nombre`, `objetivo`, `caloriasMeta`, `proteinasMeta`, `grasasMeta`, `carbohidratosMeta`, `fechaInicio`, `fechaFin`) VALUES
(1, 2, 'Plan Fitness Julio', 'Ganar masa muscular', 2300, 120, 70, 260, '2025-07-01', '2025-07-31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progresosalud`
--

CREATE TABLE `progresosalud` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `estres` int(11) DEFAULT NULL,
  `ejercicio` int(11) DEFAULT NULL,
  `calorias` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `progresosalud`
--

INSERT INTO `progresosalud` (`id`, `idUsuario`, `peso`, `estres`, `ejercicio`, `calorias`, `fecha`) VALUES
(1, 1, 72.50, 5, 45, 2100, '2025-08-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetacategoria`
--

CREATE TABLE `recetacategoria` (
  `idReceta` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recetacategoria`
--

INSERT INTO `recetacategoria` (`idReceta`, `idCategoria`) VALUES
(1001, 1),
(1002, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas`
--

CREATE TABLE `recetas` (
  `id` int(11) NOT NULL,
  `idReceta` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `calorias` int(11) DEFAULT NULL,
  `proteinas` float DEFAULT NULL,
  `carbohidratos` float DEFAULT NULL,
  `grasas` float DEFAULT NULL,
  `porcion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`id`, `idReceta`, `nombre`, `descripcion`, `calorias`, `proteinas`, `carbohidratos`, `grasas`, `porcion`) VALUES
(1, 1, 'Ensalada con atún', 'Ensalada verde con atún', 200, 15, 10, 5, '1 taza'),
(2, 2, 'Pollo a la plancha', 'Pechuga de pollo a la plancha', 250, 30, 0, 5, '150g'),
(57, 1001, 'Ensalada energética', 'Con pollo, espinaca y quinua', 250, NULL, NULL, NULL, NULL),
(59, 1002, 'Ensalada mixta', 'Receta saludable', 250, 6, 30, 10, '1 plato');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutinas`
--

CREATE TABLE `rutinas` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `actividad` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `hora` time NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutinas`
--

INSERT INTO `rutinas` (`id`, `idUsuario`, `tipo`, `actividad`, `descripcion`, `hora`, `fecha`) VALUES
(1, 1, 'ejercicio avanzado', 'Ejercicio funcional actualizado', 'Ejercicio más intenso de 40 min', '07:30:00', '2025-07-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `documento` varchar(10) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(200) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` varchar(20) NOT NULL DEFAULT 'Usuario',
  `estado` varchar(20) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `documento`, `nombres`, `telefono`, `correo`, `contrasena`, `rol`, `estado`) VALUES
(1, '1234567899', 'Leon Sanchez', '3003333331', 'leonz2@gmail.com', '123456leon', 'Usuario', 'Activo'),
(2, '123456788', 'Sebas Jaramillo', '3003333332', 'sebasj44@gmail.com', 'jara12345', 'Usuario', 'Activo'),
(3, '1234567892', 'Cristian Diaz', '3003333333', 'cdiaz4@gmail.com', 'diaz2244', 'Administrador', 'Activo'),
(4, '1234567778', 'Alejo Sanchez', '3022222227', 'alejosz@gmail.com', '$2b$10$e7HHXrxq.SOOAiJVCz.1suz537XFAzkMNia3qD2m2Tm9A97SK/9fa', 'Administrador', 'Activo'),
(5, '1234567777', 'Pablo Diaz', '3022222225', 'diazpablo1@gmail.com', '$2b$10$dOccS5cG0gclppioLQukd.e4GiePq.sXVoi8.aShm65MOP/lRNIuO', 'Usuario', 'Activo'),
(6, '1234567891', 'David Rios', '3022222222', 'davidr33@gmail.com', '$2b$10$j0VUEoIacV6ifMbVy70FTudp52ureOVnUjbsD9yKFn9149wprUhiW', 'Desarollador', 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividadesfisicas`
--
ALTER TABLE `actividadesfisicas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `alimentos`
--
ALTER TABLE `alimentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `categoriasaludable`
--
ALTER TABLE `categoriasaludable`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idReceta` (`idCategoria`),
  ADD UNIQUE KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `logrosnotificaciones`
--
ALTER TABLE `logrosnotificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `metas`
--
ALTER TABLE `metas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `metasdiarias`
--
ALTER TABLE `metasdiarias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idUsuario` (`idUsuario`,`tipo`,`fecha`);

--
-- Indices de la tabla `planescomida`
--
ALTER TABLE `planescomida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `progresosalud`
--
ALTER TABLE `progresosalud`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `recetacategoria`
--
ALTER TABLE `recetacategoria`
  ADD PRIMARY KEY (`idReceta`,`idCategoria`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idReceta` (`idReceta`);

--
-- Indices de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `documento` (`documento`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividadesfisicas`
--
ALTER TABLE `actividadesfisicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `alimentos`
--
ALTER TABLE `alimentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `categoriasaludable`
--
ALTER TABLE `categoriasaludable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `logrosnotificaciones`
--
ALTER TABLE `logrosnotificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `metas`
--
ALTER TABLE `metas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `metasdiarias`
--
ALTER TABLE `metasdiarias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `planescomida`
--
ALTER TABLE `planescomida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `progresosalud`
--
ALTER TABLE `progresosalud`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `recetas`
--
ALTER TABLE `recetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alimentos`
--
ALTER TABLE `alimentos`
  ADD CONSTRAINT `alimentos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `metasdiarias`
--
ALTER TABLE `metasdiarias`
  ADD CONSTRAINT `metasdiarias_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `planescomida`
--
ALTER TABLE `planescomida`
  ADD CONSTRAINT `planescomida_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `recetacategoria`
--
ALTER TABLE `recetacategoria`
  ADD CONSTRAINT `recetacategoria_ibfk_1` FOREIGN KEY (`idReceta`) REFERENCES `recetas` (`idReceta`),
  ADD CONSTRAINT `recetacategoria_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categoriasaludable` (`idCategoria`);

--
-- Filtros para la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD CONSTRAINT `rutinas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
