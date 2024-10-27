from fastapi import File, UploadFile
from openai import OpenAI
import whisper

router = APIRouter()

model = whisper.load_model("base")


@router.post("/audio/")
async def convert_audio(file: UploadFile = File(...)):
    # Save the uploaded file temporarily
    with open("temp_audio.wav", "wb") as buffer:
        buffer.write(await file.read())
    
    # Process audio with Whisper
    result = model.transcribe("temp_audio.wav")
    transcription = result["text"]

    # Send transcription to OpenRouter
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
    )

    completion = client.chat.completions.create(
        model="mistralai/ministral-8b",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Process this transcription: {transcription}"}
        ]
    )

    ai_response = completion.choices[0].message.content

    return {"transcription": transcription, "ai_response": ai_response}
