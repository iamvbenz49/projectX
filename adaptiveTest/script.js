// Get references to HTML elements
const questionsContainer = document.getElementById('questions-container');
const currentQuestionContainer = document.getElementById('current-question');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const scoreContainer = document.getElementById('score-container');

let currentQuestionIndex = 0;
let score = 0;
let kinematicsQuestions; // Store the questions from the JSON file here
let incorrectAnswersByTag = {}; // Store incorrect answers by tag

// Function to fetch questions from the JSON file
async function fetchQuestions() {
  try {
    const response = await fetch('questionBank.json'); // Replace with the correct path to your JSON file
    const data = await response.json();
    kinematicsQuestions = data.kinematicsQuestions; // Assuming your questions are under the key "kinematicsQuestions"
    displayQuestion();
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

// Function to display the current question
function displayQuestion() {
  if (currentQuestionIndex < kinematicsQuestions.length) {
    const currentQuestion = kinematicsQuestions[currentQuestionIndex];

    // Clear previous question
    currentQuestionContainer.innerHTML = '';

    // Create the question element
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `<p>${currentQuestion.question}</p>`;
    currentQuestionContainer.appendChild(questionElement);

    // Create the options list
    const optionsElement = document.createElement('ul');
    optionsElement.classList.add('options');
    for (let i = 0; i < currentQuestion.options.length; i++) {
      const option = currentQuestion.options[i];
      const optionItem = document.createElement('li');
      optionItem.innerHTML = `
        <input type="radio" name="question-${currentQuestionIndex}" value="${i}" id="option-${i}">
        <label for="option-${i}">${option}</label>
      `;
      optionsElement.appendChild(optionItem);
    }
    currentQuestionContainer.appendChild(optionsElement);
  } else {
    // Display the score if all questions have been answered
    currentQuestionContainer.innerHTML = '';
    currentQuestionContainer.textContent = `Quiz completed! Your score is: ${score} out of ${kinematicsQuestions.length}`;
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
    displayIncorrectTags();
  }
}

// Function to check the answer and move to the next question
function checkAnswer() {
  const selectedOption = document.querySelector(`input[name="question-${currentQuestionIndex}"]:checked`);
  if (selectedOption) {
    const selectedAnswer = parseInt(selectedOption.value);
    const correctAnswer = kinematicsQuestions[currentQuestionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
      score++;
    } else {
      const topic = kinematicsQuestions[currentQuestionIndex].topic;
      const incorrectAnswer = kinematicsQuestions[currentQuestionIndex].options[selectedAnswer];
      if (!incorrectAnswersByTag[topic]) {
        incorrectAnswersByTag[topic] = [];
      }
      incorrectAnswersByTag[topic].push({
        question: kinematicsQuestions[currentQuestionIndex].question,
        incorrectAnswer: incorrectAnswer,
      });
    }
    currentQuestionIndex++;
    displayQuestion();
  }
}
// Function to display topics and resource links for incorrect answers
// Function to display topics and resource links for incorrect answers
async function displayIncorrectTags() {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = ''; // Clear the result container
  
    try {
      const response = await fetch('resources.json'); // Path to your resources JSON file
      const data = await response.json();
      const resources = data.resources;
  
      if (Object.keys(incorrectAnswersByTag).length > 0) {
        const incorrectTagsElement = document.createElement('div');
        incorrectTagsElement.classList.add('incorrect-tags');
        incorrectTagsElement.innerHTML = `
          <p>You got the answers wrong in the following topics:</p>
          <ul>
            ${Object.keys(incorrectAnswersByTag).map((tag) => `
              <li>${tag}</li>
              <ul>
                <li>
                  <strong>Resource Recommendations:</strong><br>
                  ${getResourcesForTag(tag, resources).map((resource) => `
                    <a href="${resource.link}" target="_blank">${resource.name}</a><br>
                  `).join('')}
                </li>
              </ul>
            `).join('')}
          </ul>
        `;
        resultContainer.appendChild(incorrectTagsElement);
      } else {
        resultContainer.textContent = 'Congratulations! You answered all questions correctly.';
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  }
  
  // Function to provide resource recommendations for a given tag/topic
  function getResourcesForTag(tag, resources) {
    // Retrieve resources for the given tag from the JSON data
    return resources[tag] || [];
  }
  
  
  
  
  
// Event listeners for Next and Submit buttons
nextButton.addEventListener('click', () => {
  checkAnswer();
});

// Event listener for the Submit button
submitButton.addEventListener('click', () => {
  checkAnswer();
});


  
// Load questions from the JSON file when the page loads
fetchQuestions();


// {
//     "question": "An object falls freely under gravity. How does its velocity change with time?",
//     "options": ["A. Increases linearly", "B. Decreases linearly", "C. Remains constant", "D. Increases quadratically"],
//     "correctAnswer": 0,
//     "difficulty": "medium",
//     "topic": "Free Fall"
//   },
//   {
//     "question": "What is the acceleration due to gravity on Earth?",
//     "options": ["A. 9.8 m/s²", "B. 5.0 m/s²", "C. 2.5 m/s²", "D. 10.0 m/s²"],
//     "correctAnswer": 0,
//     "difficulty": "easy",
//     "topic": "Gravitational Acceleration"
//   },
//   {
//     "question": "If an object is in free fall, what is its acceleration?",
//     "options": ["A. 0 m/s²", "B. 5 m/s²", "C. 9.8 m/s²", "D. 1 m/s²"],
//     "correctAnswer": 2,
//     "difficulty": "easy",
//     "topic": "Free Fall"
//   },
//   {
//     "question": "In kinematics, what does the term 'inertia' refer to?",
//     "options": ["A. Resistance to motion", "B. Change in velocity", "C. Gravitational force", "D. Speed"],
//     "correctAnswer": 0,
//     "difficulty": "hard",
//     "topic": "Inertia"
//   },
//   {
//     "question": "What is the escape velocity from Earth's surface?",
//     "options": ["A. 11.2 km/s", "B. 9.8 m/s²", "C. 3.0 x 10^8 m/s", "D. 42.2 m/s"],
//     "correctAnswer": 0,
//     "difficulty": "hard",
//     "topic": "Escape Velocity"
//   },
//   {
//     "question": "What is terminal velocity in the context of free fall?",
//     "options": ["A. Maximum initial velocity", "B. Final velocity before impact", "C. The velocity at which air resistance balances gravitational force", "D. Zero velocity"],
//     "correctAnswer": 2,
//     "difficulty": "hard",
//     "topic": "Terminal Velocity"
//   },
//   {
//     "question": "What is the formula for velocity?",
//     "options": ["A = ΔV / Δt", "B = Δd / Δt", "C = F / m", "D = m * g"],
//     "correctAnswer": 1,
//     "difficulty": "medium",
//     "topic": "Basic Kinematics"
//   },
//   {
//     "question": "What is the formula for acceleration?",
//     "options": ["A = ΔV / Δt", "B = Δd / Δt", "C = F / m", "D = m * g"],
//     "correctAnswer": 0,
//     "difficulty": "medium",
//     "topic": "Basic Kinematics"
//   },
//   {
//     "question": "What is the formula for displacement?",
//     "options": ["A = ΔV / Δt", "B = Δd / Δt", "C = F / m", "D = m * g"],
//     "correctAnswer": 1,
//     "difficulty": "medium",
//     "topic": "Basic Kinematics"
//   },
//   {
//     "question": "Which of the following represents the equation of motion for constant acceleration?",
//     "options": ["A = V - U", "B = V + U", "C = V^2 - U^2", "D = V / U"],
//     "correctAnswer": 2,
//     "difficulty": "medium",
//     "topic": "Equations of Motion"
//   },
//   {
//     "question": "What does 'Δ' represent in kinematic equations?",
//     "options": ["A. Final value", "B. Initial value", "C. Change in value", "D. Acceleration"],
//     "correctAnswer": 2,
//     "difficulty": "easy",
//     "topic": "Symbols in Kinematics"
//   },
//   {
//     "question": "A car is moving with a constant velocity of 25 m/s. What is its acceleration?",
//     "options": ["A. 25 m/s²", "B. 0 m/s²", "C. 50 m/s²", "D. 10 m/s²"],
//     "correctAnswer": 1,
//     "difficulty": "easy",
//     "topic": "Acceleration Calculation"
//   },
//   {
//     "question": "Which of the following is a scalar quantity in kinematics?",
//     "options": ["A. Velocity", "B. Displacement", "C. Acceleration", "D. Speed"],
//     "correctAnswer": 3,
//     "difficulty": "easy",
//     "topic": "Scalar and Vector Quantities"
//   },
//   {
//     "question": "An object falls freely under gravity. How does its velocity change with time?",
//     "options": ["A. Increases linearly", "B. Decreases linearly", "C. Remains constant", "D. Increases quadratically"],
//     "correctAnswer": 0,
//     "difficulty": "medium",
//     "topic": "Free Fall"
//   },
//   {
//     "question": "What is the acceleration due to gravity on Earth?",
//     "options": ["A. 9.8 m/s²", "B. 5.0 m/s²", "C. 2.5 m/s²", "D. 10.0 m/s²"],
//     "correctAnswer": 0,
//     "difficulty": "easy",
//     "topic": "Gravitational Acceleration"
//   },
//   {
//     "question": "If an object is in free fall, what is its acceleration?",
//     "options": ["A. 0 m/s²", "B. 5 m/s²", "C. 9.8 m/s²", "D. 1 m/s²"],
//     "correctAnswer": 2,
//     "difficulty": "easy",
//     "topic": "Free Fall"
//   },
//   {
//     "question": "In kinematics, what does the term 'inertia' refer to?",
//     "options": ["A. Resistance to motion", "B. Change in velocity", "C. Gravitational force", "D. Speed"],
//     "correctAnswer": 0,
//     "difficulty": "hard",
//     "topic": "Inertia"
//   },
//   {
//     "question": "What is the escape velocity from Earth's surface?",
//     "options": ["A. 11.2 km/s", "B. 9.8 m/s²", "C. 3.0 x 10^8 m/s", "D. 42.2 m/s"],
//     "correctAnswer": 0,
//     "difficulty": "hard",
//     "topic": "Escape Velocity"
//   },
//   {
//     "question": "What is terminal velocity in the context of free fall?",
//     "options": ["A. Maximum initial velocity", "B. Final velocity before impact", "C. The velocity at which air resistance balances gravitational force", "D. Zero velocity"],
//     "correctAnswer": 2,
//     "difficulty": "hard",
//     "topic": "Terminal Velocity"
//   }