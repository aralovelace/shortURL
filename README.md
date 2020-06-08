# HN-BIT Shortened DEV Links

![GitHub Logo](https://aralovelace.files.wordpress.com/2020/06/screenshot-2020-06-08-at-02.06.42.png)

## Description
This web app allow a user to enter a valid URL and give back a shortened version using a human readable word or words as a substitute for their URL. 

## Technical Details:
- Server-Side: PHP/MySQL
- Framework: Laravel
- Frontend: React JS

## Note
- For the Statistic, Please refer to the database table: "public_urls"   column: **number of visit** .



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


# Code overview

## Package Dependencies (manually added)
- react-moment
- react-spinners
- moment-precise-range-plugin

## Folders

- `app` - Contains all the Eloquent models
- `app/Http/Controllers` - Contains all the api controllers
- `config` - Contains all the application configuration files
- `database/migrations` - Contains all the database migrations
- `routes` - Contains all the api routes defined in api.php file
- `tests` - Contains all the application tests
- `resources/views/index.blade.php` - the only view file used to call the react scripts
- `resources/js` - Contains all react javascript files
- `storage/wordlist` - Contain the txt file used for the shortcodes

## Environment variables

- `.env` - Environment variables can be set in this file


# Testing API

Run the laravel development server

    php artisan serve

The api can now be accessed at

    http://localhost:8000/api






