'''
Realtor Inbox demo app
======================

See README.md for installation and usage examples.
'''


import argparse
import json
import os
import random

from datetime import datetime, timedelta
from flask import Flask, jsonify, request, render_template, send_from_directory


app = Flask(__name__)


PAGE_SIZE = 20
REALTORS = None
MESSAGES = {}


def count_unread(messages):
    return len([m for m in messages.values() if not m['read']])


@app.after_request
def add_headers(response):
    '''Add CORS headers.'''
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Origin'] = '*'

    return response


@app.route('/realtors')
def realtors():
    '''Returns a list of realtors'''
    data = REALTORS
    return jsonify(data)


@app.route('/realtors/<int:id_>')
def realtor(id_):
    '''Returns a dictionnary with realtor information (id, title, ...), 404 if realtor is not found'''
    try:
        data = REALTORS[id_]
    except KeyError:
        return '', 404

    data['unread_messages'] = count_unread(MESSAGES[id_])
    return jsonify(data)


@app.route('/realtors/<int:id_>/messages')
def messages(id_):
    '''Returns message list sorted by descending date.'''
    data = sorted(MESSAGES[id_].values(), key=lambda x: x['date'], reverse=True)
    try:
        page = int(request.args.get('page', 1))
    except TypeError:
        return '', 400
    offset = (page - 1) * PAGE_SIZE
    limit = offset + PAGE_SIZE
    if page < 1 or len(data) < offset:
        return '', 416
    return jsonify(data[offset:limit])


@app.route('/realtors/<int:id_>/messages/<int:message_id>')
def message(id_, message_id):
    '''Returns a single message, 404 if message not found.'''
    try:
        data = MESSAGES[id_][message_id]
    except KeyError:
        return '', 404
    return jsonify(data)


@app.route('/realtors/<int:id_>/messages/<int:message_id>', methods=['PATCH'])
def read_message(id_, message_id):
    '''Mark a message as read and returns the message representation. 404 if message not found.'''
    try:
        data = MESSAGES[id_][message_id]
    except KeyError:
        return '', 404

    try:
        if request.json:
            state = bool(int(request.json['read']))
        else:
            state = bool(int(request.form['read']))
    except (KeyError, TypeError):
        return 'Unable to find `read` field', 400

    if data['read'] != state:
        if state:
            REALTORS[id_]['unread_messages'] -= 1
        else:
            REALTORS[id_]['unread_messages'] += 1
        data['read'] = state
    return jsonify(data)


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/swagger.yaml')
@app.route('/swagger.yml')
def swagger():
    return send_from_directory('swagger', 'swagger.yml')


def _build_data():
    '''Build random realtors, locally stored for the lifetime of the app.'''
    realtors = {}
    messages = {}
    for id_ in range(101, 104):
        msgs = dict(list(_build_messages()))
        realtors[id_] = {
            'id': id_,
            'name': 'Agence #{}'.format(id_),
            'unread_messages': count_unread(msgs),
            'logo': 'http://placehold.it/100x100?text=Agence+{}'.format(id_),
        }
        messages[id_] = msgs
    return realtors, messages


def _build_messages():
    '''Build random messages, locally stored for the lifetime of the app.'''
    read_status = [True, False, False, False]
    types = ['phone', 'email', 'sms']
    subjects = {
        'phone': 'Appel #{}',
        'email': 'Email #{}',
        'sms': 'SMS #{}',
    }
    firstnames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Charles',
                  'Joseph', 'Thomas', 'Christopher']
    lastnames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson',
                 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson']
    bodies = {
        'phone': (
            'Lorem Ipsum #{} is simply dummy text of the printing and typesetting industry. '
            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an '
            'unknown printer took a galley of type and scrambled it to make a type specimen book. '
            'It has survived not only five centuries, but also the leap into electronic typesetting, '
            'remaining essentially unchanged. It was popularised in the 1960s with the release of '
            'Letraset sheets containing Lorem Ipsum passages, and more recently with desktop '
            'publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        ),
        'email': (
            'Lorem Ipsum #{} is simply dummy text of the printing and typesetting industry. '
            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an '
            'unknown printer took a galley of type and scrambled it to make a type specimen book. '
            'It has survived not only five centuries, but also the leap into electronic typesetting, '
            'remaining essentially unchanged. It was popularised in the 1960s with the release of '
            'Letraset sheets containing Lorem Ipsum passages, and more recently with desktop '
            'publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        ),
        'sms': (
            'Lorem Ipsum #{} is simply dummy text of the printing and typesetting industry. '
            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an '
            'unknown printer took a galley of type and scrambled it to make a type specimen book. '
            'It has survived not only five centuries, but also the leap into electronic typesetting, '
            'remaining essentially unchanged. It was popularised in the 1960s with the release of '
            'Letraset sheets containing Lorem Ipsum passages, and more recently with desktop '
            'publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        ),
    }
    for id_ in range(1001, 1100):
        type_ = random.choice(types)
        d = datetime.now() - timedelta(days=random.randint(0, 730))
        firstname = random.choice(firstnames)
        lastname = random.choice(lastnames)
        yield id_, {
            'id': id_,
            'date': d.isoformat(),
            'type': type_,
            'contact': {
                'firstname': firstname,
                'lastname': lastname,
                'phone': '06' + str(random.randint(10000000, 99999999)),
                'email': '{}{}@gmail.com'.format(firstname[0], lastname).lower(),
            },
            'subject': subjects[type_].format(id_),
            'body': bodies[type_].format(id_).strip(),
            'read': random.choice(read_status),
        }


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Simple realtor messages API')
    parser.add_argument('-p', '--port', type=int, default=os.getenv('PORT', '8080'), help='TCP Port to listen to.')
    args = parser.parse_args()

    REALTORS, MESSAGES = _build_data()

    app.run(debug=True, host='0.0.0.0', port=args.port, threaded=True)
