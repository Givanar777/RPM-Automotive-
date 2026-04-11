from dotenv import load_dotenv
load_dotenv()

import os
import secrets
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import Optional
from fastapi import FastAPI, HTTPException, Request, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")
JWT_SECRET = os.environ.get("JWT_SECRET", secrets.token_hex(32))
JWT_ALGORITHM = "HS256"

# Twilio config (optional - works without it, just logs instead)
TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.environ.get("TWILIO_PHONE_NUMBER")
NOTIFY_PHONE = os.environ.get("NOTIFY_PHONE", "8314292096")

# SMTP config for password reset emails
SMTP_EMAIL = os.environ.get("SMTP_EMAIL")
SMTP_APP_PASSWORD = os.environ.get("SMTP_APP_PASSWORD")
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SITE_URL = os.environ.get("SITE_URL", "https://rpmautomotivesc.com")

app = FastAPI(title="RPM Automotive API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# --- Password Helpers ---
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "sub": user_id, "email": email, "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
        "type": "access"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

# --- Auth Dependency ---
async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["id"] = str(user["_id"])
        del user["_id"]
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except (jwt.InvalidTokenError, Exception):
        raise HTTPException(status_code=401, detail="Invalid token")

async def require_admin(request: Request) -> dict:
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

# --- SMS Helper ---
async def send_sms_notification(message: str):
    if TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN and TWILIO_PHONE_NUMBER:
        try:
            from twilio.rest import Client
            twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
            twilio_client.messages.create(
                body=message,
                from_=TWILIO_PHONE_NUMBER,
                to=f"+1{NOTIFY_PHONE}"
            )
            print(f"SMS sent to {NOTIFY_PHONE}")
        except Exception as e:
            print(f"SMS failed: {e}")
    else:
        print(f"[SMS MOCK] Would send to {NOTIFY_PHONE}: {message}")

# --- Email Helper ---
async def send_reset_email(to_email: str, reset_token: str, user_name: str):
    import aiosmtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart

    if not SMTP_EMAIL or not SMTP_APP_PASSWORD:
        print(f"[EMAIL MOCK] Reset link for {to_email}: {SITE_URL}/admin/reset-password?token={reset_token}")
        return False

    reset_link = f"{SITE_URL}/admin/reset-password?token={reset_token}"

    msg = MIMEMultipart("alternative")
    msg["From"] = f"RPM Automotive <{SMTP_EMAIL}>"
    msg["To"] = to_email
    msg["Subject"] = "Reset Your Password - RPM Automotive"

    text = f"""Hi {user_name},

You requested a password reset for your RPM Automotive admin account.

Click this link to reset your password:
{reset_link}

This link expires in 1 hour.

If you didn't request this, you can safely ignore this email.

- RPM Automotive Team
(831) 429-2096
"""

    html = f"""
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0a;">
  <div style="max-width:480px;margin:40px auto;background:#18181b;border-radius:12px;border:1px solid #27272a;overflow:hidden;">
    <div style="padding:32px 32px 24px;border-bottom:1px solid #27272a;">
      <h1 style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.01em;">RPM Automotive</h1>
    </div>
    <div style="padding:32px;">
      <p style="margin:0 0 16px;color:#a1a1aa;font-size:14px;line-height:1.6;">Hi {user_name},</p>
      <p style="margin:0 0 24px;color:#a1a1aa;font-size:14px;line-height:1.6;">You requested a password reset for your admin account. Click the button below to set a new password.</p>
      <a href="{reset_link}" style="display:inline-block;background:#ffffff;color:#000000;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:0.02em;text-transform:uppercase;">Reset Password</a>
      <p style="margin:24px 0 0;color:#52525b;font-size:12px;line-height:1.6;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
    </div>
    <div style="padding:20px 32px;border-top:1px solid #27272a;text-align:center;">
      <p style="margin:0;color:#3f3f46;font-size:11px;">RPM Automotive &middot; 110 Stanford Ave, Santa Cruz CA 95062 &middot; (831) 429-2096</p>
    </div>
  </div>
</body>
</html>"""

    msg.attach(MIMEText(text, "plain"))
    msg.attach(MIMEText(html, "html"))

    try:
        await aiosmtplib.send(
            msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            start_tls=True,
            username=SMTP_EMAIL,
            password=SMTP_APP_PASSWORD,
        )
        print(f"Reset email sent to {to_email}")
        return True
    except Exception as e:
        print(f"Email send failed: {e}")
        return False

# --- Startup ---
@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.password_resets.create_index("token")
    await db.password_resets.create_index("expires_at", expireAfterSeconds=0)
    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@rpm.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email})
    if not existing:
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        print(f"Admin seeded: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}}
        )
    # Write test credentials
    creds_dir = "/app/memory"
    os.makedirs(creds_dir, exist_ok=True)
    with open(f"{creds_dir}/test_credentials.md", "w") as f:
        f.write("# Test Credentials\n\n")
        f.write(f"## Admin\n- Email: {admin_email}\n- Password: {admin_password}\n- Role: admin\n\n")
        f.write("## Auth Endpoints\n- POST /api/auth/login\n- POST /api/auth/register\n- GET /api/auth/me\n- POST /api/auth/logout\n")

