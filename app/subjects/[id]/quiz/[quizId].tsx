import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { getColors } from '@/constants/colors';
import { ArrowLeft, Clock, Award, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';

export default function QuizScreen() {
  const colors = getColors();
  const { id, quizId } = useLocalSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Mock quiz data
  const quiz = {
    id: quizId,
    title: 'Quadratic Equations Quiz',
    timeLimit: 900, // 15 minutes
    questions: [
      {
        id: '1',
        question: 'What is the standard form of a quadratic equation?',
        options: [
          'ax + b = 0',
          'ax² + bx + c = 0',
          'ax³ + bx² + cx + d = 0',
          'ax + by = c'
        ],
        correctAnswer: 1,
        explanation: 'The standard form of a quadratic equation is ax² + bx + c = 0, where a ≠ 0.'
      },
      {
        id: '2',
        question: 'Which method can be used to solve x² - 5x + 6 = 0?',
        options: [
          'Factoring',
          'Quadratic formula',
          'Completing the square',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'All three methods (factoring, quadratic formula, and completing the square) can be used to solve quadratic equations.'
      },
      {
        id: '3',
        question: 'What are the solutions to x² - 4 = 0?',
        options: [
          'x = 2',
          'x = -2',
          'x = ±2',
          'x = 4'
        ],
        correctAnswer: 2,
        explanation: 'x² - 4 = 0 can be factored as (x-2)(x+2) = 0, giving solutions x = 2 and x = -2, or x = ±2.'
      },
    ]
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmitQuiz();
      }
    }
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    setShowResult(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScorePercentage = () => {
    return Math.round((calculateScore() / quiz.questions.length) * 100);
  };

  if (showResult) {
    const score = calculateScore();
    const percentage = getScorePercentage();
    const passed = percentage >= 70;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color={colors.text} size={24} />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Quiz Results
          </Text>
        </View>

        <View style={styles.resultContainer}>
          <Card style={styles.resultCard}>
            <View style={styles.resultHeader}>
              {passed ? (
                <CheckCircle color={colors.success} size={64} />
              ) : (
                <XCircle color={colors.error} size={64} />
              )}
              
              <Text style={[styles.resultTitle, { color: colors.text }]}>
                {passed ? 'Congratulations!' : 'Keep Practicing!'}
              </Text>
              
              <Text style={[styles.resultSubtitle, { color: colors.textSecondary }]}>
                {passed 
                  ? 'You passed the quiz!' 
                  : 'You need 70% to pass. Try again!'
                }
              </Text>
            </View>

            <View style={styles.scoreContainer}>
              <Text style={[styles.scoreText, { color: colors.text }]}>
                Your Score
              </Text>
              <Text style={[styles.scoreValue, { color: passed ? colors.success : colors.error }]}>
                {score}/{quiz.questions.length}
              </Text>
              <Text style={[styles.scorePercentage, { color: colors.textSecondary }]}>
                {percentage}%
              </Text>
            </View>

            <View style={styles.resultActions}>
              <Button
                title="Review Answers"
                onPress={() => {
                  // Navigate to review screen
                }}
                variant="outline"
                style={styles.reviewButton}
              />
              
              <Button
                title={passed ? "Continue Learning" : "Retake Quiz"}
                onPress={() => {
                  if (passed) {
                    router.back();
                  } else {
                    // Reset quiz
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setSelectedAnswer(null);
                    setShowResult(false);
                    setQuizCompleted(false);
                    setTimeLeft(quiz.timeLimit);
                  }
                }}
              />
            </View>
          </Card>
        </View>
      </View>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            Alert.alert(
              'Exit Quiz',
              'Are you sure you want to exit? Your progress will be lost.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Exit', style: 'destructive', onPress: () => router.back() },
              ]
            );
          }}
        >
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {quiz.title}
          </Text>
          <Text style={[styles.questionProgress, { color: colors.textSecondary }]}>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </Text>
        </View>

        <View style={styles.timerContainer}>
          <Clock color={colors.warning} size={16} />
          <Text style={[styles.timer, { color: colors.warning }]}>
            {formatTime(timeLeft)}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={[styles.progressBar, { backgroundColor: colors.neutral }]}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
              backgroundColor: colors.primary 
            }
          ]} 
        />
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Card style={styles.questionCard}>
          <Text style={[styles.questionText, { color: colors.text }]}>
            {currentQ.question}
          </Text>
        </Card>

        {/* Answer Options */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
                selectedAnswer === index && { 
                  borderColor: colors.primary, 
                  backgroundColor: colors.primary + '10' 
                }
              ]}
              onPress={() => handleAnswerSelect(index)}
            >
              <View style={[
                styles.optionIndicator,
                { borderColor: colors.border },
                selectedAnswer === index && { 
                  borderColor: colors.primary,
                  backgroundColor: colors.primary 
                }
              ]}>
                {selectedAnswer === index && (
                  <View style={styles.optionIndicatorInner} />
                )}
              </View>
              
              <Text style={[
                styles.optionText, 
                { color: colors.text },
                selectedAnswer === index && { color: colors.primary }
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <View style={styles.nextButtonContainer}>
          <Button
            title={currentQuestion === quiz.questions.length - 1 ? "Submit Quiz" : "Next Question"}
            onPress={handleNextQuestion}
            disabled={selectedAnswer === null}
            size="large"
            style={styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  questionProgress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timer: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  progressBar: {
    height: 4,
    marginHorizontal: 24,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  questionCard: {
    padding: 24,
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  optionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIndicatorInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  nextButtonContainer: {
    alignItems: 'center',
  },
  nextButton: {
    minWidth: 200,
  },
  resultContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultCard: {
    padding: 32,
    alignItems: 'center',
    width: '100%',
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resultTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 16,
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  scorePercentage: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
  },
  resultActions: {
    width: '100%',
    gap: 12,
  },
  reviewButton: {
    marginBottom: 8,
  },
});