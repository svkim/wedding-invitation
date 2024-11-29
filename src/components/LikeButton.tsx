import styled from 'styled-components';
import { child, get, increment, ref, update } from 'firebase/database';
import { dbref, realtimeDb } from '../firebase.ts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { jsConfetti } from '../App.tsx';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks/index';

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

const SPECIAL_EMOJIS = ['🌻'];

function checkOneInThousand() {
  // Math.random()은 0 이상 1 미만의 값을 반환
  const randomNumber = Math.random();

  // 1000분의 1 확률을 체크: randomNumber가 0과 1 사이에서 0.001 이하일 경우
  if (randomNumber < 0.001) {
    return true;
  } else {
    return false;
  }
}

const LikeButton = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [count, setCount] = useState(0);
  const [likes, setLikes] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchLikes();
  }, []);

  useEffect(() => {
    // count가 10의 배수일 때만 비활성화 타이머를 설정
    if (count > 0 && count % 10 === 0) {
      setShowFireworks(true);

      // setTimeout을 한 번만 실행하도록 ref 사용
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // 이전 타이머 정리

      timeoutRef.current = setTimeout(() => {
        setShowFireworks(false);
      }, 5000);
    } else {
      setShowFireworks(false);
    }
    return () => {
      // 컴포넌트 언마운트 시 타이머를 정리
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [count]);

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
    setCount((prev) => prev + 1);

    jsConfetti.addConfetti({
      emojis: EMOJIS,
      emojiSize: 32,
    });

    increaseLikes();
  };

  const onClickLike = useCallback(throttle(handle, 500), []);

  return (
    <>
      {showFireworks && <Fireworks autorun={{ speed: 1, duration: 5000 }} />}
      <div style={{ marginTop: '28px' }}>
        <Button
          style={{
            cursor: 'pointer',
            borderRadius: '45px',
            padding: '5px 5px 5px 30px',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #e0e0e0',
          }}
          disabled={showFireworks}
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
            {showFireworks ? <>FEVER TIME!</> : <>{likes}</>}
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
    </>
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
