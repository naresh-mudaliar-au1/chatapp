**Note: If import for API collection does not work please try using insomnia http client application!**

**Installation**
1) npm install
2) copy env-example and create .env file
3) npm run start:dev

_=> versioning: /api/v1/_

**User Routes**

**user/login :**
Method:POST

```json
{
  "username": "naresh1234567",
  "password": "naresh@gmail"
}
```

**user/signup :**
Method:POST

```json
{
  "username": "naresh1234567",
  "password": "naresh@gmail"
}
```

**-----------------------------------------------------------**
**Feature List**
1) User Module
2) Validations added where required! 
3) Chat and message services added with socketio implementation
