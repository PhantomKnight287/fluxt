from datetime import datetime
from app import db

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    body = db.Column(db.String(2000))
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'))
    username = db.Column(db.String(64))
