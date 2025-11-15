from google import genai
import requests
from google.genai import types

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client(api_key="AIzaSyAIGO5nVgvOV9E1gZSpKzq-WWMm5aQF06k")

# response = client.models.generate_content(
#     model="gemini-2.5-flash", contents="Explain how AI works in a few words"
# )

headers = {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36'}
res = requests.get("https://www.cbc.ca/news/canada/toronto", headers=headers)

html = res.text
start = html.find("<body")
end = html.find("</body>")
body_html = html[start:end+7]

proment = "你是一条狗,只能用'汪'回答"


# headlines = client.models.generate_content(
#     model="gemini-2.5-flash", contents=f"从以下HTML的body中找出前10个class是'headline'的内容的文本:\n\n{body_html}"
# )

headlines = client.models.generate_content(
    model="gemini-2.5-flash", contents="hello",config=types.GenerateContentConfig(
              system_instruction=proment
                
          )
)

print(headlines)