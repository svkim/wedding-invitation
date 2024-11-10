import React from 'react';
import styled from 'styled-components';
import s from 'csd';
import Hall from '../../public/images/food.jpg';
import Hall2 from '../../public/images/hall2.png';

// StyledTabIndicator 컴포넌트
interface StyledTabIndicatorProps {
  tabCount: number;
  offset: string;
  duration: number;
}

const StyledTabIndicator = styled.div<StyledTabIndicatorProps>`
  position: absolute;
  width: ${(props) => 100 / props.tabCount}%;
  top: 100%;
  left: 0;

  transform: translate(${(props) => props.offset}, -100%);
  transition: transform ${(props) => props.duration}ms;
  border-top-style: solid;
  border-top-width: 3px;
  border-top-color: #555555;
`;

// StyledTab 컴포넌트
interface StyledTabProps {
  isFocused: boolean;
}

const StyledTab = styled.li<StyledTabProps>`
  flex: 1;
  height: 100%;

  button {
    cursor: pointer;
    transition: color 0.3s;
    color: ${(props) => (props.isFocused ? '#000' : '#777')};
    border: none;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    margin-bottom: 4px;

    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #e4e4e4;
  }
`;

interface TabProps {
  title: string;
  onClick: () => void;
  isFocused: boolean;
}

const Tab: React.FC<TabProps> = ({ title, onClick, isFocused }) => {
  return (
    <StyledTab onClick={onClick} isFocused={isFocused}>
      <button>{title}</button>
    </StyledTab>
  );
};

// StyledTabs 컴포넌트
const StyledTabs = styled.div`
  position: relative;
  list-style: none;
  height: 50px;
  ${s.row}
`;

interface TabsProps {
  focusedIdx: number;
  children: React.ReactNode;
  onChange: (index: number) => void;
  duration?: number;
}

const Tabs: React.FC<TabsProps> = ({
  focusedIdx,
  children,
  onChange,
  duration = 300,
}) => {
  return (
    <StyledTabs>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child as React.ReactElement, {
          key: i,
          isFocused: focusedIdx === i,
          onClick: () => onChange(i),
        })
      )}
      <StyledTabIndicator
        duration={duration}
        tabCount={React.Children.count(children)}
        offset={`${100 * focusedIdx}%`}
      />
    </StyledTabs>
  );
};

// StyledSliders 컴포넌트
interface SlidersProps {
  focusedIdx: number;
  children: React.ReactNode;
  duration?: number;
}

const StyledOuterSliders = styled.div`
  overflow: hidden;
  margin-top: 18px;
  /* border: 3px solid gold; */
`;

const StyledSliders = styled.div<{ offset: number; duration: number }>`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  transform: translateX(${(props) => `${props.offset}%`});
  transition: transform ${(props) => props.duration}ms;

  div {
    flex-shrink: 0;
    width: 100%;
  }
`;

const Sliders: React.FC<SlidersProps> = ({
  focusedIdx,
  children,
  duration = 300,
}) => {
  const offset = -100 * focusedIdx;

  return (
    <StyledOuterSliders>
      <StyledSliders offset={offset} duration={duration}>
        {children}
      </StyledSliders>
    </StyledOuterSliders>
  );
};

// Pane 컴포넌트들
const Pane1: React.FC = () => (
  <Wrapper>
    <img src={Hall} loading="lazy" style={{ marginBottom: '18px' }} />
    <Li>
      <Marker>⦁</Marker>식사 장소는 예식홀과 동일한 층인 G층에 마련되어
      있습니다.
    </Li>
    <Li>
      <Marker>⦁</Marker>예식 시작 30분 전인 오후 1시 30분부터 식사가 가능합니다.
    </Li>

    <Li>
      <Marker>⦁</Marker>
      전체메뉴의 80% 이상이 즉석 메뉴로 구성된 뷔페로,
      <br />
      생맥주, 와인 등 주류도 무제한이니 편하게 즐겨주시면 감사하겠습니다.
    </Li>
  </Wrapper>
);
const Pane2: React.FC = () => (
  <Wrapper>
    <img src={Hall2} loading="lazy" style={{ marginBottom: '18px' }} />
    <Li>
      <Marker>⦁</Marker>지방하객들을 위해 예식으로부터 3일 전 피로연을
      진행합니다.
    </Li>
    <Li>
      <Marker>⦁</Marker>
      2/5 (수) 예산 더스타웨딩홀
    </Li>
  </Wrapper>
);
const Pane3: React.FC = () => <Wrapper>2</Wrapper>;

// App 컴포넌트
const Slider: React.FC = () => {
  const [focusedIdx, setFocusedIdx] = React.useState<number>(0);

  return (
    <Container>
      <Tabs focusedIdx={focusedIdx} onChange={setFocusedIdx}>
        <Tab title="예식·식사 안내" onClick={() => {}} isFocused={false} />
        <Tab title="지방 피로연 안내" onClick={() => {}} isFocused={false} />
      </Tabs>
      <Sliders focusedIdx={focusedIdx}>
        <Pane1 />
        <Pane2 />
      </Sliders>
    </Container>
  );
};

export default Slider;

const Container = styled.div`
  color: #555555;
  width: 100%;
  /* border: 1px solid blue; */
`;

const Wrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 6.5px;
  font-size: 14px;
  line-height: 1.8;
  word-break: keep-all;
  word-wrap: break-word;
  color: #555555;
`;

const Li = styled.li`
  list-style: none;
  /* font-weight: 800; */
`;

const Marker = styled.span`
  font-size: 10px;
  color: #555555;
  margin-right: 6px;
`;
