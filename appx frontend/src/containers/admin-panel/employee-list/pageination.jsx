import { useEffect, useState } from "react";

function usePagination(emp, itemsPerPage, curPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const [employee, setEmployee] = useState(emp);
    const maxPage = Math.ceil(employee.length / itemsPerPage);

    useEffect(() => {
        setEmployee(emp);
    }, [emp])

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return employee.slice(begin, end);
    }

    function next() {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
    }

    function prev() {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    }

    function jump(page) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
    }

    function sortByNameInput(emp) {
        setEmployee(emp)
    }

    function sortbyOrder(sortData, options, selectedIndex) {
        const sortingOrder = !sortData ? 1 : -1;
        const temp = employee.sort((a, b) => {
            let fa = (options[selectedIndex] === "By Name") ? a.firstName.toLowerCase() : a.position.toLowerCase();
            let fb = (options[selectedIndex] === "By Name") ? b.firstName.toLowerCase() : b.position.toLowerCase();
            return sortingOrder * fa.localeCompare(fb);
        });
        setEmployee(temp)
    }

    function sortbyName_Role(sortData, event) {
        const sortingOrder = sortData ? 1 : -1;
        const temp = employee.sort((a, b) => {
            let fa = (event.target.tabIndex === 0) ? a.firstName.toLowerCase() : a.position.toLowerCase();
            let fb = (event.target.tabIndex === 0) ? b.firstName.toLowerCase() : b.position.toLowerCase();
            return sortingOrder * fa.localeCompare(fb);
        });
        setEmployee(temp)
    }

    function sortByRoleInput(emp) {
        setEmployee(emp)
    }

    return { next, prev, jump, currentData, currentPage, maxPage, sortByNameInput, sortbyName_Role, sortbyOrder, sortByRoleInput };
}

export default usePagination;