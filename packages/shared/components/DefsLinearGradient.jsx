import React from 'react'
import PropTypes from 'prop-types'
import { countdownCircleTimerProps } from '..'

import { DIRECTION_VALUES } from '../utils/constants';

const getStopProps = (colors) => {
  const isColorsString = typeof colors === 'string'
  if (isColorsString || colors.length === 1) {
    const stopColor = isColorsString ? colors : colors[0][0]
    return [{ offset: 1, stopColor, key: 0 }]
  }

  const colorsLength = colors.length
  let currentDuration = 0
  return [
    { offset: 0, stopColor: colors[0][0], key: 0 },
    ...colors.map(([stopColor, duration], index) => {
      const isLastColor = colorsLength === index + 1
      currentDuration += duration

      return {
        offset: isLastColor ? 1 : currentDuration,
        stopColor,
        key: index + 1,
      }
    }),
  ]
}

const DefsLinearGradient = ({
  gradientId,
  colors,
  defs: Defs = 'defs',
  linearGradient: LinearGradient = 'linearGradient',
  stop: Stop = 'stop',
  direction,
}) => (
  <Defs>
    <LinearGradient 
      id={gradientId}
      {...DIRECTION_VALUES[direction]}
    >
      {getStopProps(colors).map((gradient) => (
        <Stop {...gradient} key={gradient.key} />
      ))}
    </LinearGradient>
  </Defs>
)

const TagType = PropTypes.oneOfType([PropTypes.func, PropTypes.string])

DefsLinearGradient.propTypes = {
  gradientId: PropTypes.string.isRequired,
  colors: countdownCircleTimerProps.colors,
  defs: TagType,
  linearGradient: TagType,
  stop: TagType,
  direction: countdownCircleTimerProps.gradientDirection,
}

export { DefsLinearGradient }
