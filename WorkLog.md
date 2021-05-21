1. файл game.js добавить экспорт, строка 1 (ошибка компиляции)
-function(sequelize, DataTypes) {
+module.exports = function(sequelize, DataTypes) {
1. файл usercontroller.js добавить require для импорта Router, строка 1 (ошибка компиляции)
-var router = Router();
+var router = require('express').Router();
1. файл usercontroller.js добавить верный путь до библиотеки bcryptjs, строка 2 (ошибка компиляции)
-var bcrypt = require('bcrypt');
+var bcrypt = require('bcryptjs');
1. файл usercontroller.js изменить импорт сущностей, строка 5 (ошибка компиляции)
-var User = require('../db').import('../models/user'); =>
+var path = require('path');
+var { DataTypes } = require('sequelize');
+var sequelize = require('../db');
+var User = require(path.join(__dirname, '../models/user'))(sequelize, DataTypes);
1. файл db.js добавить экспорт сущности, строка 18 (ошибка компиляции)
module.exports = sequelize;
1. файл gamecontroller.js исправить ошибочный импорт, строка 116 (ошибка компиляции)
-module.exports = routers;
+module.exports = router;
1. файл gamecontroller.js изменить импорт сущностей, строка 2 (ошибка компиляции)
-var Game = require('../db').import('../models/game');
+var path = require('path');
+var { DataTypes } = require('sequelize');
+var sequelize = require('../db');
+var Game = require(path.join(__dirname, '../models/game'))(sequelize, DataTypes);
1. файл validate-session.js изменить импорт сущностей, строка 2 (ошибка компиляции)
-var User = require('sequelize').import('../models/user');
+var path = require('path');
+var { DataTypes } = require('sequelize');
+var sequelize = require('../db');
+var User = require(path.join(__dirname, '../models/user'))(sequelize, DataTypes);
