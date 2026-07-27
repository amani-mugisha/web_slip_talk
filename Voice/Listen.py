import whisper
import tempfile
import os

model = whisper.load_model("base")

def listen(audio_file):
    try:
        # save uploaded audio to temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
            for chunk in audio_file.chunks():
                tmp.write(chunk)
            tmp_path = tmp.name

        # transcribe
        result = model.transcribe(model=model,audio=tmp_path)

        # 🔥 clean text here (important)
        text = result["text"].lower().strip()

        #delete temp file
        os.remove(tmp_path)

        return text

    except Exception as e:
        print("Error in listen:", e)
        return ""