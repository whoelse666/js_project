/*  */

new Promise((resolve, reject) => {
  setTimeout(() => resolve(new Promise(res => res(111))), 2000);
})
  .then(res => {
    console.log(res);//111
    new Promise(res => {
      setTimeout(() => {
        res(222);
      }, 1000);
    }).then(res => {
      console.log(res);
    });
    return 333;
  })
  .then(res => {
    console.log(res);
  });

/* let foo = () => {
  console.log(111);

  setTimeout(() => {
    console.log(333);

    new Promise((resolve1, reject1) => {
      new Promise((resolve2, reject2) => {
        console.log(444);
        resolve2();
      }).then(() => {
        console.log(666);
      });
      console.log(555);
      resolve1(777);
    }).then(resolve => console.log(resolve));
  }, 0);

  new Promise((resolve, reject) =>
    resolve(222)
  ).then(
    resolve =>
      console.log(resolve)
  );
};
foo(); */
