import { Widget } from "./models/Miro"
const axios = require("axios").default

export class CommandService {

  constructor(
    private _boardId: string
  ) { }

  private _createOptions(method: 'POST' | 'GET' | 'DELETE' | 'PATCH', path: string) {
    const options = {
      "method": method,
      "url": 'https://api.miro.com' + path,
      "headers": {
        "Accept": "application/json",
        "Content-Type": method !== 'PATCH' ? "application/json" : 'application/vnd+miro.widgets.shape+json',
        "Authorization": "Bearer 2GYqvF-mFkrOUvaky8zofhK2jEc"
      },
      data: null
    }
    return options
  }

  private _makeRequest(method: 'POST' | 'GET' | 'DELETE' | 'PATCH', url: string, requestParams: string) {
    const options = this._createOptions(method, url)
    options.data = requestParams

    return axios.request(options)
      .then(resp => {
        return resp.data
      })
      .catch(err => {
        console.error(err)
      })
  }

  // createWidget(method: 'POST' | 'GET' | 'DELETE', requestParams: string) {
  //   this._makeRequest(method, '/v2/boards/' + this._boardId + '/widgets', requestParams)
  // }

  createShape(requestParams: string) {
    this._makeRequest('POST', '/v2/boards/' + this._boardId + '/shapes', requestParams)
  }

  // updateShape(shapeId: string, requestParams: string) {
  //   return this._makeRequest('PATCH', '/v2/boards/' + this._boardId + '/shapes/' + shapeId, requestParams)
  // }

  createNewCounter(currentTime: string) {
    let theBackgroundColor = '#ffffff'
    if (currentTime === '00:03' ||
      currentTime === '00:02' ||
      currentTime === '00:01') {
      theBackgroundColor = '#ff6060'
    }

    let requestParams = JSON.stringify({
      data: { content: currentTime, shapeType: 'rectangle' },
      style: {
        backgroundColor: theBackgroundColor,
        backgroundOpacity: '1.0',
        fontFamily: 'plex_sans',
        fontSize: '52',
        borderColor: '#000000',
        borderWidth: '2.0',
        borderOpacity: '1.0',
        borderStyle: 'normal',
        textAlign: 'center'
      },
      geometry: { x: '1294.0', y: '1760.0', width: '380', height: '150', rotation: '0' }
    })

    this.createShape(requestParams)
  }


  createBidToken(sum: number, x: number, y: number, size: number) {
    const randomColor = this._getRandomColor() || '#ffd02e'

    let requestParams = JSON.stringify({
      data: { content: sum + '€', shapeType: 'circle' },
      style: {
        backgroundColor: randomColor,
        backgroundOpacity: '1.0',
        fontFamily: 'plex_sans',
        fontSize: '48',
        borderColor: randomColor,
        borderWidth: '2.0',
        borderOpacity: '1.0',
        borderStyle: 'normal',
        textAlign: 'center'
      },
      geometry: { x: x, y: y, width: size, height: size, rotation: '0' }
    })

    this.createShape(requestParams)
  }

  getBoard(boardId: string) {
    this._makeRequest('GET', '/v2/boards/' + boardId, '')
  }

  copyBoard(oldBoardId: string) {
    const requestParams = JSON.stringify({
      name: 'test!',
      sharingPolicy: { access: 'private', teamAccess: 'private' },
      permissionsPolicy: { copyAccessLevel: 'team_editors' }
    })
    this._makeRequest('POST', '/v2/boards?copy_from=' + oldBoardId, requestParams)
  }

  private _getRandomColor() {
    const randomNum = Math.floor(Math.random() * 10) + 1
    if (randomNum > 0 && randomNum < 3) {
      return '#fff9b1'
    }
    if (randomNum >= 3 && randomNum < 5) {
      return '#ffd02e'
    }
    if (randomNum >= 5 && randomNum < 6) {
      return '#23bfe7'
    }
    if (randomNum >= 6 && randomNum < 8) {
      return '#7b92ff'
    }
    if (randomNum >= 9 && randomNum <= 10) {
      return '#7b92ff'
    }
  }

  createImage(requestParams: string) {
    return this._makeRequest('POST', '/v2/boards/' + this._boardId + '/images', requestParams);
  }

  newImage(imageName: string) {
    const requestParams = JSON.stringify({
      "position": {
        "x": 1460,
        "y": 780
      },
      "title": "../images/" + imageName
    })
    this.createImage(requestParams)
  }

