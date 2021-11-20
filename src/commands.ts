import { Widget } from "./models/Miro";
import * as https from 'https';

export class CommandService {

  constructor(
    private _boardId: string
  ) { }

  private _createOptions(method: 'POST' | 'GET' | 'DELETE', path: string) {
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

  private _createRequest(method: 'POST' | 'GET' | 'DELETE', url: string, requestParams: string) {
    const options = this._createOptions(method, url)

    const req = https.request(options, res => {

      res.on("data", data => {
        return data as Widget
      })

      // res.on("end", function () {
      //   const body = Buffer.concat(chunks);
      //   console.log(body.toString());
      // });
    });

    req.write(requestParams);
    req.end();
  }

  createWidget(method: 'POST' | 'GET' | 'DELETE', requestParams: string) {
    this._createRequest(method, '/v1/boards/' + this._boardId + '/widgets', requestParams);
  }


  createNewTime(currentTime: string) {
    let requestParams = JSON.stringify({
      data: {content: currentTime, shapeType: 'round_rectangle'},
      style: {
        backgroundColor: '#ffd02f',
        backgroundOpacity: '1.0',
        fontFamily: 'arial',
        fontSize: '14',
        borderColor: '#1a1a1a',
        borderWidth: '2.0',
        borderOpacity: '1.0',
        borderStyle: 'normal',
        textAlign: 'center'
      },
      geometry: {x: '0.0', y: 10, width: '100', height: '100', rotation: '0'}
    })
  }
}

