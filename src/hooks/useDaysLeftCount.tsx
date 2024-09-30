import React, { useEffect, useState } from 'react'

const DAY = 1000 * 24 * 60 * 60

function useDaysLeftCount(days: number) {
  const [remainingDays, setRemainingDays] = useState(days)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingDays((prev) => {
        if (prev > 0) {
          return prev - 1
        }
        return 0
      })
    }, DAY)

    return () => clearInterval(interval)
  }, [days])

  const displayDays = remainingDays > 0 ? `${remainingDays} days left` : 'time\'s up'

  return { remainingDays: displayDays }
}

export { useDaysLeftCount }
