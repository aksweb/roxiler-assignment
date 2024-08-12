import React, { useState, useEffect, useCallback } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(3); // Default to March
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10 items per page
  const [totalPages, setTotalPages] = useState(1); // To handle total pages for pagination
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch transactions data
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/transactions?search=${searchText}&page=${currentPage}&limit=${itemsPerPage}&month=${selectedMonth}`
      );
      const data = await response.json();
      setTransactions(data.transactions);
      setTotalPages(Math.ceil(data.totalCount / itemsPerPage)); // Calculate total pages
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  }, [searchText, currentPage, selectedMonth, itemsPerPage]);

  // Fetch data whenever searchText, currentPage, selectedMonth, or itemsPerPage changes
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchTransactions();
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page on month change
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page on items per page change
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="h-screen flex flex-col p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Transactions</h1>
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4 text-blue-900 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={handleSearch}
          className="border p-2 w-full bg-cyan-100 rounded-lg"
        />
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border p-2 bg-cyan-100 rounded-lg"
        >
          <option value={0}>All</option>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y table-auto">
            <thead>
              <tr>
                <th className="text-left p-4 w-1/12">ID</th>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Description</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Sold</th>
                <th className="text-left p-4">Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id} className="border-b">
                    <td className="p-4 hover:underline hover:text-blue-500 cursor-pointer">
                      {transaction._id}
                    </td>
                    <td className="p-4 hover:underline hover:text-blue-500 cursor-pointer">
                      {transaction.title}
                    </td>
                    <td className="p-4 hover:underline hover:text-blue-500 cursor-pointer">
                      {transaction.description}
                    </td>
                    <td className="p-4 hover:underline hover:text-blue-500 cursor-pointer">
                      ${transaction.price}
                    </td>
                    <td className="p-4 hover:underline hover:text-blue-500 cursor-pointer">
                      {transaction.category}
                    </td>
                    <td className="p-4 hover:underline hover:text-blue-500 cursor-pointer">
                      {transaction.sold ? "Yes" : "No"}
                    </td>
                    <td className="p-4 hover:underline hover:text-blue-500 cursor-pointer">
                      <img
                        src={transaction.image}
                        alt={transaction.title}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
        <div>
          Page No: <span className="font-bold">{currentPage}</span> of{" "}
          {totalPages}
        </div>
        <div>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="py-2 px-4 rounded disabled:opacity-50 bg-indigo-500 text-white"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="py-2 px-4 rounded ml-2 bg-indigo-500 text-white"
          >
            Next
          </button>
        </div>
        <div>
          Items per page:
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border p-2 ml-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
