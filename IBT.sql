create database if not exists api_ibt;

use api_ibt

create table if not exists news(
    news_id int not null auto_increment,
    category_id int not null,
    news_title varchar(255),
    news_date varchar(255);
    news_author varchar(255);
    category_name varchar(255);
    news_image varchar(255),
    news_content varchar(255),
    primary key (news_id)
);

create table if not exists category(
    category_id int not null auto_increment,
    category_name varchar(255),
    primary key (category_id)
);

create table if not exists product(
    product_id int not null auto_increment,
    category_id int not null,
    news_id int not null,
    product_name varchar(255),
    product_description varchar(255),
    product_advantage varchar(255),
    product_image varchar(255),
    news_image varchar(255),
    news_content varchar(255),
    primary key (product_id)
);

create table if not exists tenants(
    tenant_id int not null auto_increment,
    product_id int not null,
    tenant_name varchar(255),
    tenant_address varchar(255),
    tenant_description varchar(255),
    tenant_image varchar(255),
    primary key (tenant_id)
);

create table if not exists partners(
    partner_id int not null auto_increment,
    partner_name varchar(255),
    partner_image varchar(255),
    primary key (partner_id)
);

create table if not exists mentors(
    mentor_id int not null auto_increment,
    mentor_name varchar(255),
    mentor_position varchar(255),
    mentor_image varchar(255),
    primary key (mentor_id)
);

create table if not exists events(
    event_id int not null auto_increment,
    category_id int not null,
    event_title varchar(255),
    event_date date,
    event_deadline date,
    event_thumbnail varchar(255),
    event_image varchar(255),
    event_content varchar(255),
    event_destination varchar(255),
    primary key (event_id)
);

create table if not exists program_level(
    level_id int not null auto_increment,
    level_name varchar(255),
    level_description varchar(255),
    primary key (level_id)
);

create table if not exists programs(
    program_id int not null auto_increment,
    program_key int not null,
    program_title varchar(255),
    program_logo varchar(255),
    program_image varchar(255),
    program_destination varchar(255),
    program_content varchar(255),
    primary key (program_id)

);

create table if not exists about(
    about_id int not null auto_increment,
    about_title varchar(255),
    about_content varchar(255),
    primary key (about_id)
);

create table if not exists tagline(
    tagline_id int not null auto_increment,
    tagline_title varchar(255),
    tagline_subtitle varchar(255),
    primary key (tagline_id)
);