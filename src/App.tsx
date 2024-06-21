import React, { useState } from 'react'
import './App.css'

const App: React.FC = () => {
  const [lastClicked, setLastClicked] = useState<Date | undefined>(undefined)
  const [buttonColor, setButtonColor] = useState<'red' | 'blue' | 'green'>(
    'red'
  )

  const formatDate = (date: Date, timezone: string) => {
    return date.toLocaleString(undefined, { timeZone: timezone })
  }

  const onClick = () => {
    const newDate = new Date()
    setLastClicked(newDate)
    setButtonColor(getNextButtonColor(buttonColor))
  }

  const getNextButtonColor = (
    color: 'red' | 'blue' | 'green'
  ): 'red' | 'blue' | 'green' => {
    switch (color) {
      case 'red':
        return 'blue'
      case 'blue':
        return 'green'
      case 'green':
        return 'red'
      default:
        throw new Error('Invalid color')
    }
  }

  return (
    <>
      <div>
        <button onClick={onClick} style={{ backgroundColor: buttonColor }}>
          Click
        </button>
      </div>
      <div className='TimeContainer'>
        <div className='TimeItem'>
          Local time:{' '}
          {lastClicked !== undefined
            ? formatDate(
                lastClicked,
                Intl.DateTimeFormat().resolvedOptions().timeZone
              )
            : 'Never'}
        </div>
        <div className='TimeItem'>
          GMT Time:{' '}
          {lastClicked !== undefined ? formatDate(lastClicked, 'GMT') : 'Never'}
        </div>
        <div className='TimeItem'>
          ACT Time:{' '}
          {lastClicked !== undefined
            ? formatDate(lastClicked, 'Australia/Darwin')
            : 'Never'}
        </div>
      </div>
    </>
  )
}

export default App
