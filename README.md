###### restify-MongoDBAuthJWT-RestApi 

###### ///////////////////////
##### _npm install -i_
##### _nodemon index.js_
###### ///////////////////////

improt file  **'JWTRestify authAPI.postman_collection.json'** As **postman** test API

> Insert USER Email in jwt
```javascript
POST http://localhost:3000/customers/insert

"header": 
					"name": "Content-Type",
					"value": "application/json",

					"key": "Authorization",
					"value": "jwt 
"body": {
					"mode": "raw",
					"raw": "{\n\n\t\"balance\": \"0\"\n}",
		
        }
 ```
###### ========================================================================

> update balance bu id
```javascript
PUT http://localhost:3000/customers/:_id

"header": 
					"name": "Content-Type",
					"value": "application/json",

					"key": "Authorization",
					"value": "jwt 

"body": {
					"mode": "raw",
					"raw": "{\n\t\"balance\": \"36\"\n}"
		}
```
###### ========================================================================

> GET list all customer in JWT email
```javascript
GET http://localhost:3000/customers/List

"header": 
						"name": "Content-Type",
						"value": "application/json",

						"key": "Authorization",
						"value": "jwt 
```
###### ========================================================================

> Delete by id
```javascript
DELETE  http://localhost:3000/customers/:_id

"header": 
					"name": "Content-Type",
					"value": "application/json",

					"key": "Authorization",
					"value": "jwt 
                
```
###### ========================================================================
> register auth

```javascript
POST http://localhost:3000/register

"body": {
					"mode": "raw",
					"raw": "{\n\t\"email\": \"admin@gmail.com\",\n\t\"password\": \"0123456\"\n}"
		}
```
###### ========================================================================
> GET token by auth
```javascript
POST http://localhost:3000/auth

"body": {
					"mode": "raw",
					"raw": "{\n\t\"email\": \"admin@gmail.com\",\n\t\"password\": \"0123456\"\n}"
		}"# restify-MongoDBAuthJWT-RestApi" 
 ```
