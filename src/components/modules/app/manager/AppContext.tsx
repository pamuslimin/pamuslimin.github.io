import { supabase } from "@/supabaseClient";
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

// Initializing context
export const AppContext = createContext<{
  items?: Record<string, any[]>,
  metas?: Record<string, Metas>,
  loading?: boolean,
  adding?: boolean,
  filter?: string,
  setFilter?: any,
  setStatus?: any,
  setPage?: any,
  downloadAll?: (table: string, status: string, filterCol?: string) => void,
  getAllItem?: (table: string, status: string, filterCol?: string) => void,
  deleteItem?: (table: string, id: string) => void,
  addItem?: (table: string, data: any) => void,
  updateItem?: (table: string, { id, ...item }: any) => void,
}>({});
type Metas = {
  page: number;
  pageSize: number;
  totalData: number;
  totalPage: number;
};
export const getPagination = (page: number, size: number
) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};
export function AppContextProvider({ children }: PropsWithChildren<any>) {
  const [items, setItems] = useState<Record<string, any[]>>({
    orphans: [],
    expenses: [],
    donations: [],
    blogs: [],
    messages: [],
  });


  const [metas, setMeta] = useState<Record<string, Metas>>({});
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState("");
  const [statuses, setStatus] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(0);


  const downloadAll = async (table: string, status?: string, filterCol?: string) => {
    setLoading(true);
    try {

      let query = supabase
        .from(table)
        .select("*", { count: "exact" })
        .order("id", { ascending: false });

      if (status) {
        query = query.eq("status", status);
      }

      if (filterCol && filter) {
        query = query.ilike(filterCol, `%${filter}%`);
      }

      const { data } = await query.csv();


      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += data;

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", table + ".csv");
      document.body.appendChild(link); // Required for FF
      link.click();
      document.body.removeChild(link);

    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllItem = async (table: string, status?: string, filterCol?: string, pageSize = 10) => {
    setLoading(true);
    try {

      let query = supabase
        .from(table)
        .select("*", { count: "exact" })
        .order("id", { ascending: false });

      if (status) {
        query = query.eq("status", status);
      }

      if (filterCol && filter) {
        query = query.ilike(filterCol, `%${filter}%`);
      }
      if (pageSize > 0) {
        const { from, to } = getPagination(page, pageSize);
        query = query.range(from, to);
      }

      const { data, error, count } = await query.returns();


      if (error) throw error;
      if (data) {
        setItems((old) => ({ ...old, [table]: [...data] }));
        if (pageSize > 0) {
          setMeta((old) => ({ ...old, [table]: { page: page, pageSize: pageSize, totalPage: ((count ?? pageSize) / pageSize) + 1, totalData: count ?? 0 } }));
        }
      }

    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  // delete row from the database
  const deleteItem = async (table: string, id: string) => {
    try {
      const { error } = await supabase
        .from(table)
        .delete() //delete the row
        .eq("id", id); //the id of row to delete

      if (error) throw error;

      await getAllItem(table); //get the new completed items list
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };


  // add new row to the database
  const addItem = async (table: string, item: any) => {
    setAdding(true);
    try {
      const { error } = await supabase
        .from(table)
        .insert(item); //insert an object with the key value pair, the key being the column on the table

      if (error) throw error;

      await getAllItem(table); //get the new completed items list
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setAdding(false);
    }
  };

  // update column(s) on the database
  const updateItem = async (table: string, { id, ...item }: any) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from(table)
        .update(item)
        .eq("id", id); //matching id of row to update

      if (error) throw error;

      await getAllItem(table); //get the new completed items list
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <AppContext.Provider
      value={{
        items,
        metas,
        loading, filter,
        adding,
        setStatus,
        setFilter,
        setPage,
        getAllItem,
        deleteItem,
        addItem,
        updateItem,
        downloadAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
