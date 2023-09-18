from bardapi import Bard
import os
from flask import Flask, render_template, request

os.environ['_BARD_API_KEY']="awiGLOxF4Jkl-tgKl3KrIR5JaBCPVOGkQleBA41LowaZEWB5Rg-yISxZBAocSYtQvk9agw."
# subject = "physics"
# question = input("tell me something :")
# input_text = f"if the question is relevant to the {subject} then reply with proper response other wise reply irrelevant question, you shouldn't reply anything else . The question is mentioned within triple quotes'''{question}'''"
# invalid_words = ["irrelevant","Irrelevant","**Irrelevant"]
# result = Bard().get_answer(input_text)['content']
# for word in invalid_words:
#     if word in result:
#         print("Irrelevant query")
#         break
# else:
#     print(result)
subject = "Physics"

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        question = request.form['textInput']
        # print(f"Received user input: {question}")

        input_text = f"if the question is relevant to the {subject} then reply with proper response other wise reply irrelevant question, you shouldn't reply anything else . The question is mentioned within triple quotes'''{question}'''"

        invalid_words = ["irrelevant", "Irrelevant", "**Irrelevant"]
        print("question")
        result = Bard().get_answer(input_text)['content']
        print(f"Generated bot response: {answer}")
        for word in invalid_words:
            if word in result:
                answer = "Irrelevant query"
                break
        else:
            answer = result

        return answer  # Return the bot's response as plain text

    return render_template('index.html')


app.run(debug=True)