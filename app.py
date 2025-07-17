from flask import Flask

app = Flask(__name__)
@app.route('/')
def home():
    return "Olá, esta é minha primeira aplicação Flask!"
if __name__ == '__main__':
    app.run(debug=True)