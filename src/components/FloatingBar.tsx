// import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { increment, onValue, ref, update } from 'firebase/database';
// import { realtimeDb } from 'firebase.ts';
import JSConfetti from 'js-confetti';
import { useCallback, useState } from 'react';
// import Heart from '@/assets/icons/heart_plus.svg?react';
// import Share from '@/assets/icons/share.svg?react';
// import Upward from '@/assets/icons/upward.svg?react';
// import Button from '@/components/Button.tsx';

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

const FloatingBar = ({ isVisible }: { isVisible: boolean }) => {
  const emojis = [
    '💛',
    '💌',
    '🥳',
    '👰🏻‍',
    '🤵🏻‍️',
    '🤍',
    '✨',
    '💍',
    '💒',
    '💕',
    '😍',
    '🔔',
    '💘',
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
    void jsConfetti.addConfetti({ emojis });

    // 버튼 클릭시 likes 수 증가
    // const dbRef = ref(realtimeDb);
    // void update(dbRef, {
    //   likes: increment(1),
    // });

    setCount((count) => count + 1);
  };

  const onClickLike = useCallback(
    throttle(handle, 500), // 0.5초에 한 번만 클릭 허용
    []
  );

  const jsConfetti = new JSConfetti();

  return (
    <Nav $isVisible={isVisible}>
      <div>{count}</div>
      <button
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          fontSize: 30,
        }}
        onClick={onClickLike}
      >
        ❤️
      </button>
    </Nav>
  );
};

export default FloatingBar;

const Nav = styled.nav<{ $isVisible: boolean }>`
  min-width: 280px;
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  gap: 5px;
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  background-color: rgba(255, 255, 255, 0.8);
`;
