## Запуск в Docker
### build:
    docker compose build
### up:
    docker compose up
### Получение информации о сумме товаров заказанных под каждого клиента
    GET /clients
      выход: [
	    {
		    "id": 4,
		    "name": "Tracy Mosciski",
		    "total_ordered": "2"
	    },
	    {
		    "id": 2,
		    "name": "Rodney Kessler",
		    "total_ordered": "31"
	    },
        ....
    ]
    
### Получение количества дочерних элементов первого уровня вложенности для категорий
    GET /count
        выход: [
	    {
		    "uuid": "f7f76221-db31-4d60-bd04-62b7956cc738",
		    "child_count": "0",
		    "name": "Телевизоры"
	    },
	    {
		    "uuid": "74a924c9-d7ae-4dbc-a652-3f06b0df5472",
		    "child_count": "2",
		    "name": "Бытовая техника"
	    },
	    {
		    "uuid": "104222c5-e644-42e7-be63-2a7cefbe1ef9",
		    "child_count": "2",
		    "name": "Холодильники"
	    },
        ....
    ]
    
### Схема данных

    https://i.imgur.com/9rctC4T.png
