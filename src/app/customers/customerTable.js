"use client";
import React, { useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const columnHead = ['Customer Name', 'Company', 'Phone Number', 'Email', 'Country', 'Pipeline', 'Assigned to', 'Status', 'Category', 'Email', 'Country', 'Status']
const createData = (customer, company, phoneNumber, email, country, pipeline, assignedTo, status, category) => {
    return { customer, company, phoneNumber, email, country, pipeline, assignedTo, status, category }

}
const generateDummyRows = () => {
    const rows = [];
    for (let i = 1; i <= 80; i++) {
        rows.push(
            createData(
                `Customer ${i}`,
                `Company ${i}`,
                `(123) 555-0${i}00`,
                `customer${i}@company.com`,
                'United States',
                'Pipeline ' + (i % 5),  // Rotate through 5 pipelines
                `Assigned To ${i}`,
                i % 2 === 0 ? 'Active' : 'Inactive',
                `Category ${i % 3}`,  // Rotate through 3 categories
                `altEmail${i}@company.com`,
                'United States',
                i % 2 === 0 ? 'Active' : 'Inactive'
            )
        );
    }
    return rows;
};

const rows = generateDummyRows();

const CustomersTable = () => {
    const [page, setPage] = useState(1)
    let rowsPerPage = 8

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    let totalPages = Math.ceil(rows.length / rowsPerPage)
    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1)
        }
    }

    const handlePageClick = (pageNum) => {
        setPage(pageNum);
    };

    const getPaginationButtons = () => {
        const pageButtons = [];

        // Always show the first page
        if (page !== 1) {
            pageButtons.push(
                <button
                    key={1}
                    className="border-2 px-1 bg-[#f7f7f7] rounded-sm ${page === 1 ? 'bg-pink-500 border-pink-500 text-white' : 'border-[#c4c4c4] text-[#808080]  mx-1"
                    onClick={() => handlePageClick(1)}
                >
                    1
                </button>
            );
        }

        // Show ellipsis after the first page if current page is far
        if (page > 3) {
            pageButtons.push(<span key="start-ellipsis" className="mx-2">...</span>);
        }

        // Show nearby page numbers
        for (let i = Math.max(2, page - 1); i <= Math.min(page + 1, totalPages - 1); i++) {
            pageButtons.push(
                <button
                    key={i}
                    className="border-2 px-1 bg-[#f7f7f7]  rounded-sm ${page === i ? 'bg-pink-500 border-pink-500 text-white' : 'border-[#c4c4c4] text-[#808080] mx-1"
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        }

        // Show ellipsis before the last page if current page is far
        if (page < totalPages - 2) {
            pageButtons.push(<span key="end-ellipsis" className="mx-2">...</span>);
        }

        // Always show the last page
        if (page !== totalPages) {
            pageButtons.push(
                <button
                    key={totalPages}
                    className="border-2 rounded-sm  bg-[#f7f7f7] ${page === totalPages ? 'bg-pink-500 border-pink-500 text-white' : 'border-[#c4c4c4] text-[#808080] mx-1"
                    onClick={() => handlePageClick(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        return pageButtons;
    };

    return (
        <>
            <table>
                <thead className="bg-[#f7f7f7]">
                    <tr >
                        {columnHead.map((column, index) => {
                            return (<td className="text-sm text-[#808080] p-4 px-5" key={index}>{column}</td>)
                        })}
                    </tr>

                </thead >

                <tbody>

                    {rows.slice((page * rowsPerPage) - rowsPerPage, page * rowsPerPage).map((rowData, index) => {
                        return (<tr key={index} className='py-11'>
                            <td className='pl-4'>{rowData.customer}</td>
                            <td>{rowData.company}</td>
                            <td>{rowData.phoneNumber}</td>
                            <td>{rowData.email}</td>
                            <td>{rowData.country}</td>
                            <td>{rowData.pipeline}</td>
                            <td className='text-[#3688bf] font-normal underline'><a href="">{rowData.assignedTo}</a></td>
                            <td><div className={` flex justify-center items-center rounded-sm px-1 ${rowData.status === 'Active' ? 'active' : 'inactive'}`}>{rowData.status}</div></td>
                            <td>{rowData.category}</td>
                            <td>{rowData.email}</td>
                            <td>{rowData.country}</td>
                            <td className=''><div className={` flex justify-center items-center rounded-sm px-1 ${rowData.status === 'Active' ? 'active' : 'inactive'}`}>{rowData.status}</div></td>
                        </tr>)
                    })

                    }

                </tbody>

            </table >
            <div className='flex justify-end gap-2 p-3' >
                <button className='border-2 bg-[#f7f7f7] border-[#c4c4c4] text-[#808080]' onClick={handlePrev}><KeyboardArrowLeftIcon /></button>
                {totalPages <= 5 ? <>
                    {Array(totalPages).fill(0).map((_, index) => {
                        return (<button className={`border-2  bg-[#f7f7f7] px-2 rounded-sm mx-1 ${index + 1 === page ? 'bg-pink-500 text-white border-pink-500  ' : 'bg-[#f7f7f7] border-[#c4c4c4] text-[#808080] '} `}
                            key={index}
                            onClick={() => { setPage(index + 1) }}>
                            {index + 1}
                        </button>)
                    })}
                </> : <>
                    {getPaginationButtons()}
                </>}
                <button className='border-2 bg-[#f7f7f7] border-[#c4c4c4] text-[#808080]' onClick={handleNext}><KeyboardArrowRightIcon /></button>
            </div>
        </>
    )
}

export default CustomersTable
