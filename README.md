An open source application framework written in following technologies:
1. Spring Boot 
2. Spring MVC Rest API
3. Hibernate 
4. Postgresql Database (other databases will be available soon)
5. Angular4 (angular cli) with Typescript.
6. ng2-admin Dashboard.

In order to run project do following steps:
1. install node.js
2. install Maven (3.5 or higher)
3. install latest version of Postgresql database.
4. install git
5. install angular CLI
5. clone project in a directory:

   git clone https://github.com/ahmadsadeghian/ir-framework.git
7. run following node command:
   npm install
8. create database ng2boot (configuration of database connection exists in src/main/resources/application.properties)
9. run following maven command (this command will open port 8080 to serve application):
   mvn spring-boot:run
10. after starting embedded tomcat, run script.sql in your database  
11. open browser, type this in the address bar: localhost:8080.
12. login with user: admin password: 1
13. in order to live reload of typescript codes, run following node command:
   ng build --watch
14. enjoy the app :-)

We are happy to be involved with you.
