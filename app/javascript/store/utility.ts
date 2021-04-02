type UpdateObject = (oldObj: object, updatedObj: object) => object;

export const updateObject: UpdateObject = (oldObject: object, updatedValuesObj: object) => {
  return {
    ...oldObject,
    ...updatedValuesObj
  }
}