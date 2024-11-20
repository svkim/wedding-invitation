import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface Props {
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const AttendModal = ({ setComponent }: Props) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [isGroom, setIsGroom] = useState<boolean>(true);
  const [name, setName] = useState<string>();
  const [companionCount, setCompanionCount] = useState<string>('0');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const elRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: elRef,
    handler: () => setComponent(null),
  });

  const isAvailableHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const _isAvailable = e.target.value === 'true';

    console.log(_isAvailable);
    setIsAvailable(_isAvailable);
  };

  const isGroomHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const _isGroom = e.target.value === 'true';

    console.log(_isGroom);
    setIsGroom(_isGroom);
  };

  const companionCountHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCompanionCount(e.target.value);
  };

  const isAgreedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsAgreed(checked);
  };

  const onSubmit = () => {
    if (!name) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!isAgreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    // api
    // 참석정보가 전달되었습니다.
  };

  return (
    <Container ref={elRef}>
      <CloseButton onClick={() => setComponent(null)}>
        <i
          className="fa fa-times"
          style={{ color: 'white' }}
          aria-hidden="true"
        ></i>
      </CloseButton>
      <Title>참석정보 전달하기</Title>
      <Wrapper>
        <SubTitle>참석 여부를 선택해주세요.</SubTitle>
        <ButtonWrapper>
          <Button>
            <Input
              id="radio-1"
              type="radio"
              name="isAvailable"
              value="true"
              onChange={isAvailableHandler}
              checked={isAvailable}
            />
            <Label htmlFor="radio-1">참석 가능</Label>
          </Button>
          <Button>
            <Input
              id="radio-2"
              type="radio"
              name="isAvailable"
              value="false"
              onChange={isAvailableHandler}
              checked={!isAvailable}
            />
            <Label htmlFor="radio-2">참석 불가</Label>
          </Button>
        </ButtonWrapper>
      </Wrapper>

      <Wrapper style={{ marginTop: '28px' }}>
        <SubTitle>신랑 & 신부에게 전달될 정보를 입력해주세요.</SubTitle>
        <ButtonWrapper>
          <Button>
            <Input
              className="isGroom"
              id="radio-3"
              type="radio"
              name="isGroom"
              value="true"
              onChange={isGroomHandler}
              checked={isGroom}
            />
            <Label htmlFor="radio-3">신랑측</Label>
          </Button>
          <Button>
            <Input
              className="isBride"
              id="radio-4"
              type="radio"
              name="isGroom"
              value="false"
              onChange={isGroomHandler}
              checked={!isGroom}
            />
            <Label htmlFor="radio-4">신부측</Label>
          </Button>
        </ButtonWrapper>
      </Wrapper>
      <InputContentWrapper>
        <InputContent>
          <InputContentLabel htmlFor="name">
            성함<Dot>*</Dot>
          </InputContentLabel>
          <TextInput
            id="name"
            type="text"
            spellCheck={false}
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextInput>
        </InputContent>

        {isAvailable && (
          <InputContent>
            <InputContentLabel htmlFor="companionCount">
              추가 인원<Dot>*</Dot>
            </InputContentLabel>

            {/* <Bottom>∨</Bottom> */}
            <Select
              id="companionCount"
              value={companionCount}
              onChange={companionCountHandler}
            >
              <option value="0">동행인 없음</option>
              <option value="1">외 1명</option>
              <option value="2">외 2명</option>
              <option value="3">외 3명</option>
              <option value="4">외 4명</option>
              <option value="5">외 5명</option>
            </Select>
          </InputContent>
        )}
      </InputContentWrapper>
      <AgreementWrapper>
        <AgreementTitle>개인정보 수집 및 이용 동의(필수)</AgreementTitle>
        <AgreementDesc>
          참석정보 전달을 위한 개인정보 수집 및 이용에 동의해주세요.
          <br />
          항목:성함,연락처 보유기간: 청첩장 이용 종료시 까지
        </AgreementDesc>
        <div style={{ display: 'flex', gap: '8px' }}>
          <AgreementCheckbox
            type="checkbox"
            id="agreement"
            checked={isAgreed}
            onChange={isAgreedHandler}
          ></AgreementCheckbox>
          <AgreementLabel htmlFor="agreement">
            동의합니다<Dot>*</Dot>
          </AgreementLabel>
        </div>
      </AgreementWrapper>
      <SubmitButton onClick={onSubmit}>참석정보 전달하기</SubmitButton>
    </Container>
  );
};

export default AttendModal;

const InputContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin: 28px 0;

  @media only screen and (max-width: 445px) {
    gap: 11px;
  }

  @media only screen and (max-width: 360px) {
    gap: 10px;
  }
`;

const InputContent = styled.div`
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  height: 52px;
  font-size: 16px;
  position: relative;

  @media only screen and (max-width: 445px) {
    font-size: 15.5px;
    height: 50px;
  }

  @media only screen and (max-width: 400px) {
    font-size: 15px;
    height: 48px;
  }
