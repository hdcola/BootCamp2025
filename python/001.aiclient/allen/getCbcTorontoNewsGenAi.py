import requests
from google.genai import types
from google import genai

client = genai.Client(api_key="replace_with_your_api_key_or_set_environment_variable")

url = "https://www.cbc.ca/news/canada/toronto"
system_prompt_main = "你是一个新闻摘要专家。把我提供给你的cbc网页源代码进行分析，提取出前10条新闻的标题和链接，生成一个简洁的新闻摘要列表。每条新闻用一行表示，格式为：标题 - 链接。"
system_prompt_language = "你也是一个专业翻译官，请把所有内容翻译成中文，保留路名和不常见的专有名词的原文。"

user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
headers = {"User-Agent": user_agent}
response = requests.get(url, headers=headers)

response_with_gemini = client.models.generate_content(
    model="gemini-2.5-flash", contents=[response.text], config=types.GenerateContentConfig(
          system_instruction=[system_prompt_main, system_prompt_language],
    )
)

print(response_with_gemini.text)

# print(response.status_code)
# print(response.text[:500])