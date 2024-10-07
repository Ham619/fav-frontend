"use client";
import React from 'react'
import { Space, Table, Tag } from 'antd';
import { WidthFull } from '@mui/icons-material';

const columns = [
    {
        title: 'Customer Name',
        dataIndex: 'customer',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',

    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',

    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',

    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',

    },
    {
        title: 'Pipeline',
        dataIndex: 'pipeline',
        key: 'pipeline',

    },
    {
        title: 'Assigned to',
        dataIndex: 'assignedTo',
        key: 'assigned',
        render: (text) => <a className=' text-blue underline  '>{text}</a>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, tag) =>
            <Tag color={tag.status === 'Active' ? 'green' : 'red'} key={tag}>
                {tag.status}
            </Tag>
        ,

    },

]
const createData = (customer, company, phoneNumber, email, country, pipeline, assignedTo, status, category) => {
    return { customer, company, phoneNumber, email, country, pipeline, assignedTo, status, category }

}
const generateDummyRows = () => {
    const rows = [];
    for (let i = 1; i <= 20; i++) {
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

const NewCustomerTable = () => {
    return (
        <Table columns={columns} style={{ width: '100%' }} dataSource={rows} sticky pagination={{ pageSize: 10 }} tableLayout='auto' />
    )
}

export default NewCustomerTable
