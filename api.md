# API

Опис структури API.

 * `"..."` - позначка одиничних данних.
 * `{"..."}` - позначка повторюваних данних.
 * `"<name>"` - підстановка поля з ключом _name_

## Отримання данних

### GET api/config/
Віддає Map config з config.json

__Response:__

```json
{
    "token": "...",
    "center": [48.8, 31.2],
    "zoom": 6
}
```

### error BadRequest
__Response:__

```json
{   
    "message": "..." ,
}
```

### header
Авторизуе користувача, обов'язкове поле для роботи з api/

Authorization: <token>

### GET api/locations/
Віддає список всіх міст 

__Response:__

```json
{   
    "list": [
        {
            "id": 1,
            "name": "Київ",
            "lat": 50.447,
            "lon": 30.550
        },
        {"...."}
    ]
}
```

### GET api/locations/?id=...
Віддає список міст з заданим id

### POST api/locations/
Оновлюе місто задане через id

__Request:__
```json
{
    "id": 1,
    "<field>": "<value>",
}
```

__Response:__

```json
{   
    "message": "..." ,
}
```

### DELETE api/locations/
Видаляе міста задане через id

__Request:__
```json
{
    "ids": [1,2,3,4,5],
}
```

__Response:__

```json
{   
    "message": "..." ,
}
```

### PUT api/locations/
Зберігає місто усі поля обов'язкові

__Request:__
```json
{
    "lat": 123.54,
    "lon": 31.42,
    "name": "some point",
}
```

__Response:__

```json
{   
    "message": "..." ,
}
```

### GET api/data_sets/
Віддає список всіх наборів данних 

__Response:__

```json
{
    "list": [
        {
            "id": 1,
            "name": "...",
        },
        {"...."}
    ]
}
```

### GET api/data_sets/?id=...
Віддає список наборів данних з заданим id

__Response:__

```json
{
    "list": [
        {
            "id": 1,
            "name": "...",
        },
        {"...."}
    ]
}
```

### POST api/data_sets/
Оновлюе набір данних заданий через id

__Request:__
```json
{
    "id": 1,
    "<field>": "<value>",
}
```

__Response:__

```json
{   
    "message": "..." ,
}
```

### DELETE api/data_sets/
Видаляе набір данних заданих через id

__Request:__
```json
{
    "ids": [1,2,3,4,5],
}
```

__Response:__

```json
{   
    "message": "..." ,
}
```

### PUT api/data_sets/
Зберігає набір данних усі поля обов'язкові

__Request:__
```json
{
    "name": "some data_set",
}
```

__Response:__

```json
{   
    "message": "..." ,
}
```

### GET api/data_entries/
Віддає список всіх данних 

__Response:__

```json
{
    "list": [
        {
            "id": 1,
            "value": 42,
            "time": 1458421488,
            "set_id": 1,
            "location_id": 1
        },
        {"...."}
    ]
}
```

### GET api/data_entries/?id=...
Віддає список данних з заданим id.

### GET api/data_entries/?<filter>=...&...
Список фільтрів:
 * `sets` - список ID наборів данних
 * `locations` - список ID міст
 * `after` / `before` - верхня / нижня часова межа вибірки
Віддає список данних з заданим фільтром.
Якщо задано id=... то GET data_entries/?id=...

### POST api/data_entries/
Оновлюе данні задані через id

__Request:__
```json
{
    "id": 1,
    "<field>": "<value>",
}
```

__Response:__

```json
{   
    "message": "..." ,
}
```

### DELETE api/data_entries/
Видаляе данні задані через id

__Request:__
```json
{
    "ids": [1,2,3,4,5],
}
```

__Response:__

```json
{   
    "message": "..." ,
}
```

### PUT api/data_entries/
Зберігає набір данних усі поля обов'язкові

__Request:__
```json
{
    "id": 1,
    "value": 42,
    "time": 1458421488,
    "set_id": 1,
    "location_id": 1
}
```

__Response:__

```json
{   
    "message": "..." ,
}
```

### GET api/search/?q=...
Виконуе пошук по полю name у таблицях locations, data_sets

__Response:__

```json
{
    "list": {
        "locations": [
            {
                "id": 1,
                "name": "Київ",
                "lat": 50.447,
                "lon": 30.550
            },
            {"...."}
        ],
        "data_sets": [
            {
                "id": 1,
                "value": 42,
                "time": 1458421488,
                "set_id": 1,
                "location_id": 1
            },
            {"...."}
        ]
    }   
}
```

### POST api/auth/login/

__Request:__
```json
{
    "username": "..." ,
    "password": "..." 
}
```
__Response:__

```json
{
    "token": "..."
}
```
### POST api/auth/logup/

__Request:__
```json
{
    "username": "..." ,
    "password": "..."
}
```

__Response:__

```json
{
    "username": "..." ,
    "password": "...",
    "token": "..." 
}
```

### GET api/auth/logup/

__Response:__

```json
{   
    "message": "..." ,
}
```

### GET api/auth/token/
Віддає статус токену

__Response:__

```json
{   
    "username": "..." ,
    "is_admin": "..." ,
    "user_id": "..." ,
    "created": "..."
}
```
