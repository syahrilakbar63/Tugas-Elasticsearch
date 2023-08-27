GET _search

{
    "query": {
        "query_string": {
            "query": "Andi",
            "fields": ["Nama"]
        }
    },
    "size": 10,
    "from": 0,
    "sort": []
}