# API

Опис структури API.

 * `"..."` - позначка одиничних данних.
 * `{"..."}` - позначка повторюваних данних.
 * `"<name>"` - підстановка поля з ключом _name_

## Отримання данних

### GET /config/
Віддає MapBox config з config.json

__Response:__

```json
{
    "token": "...",
    "center": [48.8, 31.2],
    "zoom": 6
}
```
### api/

### header
Авторизуе користувача, обов'язкове поле для роботи з api/

Authorization: <token>

### GET cities/
Віддає список всіх міст 

__Response:__

```json
{   
    "message": "..." ,
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

### GET cities/?id=...
Віддає список міст з заданим id

### POST cities/
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

### DELETE cities/
Видаляе місто задане через id

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

### PUT cities/
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


### GET data_sets/
Віддає список всіх наборів данних

__Response:__

```json
{
    "message": "..." ,
    "list": [
        {
            "id": 1,
            "name": "Народжуваність"
        },
        {"...."}
    ]
}
```

### GET data_sets/
Віддає список всіх наборів данних 

__Response:__

```json
{   
    "message": "..." ,
    "list": [
        {
            "id": 1,
            "name": "...",
        },
        {"...."}
    ]
}
```

### GET data_sets/?id=...
Віддає список наборів данних з заданим id

### POST data_sets/
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

### DELETE data_sets/
Видаляе набір данних задане через id

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

### PUT data_sets/
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

### GET data_entries/
Віддає список всіх данних 

__Response:__

```json
{   
    "message": "..." ,
    "list": [
        {
            "id": 1,
            "value": 42,
            "time": 1458421488,
            "set_id": 1,
            "city_id": 1
        },
        {"...."}
    ]
}
```

### GET data_entries/?id=...
Віддає список данних з заданим id.

### GET data_entries/?<filter>=...&...
Список фільтрів:
 * `sets` - список ID наборів данних
 * `cities` - список ID міст
 * `after` / `before` - верхня / нижня часова межа вибірки
Віддає список данних з заданим фільтром.
Якщо задано id=... то GET data_entries/?id=...

### POST data_entries/
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

### DELETE data_entries/
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

### PUT data_entries/
Зберігає набір данних усі поля обов'язкові

__Request:__
```json
{
    "id": 1,
    "value": 42,
    "time": 1458421488,
    "set_id": 1,
    "city_id": 1
}
```

__Response:__

```json
{   
    "message": "..." ,
}
```

### GET api/search/?q=...
Виконуе пошук по полю name н таблицях coties, data_sets

__Response:__

```json
{   
    "message": "..." ,
    "list": {
        "cities": [
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
                "city_id": 1
            },
            {"...."}
        ]
    }   
}
```


### auth/

### POST login/

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
    "message": "..." ,
    "token": "..."
}
```
### POST logup/

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
    "message": "..." ,
}
```

### GET logup/

__Response:__

```json
{   
    "message": "..." ,
}
```

### GET token/
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
