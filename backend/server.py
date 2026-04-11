import os
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")

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
leads_collection = db["leads"]


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


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "RPM Automotive API"}


@app.post("/api/leads")
async def create_lead(lead: LeadCreate):
    lead_dict = lead.model_dump()
    lead_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    lead_dict["status"] = "new"
    lead_dict["notes"] = ""
    result = await leads_collection.insert_one(lead_dict)
    lead_dict["id"] = str(result.inserted_id)
    del lead_dict["_id"]
    return {"success": True, "lead": lead_dict}


@app.get("/api/leads")
async def get_leads(status: Optional[str] = None):
    query = {}
    if status and status != "all":
        query["status"] = status
    cursor = leads_collection.find(query, {"_id": 0}).sort("created_at", -1)
    leads = []
    async for doc in cursor:
        leads.append(doc)
    return {"leads": leads, "total": len(leads)}


@app.patch("/api/leads/{lead_phone}")
async def update_lead(lead_phone: str, update: LeadUpdate):
    update_dict = {k: v for k, v in update.model_dump().items() if v is not None}
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await leads_collection.update_one(
        {"phone": lead_phone},
        {"$set": update_dict}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"success": True}


@app.delete("/api/leads/{lead_phone}")
async def delete_lead(lead_phone: str):
    result = await leads_collection.delete_one({"phone": lead_phone})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"success": True}
