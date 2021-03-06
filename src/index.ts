import { CommandService } from './commands'


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

    setTimeout(() => {
      renderTickingClock(cnt, commandService)
    }, 1000)
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

const initNewStartingSum = (startingSum: number, commandService: CommandService) => {
  commandService.createStartingPriceBox(startingSum)

  const x = 3500
  const y = 1800
  const startSize = 140
  const distance = 210
  renderBiddingTokens(0, 18, distance, startingSum, 5, x, y, startSize, commandService)
}

(async () => {
  const commandService = new CommandService('o9J_lhmFzD4=')

  const item1 = {
    title: 'Hohtosini dress',
    size: 'M',
    collection: 'Spring 1987',
    designer: 'Maria K',
    condition: 'Good',
    material: '100% Cotton',
    img: '../images/image3.jpg'
  }

  const item2 = {
    title: 'Askelet Unikko',
    size: 'L',
    collection: 'Fall 2017',
    designer: 'Maria K',
    condition: 'Very Good',
    material: '55% Wool 45% Cotton',
    img: '../images/image4.jpg'
  }

  // commandService.createImage(item1.img)
  // commandService.createDescription(item1.title, item1.size, item1.collection, item1.designer, item1.condition, item1.material)
  initNewStartingSum(50, commandService)

  commandService.sleep(2000)

  // Start ticking clock
  renderTickingClock(15, commandService)

  commandService.sleep(3000)
  // commandService.createImage(item2.img)
  // commandService.createDescription(item2.title, item2.size, item2.collection, item2.designer, item2.condition, item2.material)
  // initNewStartingSum(100, commandService)
})()
