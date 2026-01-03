import socket
import threading
import os

WEBROOT = "/Users/yangzhenhao/work/BootCamp2025/python/002.socket"

def handle_client(c, addr):
    print(addr, "connected")
    
    with c:
        request = c.recv(1024)

        headers = request.split(b'\r\n')
        file = headers[0].split()[1].decode()

        if file == '/':
            file = '/index.html'
        
        try:
            with open(WEBROOT + file, "rb") as f:
                content = f.read()
            response = b"HTTP/1.0 200 OK\r\n\r\n" + content
        except FileNotFoundError:
            response = b"HTTP/1.0 404 NOT FOUND\r\n\r\n<h1>404 Not Found</h1>"
        
        c.sendall(response)
        
if __name__ == "__main__":   
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('0.0.0.0', 5050))
        s.listen()
        
        while True:
            c, addr = s.accept()

            t = threading.Thread(target=handle_client, args=(c, addr))
            t.start()