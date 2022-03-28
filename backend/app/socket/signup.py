from app.models import User
from app import db, socketio
import bcrypt
from flask_socketio import emit


@socketio.event
def signup(data):
    print(data)
    user = User.query.filter_by(email=data['email']).first()
    print(user)
    if user:
        emit('signup', {'status': 'failed', 'message': 'User already exists'})
    elif not user:
        hashed_password = bcrypt.hashpw(
            data['password'].encode('utf-8'), bcrypt.gensalt())
        user = User(
            email=data['email'], password=hashed_password, username=data['username'])
        db.session.add(user)
        db.session.commit()
        emit('signup', {'status': 'success', 'user': {
            'id': user.id,
            'email': user.email,
            'username': user.username
        }})