`;

const Dot = styled.span`
  font-family: Pretendard;
  color: #f47269;
  font-weight: 600;
  position: relative;
  left: 4px;
`;

const InputContentLabel = styled.label`
  font-family: Pretendard;
  font-weight: 600;
  width: 92px;
  min-width: 92px;
  display: flex;
  align-items: center;
`;

const TextInput = styled.input`
  font-family: Pretendard;
  flex: 1;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  padding-left: 4px;
  background-color: transparent;

  &::placeholder,
  &::-webkit-input-placeholder {
    color: #bdbdbd;
  }
  &::-ms-input-placeholder {
    color: #bdbdbd;
  }
`;

const Select = styled.select`
  font-family: Pretendard;
  flex: 1;
  outline: none;
  padding-left: 4px;
  font-weight: 500;
  background-color: transparent;

  position: relative;
`;

const Container = styled.div`
  position: relative;
  background-color: white;
  width: min(calc(100vw - 20px), 500px);
  max-height: calc(100svh - 24px);
  display: flex;
  /* justify-content: center; */
  overflow-y: auto;
  align-items: center;
  position: relative;
  animation: fadeInUp 0.3s ease-in-out;
  flex-direction: column;
  padding: 32px 35px;

  @media only screen and (max-width: 445px) {
    padding: 30px 28px;
  }

  @media only screen and (max-width: 360px) {
    padding: 24px 20px;
  }
`;

const Title = styled.div`
  width: 100%;
  color: #444444;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 22px;
  padding-bottom: 25px;
  margin-bottom: 33px;
  font-family: Pretendard;

  @media only screen and (max-width: 600px) {
    font-size: 21px;
    padding-bottom: 24px;
    margin-bottom: 32px;
  }

  @media only screen and (max-width: 445px) {
    font-size: 20px;
    padding-bottom: 23px;
    margin-bottom: 31px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 19px;
    padding-bottom: 22px;
    margin-bottom: 30px;
  }
`;

const SubTitle = styled.p`
  font-family: Pretendard;
  color: #444444;
  font-weight: 600;
  font-size: 18px;
  text-align: left;
  white-space: nowrap;

  @media only screen and (max-width: 600px) {
    font-size: 17px;
  }

  @media only screen and (max-width: 445px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 15.5px;
  }
`;

const AgreementTitle = styled(SubTitle)`
  font-size: 16px;

  @media only screen and (max-width: 445px) {
    font-size: 15.5px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 14.8px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  @media only screen and (max-width: 445px) {
    gap: 18px;
  }

  @media only screen and (max-width: 360px) {
    gap: 16px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 50px;

  display: flex;

  @media only screen and (max-width: 445px) {
    height: 49px;
  }

  @media only screen and (max-width: 360px) {
    height: 48px;
  }
`;

const Input = styled.input`
  display: none;

  /* Checked */
  &:checked + label {
    background-color: #363639;
    color: #fff;
    border: 1px solid #363639;
  }

  /* Checked */
  &.isGroom:checked + label {
    background-color: #65778f;
    color: #fff;
    border: 1px solid #65778f;
  }

  /* Checked */
  &.isBride:checked + label {
    background-color: #be7e79;
    color: #fff;
    border: 1px solid #be7e79;
  }
`;

const Button = styled.button`
  background-color: transparent;
  flex: 1;
  cursor: pointer;
`;

const Label = styled.label`
  border: 1px solid #e3e3e3;
  height: 50px;
  display: block;
  font-family: Pretendard;
  color: #909090;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media only screen and (max-width: 445px) {
    height: 49px;
    font-size: 15.5px;
  }

  @media only screen and (max-width: 360px) {
    height: 48px;
    font-size: 15px;
  }
`;

const Content = styled.span`
  color: #444444;
  font-size: 17px;

  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 445px) {
    font-size: 15px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.28);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: white;
  font-size: 21px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-weight: 200;

  @media only screen and (max-width: 445px) {
    width: 34px;
    height: 34px;
    font-size: 20px;
  }

  @media only screen and (max-width: 360px) {
    width: 33px;
    height: 33px;
    font-size: 19px;
    top: 11px;
    right: 11px;
  }
`;

const AgreementWrapper = styled.div`
  width: 100%;
  border: 1px solid #e3e3e3;
  padding: 20px 18px;
`;

const AgreementDesc = styled.div`
  margin: 14px 0;
  color: #646464;
  font-family: Pretendard;
  font-size: 12px;
  line-height: 1.3;
  font-weight: 200;
`;

const AgreementCheckbox = styled.input`
  width: 15px;
  height: 15px;
  opacity: 0.8;
`;

const AgreementLabel = styled.label`
  font-family: Pretendard;
  font-size: 14.5px;
  color: #363639;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  background-color: #363639;
  color: white;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  height: 58px;
  min-height: 58px;
  border-radius: 4px;

  @media only screen and (max-width: 445px) {
    height: 56px;
    min-height: 56px;
  }
`;

const Bottom = styled.span`
  font-family: Pretendard;
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
`;
