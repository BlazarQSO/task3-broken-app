## Ошибки компиляции:
---
1. файл <span style="color:crimson">**'./models/game.js'**</span> добавить экспорт, строка 1 (ошибка компиляции)
```javascript
- function(sequelize, DataTypes) {

+ module.exports = function(sequelize, DataTypes) {
```
2. файл <span style="color:crimson">**'./controllers/usercontroller.js'**</span> добавить require для импорта Router, строка 1 (ошибка компиляции)
```javascript
- var router = Router();

+ var router = require('express').Router();
```
3. файл <span style="color:crimson">**'./controllers/usercontroller.js'**</span> добавить верный путь до библиотеки bcryptjs, строка 2 (ошибка компиляции)
```javascript
- var bcrypt = require('bcrypt');

+ var bcrypt = require('bcryptjs');
```
4. файл <span style="color:crimson">**'./controllers/usercontroller.js'**</span> изменить импорт сущностей, строка 5 (ошибка компиляции)
```javascript
-var User = require('../db').import('../models/user');

+var path = require('path');
+var { DataTypes } = require('sequelize');
+var sequelize = require('../db');
+var User = require(path.join(__dirname, '../models/user'))(sequelize, DataTypes);
```
5. файл <span style="color:crimson">**'db.js'**</span> добавить экспорт сущности, строка 18 (ошибка компиляции)
```javascript
+ module.exports = sequelize;
```
6. файл <span style="color:crimson">**'./controllers/gamecontroller.js'**</span> исправить ошибочный импорт, строка 116 (ошибка компиляции)
```javascript
- module.exports = routers;

+ module.exports = router;
```
7. файл <span style="color:crimson">**'./controllers/gamecontroller.js'**</span> изменить импорт сущностей, строка 2 (ошибка компиляции)
```javascript
- var Game = require('../db').import('../models/game');

+ var path = require('path');
+ var { DataTypes } = require('sequelize');
+ var sequelize = require('../db');
+ var Game = require(path.join(__dirname, '../models/game'))(sequelize, DataTypes);
```
8. файл <span style="color:crimson">**'./middleware/validate-session.js'**</span> изменить импорт сущностей, строка 2 (ошибка компиляции)
```javascript
-var User = require('sequelize').import('../models/user');

+var path = require('path');
+var { DataTypes } = require('sequelize');
+var sequelize = require('../db');
+var User = require(path.join(__dirname, '../models/user'))(sequelize, DataTypes);
```
---
## Логические  ошибки:
---
1. файл <span style="color:crimson">**'app.js'**</span> добавить порт 4000 локального хоста, строка 13 (логическая ошибка)
```javascript
- app.listen(function() {

+ app.listen(4000, function() {
```
2. файл <span style="color:crimson">**'db.js'**</span> добавить порт 5433 базы данных, строка 6 (логическая ошибка)
```javascript
+ port: 5433,
```
3. файл <span style="color:crimson">**'package.json'**</span> Обновить библиотеки до последних версий, строка 14, 15 (логическая ошибка)
```javascript
- "pg": "^7.6.0",
- "sequelize": "^4.41.0"

+ "pg": "^8.6.0",
+ "sequelize": "^6.6.2"
```
4. файл <span style="color:crimson">**'app.js'**</span> изменить парсер, строка 9 (логическая ошибка)
```javascript
- app.use(require('body-parser'));

+ app.use(express.json());
```
5. файл <span style="color:crimson">**'./controllers/usercontroller.js'**</span> исправить опечатку свойства на passwordHash, строка 18 (оригинальная строка 14) (логическая ошибка)
```javascript
- passwordhash: bcrypt.hashSync(req.body.user.password, 10),

+ passwordHash: bcrypt.hashSync(req.body.user.password, 10),
```
6. файл <span style="color:crimson">**'./controllers/gamecontroller.js'**</span> исправить привязку игр по идентификатору  пользователя, строка 45 (логическая ошибка)
```javascript
- owner_id: req.body.user.id,

+ owner_id: req.user.id,
```
7. файл <span style="color:crimson">**'./controllers/gamecontroller.js'**</span> исправить вывод данных из ответа, строка 12 (логическая ошибка)
```javascript
- games: games,

+ games: data,
```
8. файл <span style="color:crimson">**'./controllers/gamecontroller.js'**</span> исправить передачу идентификатора для поиска, строка 76 (логическая ошибка)
```javascript
- owner_id: req.user

+ owner_id: req.user.id
```
9. файл <span style="color:crimson">**'./models/user.js'**</span> добавить необходимые поля для корректного создания базы данных, чтобы имя пользователя было уникальное, имя пользователя не должно быть меньше трёх символов и больше 20, строки 10-14 (логическая ошибка)
```javascript
- allowNull: false

+ allowNull: false,
+ unique: 'username',
+ validate: {
+    len: [3, 20],
+ },
```
10. файл <span style="color:crimson">**'./controllers/usercontroller.js'**</span>  пароль не должен быть меньше 3 символов, строка 11-14 (логическая ошибка)
```javascript
+ if (req.body.user.password.length < 3) {
+    res.status(401).send('The password must be at least 3 characters long');
+ }
```
11. файл <span style="color:crimson">**'./models/game.js'**</span> поле тайтл не должно быть пустым, строки 6-8 (логическая ошибка)
```javascript
+ validate: {
+    notEmpty: true,
+ },
```
