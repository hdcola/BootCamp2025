import requests 
# response = requests.get("https://www.w3schools.com/python/python_syntax.asp") 
# print(response.status_code) 
# print(response.text[:100]) 


headers = {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36'}
response1 = requests.get("https://www.cbc.ca/news/canada/toronto", headers=headers)
print(response1.status_code) 
print(response1.text[:500])

