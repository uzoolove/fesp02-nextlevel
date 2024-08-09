import cronParser from 'cron-parser';
import moment from 'moment';

/**
 * 현재 시간이 주어진 두 크론식 사이에 있는지 반환
 * @param startCron
 * @param finishCron 
 * @returns 
 */
export function isTimeInRange(startCron: string, finishCron: string) {
  const startInterval = cronParser.parseExpression(startCron);
  const finishInterval = cronParser.parseExpression(finishCron);

  // 가장 가까운 이전 startCron과 다음 finishCron의 시간을 계산
  const startTime = startInterval.prev().toDate();
  const finishTime = finishInterval.next().toDate();

  console.log(moment(finishTime).diff(moment(startTime), 'days'));

  // 두 시간의 차이가 1일 미만일 경우
  return moment(finishTime).diff(moment(startTime), 'days') === 0;
}