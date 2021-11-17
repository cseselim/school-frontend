import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import '../assets/css/widget/datatable.css';
function Datatable(props){
    const { SearchBar } = Search;
    return(
        <div>
            <ToolkitProvider
                keyField="id"
                data={ props.data }
                columns={ props.columns }
                search
                loading={ true }
                >
                {
                    props => (
                    <div>
                        <div className="table_search">
                            <SearchBar { ...props.searchProps } />
                        </div>
                        <BootstrapTable
                        { ...props.baseProps } pagination = {paginationFactory()} 
                        >
                        </BootstrapTable>
                    </div>
                    )
                }
            </ToolkitProvider>
        </div>
    );
}

export default Datatable;