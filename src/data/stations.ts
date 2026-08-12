export type Provider = 'spotify' | 'youtube';

export interface Station {
  id: string;
  nameMalayalam: string;
  nameEnglish: string;
  description: string;
  accentColor: string;
  backgroundVariant: string;
  spotifyPlaylistUrl: string;
  spotifyPlaylistId: string;
  youtubePlaylistUrl: string;
  youtubePlaylistId: string;
}

export const stations: Station[] = [
  {
    id: 'mazha-chaya',
    nameMalayalam: 'മഴയും ചായയും',
    nameEnglish: 'Mazhayum Chayayum',
    description: 'Monsoon melodies and a hot glass of tea.',
    accentColor: '#10b981', // green-500
    backgroundVariant: 'heavy-rain',
    spotifyPlaylistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M', // placeholders
    spotifyPlaylistId: '37i9dQZF1DXcBWIGoYBM5M',
    youtubePlaylistUrl: 'https://www.youtube.com/watch?v=Em3wmM8knO0',
    youtubePlaylistId: 'Em3wmM8knO0',
  },
  {
    id: 'pazhaya-radio',
    nameMalayalam: 'പഴയ റേഡിയോ',
    nameEnglish: 'Pazhaya Radio',
    description: 'Yesudas, Chithra, and pure 80s/90s nostalgia.',
    accentColor: '#f59e0b', // amber-500
    backgroundVariant: 'sepia',
    spotifyPlaylistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXbVhtU18a6pB',
    spotifyPlaylistId: '37i9dQZF1DXbVhtU18a6pB',
    youtubePlaylistUrl: 'https://www.youtube.com/watch?v=fNw_kP9zLUQ',
    youtubePlaylistId: 'fNw_kP9zLUQ',
  },
  {
    id: 'rathri-yathra',
    nameMalayalam: 'രാത്രി യാത്ര',
    nameEnglish: 'Rathri Yathra',
    description: 'Late night drives. Vidyasagar & AR Rahman hits.',
    accentColor: '#3b82f6', // blue-500
    backgroundVariant: 'midnight',
    spotifyPlaylistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX2yvmlOdMYzV',
    spotifyPlaylistId: '37i9dQZF1DX2yvmlOdMYzV',
    youtubePlaylistUrl: 'https://www.youtube.com/watch?v=KEPjic5G8Gc',
    youtubePlaylistId: 'KEPjic5G8Gc',
  },
  {
    id: 'viraham',
    nameMalayalam: 'വിരഹം',
    nameEnglish: 'Viraham',
    description: 'Heartbreak and soup songs.',
    accentColor: '#6b7280', // gray-500
    backgroundVariant: 'moody',
    spotifyPlaylistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWWWQ46lR2eLg',
    spotifyPlaylistId: '37i9dQZF1DWWWQ46lR2eLg',
    youtubePlaylistUrl: 'https://www.youtube.com/watch?v=fS-vBb8WGUA',
    youtubePlaylistId: 'fS-vBb8WGUA',
  },
  {
    id: 'nadan-sheel',
    nameMalayalam: 'നാടൻ ശീൽ',
    nameEnglish: 'Nadan Sheel',
    description: 'Energetic folk and festival vibes.',
    accentColor: '#ef4444', // red-500
    backgroundVariant: 'festive',
    spotifyPlaylistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXbS2XQ8UfI9B',
    spotifyPlaylistId: '37i9dQZF1DXbS2XQ8UfI9B',
    youtubePlaylistUrl: 'https://youtube.com/playlist?list=PL_PLACEHOLDER_5',
    youtubePlaylistId: 'PL_PLACEHOLDER_5',
  }
];
