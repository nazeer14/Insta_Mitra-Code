import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistStorage } from "zustand/middleware";

interface OrdersState{
    orders: any | null,
    setOrders: (orders: any)=>void,
    clearOrders: ()=>void,
}

export const useOrderStore=create<OrdersState>()(
    persist(
        (set)=>({
            orders:null,
            setOrders:(orders)=>set({orders}),
            clearOrders: ()=>set({orders:null}),
        }),
        {
            name: 'orders-storage',
            storage: AsyncStorage as unknown as PersistStorage<OrdersState>,
        }
    )
)
