const xyToPoint = (x, y) => {
  let points = [];

  for (let i = 0; i < x.length; i++) {
    points.push({ x: parseFloat(x[i]), y: parseFloat(y[i]) });
  }

  return points;
};

const normDist = (mean, sd) => {
  let u = 0;
  let v = 0;

  // 0の場合はサンプリングをやり直す
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();

  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  return mean + sd * z;
};

const chCount = 512;
const maxEnergy = 10.0;
const energyPerCh = maxEnergy / chCount;
const peak1 = 4.5;
const peak2 = 6.3;
const intensity1 = 100;
const intensity2 = 10;
const fwhm = 0.15;
const offset = 0.5;

const sd = fwhm / (2 * Math.sqrt(2 * Math.log(2)));
const sx = 1.0 / Math.sqrt(2 * Math.PI) / sd;

const x = [];
const y = [];

for (let i = 0; i < chCount; i++) {
  const xi = i * energyPerCh;

  const y1 = ((xt) => {
    const m = xt - peak1;
    return sx * Math.exp(-(m ** 2) / (2 * sd ** 2));
  })(xi);

  const y2 = ((xt) => {
    const m = xt - peak2;
    return sx * Math.exp(-(m ** 2) / (2 * sd ** 2));
  })(xi);

  const yi = intensity1 * y1 + intensity2 * y2 + offset;
  const epsilon = normDist(yi, Math.sqrt(yi / 10.0));

  x.push(xi);
  y.push(yi + (yi > 0 ? epsilon : 0));
}

export const points = xyToPoint(x, y);
