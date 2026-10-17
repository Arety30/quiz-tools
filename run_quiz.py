import json
import sys

def run_quiz(quiz_file):
    with open(quiz_file, 'r') as f:
        quiz = json.load(f)

    score = 0
    for item in quiz:
        print(f"\n{item['question']}")
        if 'options' in item:
            for i, option in enumerate(item['options']):
                print(f"{i+1}) {option}")
            choice = input("Enter the number of your answer (1-4): ")
            if item['options'][int(choice)-1] == item['answer']:
                print("Correct!")
                score += 1
            else:
                print(f"Incorrect. The correct answer was: {item['answer']}")
        else:
            answer = input("Enter your answer: ")
            if answer.lower() == item['answer'].lower():
                print("Correct!")
                score += 1
            else:
                print(f"Incorrect. The correct answer was: {item['answer']}")
    
    print(f"\nQuiz finished! Your score: {score}/{len(quiz)}")

if __name__ == "__main__":
    run_quiz("~/projects/integrated_repos/quizdom/public/science_quiz.json")
