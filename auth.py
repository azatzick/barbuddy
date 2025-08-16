from flask import Blueprint, jsonify, request
from firebase_admin import auth, firestore

auth_bp = Blueprint('auth',__name__)

@auth_bp.route('/signup', methods=['POST'])

def signup():
    """
    Handles user signup. Creates a new user in Firebase auth and stores additional profile data in Firestore.
    """
    db = firestore.client()
    data = request.json
    username = data.get('username')
    email = data.get('email')
    home_bar = data.get('home_bar')
    password = data.get('password')

    if not all([username,email,password]):
        return jsonify({
            "status": "error",
            "message": "Missing required fields: username, email, or password"}), 400

    try:
        user = auth.create_user(
            email = email,
            password=password
        )
        user_data = {
            'username':username,
            'email':email
        }
        if home_bar:
            user_data['home_bar'] = home_bar

        user_ref = db.collection('users').document(user.uid)
        user_ref.set(user_data)

        return jsonify({
                "status": "success",
                "message": f"User {username} created successfully.",
                "user_id": user.uid
            }), 201
    except auth.EmailAlreadyExistsError:
        return jsonify({
            "status": "error",
            "message": "This username already exists."
        }), 409
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred: {e}"
        }), 500