let waitlistCount = 1247;

export const getWaitlistCount = () => waitlistCount;

export const incrementWaitlistCount = () => {
  waitlistCount += 1;
  return waitlistCount;
};
