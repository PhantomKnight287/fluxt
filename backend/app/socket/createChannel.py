from app import db, socketio
from app.models import Channel


@socketio.on('createChannel')
def createChannel(data):
    print(data)
    print('createChannel')
    channel = Channel(name=data['name'])
    db.session.add(channel)
    db.session.commit()
    allChannels = Channel.query.all()
    socketio.emit('Channels', {
        "channels": [{
            'id': channels.id,
            'name': channels.name
        } for channels in allChannels]
    }, broadcast=True)
