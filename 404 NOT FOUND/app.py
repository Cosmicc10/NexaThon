from flask import render_template
from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

#MongoDB connection
client = MongoClient("mongodb://localhost:27017/")

db = client["medlink"]

hospital_collection = db["hospitals"]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/add_hospital", methods=["POST"])
def add_hospital():

    data = request.json

    hospital_collection.insert_one(data)

    return jsonify({"message": "Hospital added successfully"})

@app.route("/hospitals", methods=["GET"])
def get_hospitals():
    hospitals = list(hospital_collection.find({}, {"_id": 0}))
    return jsonify(hospitals)



if __name__ == "__main__":
    app.run(debug=True)