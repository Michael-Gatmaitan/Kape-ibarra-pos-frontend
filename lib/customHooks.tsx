"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "./apiUrl";
import { ICategory, IEmployee, IOrder } from "..";
import { useToast } from "../@/hooks/use-toast";

interface IRole {
  id: number;
  roleName: string;
}

export function useRoles() {
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    const getRoles = async () => {
      const result: IRole[] = await fetch(`${apiUrl}/role`).then((res) =>
        res.json(),
      );
      setRoles(result);
    };
    getRoles();
  }, []);

  return roles;
}
interface IUserPayload {
  employee: IEmployee,
  roleName: string;
}

export function useUserPayload() {
  const [userPayload, setUserPayload] = useState<IUserPayload>();

  useEffect(() => {
    const getUserPayload = async () => {
      const result = await fetch(`/api/token`).then((res) => res.json());

      if ("error" in result) {
        console.error("No user found in token");
      }
      console.log(result);
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
      const result = await fetch(`${apiUrl}/raw-material`).then((res) =>
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
      const result = await fetch(`${apiUrl}/category`).then((res) =>
        res.json(),
      );

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
      const req = await fetch(`${apiUrl}/order?orderStatus=${orderStatus}`);
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