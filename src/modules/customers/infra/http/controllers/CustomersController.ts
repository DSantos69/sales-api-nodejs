import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ListCustomerService from '@modules/customers/services/ListCustomerService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listCustomers = container.resolve(ListCustomerService);
    const customers = await listCustomers.execute({ page, limit });

    return response.json(customers);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomers = container.resolve(ShowCustomerService);
    const customer = await showCustomers.execute({ id });

    return response.json(customer);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createProduct = container.resolve(CreateCustomerService);

    const customer = await createProduct.execute({
      name,
      email,
    });

    return response.json(customer);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomer = container.resolve(UpdateCustomerService);
    const product = await updateCustomer.execute({ id, name, email });

    return response.json(product);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    return response.status(204).json();
  }
}
