# app.py

import os
import jwt
import datetime

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

database_uri = 'postgresql://postgres:postgres@localhost/flask_auth'
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

SECRET_KEY = "bdbe9983657bd21e7d01fe22fee2bc643448eb1dce5c964e454eb3aa493d"

db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = bcrypt.generate_password_hash(password, 10).decode()
        self.created_at = datetime.datetime.now()


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password', 'created_at')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


def encode_auth_token(user_id):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=30*60),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')


@staticmethod
def decode_auth_token(auth_token):
    payload = jwt.decode(auth_token, SECRET_KEY)
    return payload['sub']


@app.route('/authenticate', methods=['POST'])
def authenticate():
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        try:
            auth_token = encode_auth_token(user.id)
            if auth_token:
                return jsonify({
                    'auth_token': auth_token
                }), 200
        except Exception as e:
            print(e)
            return jsonify({
                'message': 'Internal server error.'
            }), 500
    else:
        return jsonify({
            'message': 'Invalid credentials. Please try again.'
        }), 401


@app.route('/users', methods=['POST'])
def add_user():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({
            'message': 'User already exists. Please try again.'
        }), 400

    new_user = User(name, email, password)
    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user), 201


@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    result = users_schema.dump(users)
    return jsonify(result), 200


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({
            'message': 'User not found.'
        }), 404

    return user_schema.jsonify(user), 200


@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({
            'message': 'User not found.'
        }), 404

    name = request.json['name']
    email = request.json['email']

    user.name = name
    user.email = email

    db.session.commit()

    return user_schema.jsonify(user), 200


@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({
            'message': 'User not found.'
        }), 404

    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user), 200


if __name__ == '__main__':
    app.run(debug=True, port=3030)
