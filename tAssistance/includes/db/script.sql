mysql -uroot -padmin;
create database tAssistant;
create USER 'tassistantuser'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON 'tAssistant'. * TO 'tassistantuser'@'localhost';

mysql -utassistantuser -p123456;
use tassistant;
create table ta_style ( id int not null auto_increment, user varchar(255), style varchar(1000), primary key (id) );
create table ta_visualisedtrace ( id int not null auto_increment, user varchar(255), trace_uri varchar(255), style_id varchar(1000), primary key (id));
create table ta_session ( id int not null auto_increment, remote_app varchar(255), remote_session varchar(255), user varchar(1000), local_session varchar(255), modified_date datetime, primary key (id));
CREATE TABLE  `tassistant`.`ta_key` (`id` int NOT NULL AUTO_INCREMENT, `remote_app` varchar(255) NOT NULL, `priv_key` varchar(255) NOT NULL, PRIMARY KEY (`id`));