# --- Pydantic Models ---
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    role: Optional[str] = "member"

class LeadCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = ""
    vehicle: Optional[str] = ""
    service_type: Optional[str] = ""
    message: Optional[str] = ""
    source: Optional[str] = "website"

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
    assigned_to: Optional[str] = None

class ClientCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = ""
    vehicles: Optional[list] = []
    notes: Optional[str] = ""

class ServiceRecord(BaseModel):
    client_phone: str
    vehicle: str
    service_type: str
    description: str
    date: str
    mileage: Optional[int] = 0
    cost: Optional[float] = 0
    technician: Optional[str] = ""
    status: Optional[str] = "completed"
    notes: Optional[str] = ""

class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    password: str

# --- Health ---
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "RPM Automotive API"}

# --- Auth Endpoints ---
@app.post("/api/auth/login")
async def login(req: LoginRequest, response: Response, request: Request):
    email = req.email.lower().strip()
    # Brute force check
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("count", 0) >= 5:
        lockout = attempt.get("last_attempt", datetime.now(timezone.utc))
        if isinstance(lockout, str):
            lockout = datetime.fromisoformat(lockout)
        if datetime.now(timezone.utc) - lockout < timedelta(minutes=15):
            raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")
        else:
            await db.login_attempts.delete_one({"identifier": identifier})

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(req.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"last_attempt": datetime.now(timezone.utc).isoformat()}},
            upsert=True
        )
        raise HTTPException(status_code=401, detail="Invalid credentials")

    await db.login_attempts.delete_one({"identifier": identifier})
    user_id = str(user["_id"])
    access = create_access_token(user_id, email, user.get("role", "member"))
    refresh = create_refresh_token(user_id)
    response.set_cookie("access_token", access, httponly=True, secure=False, samesite="lax", max_age=86400, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")
    return {
        "id": user_id, "email": user["email"], "name": user.get("name", ""),
        "role": user.get("role", "member"), "token": access
    }

@app.post("/api/auth/register")
async def register(req: RegisterRequest, response: Response, request: Request):
    caller = None
    try:
        caller = await get_current_user(request)
    except Exception:
        pass
    # Only admins can create new users
    if caller and caller.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can register new team members")

    email = req.email.lower().strip()
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    role = req.role if (caller and caller.get("role") == "admin") else "member"
    user_doc = {
        "email": email, "password_hash": hash_password(req.password),
        "name": req.name, "role": role,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    result = await db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)
    access = create_access_token(user_id, email, role)
    refresh = create_refresh_token(user_id)
    response.set_cookie("access_token", access, httponly=True, secure=False, samesite="lax", max_age=86400, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")
    return {"id": user_id, "email": email, "name": req.name, "role": role, "token": access}

@app.get("/api/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user

@app.post("/api/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"success": True}

@app.post("/api/auth/refresh")
async def refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        access = create_access_token(str(user["_id"]), user["email"], user.get("role", "member"))
        response.set_cookie("access_token", access, httponly=True, secure=False, samesite="lax", max_age=86400, path="/")
        return {"success": True}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

# --- Password Reset ---
@app.post("/api/auth/forgot-password")
async def forgot_password(req: ForgotPasswordRequest):
    email = req.email.lower().strip()
    user = await db.users.find_one({"email": email})
    # Always return success to avoid email enumeration
    if not user:
        return {"success": True, "message": "If an account exists with that email, a reset link has been sent."}

    # Generate reset token
    reset_token = secrets.token_urlsafe(32)
    await db.password_resets.delete_many({"email": email})
    await db.password_resets.insert_one({
        "email": email,
        "token": reset_token,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "expires_at": (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat(),
    })

    user_name = user.get("name", "User")
    await send_reset_email(email, reset_token, user_name)
    return {"success": True, "message": "If an account exists with that email, a reset link has been sent."}

@app.post("/api/auth/reset-password")
async def reset_password(req: ResetPasswordRequest):
    record = await db.password_resets.find_one({"token": req.token})
    if not record:
        raise HTTPException(status_code=400, detail="Invalid or expired reset link.")
    expires_at = record["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if datetime.now(timezone.utc) > expires_at:
        await db.password_resets.delete_one({"token": req.token})
        raise HTTPException(status_code=400, detail="Reset link has expired. Please request a new one.")
    if len(req.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters.")

    await db.users.update_one(
        {"email": record["email"]},
        {"$set": {"password_hash": hash_password(req.password)}}
    )
    await db.password_resets.delete_many({"email": record["email"]})
    return {"success": True, "message": "Password has been reset successfully."}

@app.get("/api/auth/verify-reset-token")
async def verify_reset_token(token: str):
    record = await db.password_resets.find_one({"token": token})
    if not record:
        raise HTTPException(status_code=400, detail="Invalid reset link.")
    expires_at = record["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if datetime.now(timezone.utc) > expires_at:
        await db.password_resets.delete_one({"token": token})
        raise HTTPException(status_code=400, detail="Reset link has expired.")
    return {"valid": True, "email": record["email"]}

# --- Team Management ---
@app.get("/api/team")
async def get_team(user: dict = Depends(get_current_user)):
    cursor = db.users.find({}, {"password_hash": 0})
    members = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        members.append(doc)
    return {"members": members}

@app.patch("/api/team/{member_id}")
async def update_team_member(member_id: str, update: TeamMemberUpdate, user: dict = Depends(require_admin)):
    updates = {k: v for k, v in update.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await db.users.update_one({"_id": ObjectId(member_id)}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Member not found")
    return {"success": True}

@app.delete("/api/team/{member_id}")
async def delete_team_member(member_id: str, user: dict = Depends(require_admin)):
    if member_id == user.get("id"):
        raise HTTPException(status_code=400, detail="Cannot delete yourself")
    result = await db.users.delete_one({"_id": ObjectId(member_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Member not found")
    return {"success": True}

# --- Leads ---
@app.post("/api/leads")
async def create_lead(lead: LeadCreate):
    lead_dict = lead.model_dump()
    lead_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    lead_dict["status"] = "new"
    lead_dict["notes"] = ""
    lead_dict["assigned_to"] = ""
    result = await db.leads.insert_one(lead_dict)
    lead_dict["id"] = str(result.inserted_id)
    del lead_dict["_id"]
    # Send SMS notification
    msg = f"New lead from {lead.name} ({lead.phone}). Service: {lead.service_type or 'N/A'}. Vehicle: {lead.vehicle or 'N/A'}"
    await send_sms_notification(msg)
    return {"success": True, "lead": lead_dict}

@app.get("/api/leads")
async def get_leads(status: Optional[str] = None, user: dict = Depends(get_current_user)):
    query = {}
    if status and status != "all":
        query["status"] = status
    cursor = db.leads.find(query).sort("created_at", -1)
    leads = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        leads.append(doc)
    return {"leads": leads, "total": len(leads)}

@app.patch("/api/leads/{lead_id}")
async def update_lead(lead_id: str, update: LeadUpdate, user: dict = Depends(get_current_user)):
    updates = {k: v for k, v in update.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    updates["updated_by"] = user.get("name", user.get("email", ""))
    result = await db.leads.update_one({"_id": ObjectId(lead_id)}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"success": True}

@app.delete("/api/leads/{lead_id}")
async def delete_lead(lead_id: str, user: dict = Depends(require_admin)):
    result = await db.leads.delete_one({"_id": ObjectId(lead_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"success": True}

@app.post("/api/leads/{lead_id}/convert")
async def convert_lead(lead_id: str, user: dict = Depends(get_current_user)):
    lead = await db.leads.find_one({"_id": ObjectId(lead_id)})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    # Create client from lead
    client_doc = {
        "name": lead["name"], "phone": lead["phone"],
        "email": lead.get("email", ""), "vehicles": [lead.get("vehicle", "")] if lead.get("vehicle") else [],
        "notes": lead.get("notes", ""), "converted_from_lead": lead_id,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    existing = await db.clients.find_one({"phone": lead["phone"]})
    if existing:
        # Update existing client
        vehicles = existing.get("vehicles", [])
        if lead.get("vehicle") and lead["vehicle"] not in vehicles:
            vehicles.append(lead["vehicle"])
        await db.clients.update_one({"phone": lead["phone"]}, {"$set": {"vehicles": vehicles}})
    else:
        await db.clients.insert_one(client_doc)
    # Update lead status
    await db.leads.update_one({"_id": ObjectId(lead_id)}, {"$set": {"status": "converted"}})
    return {"success": True}

# --- Clients ---
@app.get("/api/clients")
async def get_clients(user: dict = Depends(get_current_user)):
    cursor = db.clients.find({}).sort("created_at", -1)
    clients = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        # Count service records
        count = await db.service_records.count_documents({"client_phone": doc["phone"]})
        doc["service_count"] = count
        clients.append(doc)
    return {"clients": clients}

@app.get("/api/clients/{phone}")
async def get_client(phone: str, user: dict = Depends(get_current_user)):
    c = await db.clients.find_one({"phone": phone})
    if not c:
        raise HTTPException(status_code=404, detail="Client not found")
    c["id"] = str(c["_id"])
    del c["_id"]
    # Get service records
    cursor = db.service_records.find({"client_phone": phone}).sort("date", -1)
    records = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        records.append(doc)
    c["service_records"] = records
    return c

@app.post("/api/clients")
async def create_client(client_data: ClientCreate, user: dict = Depends(get_current_user)):
    doc = client_data.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    existing = await db.clients.find_one({"phone": doc["phone"]})
    if existing:
        raise HTTPException(status_code=400, detail="Client with this phone already exists")
    result = await db.clients.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    del doc["_id"]
    return {"success": True, "client": doc}

# --- Service Records ---
@app.post("/api/services")
async def create_service_record(record: ServiceRecord, user: dict = Depends(get_current_user)):
    doc = record.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    doc["created_by"] = user.get("name", user.get("email", ""))
    result = await db.service_records.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    del doc["_id"]
    return {"success": True, "record": doc}

@app.get("/api/services")
async def get_service_records(client_phone: Optional[str] = None, user: dict = Depends(get_current_user)):
    query = {}
    if client_phone:
        query["client_phone"] = client_phone
    cursor = db.service_records.find(query).sort("date", -1)
    records = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        records.append(doc)
    return {"records": records}

@app.delete("/api/services/{record_id}")
async def delete_service_record(record_id: str, user: dict = Depends(get_current_user)):
    result = await db.service_records.delete_one({"_id": ObjectId(record_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Record not found")
    return {"success": True}

@app.patch("/api/services/{record_id}")
async def update_service_record(record_id: str, request: Request, user: dict = Depends(get_current_user)):
    body = await request.json()
    updates = {k: v for k, v in body.items() if k != "id" and v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    updates["updated_by"] = user.get("name", user.get("email", ""))
    result = await db.service_records.update_one({"_id": ObjectId(record_id)}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Record not found")
    return {"success": True}

@app.patch("/api/clients/{phone}")
async def update_client(phone: str, request: Request, user: dict = Depends(get_current_user)):
    body = await request.json()
    updates = {k: v for k, v in body.items() if k not in ("id", "_id") and v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.clients.update_one({"phone": phone}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Client not found")
    return {"success": True}

# --- Dashboard Stats ---
@app.get("/api/dashboard/stats")
async def dashboard_stats(user: dict = Depends(get_current_user)):
    total_leads = await db.leads.count_documents({})
    new_leads = await db.leads.count_documents({"status": "new"})
    contacted = await db.leads.count_documents({"status": "contacted"})
    converted = await db.leads.count_documents({"status": "converted"})
    total_clients = await db.clients.count_documents({})
    total_services = await db.service_records.count_documents({})
    return {
        "total_leads": total_leads, "new_leads": new_leads,
        "contacted": contacted, "converted": converted,
        "total_clients": total_clients, "total_services": total_services,
    }
