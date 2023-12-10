function getMinMax(str) {
  let strSplit = str.split(' ');
  let result = [];
  
  for (let st of strSplit) {
      if ( !isNaN(parseInt(st)) ) {
          result.push(st);
      }
  }
  
  let strResult = result.sort(function(a, b) { return a - b; });
  return { min: +strResult[0], max: +strResult[strResult.length-1] } ; 
}
