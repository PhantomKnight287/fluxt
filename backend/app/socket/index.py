from app import socketio as socket

@socket.on('hello')
def connect():
    print('connected')
