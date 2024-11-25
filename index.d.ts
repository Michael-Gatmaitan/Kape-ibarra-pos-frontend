export interface IExpense {
  id: string;
  totalExpensesPerDayId: string;
  expenseAmount: number;
}

export interface IInventory {
  id: string;
  rawMaterialId: string;
  quantityInUnit: number;
  stockQuantity: number;
  isReorderNeeded: boolean;
}

export interface IOrder {
  id: string;
  orderedAt: string;
  customerId: string;
  customerNumber: number;
  totalPrice: number;
  proofOfPaymentImg?: string;
  orderType: "walk-in" | "online";
  orderStatus: "preparing" | "payment pending" | "ready to pickup" | "rejected";
  employeeId: string;
  baristaId?: string;
}

export type OrderCreate = Pick<IOrder, "userId">;

export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  recordedProductPrice: number;
  quantity: number;
  quantityAmount: number;
}

export type OrderItemCreate = Pick<IOrderItem, "quantityAmount" | "quantity">;

export interface ICategory {
  id: string;
  categoryName: string;
}

export interface IProduct {
  id: string;
  categoryId: string;
  imagePath: string;
  productName: string;
  price: number;
  description?: string;
  createdAt: string;
}

export interface IProfit {
  id: string;
  totalExpensesPerDayId: string;
  brachId: string;
  days: number;
  date: string;
  dailySales: number;
  dailyProfit: number;
}

export interface IRawMaterial {
  id: string;
  materialName: string;
  rawPrice: number;
  quantityInUnitPerItem: number;
}

export interface IRecipe {
  id: string;
  productId: string;
  rawMaterialId: string;
  quantityInUnitPcsNeeded: number;
}
export interface IRole {
  id: string;
  rolename: string;
}
export interface ITotalExpensesPerDay {
  id: string;
  days: number;
  date: string;
  totalExpenses: number;
}
export interface ITransaction {
  id: string;
  orderId: string;
  paymentMethod: string;
  totalAmount: number;
  totalTendered: number;
  change: number;
  vatAmount?: number;
  vatableSales: number;
  transactionDate: string;
}
export interface IEmployee {
  id: string;
  roleId: string;
  firstname: string;
  lastname: string;
  cpNum: string;
  username: string;
  password: string;
}
export interface IBatch {
  id: string;
  inventoryId: string;
  batchQuantity: number;
  expirationDate: string;
  recievedDate: string;
  daysUntilExpiration: number;
  notifWarning: boolean;
  isExpired: boolean;
  isDisposed: boolean;
}
export interface ISystemNotification {
  id: string;
  inventoryId: string;
  notificationDate: string;
  stauts: string;
  isSolved: boolean;
}
