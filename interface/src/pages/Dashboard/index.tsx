import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@material-ui/core';

import { isToday, isAfter, format, parseISO } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import DayPicker, { DayModifiers } from 'react-day-picker';

import { FiClock } from 'react-icons/fi';

import { useAuth, useLanguage } from '../../hooks';
import api from '../../services/api';
import notify from '../../services/toast';

import 'react-day-picker/lib/style.css';
import { Content, Schedule, NextAppointment, Section, Loader, Appointment, Calendar, UserIcon } from './styles';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface ScheduleAppointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { language } = useLanguage();

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<ScheduleAppointment[]>([]);
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

  const loadProviderAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get<ScheduleAppointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      });

      const { data } = response;

      const appointmentsFormatted = data.map(appointment => {
        return {
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), `${language === 'pt' ? 'HH:mm' : 'KK:mm a'}`),
        };
      });

      setAppointments(appointmentsFormatted);
    } catch (err) {
      setAppointments([]);
      notify(err?.response?.data?.message ? err.response.data.message : err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedDate, language]);

  const loadMonthAvailability = useCallback(async () => {
    try {
      const response = await api.get<MonthAvailabilityItem[]>(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      });
      const { data } = response;
      setMonthAvailability(data);
    } catch (err) {
      setMonthAvailability([]);
      notify(err?.response?.data?.message ? err.response.data.message : err.message, 'error');
    }
  }, [currentMonth, user.id]);

  useEffect(() => {
    loadMonthAvailability();
  }, [loadMonthAvailability]);

  useEffect(() => {
    loadProviderAppointments();
  }, [loadProviderAppointments]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, 'PPPP', {
      locale: language === 'pt' ? ptBR : enUS,
    });
  }, [selectedDate, language]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => isAfter(parseISO(appointment.date), new Date()));
  }, [appointments]);

  return (
    <Content>
      <Schedule>
        <h1>{t('scheduledAppointments')}</h1>
        <p>
          <span>{selectedDateAsText}</span>
        </p>

        {loading ? (
          <Loader>
            <CircularProgress size={15} style={{ color: '#7159c1' }} />
          </Loader>
        ) : (
          <>
            {isToday(selectedDate) && nextAppointment && (
              <NextAppointment>
                <strong>{t('nextAppointmenst')}</strong>
                <div>
                  <img src={nextAppointment.user.avatar_url} alt={nextAppointment.id} />

                  <strong>{nextAppointment.user.name}</strong>
                  <span>
                    <FiClock />
                    {nextAppointment.hourFormatted}
                  </span>
                </div>
              </NextAppointment>
            )}
            <Section>
              <strong>{t('morning')}</strong>

              {morningAppointments.length === 0 && <p>{t('noAppointments')}</p>}
              {morningAppointments.map(appointment => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                  <div>
                    {appointment.user.avatar_url ? <img src={appointment.user.avatar_url} alt={appointment.user.name} /> : <UserIcon />}
                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              ))}
            </Section>
            <Section>
              <strong>{t('afternoon')}</strong>
              {afternoonAppointments.length === 0 && <p>{t('noAppointments')}</p>}
              {afternoonAppointments.map(appointment => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                  <div>
                    {appointment.user.avatar_url ? <img src={appointment.user.avatar_url} alt={appointment.user.name} /> : <UserIcon />}

                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              ))}
            </Section>
          </>
        )}
      </Schedule>
      <Calendar>
        <DayPicker
          weekdaysShort={[t('shortSunday'), t('shortMonday'), t('shortTuesday'), t('shortWednesday'), t('shortThursday'), t('shortFriday'), t('shortSaturday')]}
          fromMonth={new Date()}
          selectedDays={selectedDate}
          disabledDays={[{ daysOfWeek: [0] }, ...disabledDays]}
          modifiers={{
            available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
          }}
          onDayClick={handleDateChange}
          onMonthChange={handleMonthChange}
          months={[t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun'), t('jul'), t('aug'), t('sept'), t('out'), t('nov'), t('dec')]}
        />
      </Calendar>
    </Content>
  );
};

export default Dashboard;
