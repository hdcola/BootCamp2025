#用gemini写的

# API key = AIzaSyAAHT7DfOQQpBVVWUG0sfHJTljM9sZ0Wd8

import os
import requests
from google import genai


os.environ["GEMINI_API_KEY"] = "AIzaSyAAHT7DfOQQpBVVWUG0sfHJTljM9sZ0Wd8"


client = genai.Client()

url = "https://www.cbc.ca/news/canada/toronto"
headers = {"User-Agent": "Mozilla/5.0"}
r = requests.get(url, headers=headers)
html_content = r.text[:2000]  


prompt = f"Extract the top 10 news headlines from the following HTML content:\n{html_content}"

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt
)


print("Top 10 CBC Toronto news headlines:")
print(response.text)



#用python写的

# import requests
# from bs4 import BeautifulSoup

# headers = {'user-agent': 'Mozilla/5.0'}
# r = requests.get('https://www.cbc.ca/news/canada/toronto', headers=headers)

# soup = BeautifulSoup(r.text, "html.parser")
# headlines = soup.find_all(["h3"])

# # print("Toronto News Headlines:", headlines[:10])
# for i in range(10):
#     print(str(i+1)+ ":",headlines[i].get_text(strip=True))

# print(" ")

# print("500 response: ",r.text[:500])
# print(" ")
# print("Status Code: ", r.status_code)