function camelize(str) {
  let arr = str.split('');
  let result = [];
  let needUpperCase = false;
  
  arr.forEach((item, index, array) => {
      if (item === '-') {
          needUpperCase = true;
          return;
      };

      if (needUpperCase) {
          result.push(item.toUpperCase());
          needUpperCase = false;
      } else {
          result.push(item.toLowerCase());
      };
  });
  return result.join('');
}
