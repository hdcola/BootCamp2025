import socket
import threading

# PORT = 5050
# server = socket.gethostbyname(socket.gethostname())

# print(socket.gethostname())
# print(server)

def handle_clients(c , addr):
    print(addr, "conneted!")
    while True:
        data = c.recv(1024)
        if not data:
            break
        c.sendall(data)


with socket.socket(socket.AF_INET , socket.SOCK_STREAM) as s:
    s.bind(("0.0.0.0", 1234))
    s.listen()

    while True:
        c, addr = s.accept()

        t = threading.Thread(target=handle_clients,args=(c,addr))
        t.start()
    # with c:
    #     print(addr, "conneted!")

    #     while True:
    #         data = c.recv(1024)
    #         if not data:
    #             break
    #         c.sendall(data)