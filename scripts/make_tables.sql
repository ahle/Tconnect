CREATE TABLE  `ta_key` ( \
  `id` int(11) NOT NULL AUTO_INCREMENT, \
  `remote_app` varchar(255) NOT NULL, \
  `priv_key` varchar(255) NOT NULL, \
  `modified_date` datetime NOT NULL, \
  PRIMARY KEY (`id`) \
);
CREATE TABLE  `ta_session` ( \
  `id` int(11) NOT NULL AUTO_INCREMENT, \
  `remote_app` varchar(255) DEFAULT NULL, \
  `remote_session` varchar(255) DEFAULT NULL, \
  `user` varchar(1000) DEFAULT NULL, \
  `local_session` varchar(255) DEFAULT NULL, \
  `modified_date` datetime NOT NULL, \
  PRIMARY KEY (`id`) \
);
CREATE TABLE  `ta_style` ( \
  `id` int(11) NOT NULL AUTO_INCREMENT, \
  `user` varchar(255) DEFAULT NULL, \
  `style` varchar(1000) DEFAULT NULL, \
  PRIMARY KEY (`id`) \
);
CREATE TABLE  `ta_visualisedtrace` ( \
  `id` int(11) NOT NULL AUTO_INCREMENT, \
  `user` varchar(255) DEFAULT NULL, \
  `trace_uri` varchar(255) DEFAULT NULL, \
  `style_id` varchar(1000) DEFAULT NULL, \
  PRIMARY KEY (`id`) \
);

