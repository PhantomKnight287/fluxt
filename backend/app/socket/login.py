from app import socketio as socket
from flask_socketio import emit
from app import models
import bcrypt

@socket.event
def login(data):
    print(data)
    user = models.User.query.filter_by(email=data['email']).first()
    print(user.password)
    if user:
        if bcrypt.checkpw(data['password'].encode('utf-8'), user.password):
            emit('login', {'status': 'success', 'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username
            }})
        else:
            emit('login', {'status': 'failed', 'message': 'Wrong password'})
