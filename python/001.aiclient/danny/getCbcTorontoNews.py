import requests
from requests.exceptions import RequestException, Timeout, HTTPError
from google import genai

def call_gemini_api(prompt):
    client = genai.Client()
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text
        
def get_page_content(url):
	headers = {
		# Use a realistic User-Agent to avoid getting blocked by some sites
		"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
	}
	try:
		# Add a timeout so the request doesn't hang indefinitely
		r = requests.get(url, headers=headers, timeout=10)
		# Raise for HTTP error status codes (4xx/5xx)
		r.raise_for_status()
		# print(r.status_code)
		# print(r.headers.get('Content-Type'))
		return r.text  
	except Timeout:
		print(f"Request to {url} timed out (timeout=10s).")
	except HTTPError as e:
		print(f"HTTP error when requesting {url}: {e}")
	except RequestException as e:
		# Catch other requests-related errors (connection, DNS, SSL, etc.)
		print(f"Network/requests error when requesting {url}: {e}")

def main():
	url = "https://www.cbc.ca/news/canada/toronto"
	content = get_page_content(url)
	prompt = "请帮我列出以下网页内容的前10条新闻:\n\n" + content
	response = call_gemini_api(prompt)
	print(response)

if __name__ == '__main__':
	main()