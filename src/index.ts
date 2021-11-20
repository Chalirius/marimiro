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
    console.log('Kaboom!')
    // TODO! Render winner name and remove timer
  } else {
    commandService.createNewTime(getTimeAsString(cnt))
    cnt--
    setTimeout(() => renderTickingClock
      (cnt, commandService), 1000);
  }
}

(async () => {
  const commandService = new CommandService('o9J_lhmFzD4=')

  // commandService.copyBoard('o9J_lhmFzD4=')
  renderTickingClock(10, commandService)
})()
