import { Widget } from "./models/Miro";
import * as https from 'https';

export class CommandService {

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

  createWidget(boardId: string) {
    this._createRequest('POST', '/v1/boards/' + boardId + '/widgets', JSON.stringify({ type: 'card', title: 'Ever simpler card' }))
  }
}