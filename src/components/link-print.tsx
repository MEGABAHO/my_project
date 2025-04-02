"use client"
import React from 'react'
import Link from "next/link";

export default function LinkPrint() {

    const handlePrint = () => {
        // Найти элемент в DOM по ID
        const printElement = document.getElementById("print-zone");
        if (printElement) {
            const originalContent = document.body.innerHTML; // Сохраняем оригинальный HTML
            const printContent = printElement.outerHTML; // Получаем HTML для печати

            document.body.innerHTML = printContent; // Подменяем содержимое страницы
            window.print(); // Запускаем печать
            document.body.innerHTML = originalContent; // Восстанавливаем оригинальный HTML

            window.location.reload(); // Перезагружаем страницу для восстановления состояния
        } else {
            console.error("Элемент с ID 'print-zone' не найден.");
        }
    };


    return (
        <Link className={"text-xl"} href={""} onClick={handlePrint}>Print</Link>
    )
}
