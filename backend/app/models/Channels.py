from app import db


class Channel(db.Model):
    __tablename__ = 'channels'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=False)
    created_at = db.Column(db.DateTime, index=True, default=db.func.now())
    updated_at = db.Column(db.DateTime, index=True,
                           default=db.func.now(), onupdate=db.func.now())


    def __repr__(self):
        return '<Channel {}>'.format(self.name)
