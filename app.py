import os
import json
from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore

# --- Setup and Initialization ---

# IMPORTANT:
# 1. Download your service account key file from the Firebase console.
#    (Project Settings > Service accounts > Generate new private key)
# 2. Store the JSON file securely. A common practice is to set the
#    'GOOGLE_APPLICATION_CREDENTIALS' environment variable to the path of this file.
#    e.g., export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-key.json"
#    This makes your credentials accessible to the Firebase Admin SDK.
#    You can also load it directly, but an environment variable is safer.

# Use a try-except block to handle potential initialization errors.
try:
    # Check if the environment variable is set.
    if "GOOGLE_APPLICATION_CREDENTIALS" in os.environ:
        # The Firebase Admin SDK automatically finds the credentials from the environment variable.
        firebase_admin.initialize_app()
        print("Firebase Admin SDK initialized successfully via environment variable.")
    else:
        # If not, you'll need to provide the path to your service account key file.
        # This is a less secure method, but useful for local development if you can't
        # set the environment variable easily.
        # Replace 'path/to/your-service-account-key.json' with your actual file path.
        cred = credentials.Certificate('path/to/your-service-account-key.json')
        firebase_admin.initialize_app(cred)
        print("Firebase Admin SDK initialized successfully via explicit file path.")

    # Get a reference to the Firestore database
    db = firestore.client()
    
except Exception as e:
    print(f"Error initializing Firebase Admin SDK: {e}")
    # Exit the app or handle the error gracefully
    db = None

app = Flask(__name__)


# --- Routes and API Endpoints ---

@app.route('/')
def home():
    """A simple home route to confirm the server is running."""
    return "Your Flask server is running!"

@app.route('/api/data', methods=['GET'])
def get_data():
    """An example route to fetch data from Firestore."""
    if db:
        try:
            # Get a reference to a collection.
            # Replace 'your-collection-name' with the name of your Firestore collection.
            docs_ref = db.collection('your-collection-name').limit(10)
            
            # Fetch the documents.
            docs = docs_ref.stream()
            
            # Convert the documents to a list of dictionaries.
            data = []
            for doc in docs:
                data.append(doc.to_dict())
                
            return jsonify({
                "status": "success",
                "data": data
            })
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": f"An error occurred: {e}"
            }), 500
    else:
        return jsonify({
            "status": "error",
            "message": "Firebase is not initialized."
        }), 500

@app.route('/api/add', methods=['POST'])
def add_data():
    """An example route to add data to Firestore."""
    if not db:
        return jsonify({
            "status": "error",
            "message": "Firebase is not initialized."
        }), 500

    try:
        # Get the JSON data from the request body.
        request_data = request.json
        if not request_data:
            return jsonify({
                "status": "error",
                "message": "No data provided in the request."
            }), 400

        # Add a new document to the collection.
        doc_ref = db.collection('your-collection-name').add(request_data)

        return jsonify({
            "status": "success",
            "message": "Document added successfully.",
            "document_id": doc_ref[1].id # doc_ref is a tuple, second element is the DocumentReference
        }), 201
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred: {e}"
        }), 500


# --- Run the Flask App ---
if __name__ == '__main__':
    # You can set debug=True for local development.
    # Be sure to set it to False in a production environment.
    app.run(debug=True)

