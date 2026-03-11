from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")

db = client["medlink"]

hospital_collection = db["hospitals"]


@app.route("/")
def home():
    return "MedLink Server Running"


if __name__ == "__main__":
    app.run(debug=True)