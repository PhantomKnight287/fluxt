from app import socketio as socket
from flask_socketio import emit
from app import models
import bcrypt


@socket.on('hello')
def connect():
    print('connected')


@socket.event
def login(data):
    print(data)
    user = models.User.query.filter_by(email=data['email']).first()
    print(user)
    if user:
        if bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
            emit('login', {'status': 'success', 'user': user.to_json()})
        else:
            emit('login', {'status': 'failed', 'message': 'Wrong password'})
    elif not user:
        emit('login', {'status': 'failed', 'message': 'User not found'})
