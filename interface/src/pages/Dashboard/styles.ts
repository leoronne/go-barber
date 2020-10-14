import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

export const Content = styled.main`
  max-width: 1120px;
  width: 100%;
  margin: 64px auto;
  display: flex;
  flex-direction: column-reverse;
  transition: all var(--transition);

  @media (min-width: 978px) {
    justify-content: space-between;
    flex-direction: row;
    transition: all var(--transition);
  }
`;

export const Schedule = styled.div`
  flex: 1;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 978px) {
    padding: 0 30px;
    margin-top: 0px;
    align-items: flex-start;
    justify-content: flex-start;
  }

  h1 {
    font-size: 36px;
    color: var(--title-color);
  }

  p {
    margin-top: 8px;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
      text-transform: capitalize;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: var(--color-primary);
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 24px;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background: var(--color-primary);
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: var(--color-white);
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: var(--color-primary);
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.div`
  margin-top: 48px;

  > strong {
    color: var(--text-color);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--day-available);
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: var(--text-color);
    font-weight: 400;
    font-size: 16px;
  }
`;

export const Loader = styled.div`
  max-width: 500px;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    font-size: 14px;
    margin-left: auto;
    display: flex;
    align-items: center;
    width: 90px;
    color: var(--color-primary-light);

    svg {
      width: 15px;
      color: var(--color-primary);
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: var(--calendar-background);
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      font-size: 20px;
      color: var(--text-color);
    }
  }
`;

export const Calendar = styled.aside`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 30px;

  .DayPicker {
    background: var(--calendar-background);
    border-radius: 10px;
    max-width: 380px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    color: var(--text-color);
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: var(--day-available);
    border-radius: 10px;
    color: var(--color-white);
  }

  .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: #585466;
    color: var(--color-white) !important;
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: var(--disabled) !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: var(--color-primary) !important;
    border-radius: 10px;
    color: var(--color-white) !important;
  }
`;

export const UserIcon = styled(FaUserCircle)`
  color: var(--text-color);
  width: 35px;
  height: 35px;
`;
