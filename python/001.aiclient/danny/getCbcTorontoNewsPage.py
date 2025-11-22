import requests
from requests.exceptions import RequestException, Timeout, HTTPError

URL = "https://www.cbc.ca/news/canada/toronto"
URL = "https://www.w3schools.com/python/python_syntax.asp"

def main():
	headers = {
		# Use a realistic User-Agent to avoid getting blocked by some sites
		"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
	}
	try:
		# Add a timeout so the request doesn't hang indefinitely
		r = requests.get(URL,  timeout=10)
		# Raise for HTTP error status codes (4xx/5xx)
		r.raise_for_status()
		print(r.status_code)
		print(r.headers.get('Content-Type'))
		print(r.text)  
	except Timeout:
		print(f"Request to {URL} timed out (timeout=10s).")
	except HTTPError as e:
		print(f"HTTP error when requesting {URL}: {e}")
	except RequestException as e:
		# Catch other requests-related errors (connection, DNS, SSL, etc.)
		print(f"Network/requests error when requesting {URL}: {e}")

if __name__ == '__main__':
	main()