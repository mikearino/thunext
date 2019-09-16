const songList = {
  1: "Thought I'd end up with Sean, But he wasn't a match, Wrote some songs about Ricky, Now I listen and laugh, Even almost got married, And for Pete I'm so thankful, Wish I could say 'Thank you' to Malcolm, 'Cause he was an angel, One taught me love, One taught me patience, And one taught me pain, Now I'm so amazing, I've loved and I've lost, But that's not what I see, So look what I got, Look what you taught me, And for that I say, Thank you next (next), Thank you next (next), Thank you next, I'm so fuckin' grateful for my ex, Thank you next (next), Thank you next (next), Thank you next (next), I'm so fuckin', Spend more time with my friends, I ain't worried 'bout nothin', Plus I met someone else, We havin' better discussions, I know they say I move on too fast, But this one gon' last, 'Cause…".split(', '),
  2: "Twenty-five years and my life is still, Trying to get up that great big hill of hope, For a destination, I realized quickly when I knew I should, That the world was made up of this brotherhood of man, For whatever that means, And so I cry sometimes when I'm lying in bed, Just to get it all out what's in my head, And I, I am feeling a little peculiar, And so I wake in the morning and I step outside, And I take a deep breath and I get real high, and I Scream from the top of my lungs, What's going on?, And I say hey yeah yeah hey yeah yeah, I said hey what's going on?, And I say hey yeah yeah hey yeah yeah,I said hey what's going on?".split(', ')
};

//INITIAL STATE
const initialState = {
  currentSongId: null,
  songsById: {
    1:{
      title: "Thank U next",
      artist: "Ariana Grande",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "What's Goin' On",
      artist: "Four Non-Blondes",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    }
  }
}

// REDUCER WILL GO HERE
const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':
    newArrayPosition = state[action.currentSongId].arrayPosition + 1;
    newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
      arrayPosition:newArrayPosition
    })
    newSongsByIdStateSlice = Object.assign({}, state, {
      [action.currentSongId]: newSongsByIdEntry
    });
    return newSongsByIdStateSlice;
    case 'RESTART_SONG':
  newSongsByIdEntry = Object.assign({}, state[action.currentSongId],
  { arrayPosition: 0
  })
  newSongsByIdStateSlice = object.assign({}, state, {
    [action.currentSongId]: newSongsByIdEntry
  });
    return newSongsByIdStateSlice;
    default:
    return state;
  }
}

const songChangeReducer = (state = initialState.currentSongId, action) => {
  switch (action.type){
    case 'CHANGE_SONG':
      return action.newSelectedSongId
    default:
      return state;
  }
}


// JEST TESTS + SETUP WILL GO HERE
const { expect } = window;

expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2 })).toEqual({
  1:{
    title: "Thank U next",
    artist: "Ariana Grande",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "What's Goin' On",
    artist: "Four Non-Blondes",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1,
  }
});

expect(lyricChangeReducer(initialState.songsById, { type: 'RESTART_SONG', currentSongId: 1 })).toEqual({
  1:{
    title: "Thank U next",
    artist: "Ariana Grande",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "What's Goin' On",
    artist: "Four Non-Blondes",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
});
  console.log(initialState.songsById);

expect(songChangeReducer(initialState.currentSongId, { type: 'CHANGE_SONG', newSelectedSongId: 1 })).toEqual(1);

  //REDUX STORE
  const { createStore } = Redux;
  const store = createStore(lyricChangeReducer);
  console.log(store.getState());

  RENDER TO DOM
  const renderLyrics = () => {
    const lyricsDisplay = document.getElementById('lyrics');
    while (lyricsDisplay.firstChild) {
      lyricsDisplay.removeChild(lyricsDisplay.firstChild);
    }
    const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
    const renderedLine = document.createTextNode(currentLine);
    document.getElementById('lyrics').appendChild(renderedLine);
  }

  const renderSongs = () => {
    const songsById = store.getState().songsById;
    for (const songKey in songsById) {
      const song = songsById[songKey]
      const li = document.createElement('li');
      const h3 = document.createElement('h3');
      const em = document.createElement('em');
      const songTitle = document.createTextNode(song.title);
      const songArtist = document.createTextNode(' by ' + song.artist);
      em.appendChild(songTitle);
      h3.appendChild(em);
      h3.appendChild(songArtist);
      h3.addEventListener('click', function() {
        selectSong(song.songId);
      });
      li.appendChild(h3);
      document.getElementById('songs').appendChild(li);
    }
  }

  window.onload = function () {
    renderLyrics();
  }

  //CLICK LISTENER
  const userClick = () => {
    const currentState = store.getState();
    if (currentState.arrayPosition === currentState.songLyricsArray.length - 1) {
      store.dispatch({ type: 'RESTART_SONG'});
    } else {
      store.dispatch({ type: 'NEXT_LYRIC'})
      console.log(store.getState());
    }
  }

  //SUBSCRIBE TO REDUX STORE

  store.subscribe(renderLyrics);
