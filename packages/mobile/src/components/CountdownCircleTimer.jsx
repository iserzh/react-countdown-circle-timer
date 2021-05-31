import React from 'react'
import { View, Animated } from 'react-native'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import {
  DefsLinearGradient,
  countdownCircleTimerProps,
  countdownCircleTimerDefaultProps,
} from '@countdown-circle-timer/shared'
import { TimeWrapper } from '.'
import { useCountdown } from '../hooks'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const CountdownCircleTimer = (props) => {
  const {
    size,
    strokeWidth,
    trailColor,
    trailStrokeWidth,
    duration,
    isPlaying,
    colors,
    strokeLinecap,
    children,
    isLinearGradient,
    gradientUniqueKey,
    onComplete,
    ariaLabel,
    renderAriaTime,
    initialRemainingTime,
    rotation,
    gradientDirection,
  } = props

  const {
    path,
    pathLength,
    styles,
    gradientId,
    animatedElapsedTime,
    animatedStroke,
    strokeDashoffset,
    durationMilliseconds,
    isProgressPathVisible,
  } = useCountdown({
    isPlaying,
    duration,
    size,
    // https://github.com/vydimitrov/react-countdown-circle-timer/pull/82#issuecomment-774961578
    // Find the larger strokeWidth and calculate the path.
    strokeWidth: Math.max(strokeWidth, trailStrokeWidth ?? 0),
    colors,
    initialRemainingTime,
    onComplete,
    gradientUniqueKey,
    rotation,
  })

  return (
    <View
      style={styles.wrapper}
      accessible={true}
      accessibilityLabel={ariaLabel}
    >
      <Svg width={size} height={size}>
        {isLinearGradient && (
          <DefsLinearGradient
            colors={colors}
            gradientId={gradientId}
            defs={Defs}
            linearGradient={LinearGradient}
            stop={Stop}
            direction={gradientDirection}
          />
        )}
        <Path
          fill="none"
          strokeWidth={trailStrokeWidth ?? strokeWidth}
          stroke={trailColor}
          d={path}
        />
        {isProgressPathVisible && (
          <AnimatedPath
            fill="none"
            stroke={isLinearGradient ? `url(#${gradientId})` : animatedStroke}
            d={path}
            strokeLinecap={strokeLinecap}
            strokeWidth={strokeWidth}
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
          />
        )}
      </Svg>
      {(children !== null || typeof renderAriaTime === 'function') && (
        <TimeWrapper
          animatedColor={animatedStroke}
          animatedElapsedTime={animatedElapsedTime}
          duration={durationMilliseconds / 1000} // durationMilliseconds is locked version of the duration
          renderAriaTime={renderAriaTime}
        >
          {children}
        </TimeWrapper>
      )}
    </View>
  )
}

CountdownCircleTimer.propTypes = countdownCircleTimerProps
CountdownCircleTimer.defaultProps = countdownCircleTimerDefaultProps
CountdownCircleTimer.displayName = 'CountdownCircleTimer'

export { CountdownCircleTimer }
