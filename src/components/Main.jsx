import React from 'react'
import { useState } from 'react'
import { Typography, Input, Paper, Button, Box } from '@mui/material'
import data from '../data/wordsData.json'

function getRamdonIndex(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return randomIndex
}

const hints = Object.keys(data)
const hintIndex = getRamdonIndex(hints)

const wordsArray = data[hints[hintIndex]]
const ramdonWordsIndex = getRamdonIndex(wordsArray)
const lettersArray = wordsArray[ramdonWordsIndex].split('')
const initialArray = lettersArray.map((item) => {
  if (item === ' ') {
    return ' '
  } else {
    return '_'
  }
})

const Main = () => {
  const [dynamicArray, setDynamicArray] = useState(initialArray)
  const [count, setCount] = useState(8)
  const [guess, setGuess] = useState('')
  const [showWin, setShowWin] = useState(false)
  const [showLose, setShowLose] = useState(false)
  let guessArr = [...dynamicArray]

  const checkLetter = (letter) => (e) => {
    e.preventDefault()
    lettersArray.forEach((item, i) => {
      if (item === letter) {
        guessArr[i] = letter
        setGuess('')
      } else if (item === '') {
        guessArr[i] = ''
      }
    })

    if (!guessArr.includes(letter)) {
      if (guess) {
        if (count > 1) {
          setCount(count - 1)
          setGuess('')
        } else {
          setCount(count - 1)
          setShowLose(true)
          setGuess('')
        }
      }
    }
    if (checkWin(guessArr)) {
      setShowWin(true)
    }
    setDynamicArray(guessArr)
  }

  const checkWin = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== lettersArray[i]) return false
    }
    return true
  }

  const reset = () => {
    window.location.reload(false)
  }

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: 'green', margin: '30px 0' }}>
          Hint:{hints[hintIndex]}
        </Typography>

        {dynamicArray.map((item, index) => (
          <Typography
            variant="h5"
            key={index}
            sx={{ display: 'inline', color: 'blue' }}
          >
            {item.toLocaleUpperCase()}&nbsp;&nbsp;&nbsp;
          </Typography>
        ))}
      </Box>
      {count >= 0 ? (
        <Typography variant="h6" align="center" sx={{ margin: '30px 0' }}>
          Guesses left: {count}
        </Typography>
      ) : (
        <Typography variant="h6" align="center" sx={{ margin: '30px 0' }}>
          Guesses left: 0
        </Typography>
      )}

      <Paper elevation={0} sx={{ justifyContent: 'center', display: 'flex' }}>
        <form onSubmit={checkLetter(guess)}>
          <Input
            id="guess"
            placeholder="Enter your guess"
            name="guess"
            autoFocus
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{ margin: '20px 10px' }}
          >
            Submit
          </Button>
          <Box sx={{ textAlign: 'center', margin: '10px 0' }}>
            {(showLose || showWin) && (
              <Button
                color="secondary"
                variant="contained"
                onClick={reset}
                size="small"
              >
                Restart
              </Button>
            )}
          </Box>
        </form>
      </Paper>
      <Paper elevation={0} sx={{ margin: '20px' }}>
        {showWin && (
          <Typography align="center" variant="h6" sx={{ color: 'green' }}>
            You Won!!!
          </Typography>
        )}
        {showLose && (
          <Typography align="center" variant="h6" sx={{ color: 'orange' }}>
            Try again please
          </Typography>
        )}
      </Paper>
    </>
  )
}

export default Main
