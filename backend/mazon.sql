-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 26, 2025 at 12:29 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mazon`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `akumulatory_zasilacze_puszki`
--

CREATE TABLE `akumulatory_zasilacze_puszki` (
  `id` int(11) NOT NULL,
  `producent` varchar(100) DEFAULT NULL,
  `moc_volt_ah` varchar(50) DEFAULT NULL,
  `rodzaj` varchar(100) DEFAULT NULL,
  `typ_model` varchar(100) DEFAULT NULL,
  `stan_magazynowy` int(11) DEFAULT NULL,
  `cena` decimal(10,2) DEFAULT NULL,
  `stan_minimalny` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `akumulatory_zasilacze_puszki`
--

INSERT INTO `akumulatory_zasilacze_puszki` (`id`, `producent`, `moc_volt_ah`, `rodzaj`, `typ_model`, `stan_magazynowy`, `cena`, `stan_minimalny`) VALUES
(1, 'Pulsar', '12V / 18Ah', 'Akumulator', 'HPB 18-12', 2, 100.00, 5),
(2, 'MW Power', '12V / 18Ah', 'Akumulator', 'MWS 18-12', 2, 100.00, 5),
(3, 'MW Power', '12V / 28Ah', 'Akumulator', 'MWL 28-12', 4, 100.00, 5),
(4, 'ZEUS', '12V / 90Ah', 'Akumulator', 'ZS 90', 1, 100.00, 5),
(5, 'QUALTEC', '12-7Ah', 'Akumulator', '53030', 2, 100.00, 5),
(6, 'AWEX', '12-26Ah', 'Akumulator', 'AWS 12v-26ah', 2, 100.00, 5),
(7, 'AWEX', '12-12Ah', 'Akumulator', 'AWS 12v-12ah', 2, 100.00, 5),
(8, 'Merawex', '----', 'Zasilacz', 'ZSP135 DR-5A', 6, 100.00, 5),
(9, 'W 2', '----', 'Puszka ośmiokątna', 'PiP-1AN z bezp. (0,375A)', 9, 100.00, 5),
(10, 'W 2', '----', 'Puszka ośmiokątna', 'PiP-1AN z bezp. (0,750A)', 2, 100.00, 5),
(11, 'W 2', '----', 'Puszka Prostokątna', 'Przelotowa 6x4mm2', 0, 100.00, 5),
(12, 'W 2', '----', 'Puszka Prostokątna', 'Przelotowa 9x4mm2', 0, 100.00, 5),
(13, 'W 2', '----', 'Sygnalizator optyczny', 'SO-pd 13/3m', 2, 100.00, 5),
(14, 'W 2', '----', 'Sygnalizator optyczno- akust.', 'SA-K7N/9m', 7, 100.00, 5),
(15, 'W 2', '----', 'Sygnalizator optyczno- akust.', 'SAO-P8 CC', 35, 100.00, 5),
(16, 'W 2', '----', 'Sygnalizator optyczno- akust.', 'SAOZ-Pk2', 10, 100.00, 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `hilti`
--

CREATE TABLE `hilti` (
  `id` int(11) NOT NULL,
  `model_rodzaj` varchar(100) DEFAULT NULL,
  `ilosc_w_opakowaniu` int(11) DEFAULT NULL,
  `stan_magazynowy` int(11) DEFAULT NULL,
  `dlugosc` varchar(50) DEFAULT NULL,
  `cena` decimal(10,2) DEFAULT NULL,
  `stan_minimalny` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hilti`
--

