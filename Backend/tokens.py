import jwt
import secrets
from datetime import datetime, timedelta, timezone

algorithm = "HS256"
secret = secrets.token_hex(20)  # Generates a secure 40-character hex secret key

payload = {
    "user_id": 1,
    "name": "user",
    "exp": datetime.now(timezone.utc) + timedelta(minutes=60)  # Correct expiration field name is "exp"
}

token = jwt.encode(payload, secret, algorithm)

print(f"SECRET_KEY = \"{secret}\"")  # So you can save and use it in your `.env`
print(f"JWT Token = {token}")
