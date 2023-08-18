GET _search

{
    "query": {
        "query_string": {
            "query": "Andi",
            "fields": ["nama"]
        }
    },
    "size": 10,
    "from": 0,
    "sort": []
}