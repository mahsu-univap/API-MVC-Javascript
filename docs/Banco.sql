-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema univap
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema univap
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `univap` DEFAULT CHARACTER SET utf8mb4 ;
USE `univap` ;

-- -----------------------------------------------------
-- Table `univap`.`disciplinas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `univap`.`disciplinas` (
  `codigodisc` INT(11) NOT NULL AUTO_INCREMENT,
  `nomedisc` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`codigodisc`))
ENGINE = InnoDB
AUTO_INCREMENT = 60
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `univap`.`professores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `univap`.`professores` (
  `registro` INT(11) NOT NULL AUTO_INCREMENT,
  `nomeprof` VARCHAR(50) NULL DEFAULT NULL,
  `idadeprof` INT(11) NULL DEFAULT NULL,
  `salarioprof` FLOAT NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `senha` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`registro`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `univap`.`disciplinasxprofessores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `univap`.`disciplinasxprofessores` (
  `idDiscProf` INT(11) NOT NULL AUTO_INCREMENT,
  `curso` VARCHAR(255) NULL DEFAULT NULL,
  `cargahoraria` INT(11) NULL DEFAULT NULL,
  `anoletivo` INT(11) NULL DEFAULT NULL,
  `coddisciplinas` INT(11) NULL DEFAULT NULL,
  `codprofessores` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idDiscProf`),
  INDEX `codprofessores` (`codprofessores` ASC),
  INDEX `disciplinasxprofessores_ibfk_1` (`coddisciplinas` ASC),
  CONSTRAINT `disciplinasxprofessores_ibfk_1`
    FOREIGN KEY (`coddisciplinas`)
    REFERENCES `univap`.`disciplinas` (`codigodisc`),
  CONSTRAINT `disciplinasxprofessores_ibfk_2`
    FOREIGN KEY (`codprofessores`)
    REFERENCES `univap`.`professores` (`registro`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
