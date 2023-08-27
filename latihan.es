GET _search

{
    "query": {
        "query_string": {
            "query": "Andi",
            "fields": ["Name"]
        }
    },
    "size": 10,
    "from": 0,
    "sort": []
}