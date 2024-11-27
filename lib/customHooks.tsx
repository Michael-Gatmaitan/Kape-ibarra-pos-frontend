"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "./apiUrl";
import { ICategory, ICustomer, IEmployee, IOrder } from "..";
import { useToast } from "../@/hooks/use-toast";
import { getTokenClient } from "./tokenAPI";

interface IRole {
  id: number;
  roleName: string;
}

export function useGetToken() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = await getTokenClient();
      console.log(token);
      setToken(token);
    }

    getToken();
  }, []);

  return token;
}

export function useRoles() {
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    const getRoles = async () => {
      const token = await getTokenClient();
      const result: IRole[] = await fetch(`${apiUrl}/role`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        }
      }).then((res) =>
        res.json(),
      );
      setRoles(result);
    };
    getRoles();
  }, []);

  return roles;
}
interface IUserPayload {
  person: IEmployee | ICustomer,
  roleName: string;
}

export function useUserPayload() {
  const [userPayload, setUserPayload] = useState<IUserPayload>();

  useEffect(() => {
    const getUserPayload = async () => {
      const result = await fetch(`/api/token?getType=payload`).then((res) => res.json());

      if ("error" in result) {
        console.error("No user found in token");
      }

      setUserPayload(result);
    };

    getUserPayload();
  }, []);

  return userPayload;
}

interface IRawMaterials {
  id: number;
  materialName: string;
  quantityInUnitPerItem: number;
}

export function useRawMaterial() {
  const [rawMaterials, setRawMaterials] = useState<IRawMaterials[]>();

  useEffect(() => {
    const getRawMaterials = async () => {
      const token = await getTokenClient();
      console.log("RAW", token)
      const result = await fetch(`${apiUrl}/raw-material`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        }
      }).then((res) =>
        res.json(),
      );
      setRawMaterials(result);
    };

    getRawMaterials();
  }, []);

  return rawMaterials;
}

export function useCategories() {
  const [categories, setCategories] =
    useState<ICategory[]>();

  useEffect(() => {
    const getCategories = async () => {
      const token = await getTokenClient();
      console.log("CAT", token)
      const req = await fetch(`${apiUrl}/category`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        }
      });

      const result = await req.json();

      console.log("Categories: ", result);
      setCategories(result);
    };
    getCategories();
  }, []);

  return categories;
}

export function useCreateToast(title: string, description: string) {
  const { toast } = useToast();

  return toast({
    title,
    description
  })
}

export function useGetOrders({ orderStatus }: { orderStatus: string }) {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const getOrderByStatus = async () => {
      const token = await getTokenClient();
      const req = await fetch(`${apiUrl}/order?orderStatus=${orderStatus}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        }
      });
      const result: IOrder[] = await req.json();
      setOrders(result);
    }

    getOrderByStatus();
  }, [orderStatus]);

  return orders;
}

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}