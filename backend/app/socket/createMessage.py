from app import db, socketio
from app.models import Message


@socketio.on("messageCreate")
def createMessage(data):
    print("createMessage")
    message = Message(
        body=data['message'], username=data['username'], channel_id=data['channel_id'])
    db.session.add(message)
    db.session.commit()
    messages = Message.query.filter_by(channel_id=data['channel_id']).all()
    socketio.emit('Messages', {
        "messages": [{"id": message.id, "message": message.body, "username": message.username} for message in messages],
        "length": len(messages)
    }, broadcast=True)
