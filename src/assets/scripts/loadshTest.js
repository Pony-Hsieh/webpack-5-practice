import { compact } from 'lodash-es';

export function loadshTest() {
  const res = compact([0, 1, false, 2, '', 3]);
  console.log(res);
  // import("lodash").then((lodash) => {
  //   const res = lodash.default.add(3, 4);
  //   console.log(res);
  // });
}
