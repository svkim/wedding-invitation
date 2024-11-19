import styled from 'styled-components';
import {
  child,
  get,
  increment,
  onValue,
  ref,
  set,
  update,
} from 'firebase/database';
import { realtimeDb } from '../firebase.ts';
import JSConfetti from 'js-confetti';
import { useCallback, useEffect, useState } from 'react';

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

const LikeButton = () => {
  const emojis = [
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

  const [likes, setLikes] = useState(0);

  // '좋아요' 갯수를 가져오는 함수
  const fetchLikes = async () => {
    const dbRef = ref(realtimeDb);

    get(child(dbRef, '/like'))
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

  // 컴포넌트가 처음 렌더링될 때 '좋아요' 갯수 가져오기
  useEffect(() => {
    fetchLikes();
  }, []); // 빈 배열로 두면 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.

  // '좋아요' 갯수를 증가시키는 함수
  const increaseLikes = async () => {
    const dbRef = ref(realtimeDb, '/like'); // likes 경로를 명시적으로 참조
    try {
      await update(dbRef, {
        likes: increment(1), // likes 필드를 1 증가시키는 방식
      });

      // 상태 업데이트 (이때 최신 상태를 사용하여 업데이트)
      setLikes((prevLikes) => prevLikes + 1); // prevState를 사용하여 상태를 안전하게 업데이트
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handle = () => {
    void jsConfetti.addConfetti({ emojis, emojiSize: 32 });

    increaseLikes();
  };

  const onClickLike = useCallback(
    throttle(handle, 600), // 0.6초에 한 번만 클릭 허용
    []
  );

  const jsConfetti = new JSConfetti();

  return (
    <button
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
      }}
      onClick={onClickLike}
    >
      <i
        className="fa fa-heart"
        style={{ color: '#ff9898', fontSize: '40px' }}
      ></i>
      {likes}
    </button>
  );
};

export default LikeButton;
