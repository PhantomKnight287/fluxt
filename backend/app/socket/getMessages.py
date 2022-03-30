from app import db, socketio
from app.models import Message


@socketio.on('getMessages')
def getMessages(data):

    messages = Message.query.filter_by(channel_id=data['id']).all()
    socketio.emit('Messages', {
        "messages": [{"id": message.id, "message": message.body, "username": message.username} for message in messages],
        "length": len(messages)
    }, broadcast=True)
