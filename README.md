An open source application framework written in following technologies:
1. Spring Boot 
2. Spring MVC Rest API
3. Hibernate 
4. Postgresql Database (other databases will be available soon)
5. Angular4 with Typescript.
6. ng2-admin Dashboard.

In order to run project do following steps:
1. install node.js
2. install Maven (3.5 or higher)
3. install latest version of Postgresql database.
4. install git
5. clone project in a directory:
    mkdir irframework-project
    cd irframework-project
    git clone https://github.com/ahmadsadeghian/ir-framework.git
6. run following node command:
    npm install
7. create database ng2boot (configuration of database connection exists in src/main/resources/application.properties)
8. run following maven command:
    mvn spring-boot:run
    this command will open port 8080 to serve application.
9. after starting embedded tomcat, run script.sql in your database  
10. open browser, type this in the address bar: localhost:8080
11. enjoy the app :-)

We are happy to be involved with you.
