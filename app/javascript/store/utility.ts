export const updateObject = (oldObject: object, updatedValuesObj: object) => {
  return {
    ...oldObject,
    ...updatedValuesObj
  }
}