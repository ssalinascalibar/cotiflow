import { createContext, useState, type ReactNode } from "react";
import customersFixture from "../data/customers.json";

export type Customer = {
  id: string;
  name: string;
  rut: string;
  email: string;
};

type CustomersContextValue = {
  customers: Customer[];
  createCustomer: (name: string, email: string) => void;
  updateCustomer: (id: string, name: string, email: string) => void;
  deleteCustomer: (id: string) => void;
};

const CustomersContext = createContext<CustomersContextValue | null>(null);

function CustomersProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(customersFixture);

  const createCustomer = (name: string, email: string) => {
    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      name,
      rut: "",
      email,
    };

    setCustomers((previousCustomers) => [
      ...previousCustomers,
      newCustomer,
    ]);
  };

  const updateCustomer = (id: string, name: string, email: string) => {
    setCustomers((previousCustomers) =>
      previousCustomers.map((customer) =>
        customer.id === id ? { ...customer, name, email } : customer,
      ),
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers((previousCustomers) =>
      previousCustomers.filter((customer) => customer.id !== id),
    );
  };

  return (
    <CustomersContext.Provider
      value={{ customers, createCustomer, updateCustomer, deleteCustomer }}
    >
      {children}
    </CustomersContext.Provider>
  );
}

export { CustomersProvider };
export default CustomersContext;
