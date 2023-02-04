import type { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string'

type Data = {
  name: string
}

var client_id = process.env.SPOTIFY_CLIENT_ID

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var state = 'aaaaaaaaaaaaaaaa'
  var scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public'

  res.redirect('https://accounts.spotify.com/authorize?' + 
    queryString.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: 'http://localhost:3000/api/callback',
      state: state
    }));
}
