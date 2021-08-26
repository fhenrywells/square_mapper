from typing import Dict, List

from pymongo import MongoClient


class Database:
    """
    Class for storing object entries in mongo DB 
    """
    def __init__(self, clear_old: bool):
        client = MongoClient("mongodb://localhost:27017/")
        db = client["object_db"]
        self.col = db["objects"]
        if clear_old:
            self.col.remove({})

    def add_entry(self, id: str, x: str, y: str):
        """
        Add a document to the collection if it doesn't exist.
        Otherwise, replace the documentn with the same id.
        """

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
    
    def remove_entry(self, id: str):
        """
        Delete a document with a given id.
        """
        self.col.delete_one({"_id": id})


    def get_entries(self):
        """
        Get all entries in the collection.
        """
        my_results = list(self.col.find({}))
        return [(result['_id'], result['x'], result['y']) for result in my_results]