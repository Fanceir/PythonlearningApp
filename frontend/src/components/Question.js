import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from '@mui/material';
import { fetchQuestionData } from '../services/api'; // 假设有一个 API 方法来获取 JSON 文件

const Question = () => {
  const [questions, setQuestions] = useState([]); // 存储题目列表
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 当前题目的索引
  const [selectedAnswer, setSelectedAnswer] = useState(''); // 用户选择的答案
  const [answered, setAnswered] = useState(false); // 是否已经回答
  const [loading, setLoading] = useState(true); // 加载状态
  const [codeAnswer, setCodeAnswer] = useState(''); // 编程题答案
  const [showAnswer, setShowAnswer] = useState(false); // 是否展示答案

  // 加载并获取题目数据
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetchQuestionData(); // 调用 API 获取 JSON 数据
        setQuestions(response.data); // 设置题目数据
      } catch (error) {
        console.error('Failed to fetch question data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // 选择答案
  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  // 处理编程题答案输入
  const handleCodeAnswerChange = (event) => {
    setCodeAnswer(event.target.value);
  };

  // 提交答案
  const handleSubmit = () => {
    if (selectedAnswer || codeAnswer) {
      setAnswered(true); // 标记当前题目已回答
    }
  };

  // 跳转到下一题
  const handleNextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer('');
    setCodeAnswer(''); // 清理编程题答案
    setShowAnswer(false); // 重置答案显示状态
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 完成所有问题后可以显示结果或做其他处理
      alert('所有问题已经完成！');
    }
  };

  // 展示答案
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box
      sx={{
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      {loading ? (
        <CircularProgress sx={{ color: '#1976d2' }} size={60} />
      ) : (
        <Paper
          sx={{
            width: '100%',
            maxWidth: 700,
            padding: 4,
            backgroundColor: '#fff',
            borderRadius: 3,
            boxShadow: 6,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: 2, fontWeight: 'bold', color: '#333' }}
          >
            问题 {currentQuestionIndex + 1} / {questions.length}
          </Typography>

          <Typography
            variant="h6"
            sx={{ marginBottom: 3, fontWeight: 'bold', color: '#444' }}
          >
            {currentQuestion.question}
          </Typography>

          {/* 判断是否为编程题还是选择题 */}
          {currentQuestion.id >= 11 && currentQuestion.id <= 15 ? (
            // 编程题，显示代码输入框
            <>
              <TextField
                label="请输入你的代码答案"
                multiline
                rows={6}
                value={codeAnswer}
                onChange={handleCodeAnswerChange}
                sx={{ width: '100%', marginBottom: 3 }}
              />
              {/* 展示答案按钮 */}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleShowAnswer}
                sx={{
                  marginTop: 2,
                  padding: '10px 20px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  boxShadow: 2,
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                  },
                }}
              >
                展示答案
              </Button>
              {/* 展示正确答案 */}
              {showAnswer && (
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginTop: 3,
                    color: '#000',
                  }}
                >
                  正确答案：{currentQuestion.correctAnswer}
                </Typography>
              )}
            </>
          ) : (
            // 选择题，显示单选框
            <FormControl
              component="fieldset"
              sx={{ marginBottom: 3, width: '100%' }}
            >
              <FormLabel
                component="legend"
                sx={{ fontWeight: 'bold', fontSize: '18px' }}
              >
                选择答案
              </FormLabel>
              <RadioGroup
                value={selectedAnswer}
                onChange={handleAnswerChange}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  alignItems: 'flex-start',
                  textAlign: 'left',
                }}
              >
                {currentQuestion.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio sx={{ color: '#1976d2' }} />}
                    label={option}
                    disabled={answered}
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '16px',
                        fontWeight: 500,
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {/* 提交按钮 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 2,
              width: '100%',
            }}
          >
            {!answered ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  width: '50%',
                  boxShadow: 2,
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                提交答案
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleNextQuestion}
                sx={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  width: '50%',
                  boxShadow: 2,
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                  },
                }}
              >
                {currentQuestionIndex < questions.length - 1
                  ? '下一题'
                  : '完成'}
              </Button>
            )}
          </Box>

          {/* 显示正确或错误 */}
          {answered && (selectedAnswer || codeAnswer) && (
            <Typography
              variant="body1"
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color:
                  selectedAnswer === currentQuestion.correctAnswer ||
                  codeAnswer === currentQuestion.correctAnswer
                    ? 'green'
                    : 'red',
                marginTop: 2,
              }}
            >
              {selectedAnswer === currentQuestion.correctAnswer ||
              codeAnswer === currentQuestion.correctAnswer
                ? '答案正确!'
                : `答案错误, 正确答案是: ${currentQuestion.correctAnswer}`}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Question;
