-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2023 at 02:51 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `theds`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'theds', 'fff');

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` int(11) NOT NULL,
  `transaction_id` varchar(8) NOT NULL,
  `passenger` int(11) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `pickup_time` time NOT NULL,
  `origin` varchar(30) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'pending',
  `distance` int(2) NOT NULL,
  `price` int(11) NOT NULL,
  `coords` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`coords`)),
  `large_luggage` int(2) NOT NULL,
  `medium_luggage` int(11) NOT NULL,
  `small_luggage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`id`, `transaction_id`, `passenger`, `date_time`, `pickup_time`, `origin`, `destination`, `status`, `distance`, `price`, `coords`, `large_luggage`, `medium_luggage`, `small_luggage`) VALUES
(13, 'qCTG2XOA', 1, '2023-02-14 00:10:30', '00:09:00', 'Calinog Plaza, Calinog, Iloilo', 'Calinog Terminal Complex, Cali', 'pending', 14, 681, '{\"originCords\":{\"latitude\":11.1227452,\"longitude\":122.538158,\"latitudeDelta\":0.01,\"longitudeDelta\":0.01},\"distCords\":{\"latitude\":11.1281976,\"longitude\":122.5384521,\"latitudeDelta\":0.01,\"longitudeDelta\":0.01}}', 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `account_id` int(9) NOT NULL,
  `motorcycle_brand` varchar(50) NOT NULL,
  `model` varchar(10) NOT NULL,
  `plate_number` varchar(20) NOT NULL,
  `color` varchar(30) NOT NULL,
  `engineCC` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `account_id`, `motorcycle_brand`, `model`, `plate_number`, `color`, `engineCC`, `status`) VALUES
(1, 2, 'Kaksm', 'Lxlzl', 'Zk2929', 'Red', 203, 'deactivated'),
(2, 1, 'Mio', '2019', 'abc12345', 'Violet ', 125, 'activated');

-- --------------------------------------------------------

--
-- Table structure for table `hailings`
--

