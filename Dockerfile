# Dockerfile
FROM php:8.1-cli
# Update
RUN apt-get update -y && apt-get install -y libmcrypt-dev
# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Install php extensions
RUN docker-php-ext-install pdo_mysql
# Install symfony cli https://symfony.com/download
RUN echo 'deb [trusted=yes] https://repo.symfony.com/apt/ /' | tee /etc/apt/sources.list.d/symfony-cli.list
RUN apt update
RUN apt install -y symfony-cli
# Set working directory
WORKDIR /app
COPY . /app
# composer install
RUN composer install
# Expose ports
EXPOSE 8000
# Serve symfony
CMD symfony server:start