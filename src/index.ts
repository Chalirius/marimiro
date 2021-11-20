import { CommandService } from './commands'


/**
 * 
 * @param howLong Milliseconds
 */
const sleep = (howLong: number) => {
  return new Promise(resolve => setTimeout(resolve, howLong))
}

/**
 *
 * @param cnt Only <59 seconds atm
 * @returns
 */
const getTimeAsString = (cnt: number) => {
  if (cnt > 59) {
    throw new Error('Sorry, I can\'t handle >59 seconds yet :(')
  }

  const isoTime = new Date(1970, 0, 1, 0, 0, cnt, 0).toISOString()
  return ('' + isoTime).replace('1969-12-31T22:', '').replace('.000Z', '')
}

const renderTickingClock = (cnt: number, commandService: CommandService) => {

  if (cnt < 1) {
    commandService.createNewCounter('00:00')
  } else {
    commandService.createNewCounter(getTimeAsString(cnt))
    cnt--
    renderTickingClock
    sleep(1000)
  }
}

const renderBiddingTokens = (idx: number, max: number, distance: number, sum: number, bidStep: number, x: number, y: number, size: number, commandService: CommandService) => {
  if ((max - idx) < 1) {
    return
  }

  commandService.createBidToken(sum, x, y, size)
  const newSum = sum + bidStep
  const newSize = size * 1.05
  const newX = (idx + 1) % 3 === 0 ? x - 2 * distance : x + distance
  const newY = (idx + 1) % 3 === 0 ? y - distance : y

  renderBiddingTokens(++idx, max, distance, newSum, bidStep, newX, newY, newSize, commandService)
}

(async () => {
  const commandService = new CommandService('o9J_lhmFzD4=')

  const startingSum = 50
  const x = 4300
  const y = 1800
  const startSize = 130
  const distance = 200
  renderBiddingTokens(0, 18, distance, startingSum, 5, x, y, startSize, commandService)

  sleep(5000)

  // Start ticking clock
  // renderTickingClock(15, commandService)

})()
