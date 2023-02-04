import type { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string'

type Data = {
  name: string
}

var client_id = process.env.SPOTIFY_CLIENT_ID
var client_secret = process.env.SPOTIFY_CLIENT_SECRET

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var code = req.query.code || null
  var state = req.query.state || null

  if (state === null) {
    res.redirect('/#' +
      queryString.stringify({
        error: 'state_mismatch'
      }));
  } else {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: new URLSearchParams({
        code: code,
        redirect_uri: 'http://localhost:3000/api/callback',
        grant_type: 'authorization_code'
      } as any)
    })
      .then(response => {
        if (!response.ok || response.status !== 200) {
          throw new Error('HTTP error, status = ' + response.status)
        }
        return response.json()
      })
      .then(body => {
        res.redirect('/home?' +
          queryString.stringify({
            access_token: body.access_token,
            refresh_token: body.refresh_token
          }));
      })
  }
}
