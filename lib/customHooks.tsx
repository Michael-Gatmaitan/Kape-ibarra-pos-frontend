"use client"

import { useEffect, useState } from "react"
import { apiUrl } from "./apiUrl";

interface IRole {
  id: number,
  roleName: string
}

export function useRoles() {
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    const getRoles = async () => {
      const result: IRole[] = await fetch(`${apiUrl}/role`).then(res => res.json());
      setRoles(result);
    }
    getRoles();
  }, []);

  return roles;
}

interface IBranch {
  id: number;
  region: string;
  province: string;
  city: string;
  baranggay: string;
  zipCode: string;
  streetAddress: string;
  contactNumber: string;
}

export function useBranch() {
  const [branches, setBranches] = useState<IBranch[]>([]);

  useEffect(() => {
    const getBranches = async () => {
      const result: IBranch[] = await fetch(`${apiUrl}/branch`).then(res => res.json());
      console.log("Branches in hook: ", result);
      setBranches(result);
    }

    getBranches();
  }, []);

  return branches;
}

interface IUserPayload {
  id: number;
  roleName: string;
}

export function useUserPayload() {
  const [userPayload, setUserPayload] = useState<IUserPayload>();

  useEffect(() => {
    const getUserPayload = async () => {
      const result = await fetch(`api/token`).then(res => res.json());
      console.log(result);
      setUserPayload(result);
    }

    getUserPayload();
  }, []);

  return userPayload;
}