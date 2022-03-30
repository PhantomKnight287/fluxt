from app import db, socketio
from app.models import Channel


@socketio.on('getChannels')
def getChannels():
    channels = Channel.query.all()
    socketio.emit('Channels', {
        "channels": [{"id": channel.id, "name": channel.name} for channel in channels],
        "length": len(channels)
    }, broadcast=True)