CREATE TABLE `hailings` (
  `id` int(11) NOT NULL,
  `transaction_id` varchar(8) NOT NULL,
  `passenger` int(11) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `pickup_time` time NOT NULL,
  `origin` varchar(30) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'pending',
  `distance` int(2) NOT NULL,
  `price` int(11) NOT NULL,
  `coords` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`coords`)),
  `num_passenger` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hailings`
--

INSERT INTO `hailings` (`id`, `transaction_id`, `passenger`, `date_time`, `pickup_time`, `origin`, `destination`, `status`, `distance`, `price`, `coords`, `num_passenger`) VALUES
(21, '0zF0LUEg', 1, '2023-02-13 23:54:35', '23:54:00', 'Rizal Street (Ilaya), Calinog,', 'Quezon Street, Calinog, Provin', 'pending', 1, 30, '{\"originCords\":{\"latitude\":11.1287203,\"longitude\":122.5287503,\"latitudeDelta\":0.01,\"longitudeDelta\":0.01},\"distCords\":{\"latitude\":11.1219261,\"longitude\":122.5371054,\"latitudeDelta\":0.01,\"longitudeDelta\":0.01}}', 2),
(22, 'JSHNTw4E', 1, '2023-02-14 00:12:00', '00:11:00', 'Calinog Terminal Complex, Cali', 'Simsiman, Provincia de Iloílo,', 'pending', 1, 112, '{\"originCords\":{\"latitude\":11.1281976,\"longitude\":122.5384521,\"latitudeDelta\":0.01,\"longitudeDelta\":0.01},\"distCords\":{\"latitude\":11.1155725,\"longitude\":122.5401025,\"latitudeDelta\":0.01,\"longitudeDelta\":0.01}}', 4);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `type` varchar(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `seen` tinyint(11) NOT NULL DEFAULT 0,
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `trip_id`, `type`, `user_id`, `seen`, `status`) VALUES
(46, 13, 'service', 3, 1, 'accepted'),
(47, 13, 'service', 3, 1, 'starting'),
(48, 13, 'service', 3, 1, 'arrived'),
(49, 13, 'service', 3, 1, 'done'),
(50, 10, 'delivery', 3, 1, 'accepted'),
(51, 10, 'delivery', 3, 1, 'starting'),
(52, 10, 'delivery', 3, 1, 'arrived'),
(53, 10, 'delivery', 3, 1, 'done'),
(54, 14, 'service', 3, 1, 'accepted'),
(55, 14, 'service', 3, 1, 'starting'),
(56, 14, 'service', 3, 1, 'arrived'),
(57, 14, 'service', 3, 1, 'done'),
(58, 11, 'delivery', 3, 1, 'accepted'),
(59, 11, 'delivery', 3, 1, 'starting'),
(60, 11, 'delivery', 3, 1, 'arrived'),
(61, 11, 'delivery', 3, 1, 'done'),
(62, 16, 'service', 3, 1, 'accepted'),
(63, 16, 'service', 3, 1, 'starting'),
(64, 16, 'service', 3, 1, 'arrived'),
(65, 16, 'service', 3, 1, 'done'),
(66, 12, 'delivery', 3, 1, 'accepted'),
(67, 12, 'delivery', 3, 1, 'starting'),
(68, 12, 'delivery', 3, 1, 'arrived'),
(69, 12, 'delivery', 3, 1, 'done');

-- --------------------------------------------------------

--
-- Table structure for table `passengers`
--

CREATE TABLE `passengers` (
  `id` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `middlename` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `age` int(2) NOT NULL,
  `gender` varchar(8) NOT NULL,
  `birthday` date NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `passengers`
--

INSERT INTO `passengers` (`id`, `firstname`, `middlename`, `lastname`, `age`, `gender`, `birthday`, `phone_number`, `username`, `password`) VALUES
(1, 'Michelle Grace ', 'Paren', 'Tayo', 21, 'Female', '2000-10-22', '9151735576', 'michelleparen@gmail.com', 'tayotata15'),
(2, 'Emmanuel', 'Despi', 'Katipunan', 21, 'Male', '2000-11-18', '09183939399', 'emma@gmail.com', '1234'),
(3, 'Evy Jean', 'Alcarde', 'Pelale', 22, 'Female', '2000-09-02', '09071135030', 'evyjeanpelale@gmail.com', 'evy22'),
(4, 'Evy Jean ', 'Alcarde ', 'Pelale', 22, 'Female', '2001-09-02', '63907113503', 'Evy Jean', 'Sachi'),
(5, 'Angela', 'Jane', 'Gener', 23, 'Female', '2000-12-09', '09098876543', 'angela123', '1234'),
(6, 'Tata', 'Butange', 'Kalvo', 30, 'Male', '1983-02-14', '09956789321', 'tata@gmail.com', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(11) NOT NULL,
  `type` varchar(15) NOT NULL,
  `service_id` varchar(50) NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'accepted',
  `driver` int(11) DEFAULT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `type`, `service_id`, `status`, `driver`, `date_time`) VALUES
(18, 'service', '13', 'accepted', 1, '2022-12-09 10:47:11'),
(19, 'delivery', '10', 'accepted', 1, '2022-12-09 11:31:33'),
(20, 'service', '14', 'accepted', 1, '2022-12-09 14:46:36'),
(21, 'delivery', '11', 'accepted', 1, '2022-12-09 15:25:01'),
(22, 'service', '16', 'accepted', 1, '2022-12-09 15:43:19'),
(23, 'delivery', '12', 'accepted', 1, '2022-12-09 15:44:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hailings`
--
ALTER TABLE `hailings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `passengers`
--
ALTER TABLE `passengers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hailings`
--
ALTER TABLE `hailings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `passengers`
--
ALTER TABLE `passengers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
