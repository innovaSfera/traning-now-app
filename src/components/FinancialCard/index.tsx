"use client";

import { useState } from "react";

export default function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 w-full">
        {/* Cartão */}
        <div className="relative h-48 w-full xl:w-125 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-800 p-6 text-white shadow-2xl dark:from-indigo-700 dark:to-purple-900">
          <div className="absolute right-5 top-3 text-2xl font-semibold">VISA</div>
          <div className="mt-8 text-2xl tracking-widest">
            {cardNumber || "#### #### #### ####"}
          </div>
          <div className="mt-6 flex justify-between text-sm">
            <div>
              <div className="text-md uppercase text-gray-300">Card Holder</div>
              <div>{cardHolder || "Seu Nome"}</div>
            </div>
            <div>
              <div className="text-md uppercase text-gray-300">Expires</div>
              <div>
                {expMonth || "MM"}/{expYear || "YY"}
              </div>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <form
          className="w-full max-w-full xl:max-w-180 space-y-4 rounded-2xl bg-white p-6 shadow-xl transition-colors dark:bg-gray-800"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Número do cartão */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Card Number
            </label>
            <input
              type="text"
              maxLength={19}
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9123 4567"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Nome do titular */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Card Holder
            </label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="@seu.usuario"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Expiração e CVV */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Expiration Date
              </label>
              <div className="mt-1 flex gap-2">
                <select
                  value={expMonth}
                  onChange={(e) => setExpMonth(e.target.value)}
                  className="w-1/2 rounded-lg border border-gray-300 bg-gray-50 px-2 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  value={expYear}
                  onChange={(e) => setExpYear(e.target.value)}
                  className="w-1/2 rounded-lg border border-gray-300 bg-gray-50 px-2 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={String(year).slice(2)}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="w-24">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                CVV
              </label>
              <input
                type="text"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="***"
                className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-indigo-600 py-2 font-medium text-white transition hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
