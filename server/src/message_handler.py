import time

from flask import Flask, jsonify;
from flask_socketio import SocketIO, send, emit

from database import Database

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'

socketIo = SocketIO(app, cors_allowed_origins="*")

app.debug = True
app.host = 'localhost'

db = Database()

@socketIo.on("message")
def handleMessage(msg_type, *args, **kwargs):
    """
    Function for responding to update or delete messages from client
    """

    # here we take information, update data, and then send objects one by one back to the server
    start_time = time.time()
    if msg_type == 'update':
        # handle update
        db.add_entry(*args)
        pass
    elif msg_type == 'delete':
        # handle deletion
        db.remove_entry(*args)
        pass

    # iterate through objects one at a time, updating object
    documents = db.get_entries()
    msg = [f"{document}" for document in documents]

    # verify this occurs quickly for debugging purposes 
    print(f"total backend execution time was {time.time() - start_time}")
    send(msg, broadcast=True)
    return None

if __name__ == '__main__':
    socketIo.run(app)