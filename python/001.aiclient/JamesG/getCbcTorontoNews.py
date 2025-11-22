from google import genai
import requests
from google.genai import types

# The client gets the API key from the environment variable `GEMINI_API_KEY`.



# headers = {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36'}
# res = requests.get("https://www.cbc.ca/news/local", headers=headers)

# html = res.text
# start = html.find("<body")
# end = html.find("</body>")
# body_html = html[start:end+7]

# proment = "找出每条新闻的标题,发布时间,内容概要,并翻译成中文"


# headlines = client.models.generate_content(
#     model="gemini-2.5-flash", contents=f"从以下HTML的body中找出所有class是'heading-element heading-element-h3'的内容的文本,并列出:\n\n{body_html}"
# )

# <h2 class="heading-element heading-element-h3">Ottawa<span class="icon"><svg class="chevronIcon horizontal headingIcon" width="15px" viewBox="0 0 10 10" height="15px" focusable="false" aria-hidden="true"><g><path d="M10,0v3L5,7L0,3V0l5,4L10,0z"></path></g></svg></span></h2>

# headlines = client.models.generate_content(
#     model="gemini-2.5-flash", contents="hello",config=types.GenerateContentConfig(
#               system_instruction=proment
                
#           )
# )

def get_page_content(city_slug: str = "toronto"):
    url = f"https://www.cbc.ca/news/canada/{city_slug}"
    headers = {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36'}
    res = requests.get(url, headers=headers)
    html = res.text
    start = html.find("<body")
    end = html.find("</body>")
    body_html = html[start:end+7]
    return body_html

def choose_city():
    print("请选择城市：")
    print("1. Toronto")
    print("2. BC")
    print("3. Ottawa")
    print("4. Montreal")

    choice = input("请输入数字 1-4: ")

    if choice == "1":
        return "toronto"
    elif choice == "2":
        return "british-columbia"
    elif choice == "3":
        return "ottawa"
    elif choice == "4":
        return "montreal"
    else:
        print("输入无效，请重新选择。\n")
        return choose_city()  # 递归，重新让对方输入




def call_gemini_api(city: str = "toronto"):
    client = genai.Client()
    # proment = "找出每条新闻的标题,发布时间,内容概要,并翻译成中文"
    headlines = client.models.generate_content(
    model="gemini-2.5-flash", contents=f"从以下HTML的body中找前5个有class是'headline'的内容的文本,并列出:\n\n{get_page_content(city)}")
    text = headlines.candidates[0].content.parts[0].text
    return print(text)

call_gemini_api(choose_city())

# print (get_page_content())