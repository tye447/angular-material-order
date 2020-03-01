# AngularMaterial

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3.

## Steps to Setup

### 1. Clone the application

	> git clone https://github.com/tianjianye/Angular-Material.git

### 2. Create Mysql database

	> create database supermarket

### 3. Change mysql username and password as per your installation

+ open >src/main/resources/application.properties

+ change >spring.datasource.username and spring.datasource.password as per your mysql installation

### 4. Build and run the app using maven

	> mvn package
	> java -jar target/Orders.jar

Alternatively, you can run the app without packaging it using -

	> mvn spring-boot:run
	
The app will start running at http://localhost:8080.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.