import bcrypt from "bcryptjs";
import ApiError from "../../exceptions/apiError";
import Company from "../../models/company.model";
import User from "../../models/user.model";
import type {
  CompanyModel,
  ICompany,
  ReqAddEmployeeBody,
} from "../../types/company";
import companyDto from "../../dtos/companyDto";

const addEmployee = async ({
  companyId,
  newEployees,
}: {
  newEployees: ReqAddEmployeeBody[];
  companyId: string;
}): Promise<{ message: string; updatedCompany: ICompany}> => {
  // const employeeExists = await User.findOne({ email })
  const company = (await Company.findById(companyId)) as CompanyModel;

  if (!company) {
    throw ApiError.BadRequest(`Company not Found`);
  }

  const numbers = company.employeeLimit.match(/\d+/g);
  const limit = numbers ? parseInt(numbers[0], 10) : 0;

  if (limit === company.employees.length) {
    throw ApiError.BadRequest(`The company is overcrowded`);
  }

   // Проверяем существующие emails
   const emailsToCheck = newEployees.map((e) => e.email);
   const existingUsers = await User.find({ email: { $in: emailsToCheck } });
   const existingEmails = existingUsers.map((user) => user.email);
 
   // Создаем сообщение для существующих emails
   const message = existingEmails.length
     ? `The following emails already exist: ${existingEmails.join(", ")}`
     : "";
 
   // Фильтруем новых сотрудников, исключая тех, кто уже существует
   const employeesToAdd = newEployees.filter(
     (employee) => !existingEmails.includes(employee.email)
   );

  const candidates = await Promise.all(employeesToAdd.map(async (employee) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.password, salt);
    return {
      ...employee,
      password: hashedPassword,
    };
  }))
  const newEmployees = await User.insertMany(candidates, { ordered: false });
  const allNewEmployeeIds = newEmployees.map((e) => e._id);
  company.employees.push(...allNewEmployeeIds);
  const savedCompany = await company.save();
  const updatedCompany = companyDto(savedCompany);
  return {
    message,
    updatedCompany
  };
};

export default addEmployee;
