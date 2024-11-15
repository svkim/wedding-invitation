// import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { increment, onValue, ref, update } from 'firebase/database';
// import { realtimeDb } from 'firebase.ts';
import JSConfetti from 'js-confetti';
import { useCallback, useState } from 'react';

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
    '🧡',
    '🧡',
    '💛',
    '🤍',
    '💗',
    '🤍',
    '💗',
  ];

  // TODO: count 기능 사용 원할시 firebase realtime db 연결!
  const [count, setCount] = useState(0);

  // useEffect(() => {
  // TODO: realtime db 에 likes 객체 추가.
  //   const dbRef = ref(realtimeDb, 'likes');
  //   onValue(dbRef, (snapshot) => {
  //     setCount(Number(snapshot.val()));
  //   });
  // }, []);

  const handle = () => {
    void jsConfetti.addConfetti({ emojis, emojiSize: 35 });

    // 버튼 클릭시 likes 수 증가
    // const dbRef = ref(realtimeDb);
    // void update(dbRef, {
    //   likes: increment(1),
    // });

    setCount((count) => count + 1);
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
    </button>
  );
};

export default LikeButton;
