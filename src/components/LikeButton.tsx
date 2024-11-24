import styled from 'styled-components';
import { child, get, increment, ref, update } from 'firebase/database';
import { dbref, realtimeDb } from '../firebase.ts';
import { useCallback, useEffect, useState } from 'react';
import { jsConfetti } from '../App.tsx';

// 쓰로틀링 함수
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function (...args: Parameters<T>) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

const EMOJIS = [
  '❤️',
  '❤️',
  '💜',
  '💚',
  '💛',
  '💛',
  '🧡',
  '🧡',
  '💛',
  '🤍',
  '💗',
  '🤍',
  '💗',
];

const LikeButton = () => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetchLikes();
  }, []);

  const fetchLikes = async () => {
    get(child(dbref, '/like'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const { likes } = snapshot.val();
          setLikes(likes);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const increaseLikes = async () => {
    const dbRef = ref(realtimeDb, '/like');
    try {
      await update(dbRef, {
        likes: increment(1),
      });

      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handle = () => {
    jsConfetti.addConfetti({ emojis: EMOJIS, emojiSize: 32 });

    increaseLikes();
  };

  const onClickLike = useCallback(throttle(handle, 600), []);

  return (
    <div style={{ marginTop: '40px' }}>
      <Button
        style={{
          cursor: 'pointer',
          borderRadius: '45px',
          padding: '5px 5px 5px 30px',
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #e0e0e0',
        }}
        onClick={onClickLike}
      >
        <div
          style={{
            minWidth: '45px',
            marginRight: '12px',
            display: 'flex',
            alignItems: 'center',
            color: '#555555',
            fontFamily: 'Pretendard',
            fontSize: '18px',
            fontWeight: 500,
          }}
        >
          {likes}
        </div>
        <div
          style={{
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <i
            className="fa fa-heart"
            style={{ color: '#f58a8a', fontSize: '28px' }}
          ></i>
        </div>
      </Button>
    </div>
  );
};

export default LikeButton;

const Button = styled.button`
  background-color: white;
  box-shadow: 6px 6px 7px rgba(0, 0, 0, 0.15);

  &:active {
    background-color: rgba(0, 0, 0, 0.01);
    box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, 0.09) inset;
  }
`;
