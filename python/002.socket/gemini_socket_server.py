import socket

PORT = 12345
HEADER = 1024
SERVER = socket.gethostbyname(socket.gethostname())
ADDR = (SERVER, PORT)
FORMAT = 'utf-8'

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind(ADDR)
    s.listen()

    c, addr = s.accept()
    with c:
        print(f"[CONNECTED] Connected by {addr}")
        while True:
            data = c.recv(HEADER)
            if not data:
                break
            print(data)