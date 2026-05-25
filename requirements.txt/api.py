from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def inicio():
    return "API funcionando!"

@app.route("/usuarios", methods=["GET"])
def obter_usuarios():

    lista_usuarios = [
        {
            "nome": "Leanne Graham",
            "email": "Sincere@april.biz",
            "telefone": "1-770-736-8031 x56442"
        },
        {
            "nome": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "telefone": "010-692-6593 x09125"
        },
        {
            "nome": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "telefone": "1-463-123-4447"
        }
    ]
    return jsonify(lista_usuarios)

if __name__ == "__main__":
    app.run(debug=True)