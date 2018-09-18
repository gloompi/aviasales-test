import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def hello():
  with open('dashboard_data.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)
    return jsonify(data)

if __name__ == "__main__":
  app.run(port=3000, debug=True)