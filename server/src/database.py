from typing import Dict, List

from pymongo import MongoClient


class Database:
    """
    Class for storing object entries in mongo DB 
    """
    def __init__(self):
        client = MongoClient("mongodb://localhost:27017/")
        self.db = client["object_db"]
        self.col = self.db["objects"]
        self.col.remove({})

    def add_entry(self, id: str, x: str, y: str):

        if self.col.find({'_id': id}):
            self.col.replace_one(
                {'_id': id}, {
                    '_id': id,
                    "x": x,
                    "y": y},
                    upsert=True
                )
        else:
            self.col.insert({
               '_id': id,
                "x": x,
                "y": y,
            })
    
    def remove_entry(self, id):
        self.col.delete_one({"_id": id})


    def get_entries(self):
        my_results = list(self.col.find({}))
        return [(result['_id'], result['x'], result['y']) for result in my_results]