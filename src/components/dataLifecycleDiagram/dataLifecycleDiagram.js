/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal data lifecycle diagram component.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataLifecycle from "./dataLifecycleDiagram.svg";

// Styles
import compStyles from "./dataLifecycleDiagram.module.css";

class DataLifecycleDiagram extends React.Component {

    render() {
        return (
            <DataLifecycle className={compStyles.dataLifecycle}/>
        );
    }
}

export default DataLifecycleDiagram;
