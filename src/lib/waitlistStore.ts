let waitlistCount = 2400;

export const getWaitlistCount = () => waitlistCount;

export const incrementWaitlistCount = () => {
  waitlistCount += 1;
  return waitlistCount;
};
