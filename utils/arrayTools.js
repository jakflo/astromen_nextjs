export default class arrayTools {
        searchInObjArray(objArray, keyName, value) {
            if (objArray.length === 0) {
                return [];
            }
            var k;
            var result = [];
            for (k in objArray) {
                if (objArray[k][keyName] == value) {
                    result.push(objArray[k]);
                }
            }
            return result;
        }
}