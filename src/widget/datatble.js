import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
function datatable(){
    const products = [
        {
        id: 1,
        name: 'TV',
        'price': 1000
        },
        {
        id: 2,
        name: 'Mobile',
        'price': 500
        },
        {
        id: 3,
        name: 'Book',
        'price': 20
        },
        {
            id: 4,
            name: 'Book 4',
            'price': 204
        },
        {
            id: 5,
            name: 'Book 5',
            'price': 205
        },
        {
            id: 6,
            name: 'Book 6',
            'price': 206
        },
        {
            id: 7,
            name: 'Book 7',
            'price': 207
        },
        {
            id: 8,
            name: 'Book 8',
            'price': 208
        },
        {
            id: 9,
            name: 'Book 9',
            'price': 209
        },
        {
            id: 10,
            name: 'Book 10',
            'price': 2010
        },
        {
            id: 11,
            name: 'Book 11',
            'price': 2011
        },
    ];
    const columns = [{
        dataField: 'id',
        text: 'Product ID',
        sort: true
        }, {
        dataField: 'name',
        text: 'Product Name'
        }, {
        dataField: 'price',
        text: 'Product Price'
        }
    ];
    const { SearchBar } = Search;
    return(
        <div>
            <ToolkitProvider
                keyField="id"
                data={ products }
                columns={ columns }
                search
                >
                {
                    props => (
                    <div>
                        <h3>Input something at below input field:</h3>
                        <SearchBar { ...props.searchProps } />
                        <hr />
                        <BootstrapTable
                        { ...props.baseProps } pagination = {paginationFactory()}
                        />
                    </div>
                    )
                }
            </ToolkitProvider>
        </div>
    );
}

export default datatable;