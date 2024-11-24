const findNewFields = (formState: any, updatedFields: any): any => {
  let newFields: { companyFileds?: any; employeeFields?: any } = {}

  Object.keys(updatedFields).forEach(key => {
    const isCompanyField = updatedFields[key]

    if (isCompanyField && !Array.isArray(isCompanyField)) {
      const value = formState[key]

      if (newFields.companyFileds) {
        newFields.companyFileds[key] = value
      } else {
        newFields = {
          companyFileds: {
            [key]: value,
          },
        }
      }
    } else if (isCompanyField && Array.isArray(isCompanyField) && formState[key].length) {
      const array = formState[key]
      const updatedEmployeeKeys = isCompanyField
      const updatedEmployees = updatedEmployeeKeys.map((emp, i) => {
        const updatedEmployee = {} as any
        Object.keys(emp).forEach(keyEmp => {
          const isUpdated = emp[keyEmp]
          if (isUpdated && array[i] && array[i].id !== "new") {
            updatedEmployee.id = array[i].id
            updatedEmployee[keyEmp] = array[i][keyEmp]
          }
        })
        return updatedEmployee
      }).filter(e => e.id)

      if(updatedEmployees.length) {
        newFields = {
            ...newFields,
            employeeFields: updatedEmployees
          }
      }
     
    }
  })

  return newFields
}

export default findNewFields
