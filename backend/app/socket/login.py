from app import socketio as socket
from flask_socketio import emit
from app import models
import bcrypt


@socket.event
def login(data):
    print(data)
    user = models.User.query.filter_by(email=data['email']).first()
    if user:
        if bcrypt.checkpw(data['password'].encode('utf-8'), user.password):
            emit('loginChecks', {'status': 'success', 'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username
            },
                "message": f"Welcome {user.username}"})

        else:
            emit('loginChecks', {'status': 'failed', 'message': 'Wrong password'})
    else:
        emit('loginChecks', {'status': 'failed', 'message': 'User not found'})
