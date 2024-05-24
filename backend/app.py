from flask import Flask, request, jsonify
from flask_cors import CORS
# from marshmallow import Schema, fields, ValidationError
# from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address
import json
import os

app = Flask(__name__)
CORS(app) # to allow cross-origin requests from any origin

DATA_FILE = 'data.json'

# limiter = Limiter(
#     app,
#     key_func=get_remote_address,
#     default_limits=["200 per day", "50 per hour"]
# )


def read_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as file:
        return json.load(file)

def write_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)


# class TodoSchema(Schema):
#     task = fields.Str(required=True)
#     description = fields.Str(required=True)

#     @validates('task')
#     def validate_task(self, value):
#         if not value or not value.strip():
#             raise ValidationError('Task cannot be empty or just whitespace')
    
#     @validates('description')
#     def validate_description(self, value):
#         if not value or not value.strip():
#             raise ValidationError('Description cannot be empty or just whitespace')

# todo_schema = TodoSchema()



@app.route('/todos', methods=['GET'])
def get_todos():
    try:
        data = read_data()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/todos', methods=['POST'])
def add_todo():
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400

    new_todo = request.json
    if 'task' not in new_todo or 'description' not in new_todo:
        return jsonify({'error': 'Invalid data, must contain task and description'}), 400

    # try:
    #     new_todo = todo_schema.load(request.json)
    # except ValidationError as err:
    #     return jsonify(err.messages), 400

    try:
        data = read_data()
        data.append(new_todo)
        write_data(data)
        return jsonify(new_todo), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    

@app.route('/todos/<int:index>', methods=['PUT'])
def update_todo(index):
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400

    updated_todo = request.json
    if 'task' not in updated_todo or 'description' not in updated_todo:
        return jsonify({'error': 'Invalid data, must contain task and description'}), 400

    # try:
    #     updated_todo = todo_schema.load(request.json)
    # except ValidationError as err:
    #     return jsonify(err.messages), 400

    try:
        data = read_data()
        if index >= len(data):
            return jsonify({'error': 'Item not found'}), 404

        data[index] = updated_todo
        write_data(data)
        return jsonify(data[index]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    

@app.route('/todos/<int:index>', methods=['DELETE'])
def delete_todo(index):
    try:
        data = read_data()
        if index >= len(data):
            return jsonify({'error': 'Item not found'}), 404

        deleted_item = data.pop(index)
        write_data(data)
        return jsonify(deleted_item), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Error Handling

# Handle 404 error
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not Found'}), 404

# Handle 500 error
@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
