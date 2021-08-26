brew services start mongodb/brew/mongodb-community

CLEAR_DB=${1:-False}

env/bin/python3 server/src/message_handler.py $CLEAR_DB

