import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect(('127.0.0.1', 12345))
    s.sendall(b'Hello, world')
    data = s.recv(1024)
    print('Received', repr(data))