  createStartingPriceBox(price: number) {
    const requestParams = JSON.stringify({
      data: { content: 'Starting price: ' + price + '€', shapeType: 'rectangle' },
      style: {
        backgroundColor: '#ffffff',
        backgroundOpacity: '1.0',
        fontFamily: 'open_sans',
        fontSize: '48',
        borderColor: '#1a1a1a',
        borderWidth: '2.0',
        borderOpacity: '1.0',
        borderStyle: 'normal',
        textAlign: 'center'
      },
      geometry: { x: 1460, y: 1300, width: 648, height: 150, rotation: '0' }
    })
    this.createShape(requestParams)
  }

  createDescriptionBox() {
    const requestParams = JSON.stringify({
      data: {shapeType: 'rectangle'},
    style: {
      backgroundColor: '#ffffff',
      backgroundOpacity: '1.0',
      fontFamily: 'open_sans',
      fontSize: '14',
      borderColor: '#1a1a1a',
      borderWidth: '2.0',
      borderOpacity: '1.0',
      borderStyle: 'normal',
      textAlign: 'left'
    },
    geometry: {x: 2315, y: 845, width: 810, height: 685, rotation: '0'}
    })
    this.createShape(requestParams)
  }

  createDescriptionText(title: string, size: string, collection: string, designer: string, condition: string, material: string){
    const requestParamsTitle = JSON.stringify({
      data: {content: title, shapeType: 'rectangle'},
      style: {
        backgroundColor: '#ffffff',
        backgroundOpacity: '1.0',
        fontFamily: 'open_sans',
        fontSize: '55',
        borderColor: '#ffffff',
        borderWidth: '2.0',
        borderOpacity: '1.0',
        borderStyle: 'normal',
        textAlign: 'left'
      },
      geometry: {x: 2315, y: 700, width: 760, height: 50, rotation: '0'}
    })

    const requestParamsSize = JSON.stringify({
      data: {content: 'Size: ' + size, shapeType: 'rectangle'},
      style: {
        backgroundColor: '#ffffff',
        backgroundOpacity: '1.0',
        fontFamily: 'open_sans',
        fontSize: '35',
        borderColor: '#ffffff',
        borderWidth: '2.0',
        borderOpacity: '1.0',
        borderStyle: 'normal',
        textAlign: 'left'
      },
      geometry: {x: 2315, y: 700, width: 760, height: 35, rotation: '0'}
    })

    const requestParamsCollection = JSON.stringify({
      data: {content: 'Collection: ' + collection, shapeType: 'rectangle'},
      style: {
        backgroundColor: '#ffffff',
        backgroundOpacity: '1.0',
        fontFamily: 'open_sans',
        fontSize: '27',
        borderColor: '#ffffff',
        borderWidth: '2.0',
        borderOpacity: '1.0',
        borderStyle: 'normal',
        textAlign: 'left'
      },
      geometry: {x: 2315, y: 850, width: 760, height: 30, rotation: '0'}
    })

    const requestParamsDesigner = JSON.stringify({
      data: {content: 'Designer: ' + designer, shapeType: 'rectangle'},
      style: {
        backgroundColor: '#ffffff',
        backgroundOpacity: '1.0',
        fontFamily: 'open_sans',
        fontSize: '27',
        borderColor: '#ffffff',
        borderWidth: '2.0',
        borderOpacity: '1.0',
        borderStyle: 'normal',
        textAlign: 'left'
      },
      geometry: {x: 2315, y: 900, width: 760, height: 30, rotation: '0'}
    })

    const requestParamsCondition = JSON.stringify({
      data: {content: 'Condition: ' + condition, shapeType: 'rectangle'},
      style: {
        backgroundColor: '#ffffff',
        backgroundOpacity: '1.0',
        fontFamily: 'open_sans',
        fontSize: '27',
        borderColor: '#ffffff',
        borderWidth: '2.0',
        borderOpacity: '1.0',
        borderStyle: 'normal',
        textAlign: 'left'
      },
      geometry: {x: 2315, y: 950, width: 760, height: 30, rotation: '0'}
    })

    const requestParamsMaterial = JSON.stringify({
      data: {content: 'Material: ' + material, shapeType: 'rectangle'},
      style: {
        backgroundColor: '#ffffff',
        backgroundOpacity: '1.0',
        fontFamily: 'open_sans',
        fontSize: '27',
        borderColor: '#ffffff',
        borderWidth: '2.0',
        borderOpacity: '1.0',
        borderStyle: 'normal',
        textAlign: 'left'
      },
      geometry: {x: 2315, y: 1000, width: 760, height: 30, rotation: '0'}
    })

    this.createShape(requestParamsTitle)
    this.createShape(requestParamsSize)
    this.createShape(requestParamsCollection)
    this.createShape(requestParamsDesigner)
    this.createShape(requestParamsCondition)
    this.createShape(requestParamsMaterial)
  }


}