INSERT INTO `hilti` (`id`, `model_rodzaj`, `ilosc_w_opakowaniu`, `stan_magazynowy`, `dlugosc`, `cena`, `stan_minimalny`) VALUES
(1, 'X-P20 BX3', 1000, 3, 'dł. 20mm', 100.00, 5),
(2, 'X-P17 BX3', 1000, 4, 'dl. 17mm', 100.00, 5),
(3, 'X-P20 BX4', 1000, 1, 'dł. 20mm', 100.00, 5),
(4, 'X-P17 BX4', 1000, 2, 'dł. 17mm', 100.00, 5),
(5, 'X DFB 6mm MX (podwójne)', 250, 5, '----', 100.00, 5),
(6, 'X DFB 8mm MX (podwójne)', 200, 3, '-----', 100.00, 5),
(7, 'X FB 5mm MX (pojedyncze)', 250, 1, '-----', 100.00, 5),
(8, 'X FB 6mm MX (pojedyncze)', 250, 6, '----', 100.00, 5),
(9, 'X FB 8mm MX (pojedyncze)', 200, 6, '-----', 100.00, 5),
(10, 'X FB 10mm MX (pojedyncze)', 200, 4, '----', 100.00, 5),
(11, 'X FB 11mm MX (pojedyncze)', 200, 2, '----', 100.00, 5),
(12, 'EKS-MX do rurki 16mm', 100, 0, '----', 100.00, 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `rola` varchar(20) DEFAULT 'warehouseman'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `password`, `rola`) VALUES
(1, 'testmanager', 'test123', 'warehouseman'),
(2, 'testadmin', 'test123', 'admin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `niedrzewne_hydrauliczne`
--

CREATE TABLE `niedrzewne_hydrauliczne` (
  `id` int(11) NOT NULL,
  `rodzaj` varchar(100) DEFAULT NULL,
  `rozmiar_dn_cal` varchar(50) DEFAULT NULL,
  `rodzaj_stali` varchar(100) DEFAULT NULL,
  `stan_magazynowy` int(11) DEFAULT NULL,
  `cena` decimal(10,2) DEFAULT NULL,
  `stan_minimalny` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `niedrzewne_hydrauliczne`
--

INSERT INTO `niedrzewne_hydrauliczne` (`id`, `rodzaj`, `rozmiar_dn_cal`, `rodzaj_stali`, `stan_magazynowy`, `cena`, `stan_minimalny`) VALUES
(1, 'Kolano 90’ GW', 'DN 25 / 1”', '316', 7, 100.00, 5),
(2, 'Kolano 90’ GW / GW', 'DN 32 / 1 ¼”', '316', 7, 100.00, 5),
(3, 'Kolano 90’ GW / GZ', 'DN 50 / 2”', '316', 3, 100.00, 5),
(4, 'Kolano 90’ spawalne', 'DN 50 / 2”', '316', 11, 100.00, 5),
(5, 'Kolano 90’ GW', 'DN 50 / 2”', '316', 3, 100.00, 5),
(6, 'Trójnik spawalny redukcja', 'DN 32 / 25 ; 1 ¼” / 1”', '316', 1, 100.00, 5),
(7, 'Trójnik GW', 'DN 32 / 1 ¼”', '316', 4, 100.00, 5),
(8, 'Trójnik spawalny', 'DN 40 / 1 ½”', '316', 7, 100.00, 5),
(9, 'Trójnik spawalny redukcja', 'DN 50 / 25 ; 2” / 1”', '316', 2, 100.00, 5),
(10, 'Mufa GW', 'DN 25 / 1”', '316', 25, 100.00, 5),
(11, 'Mufa GW', 'DN 32 / 1 ¼”', '304', 3, 100.00, 5),
(12, 'Mufa GW', 'DN 32 / 1 ¼”', '316', 4, 100.00, 5),
(13, 'Mufa GW', 'DN 50 / 2”', '316', 10, 100.00, 5),
(14, 'Redukcja GW', 'DN 25 / 20 ; 1” / ¾”', '316', 15, 100.00, 5),
(15, 'Redukcja spawalna', 'DN 50 / 25 ; 2” / 1”', '316', 15, 100.00, 5),
(16, 'Redukcja', 'DN 32 / 1 ¼”', '316', 11, 100.00, 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ssp`
--

CREATE TABLE `ssp` (
  `id` int(11) NOT NULL,
  `rodzaj` varchar(100) DEFAULT NULL,
  `typ_model` varchar(100) DEFAULT NULL,
  `nr_katalogowy` varchar(100) DEFAULT NULL,
  `stan_magazynowy` int(11) DEFAULT NULL,
  `cena` decimal(10,2) DEFAULT NULL,
  `stan_minimalny` int(11) DEFAULT NULL,
  `producent` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ssp`
--

INSERT INTO `ssp` (`id`, `rodzaj`, `typ_model`, `nr_katalogowy`, `stan_magazynowy`, `cena`, `stan_minimalny`, `producent`) VALUES
(1, 'Czujka', 'S', '----', 43, 100.00, 5, 'AWEX'),
(2, 'Czujka', 'T', '----', 5, 100.00, 5, 'AWEX'),
(3, 'Czujka', 'T,S', '----', 1, 100.00, 5, 'AWEX'),
(4, 'Podstawa czujki', 'Nie podano', '----', 25, 100.00, 5, 'AWEX'),
(5, 'Sygnalizator. WZ', 'nie podano', '----', 12, 100.00, 5, 'AWEX'),
(6, 'ROP 21', 'A', '----', 4, 100.00, 5, 'AWEX'),
(7, 'ROP 21', 'B', '----', 7, 100.00, 5, 'AWEX'),
(8, 'Moduł', 'Mio 88', '----', 1, 100.00, 5, 'AWEX'),
(9, 'Moduł', 'Mio 22 CD', '----', 1, 100.00, 5, 'AWEX'),
(10, 'Moduł', 'Mio 22', '----', 12, 100.00, 5, 'AWEX'),
(11, 'Moduł', 'Mio 88 LS', '----', 3, 100.00, 5, 'AWEX'),
(12, 'Moduł pogodowy', 'Mio 89', '----', 1, 100.00, 5, 'AWEX'),
(13, 'Przycisk przew.', 'nie podano', '----', 0, 100.00, 5, 'AWEX'),
(14, 'Czujka', 'DO-R FAP-425-DO-R', '----', 5, 100.00, 5, 'BOSCH'),
(15, 'Czujka', 'S,O FAP-425-O', '----', 5, 100.00, 5, 'BOSCH'),
(16, 'Czujka', 'T FAH-425-T-R', '----', 23, 100.00, 5, 'BOSCH'),
(17, 'Moduł', 'LSN wej. – wyj. FLM-420-RHV-S', '----', 3, 100.00, 5, 'BOSCH'),
(18, 'Moduł', 'Batery control BCM-000o-B\r\n\r\n', '----', 0, 100.00, 5, 'BOSCH'),
(19, 'Moduł', 'panel rail shop PRS-0002-C', '----', 2, 100.00, 5, 'BOSCH'),
(20, 'Sygnalizator', 'FAA FAA -420-R1-ROW', '----', 3, 100.00, 5, 'BOSCH'),
(21, 'Podstawa', 'MS MS 400 B', '----', 12, 100.00, 5, 'BOSCH'),
(22, 'ROP', 'FCM FCM-210-DM-G-R', '----', 0, 100.00, 5, 'BOSCH'),
(23, 'Czujka', 'IQ8 (S,O)', '802371', 210, 100.00, 5, 'ESSER'),
(24, 'Czujka', 'Mulisensor', '802374', 1, 100.00, 5, 'ESSER'),
(25, 'Czujka', '„ T „', '802271', 5, 100.00, 5, 'ESSER'),
(26, 'Moduł', 'Net module', '784840.10', 6, 100.00, 5, 'ESSER'),
(27, 'Moduł', 'IQ8FCT XS', '808606', 6, 100.00, 5, 'ESSER'),
(28, 'Moduł', 'analog 8bit', '804382.D0', 1, 100.00, 5, 'ESSER'),
(29, 'Moduł', 'IQ8MPC', '804905', 12, 100.00, 5, 'ESSER'),
(30, 'Moduł', 'transpord.8bit', '808610.10', 2, 100.00, 5, 'ESSER'),
(31, 'Moduł', 'EBK 4G2R', '808623', 12, 100.00, 5, 'ESSER'),
(32, 'Podstawa', 'czujki IQ8', '805590', 270, 100.00, 5, 'ESSER'),
(33, 'obud.podst.', 'czujki IP43', '805572.50', 5, 100.00, 5, 'ESSER'),
(34, 'obud.natynk.', 'Szara', '788600', 16, 100.00, 5, 'ESSER'),
(35, 'ROP', 'IQ8MPC', '804961', 23, 100.00, 5, 'ESSER'),
(36, 'szkiełka mpc', 'MPC small', '704960', 10, 100.00, 5, 'ESSER'),
(37, 'Obud. ROP', 'IQ8 z czerwoną szybką', '704902', 32, 100.00, 5, 'ESSER'),
(38, 'Przycisk ROP', 'IQ8 IP66/67', 'nie podano', 2, 100.00, 5, 'ESSER'),
(116, 'Czujka', '„S”', 'OP720', 84, 100.00, 5, 'SIEMENS'),
(117, 'Czujka', '„S” analog.', 'OOH740', 0, 100.00, 5, 'SIEMENS'),
(118, 'Czujka', '„S”', 'FDO 221', 20, 100.00, 5, 'SIEMENS'),
(119, 'Czujka', 'Multi sensor', 'OH 720', 11, 100.00, 5, 'SIEMENS'),
(120, 'Moduł', 'nie podano', 'FDCIO222', 7, 100.00, 5, 'SIEMENS'),
(121, 'Moduł', 'sieciowy', 'FN 2001 A1', 2, 100.00, 5, 'SIEMENS'),
(122, 'Moduł', 'interface', 'FDCC221', 4, 100.00, 5, 'SIEMENS'),
(123, 'Podstawa', 'nie podano', 'FDB 221', 49, 100.00, 5, 'SIEMENS'),
(124, 'Obudowa Mod.', 'nie podano', 'FDCH221', 8, 100.00, 5, 'SIEMENS'),
(125, 'ROP', 'nie podano', 'FDMH291-R', 26, 100.00, 5, 'SIEMENS'),
(126, 'ROP', 'Wkłady', 'FDME 221', 5, 100.00, 5, 'SIEMENS'),
(127, 'Sygnalizatory', 'nie podano', 'FDAI 91', 52, 100.00, 5, 'SIEMENS'),
(128, 'Czujka', 'Multi sens.', '516.800.909', 4, 100.00, 5, 'ZETTLER'),
(129, 'Moduł', 'SIO 800 MX', '555.800.063', 12, 100.00, 5, 'ZETTLER'),
(130, 'Moduł', 'CIM 800 MX', '555.800.022', 12, 100.00, 5, 'ZETTLER'),
(131, 'Moduł', 'RIM 800 MX', '555.800.003', 4, 100.00, 5, 'ZETTLER'),
(132, 'Moduł', 'D 800 MX', '557.201.401', 18, 100.00, 5, 'ZETTLER'),
(133, 'Centrala SSP', 'Fire Alarm Panel', '557.200.847.S', 2, 100.00, 5, 'ZETTLER'),
(134, 'Sygnalizator', 'nie podano', '516.800.909', 29, 100.00, 5, 'ZETTLER'),
(135, 'Profil bat.', 'PBB 801', '552.202.854', 1, 100.00, 5, 'ZETTLER'),
(136, 'Obudowa Mob', 'nie podano', '517.035.007', 44, 100.00, 5, 'ZETTLER'),
(137, 'Czujka', 'DUO', 'DUO 6046', 0, 100.00, 5, 'POLON ALFA'),
(138, 'Czujka', 'DOR', 'DOR 4043', 0, 100.00, 5, 'POLON ALFA'),
(139, 'Sygnalizator', 'WZ', 'WZ 31', 0, 100.00, 5, 'POLON ALFA'),
(140, 'ROP', 'nie podano', '4001 m', 2, 100.00, 5, 'POLON ALFA'),
(141, 'ROP', 'ramki', 'RM 60', 0, 100.00, 5, 'POLON ALFA'),
(142, 'Moduł', 'transmisji', 'MTI 62', 0, 100.00, 5, 'POLON ALFA'),
(143, 'Moduł', 'pętlowy', 'EKS 6022', 4, 100.00, 5, 'POLON ALFA'),
(144, 'Moduł', 'nie podano', 'MSI 48', 0, 100.00, 5, 'POLON ALFA'),
(145, 'Podstawa', 'Czujki', 'G 40', 0, 100.00, 5, 'POLON ALFA'),
(146, 'Podstawa', 'Czujki', 'PGb40', 0, 100.00, 5, 'POLON ALFA'),
(147, 'Czujka', 'Multi sensor', 'MTD 533x', 155, 100.00, 5, 'SCHRACK'),
(148, 'Podstawa', 'USB 502.1', 'USB 502.1', 204, 100.00, 5, 'SCHRACK'),
(149, 'Podstawa', 'JP MTD', 'USB 502.3', 4, 100.00, 5, 'SCHRACK'),
(150, 'Moduł', 'BX IO3 …..', 'BX IO3', 38, 100.00, 5, 'SCHRACK'),
(151, 'Moduł Evoxx', 'Pętlowy', 'Pętlowy', 0, 100.00, 5, 'SCHRACK'),
(152, 'Moduł', 'BX IUP', 'BX IUP', 98, 100.00, 5, 'SCHRACK'),
(153, 'Moduł', 'BX', 'BXIO2I4', 5, 100.00, 5, 'SCHRACK'),
(154, 'Moduł', 'BX IOM', 'BX IOM', 0, 100.00, 5, 'SCHRACK'),
(155, 'Moduł', 'BX REL4', 'BX REL4', 11, 100.00, 5, 'SCHRACK'),
(156, 'Moduł', 'BX – 01', 'BX – 01', 2, 100.00, 5, 'SCHRACK'),
(157, 'Moduł', 'Interface Module', 'XLM 35', 1, 100.00, 5, 'SCHRACK'),
(158, 'Moduł', 'BX -IM4', 'BX-IM4', 14, 100.00, 5, 'SCHRACK'),
(159, 'ROP', 'MPC', '545X.3R.PL', 6, 100.00, 5, 'SCHRACK'),
(160, 'ROP', 'MPC wewnętrzny', '545X.1R.PL', 31, 100.00, 5, 'SCHRACK'),
(161, 'Szkiełka', 'MPC Ps 210', '545X.3R.PL', 33, 100.00, 5, 'SCHRACK'),
(162, 'Szkiełka', 'MPC Ps 200', '545X.1R.PL', 36, 100.00, 5, 'SCHRACK'),
(163, 'Obudowa Mod', 'Obudowa', 'IP 66', 55, 100.00, 5, 'SCHRACK'),
(164, 'Obudowa Mod', 'Obudowa duża', 'IP 66 duża', 4, 100.00, 5, 'SCHRACK'),
(165, 'Sygnalizarory', 'WZ', 'WZ', 18, 100.00, 5, 'SCHRACK'),
(166, 'CENTRALA', 'Integral Evoxx M', 'EvoxX M', 1, 100.00, 5, 'SCHRACK'),
(167, 'Kabel', 'Kabel RJ 45', 'RJ 45', 2, 100.00, 5, 'SCHRACK'),
(168, 'Akumulatory', 'Aku. do centrali', '12V 44Ah', 0, 100.00, 5, 'SCHRACK'),
(169, 'Głowica zassysania', 'Smoke detector', 'SSD 535-2', 4, 100.00, 5, 'SCHRACK'),
(170, 'Detektor dymu', 'Detekcja dymu zassysanie', 'ASD 535-2', 1, 100.00, 5, 'SCHRACK'),
(171, 'Panel Wyniesony', 'Panel mini evoxx', 'EvoxX M', 2, 100.00, 5, 'SCHRACK'),
(172, 'Czujka Liniowa', 'nadajnik', 'OSID-SP-01', 3, 100.00, 5, 'OSID'),
(173, 'Czujka Liniowa', 'odbiornik', 'OSID-OSI-10', 3, 100.00, 5, 'OSID'),
(176, 'w', 'w', '324', 33, NULL, 50, 'w3');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tryskaczowka_czerwone`
--

CREATE TABLE `tryskaczowka_czerwone` (
  `id` int(11) NOT NULL,
  `producent` varchar(100) DEFAULT NULL,
  `rodzaj_typ` varchar(100) DEFAULT NULL,
  `wyjscie_cal` varchar(50) DEFAULT NULL,
  `rozmiar_dn_cal_mm` varchar(50) DEFAULT NULL,
  `stan_magazynowy` int(11) DEFAULT NULL,
  `wymiar_dl_szer` varchar(50) DEFAULT NULL,
  `wysokosc_mm` int(11) DEFAULT NULL,
  `model_rok_prod` varchar(100) DEFAULT NULL,
  `cena` decimal(10,2) DEFAULT NULL,
  `stan_minimalny` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tryskaczowka_czerwone`
--

INSERT INTO `tryskaczowka_czerwone` (`id`, `producent`, `rodzaj_typ`, `wyjscie_cal`, `rozmiar_dn_cal_mm`, `stan_magazynowy`, `wymiar_dl_szer`, `wysokosc_mm`, `model_rok_prod`, `cena`, `stan_minimalny`) VALUES
(122, '----', 'Obejma Stalowa ( Łącznik)', '----', 'DN 32 / 1 ¼” / 42,4mm', 58, '----', 0, '----', 100.00, 5),
(123, '----', 'Obejma Stalowa ( Łącznik)', '----', 'DN 40 / 1 ½” / 48,3mm', 32, '----', 0, '----', 100.00, 5),
(124, '----', 'Obejma Stalowa ( Łącznik)', '----', 'DN 50 / 2”/ 60,3mm', 18, '----', 0, '----', 100.00, 5),
(125, '----', 'Obejma Stalowa ( Łącznik)', '----', 'DN 65 / 2 ½” / 76,1mm', 18, '----', 0, '----', 100.00, 5),
(126, '----', 'Obejma Stalowa ( Łącznik)', '----', 'DN 80 / 3” / 88,9mm', 64, '----', 0, '----', 100.00, 5),
(127, '----', 'Obejma Stalowa ( Łącznik)', '----', 'DN 100 / 4” / 114,3mm', 25, '----', 0, '----', 100.00, 5),
(128, '----', 'Obejma Stalowa ( Łącznik)', '----', 'DN 150 / 6” / 168,3 mm', 10, '----', 0, '----', 100.00, 5),
(129, '----', 'Obejma Stalowa ( Łącznik)', '----', 'DN 200 / 8” / 219.1mm', 11, '----', 0, '----', 100.00, 5),
(130, '----', 'Obejma Stalowa ( Łącznik)', '----', 'DN 250 / 10” / 273mm', 2, '----', 0, '----', 100.00, 5),
(131, '----', 'Obejma Stalowa z redukcją (Łącznik)', '----', 'DN 80 / 65 ; 3” / 2 ½', 12, '----', 0, '----', 100.00, 5),
(132, '----', 'Obejma Stalowa z redukcją (Łącznik)', '----', 'DN 100 / 80 ; 4” / 3”', 2, '----', 0, '----', 100.00, 5),
(133, '----', 'Kolanko 90’', '----', 'DN 25 /  1”', 6, '----', 0, '----', 100.00, 5),
(134, '----', 'Kolanko 90’', '----', 'DN 32 / 1 ¼”', 48, '----', 0, '----', 100.00, 5),
(135, '----', 'Kolanko 90’', '----', 'DN 40 / 1 ½”', 29, '----', 0, '----', 100.00, 5),
(136, '----', 'Kolanko 90’', '----', 'DN 50 / 2”', 74, '----', 0, '----', 100.00, 5),
(137, '----', 'Kolanko 90’', '----', 'DN 65 / 2 ½”', 111, '----', 0, '----', 100.00, 5),
(138, '----', 'Kolanko 90’', '----', 'DN 80 / 3”', 23, '----', 0, '----', 100.00, 5),
(139, '----', 'Kolanko 90’', '----', 'DN 100 / 4”', 2, '----', 0, '----', 100.00, 5),
(140, '----', 'Kolanko 90’', '----', 'DN 150 / 6”', 3, '----', 0, '----', 100.00, 5),
(141, '----', 'Kolanko 90’', '----', 'DN 200 / 8”', 2, '----', 0, '----', 100.00, 5),
(142, '----', 'Kolanko 90’', '----', 'DN 250 / 10”', 2, '----', 0, '----', 100.00, 5),
(143, '----', 'Kolanko 45’', '----', 'DN 40 / 1 ½”', 1, '----', 0, '----', 100.00, 5),
(144, '----', 'Kolanko 45’', '----', 'DN 150 / 6”', 4, '----', 0, '----', 100.00, 5),
(145, '----', 'Kolanko 45’', '----', 'DN 200 / 8”', 4, '----', 0, '----', 100.00, 5),
(146, '----', 'Kolanko 30’', '----', 'DN 40 / 1 ½”', 9, '----', 0, '----', 100.00, 5),
(147, '----', 'Wpinka (Nawiertka)', '----', 'DN 25 / 25 ; 1” / 1”', 8, '----', 0, '----', 100.00, 5),
(148, '----', 'Wpinka (Nawiertka)', '----', 'DN 65 / 40 ; 2 ½” / 1 ½”', 168, '----', 0, '----', 100.00, 5),
(149, '----', 'Wpinka (Nawiertka)', '----', 'DN 50 / 32 ; 2” / 1 ¼”', 10, '----', 0, '----', 100.00, 5),
(150, '----', 'Wpinka (Nawiertka)', '----', 'DN 80 / 50 ; 3” / 2”', 27, '----', 0, '----', 100.00, 5),
(151, '----', 'Wpinka (Nawiertka)', '----', 'DN 80 / 32 ; 3” / 1 ¼”', 3, '----', 0, '----', 100.00, 5),
(152, '----', 'Wpinka (Nawiertka)', '----', 'DN 100 / 40 ; 4” / 1 ½”', 67, '----', 0, '----', 100.00, 5),
(153, '----', 'Wpinka (Nawiertka)', '----', 'DN 100 / 65 ; 4” / 2 ½”', 125, '----', 0, '----', 100.00, 5),
(154, '----', 'Wpinka (Nawiertka)', '----', 'DN 150 / 40 ; 6” / 1 ½”', 9, '----', 0, '----', 100.00, 5),
(155, '----', 'Wpinka (Nawiertka)', '----', 'DN 150 / 50 ; 6” / 2”', 33, '----', 0, '----', 100.00, 5),
(156, '----', 'Wpinka (Nawiertka)', '----', 'DN 150 / 65 ; 6” / 2 ½”', 5, '----', 0, '----', 100.00, 5),
(157, '----', 'Wpinka (Nawiertka)', '----', 'DN 150 / 100 ; 6” / 4”', 10, '----', 0, '----', 100.00, 5),
(158, '----', 'Wpinka (Nawiertka)', '----', 'DN150 / 40 ; 6” / 1 ½”', 5, '----', 0, '----', 100.00, 5),
(159, '----', 'Wpinka (Nawiertka)', '----', 'DN 200 / 65 ; 8” / 2 ½”', 20, '----', 0, '----', 100.00, 5),
(160, '----', 'Wpinka (Nawiertka)', '----', 'DN 50 / 25 ; 2” / 1”', 70, '----', 0, '----', 100.00, 5),
(161, '----', 'Wpinka (Nawiertka)', '----', 'DN 65 / 32 ; 2 ½”/1 ¼”', 43, '----', 0, '----', 100.00, 5),
(162, '----', 'Wpinka (Nawiertka)', '----', 'DN 80 / 25 ; 3” / 1”', 4, '----', 0, '----', 100.00, 5),
(163, '----', 'Wpinka (Nawiertka)', '----', 'DN 65 / 65 ; 2 ½” / 2 ½”', 2, '----', 0, '----', 100.00, 5),
(164, '----', 'Wpinka (Nawiertka)', '----', 'DN 65 / 50 ; 2 ½” / 2”', 8, '----', 0, '----', 100.00, 5),
(165, '----', 'Wpinka (Nawiertka)', '----', 'DN 100 / 50 ; 4” / 2”', 59, '----', 0, '----', 100.00, 5),
(166, '----', 'Wpinka (Nawiertka)', '----', 'DN 80 / 40 ; 3” / 1 ¼”', 12, '----', 0, '----', 100.00, 5),
(167, '----', 'Wpinka (Nawiertka)', '----', 'DN 150 / 32 ; 6” / 1 ¼”', 5, '----', 0, '----', 100.00, 5),
(168, '----', 'Wpinka (Nawiertka)', '----', 'DN 150 / 80 ; 6” / 3”', 1, '----', 0, '----', 100.00, 5),
(169, '----', 'Wpinka (Nawiertka)', '----', 'DN 200 / 100 ; 8” / 4””', 1, '----', 0, '----', 100.00, 5),
(170, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 32 / 15 ; 1 ¼” / ½”', 12, '----', 0, '----', 100.00, 5),
(171, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 32 / 25 ; 1 ¼” / 1”', 40, '----', 0, '----', 100.00, 5),
(172, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 32 / 20 ; 1 ¼” / ¾”', 24, '----', 0, '----', 100.00, 5),
(173, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 40 / 15 ; 1 ½” / ½”', 4, '----', 0, '----', 100.00, 5),
(174, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 40 / 20 ; 1 ½” / ¾”', 95, '----', 0, '----', 100.00, 5),
(175, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 40 / 25 ; 1 ½” / 1”', 72, '----', 0, '----', 100.00, 5),
(176, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 50 / 15 ; 2” / ½”', 4, '----', 0, '----', 100.00, 5),
(177, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 50 / 25 ; 2” / 1”', 61, '----', 0, '----', 100.00, 5),
(178, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 50 / 32 ; 2” / 1 ¼”', 5, '----', 0, '----', 100.00, 5),
(179, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 50 / 40 ; 2” / 1 ½”', 1, '----', 0, '----', 100.00, 5),
(180, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 65 / 15 ; 2 ½” / ½”', 5, '----', 0, '----', 100.00, 5),
(181, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 65 / 20 ; 2 ½”/ ¾”', 23, '----', 0, '----', 100.00, 5),
(182, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 65 / 25 ; 2 ½” / 1”', 40, '----', 0, '----', 100.00, 5),
(183, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 65 / 32 ; 2 ½” / ¼”', 21, '----', 0, '----', 100.00, 5),
(184, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 65 / 40 ; 2 ½” / 1 ½”', 26, '----', 0, '----', 100.00, 5),
(185, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 65 / 20 ; 2 ½”/ ¾”', 142, '----', 0, '----', 100.00, 5),
(186, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 100 / 65 ; 4” / 2 ½”', 2, '----', 0, '----', 100.00, 5),
(187, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 100 / 25 ; 4” / 1”', 2, '----', 0, '----', 100.00, 5),
(188, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 100 / 50 ; 4” / 2”', 1, '----', 0, '----', 100.00, 5),
(189, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 150 / 50 ; 6” / 2”', 9, '----', 0, '----', 100.00, 5),
(190, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 150 / 65 ; 6” / 2 ½”', 2, '----', 0, '----', 100.00, 5),
(191, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN 200 / 65 ; 8” / 2 ½”', 2, '----', 0, '----', 100.00, 5),
(192, '----', 'Wpinka Gwint (Nawiertka)', '----', 'DN200 / 50 ; 8”/ 2”', 3, '----', 0, '----', 100.00, 5),
(193, '----', 'Trójnik', '----', 'DN 32 / 1 ¼”', 10, '----', 0, '----', 100.00, 5),
(194, '----', 'Trójnik', '----', 'DN 40 / 1 ½”', 142, '----', 0, '----', 100.00, 5),
(195, '----', 'Trójnik', '----', 'DN 50 / 2”', 26, '----', 0, '----', 100.00, 5),
(196, '----', 'Trójnik', '----', 'DN 65 / 2 ½”', 19, '----', 0, '----', 100.00, 5),
(197, '----', 'Trójnik', '----', 'DN 100 / 4”', 20, '----', 0, '----', 100.00, 5),
(198, '----', 'Trójnik', '----', 'DN 150 / 6”', 3, '----', 0, '----', 100.00, 5),
(199, '----', 'Trójnik', '----', 'DN 200 / 8”', 2, '----', 0, '----', 100.00, 5),
(200, '----', 'Trójnik', '----', 'DN 80 / 3”', 4, '----', 0, '----', 100.00, 5),
(201, 'Rapidorop 68°c', '----', '½”', 'DN 15 / ½”', 245, '----', 0, 'Chrom .RDO23 / 2024', 100.00, 5),
(202, 'Rapidorop 68°c', '----', '½”', 'DN 15 / ½”', 25, '----', 0, 'Chrom .RDO23 / 2019', 100.00, 5),
(203, 'Rapidorop 68°c', '----', '¾”', 'DN 20 / ¾”', 97, '----', 0, 'Chrom.RDO42 / 2021', 100.00, 5),
(204, 'Rapidorop 68°c', '----', '¾”', 'DN 20 / ¾”', 149, '----', 0, 'Mosiądz.RDO43 / 2022', 100.00, 5),
(205, 'Rapidorop 141°c', '----', '¾”', 'DN 20 / ¾”', 5, '----', 0, 'Mosiądz.RDO44 / 2022(stojący)', 100.00, 5),
(206, 'TYCO 68°c', '----', '¾”', 'DN 20 / ¾”', 48, '----', 0, 'Mosiądz.TY5251 / 2019', 100.00, 5),
(207, 'TYCO 68°c', '----', '¾”', 'DN 20 / ¾”', 16, '----', 0, 'Mosiądz.TY5231 / 2022', 100.00, 5),
(208, 'Viking 74°c', '----', '1”', 'DN 25 / 1”', 43, '----', 0, 'Mosiądz. VK510 / 2020', 100.00, 5),
(209, 'Viking 74°c', '----', '¾”', 'DN 20 / ¾”', 4, '----', 0, 'Mosiądz.VK510 / 2020', 100.00, 5),
(210, 'Viking 68°c', '----', '¾”', 'DN 20 / ¾”', 50, '----', 0, 'Mosiądz. VK531 / 2020(stojący)', 100.00, 5),
(211, 'Reliable 74°c', '----', '1”', 'DN 25 / 1”', 177, '----', 0, 'Mosiądz. N251BM / 2022', 100.00, 5),
(212, '----', 'Rura zaślepiona jednostronnie 6m', '2 x ¾”', 'DN 50 / 2”', 180, '----', 0, '----', 100.00, 10),
(213, '----', 'Rura otwarta 6m', '----', 'DN 40 / 1 ½”', 72, '----', 0, '----', 100.00, 10),
(214, '----', 'Rura Prosta OCYNK 6m', '----', 'DN 65 / 2 ½”', 6, '----', 0, '----', 100.00, 10),
(215, '----', 'Rura prosta 6m', '----', 'DN 80 / 3”', 6, '----', 0, '----', 100.00, 10),
(216, '----', 'Rura zaślepiona jednostronnie 6m', '3” x 1”', 'DN 80 / 3”', 52, '----', 0, '----', 100.00, 10),
(217, '----', 'Rura prosta 6m', '----', 'DN 150 / 6”', 6, '----', 0, '----', 100.00, 10);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zasysanie_oddymianie`
--

CREATE TABLE `zasysanie_oddymianie` (
  `id` int(11) NOT NULL,
  `producent` varchar(100) DEFAULT NULL,
  `rodzaj` varchar(100) DEFAULT NULL,
  `typ_model` varchar(100) DEFAULT NULL,
  `stan_magazynowy` int(11) DEFAULT NULL,
  `cena` decimal(10,2) DEFAULT NULL,
  `stan_minimalny` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zasysanie_oddymianie`
--

INSERT INTO `zasysanie_oddymianie` (`id`, `producent`, `rodzaj`, `typ_model`, `stan_magazynowy`, `cena`, `stan_minimalny`) VALUES
(1, 'Johnson Controls', 'Smoki zassys.', 'JCG019C', 98, 100.00, 5),
(2, 'Johnson Controls', 'Modem', 'SIO 800 1 IP/1 OP MX', 1, 100.00, 5),
(3, 'nie podano', 'Kolanko PVC 90’ szare', 'RV 0 CVI 250', 130, 100.00, 5),
(4, 'nie podano', 'Złączka prosta szara', 'MIV 25', 72, 100.00, 5),
(5, 'nie podano', 'Trójnik szary', 'TIV 25', 37, 100.00, 5),
(6, 'nie podano', 'Śrubunek z uszczelką czerwony', 'nie podano', 6, 100.00, 5),
(7, 'BISAN profesional', 'Klej do PVC', 'niepodano', 2, 100.00, 5),
(8, 'BISAN profesional', 'Płyn czyszczący do PVC', 'nie podano', 2, 100.00, 5),
(9, 'AFG', 'Przełącznik przewietrzania', 'PP – 40 N/T', 1, 100.00, 5),
(10, 'AFG', 'Ręczny przycisk oddymiania', 'RPO – 02 / 7p', 1, 100.00, 5),
(11, 'AFG', 'Centrala sterujaca', 'AFG – 3', 1, 100.00, 5),
(12, 'INIM', 'Moduł Sartline', 'Smartline / 8Z-1', 1, 100.00, 5),
(13, 'INIM', 'Moduł Sartletloose', 'Smartletloose / one-1', 1, 100.00, 5);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `akumulatory_zasilacze_puszki`
--
ALTER TABLE `akumulatory_zasilacze_puszki`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `hilti`
--
ALTER TABLE `hilti`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `niedrzewne_hydrauliczne`
--
ALTER TABLE `niedrzewne_hydrauliczne`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `ssp`
--
ALTER TABLE `ssp`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `tryskaczowka_czerwone`
--
ALTER TABLE `tryskaczowka_czerwone`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `zasysanie_oddymianie`
--
ALTER TABLE `zasysanie_oddymianie`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akumulatory_zasilacze_puszki`
--
ALTER TABLE `akumulatory_zasilacze_puszki`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `hilti`
--
ALTER TABLE `hilti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `niedrzewne_hydrauliczne`
--
ALTER TABLE `niedrzewne_hydrauliczne`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `ssp`
--
ALTER TABLE `ssp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT for table `tryskaczowka_czerwone`
--
ALTER TABLE `tryskaczowka_czerwone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=218;

--
-- AUTO_INCREMENT for table `zasysanie_oddymianie`
--
ALTER TABLE `zasysanie_oddymianie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
