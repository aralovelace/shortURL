#HN-BIT Shortened DEV Links


##Description
This web app allow a user to enter a valid URL and give back a shortened version using a human readable word or words as a substitute for their URL. 

##Technical Details:
Server-Side: PHP/MySQL
Framework: Laravel
Frontend: React JS


# Getting started

## Installation

Please check the official laravel installation guide for server requirements before you start. [Official Documentation](https://laravel.com/docs/5.4/installation#installation)


Clone the repository

    git clone https://github.com/aralovelace/shortURL.git

Switch to the repo folder

    cd shortURL


To Test in Local, Recommend to Use Docker using Laradock

    docker-compose up -d nginx php-fpm mysql


Install all the dependencies using composer

    composer install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate


Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Install node modules

    npm install




