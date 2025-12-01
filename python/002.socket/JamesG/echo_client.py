import socket


with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect(("127.0.0.1", 1234))
    print("Connected to server.")

    while True:
        msg = input("你要发送: ")

        # 如果输入为空就跳过，避免发送空消息
        if not msg:
            continue

        # 输入 exit 退出客户端
        if msg.lower() == "exit":
            print("关闭客户端.")
            break

        s.sendall(msg.encode("utf-8"))
        data = s.recv(1024)

        print("服务器回复:", data.decode("utf-8"))
