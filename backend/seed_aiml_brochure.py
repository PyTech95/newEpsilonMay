"""Push Applied AI & ML brochure content into the program record."""
import asyncio, os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv("/app/backend/.env")

CURRICULUM = [
    {"week": "1", "topic": "Data Science Foundations"},
    {"week": "2", "topic": "Coding for Analysis"},
    {"week": "3", "topic": "Machine Learning Frameworks"},
    {"week": "4", "topic": "Causal Inference and Strategy"},
    {"week": "5", "topic": "Prompt Engineering + Context Design"},
    {"week": "6", "topic": "Systems Economics + Evaluation Design"},
    {"week": "7", "topic": "Systems Thinking and Visual Logic"},
    {"week": "8", "topic": "Custom Agent Development"},
    {"week": "9", "topic": "AI-Augmented Building"},
    {"week": "10", "topic": "Deployment, Handoff and Monitoring"},
    {"week": "11", "topic": "Technical Storytelling + Executive Communication"},
    {"week": "12", "topic": "Executive Proof Pack + Live Defence"},
]

CERTIFICATE = {
    "certificateEnabled": True,
    "certificateEyebrow": "Certificate",
    "certificateTitle": "A credible artefact of",
    "certificateTitleAccent": "applied capability.",
    "certificateDescription": (
        "Upon successful completion of the programme, participants receive a "
        "Certificate of Completion from Epsilon Executive Education for the "
        "Professional Certificate in Applied AI and Machine Learning. The "
        "certificate recognises completion of a live, assessed programme built "
        "around applied AI, machine learning, decision-making and executive "
        "communication."
    ),
    "certificateBullets": [
        "Verified digital certificate issued in the registered name used for the programme.",
        "Physical certificate delivered by mail after successful completion.",
        "Signed by the Programme Director and Founder and Director.",
    ],
    "certificateNote": (
        "To earn the certificate, participants must complete the required graded "
        "assignments, successfully complete the capstone and achieve a grade of "
        "80% or higher. Participants must also pass each module of the programme."
    ),
}

EXPERIENCE = {
    "experienceEnabled": True,
    "experienceEyebrow": "The Epsilon Experience",
    "experienceTitle": "Explore the",
    "experienceTitleAccent": "experience.",
    "experienceItems": [
        {"title": "Live Learning", "body": "Learn through live sessions, guided discussion and direct faculty interaction."},
        {"title": "Applied Learning", "body": "Build practical skill in data science, AI use, workflow design and business decision-making."},
        {"title": "Applied Output", "body": "Complete work products such as a Model Interpretation Memo, AI System Specification, Deployed Workflow Prototype with Operating Note, and Executive Proof Pack."},
        {"title": "Capstone Experience", "body": "Finish with the Executive Decision Dossier — a live-reviewed capstone built around evidence, AI supervision and business action."},
        {"title": "What This Builds", "body": "Leave with stronger judgement, better AI fluency, and work that shows real professional growth."},
    ],
}


async def main():
    c = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = c[os.environ['DB_NAME']]
    update = {
        "curriculum": CURRICULUM,
        "showModules": False,
        "showCurriculum": True,
        **CERTIFICATE,
        **EXPERIENCE,
    }
    r = await db.programs.update_one({"_id": "applied-ai-ml"}, {"$set": update})
    print("modified:", r.modified_count)


if __name__ == "__main__":
    asyncio.run(main())
