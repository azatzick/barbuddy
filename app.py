from dotenv import load_dotenv
import os
import json
from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore, auth

load_dotenv()

def create_app():
    # --- Setup and Initialization ---
    # This block initializes the Firebase Admin SDK.
    # It MUST run before any code that uses Firebase services.

    # Use a try-except block to handle potential initialization errors.
    if not firebase_admin._apps:
        try:
            if "GOOGLE_APPLICATION_CREDENTIALS" in os.environ:
                firebase_admin.initialize_app()
                print("Firebase Admin SDK initialized successfully via environment variable.")
            else:
                # Fallback for local development if env variable isn't set
                cred = credentials.Certificate('./firebase-key.json')
                firebase_admin.initialize_app(cred)
                print("Firebase Admin SDK initialized successfully via explicit file path.")
        except Exception as e:
            print(f"Error initializing Firebase Admin SDK: {e}")

    from auth import auth_bp

    app = Flask(__name__)
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    # --- Routes and API Endpoints ---

    @app.route('/')
    def home():
        """A simple home route to confirm the server is running."""
        return "Your Flask server is running!"

    @app.route('/api/data', methods=['GET'])
    def get_data():
        """An example route to fetch data from Firestore."""

        db = firestore.client()

        try:
            # Get a reference to a collection.
            docs_ref = db.collection('users').limit(10)
            
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
        db = firestore.client()
        try:
            # Get the JSON data from the request body.
            request_data = request.json
            if not request_data:
                return jsonify({
                    "status": "error",
                    "message": "No data provided in the request."
                }), 400

            # Add a new document to the collection.
            doc_ref = db.collection('users').add(request_data)

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
    return app

# --- Run the Flask App ---
if __name__ == '__main__':
    app.run(debug=True)

