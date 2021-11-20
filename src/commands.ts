import { Widget } from "./models/Miro";
import * as https from 'https';

export class CommandService {

  constructor(
    private _boardId: string
  ) { }

  private _createOptions(method: 'POST' | 'GET' | 'DELETE' | 'PATCH', path: string) {
    const options = {
      "method": method,
      "hostname": "api.miro.com",
      "port": null,
      "path": path,
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer 2GYqvF-mFkrOUvaky8zofhK2jEc"
      }
    }
    return options
  }

  private _createRequest(method: 'POST' | 'GET' | 'DELETE' | 'PATCH', url: string, requestParams: string) {
    const options = this._createOptions(method, url)

    let data = null
    const req = https.request(options, res => {

      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        data = JSON.parse(body.toString());
      });

    });

    req.write(requestParams);
    req.end();

    return data
  }

  // createWidget(method: 'POST' | 'GET' | 'DELETE', requestParams: string) {
  //   this._createRequest(method, '/v2/boards/' + this._boardId + '/widgets', requestParams);
  // }

  createShape(requestParams: string) {
    return this._createRequest('POST', '/v2/boards/' + this._boardId + '/shapes', requestParams);
  }

  updateShape(shapeId: string, requestParams: string) {
    return this._createRequest('PATCH', '/v2/boards/' + this._boardId + '/shapes/' + shapeId, requestParams)
  }

  updateCounter(currentTime: string, shapeId: string) {
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

    this.updateShape(shapeId, requestParams)
  }

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
    return this.createShape(requestParams)
  }

  getBoard(boardId: string) {
    this._createRequest('GET', '/v2/boards/' + boardId, '')
  }

  copyBoard(oldBoardId: string) {
    const requestParams = JSON.stringify({
      name: 'test!',
      sharingPolicy: { access: 'private', teamAccess: 'private' },
      permissionsPolicy: { copyAccessLevel: 'team_editors' }
    })
    this._createRequest('POST', '/v2/boards?copy_from=' + oldBoardId, requestParams)
  }
}

