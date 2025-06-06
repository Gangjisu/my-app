import React, { useState } from 'react';
import './App.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

function App() {
  const [nickname, setNickname] = useState('');
  const [games, setGames] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    setError(null);
    setGames([]);
    try {
      const userResp = await fetch(
        `${API_BASE}/user?nickname=${encodeURIComponent(nickname)}`
      );
      if (!userResp.ok) throw new Error('User not found');
      const user = await userResp.json();
      const userNum = user.userNum;
      if (!userNum) {
        setError('유저를 찾을 수 없습니다.');
        return;
      }
      const gamesResp = await fetch(
        `${API_BASE}/user/games?user_num=${userNum}`
      );
      if (!gamesResp.ok) throw new Error('Failed to fetch games');
      const data = await gamesResp.json();
      setGames(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>이터널 리턴 전적 검색</h1>
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임 입력"
      />
      <button onClick={search}>검색</button>
      {error && <p>{error}</p>}
      <ul>
        {games.map((game) => (
          <li key={game.gameId}>{JSON.stringify(game)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
