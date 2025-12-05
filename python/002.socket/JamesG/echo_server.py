import socket
import threading
from google import genai
from google.genai import types
import os
# api_key = os.getenv("GOOGLE_API_KEY")
# print(api_key)

# PORT = 5050
# server = socket.gethostbyname(socket.gethostname())

# print(socket.gethostname())
# print(server)



def call_gemini_api(contentinput: str = "你好") -> str:
    client = genai.Client()

    # system_instruction = (
    #     "你是一个少言寡语的得道高僧,回答尽量少于50字,"
    #     "关键是简洁，而不是准确。"
    # )

    resp = client.models.generate_content(
    model="gemini-2.5-flash", contents=f"像高僧一样言简意赅的回答:\n\n{contentinput}")
    text = resp.candidates[0].content.parts[0].text.strip()
    return text

def handle_clients(c , addr):
    print(addr, "conneted!")
    while True:
        data = c.recv(1024)
        if not data:
            break
        user_msg = data.decode("utf-8", errors="ignore").strip()
        if not user_msg:
                continue

        reply = call_gemini_api(user_msg)
        c.sendall(reply.encode("utf-8"))

with socket.socket(socket.AF_INET , socket.SOCK_STREAM) as s:
    s.bind(("0.0.0.0", 1234))
    s.listen()

    while True:
        c, addr = s.accept()

        t = threading.Thread(target=handle_clients,args=(c,addr))
        t.start()

# print(call_gemini_api("你好"))
# print("ENV KEY:", repr(os.getenv("GOOGLE_API_KEY")))
# print("ENV KEY:", repr(os.getenv("GEMINI_API_KEY")))
# print(os.environ)