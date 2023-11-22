function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
    
  if (obj.key === undefined || obj.key === '') {
   return true;
  }
   return false;
}
