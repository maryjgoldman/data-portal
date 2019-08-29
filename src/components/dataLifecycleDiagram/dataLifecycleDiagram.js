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

let classNames = require('classnames');

class DataLifecycleDiagram extends React.Component {

    states = ["stateAnalysisPortals", "stateMatrixService", "stateCLIDataAccess", "stateHCADataStorage", "statePipelines", "stateStorage", "stateValidation", "stateDataCurator", "stateResearchData"];

    constructor(props) {
        super(props);
        this.state = ({hover: false});
    }

    componentDidMount() {
        this.setStateInteractionAndAttributes();
    }

    componentWillUnmount() {
        this.removeStateInteractionAndAttributes();
    };

    clearActiveClassAndAttributes = (stateEl) => {

        return (event) => {

            // Move element up by one position in dom
            this.moveElementUp(stateEl);

            // Set hover state to false - for class "hover"
            this.setState({hover: false});

            // Remove class and filter attributes
            stateEl.removeAttribute("class");
            stateEl.removeAttribute("filter");
        }
    };

    moveElementToLast = (stateEl) => {

        stateEl.parentNode.appendChild(stateEl);
    };

    moveElementUp = (stateEl) => {

        stateEl.parentNode.insertBefore(stateEl, stateEl.previousElementSibling);
    };

    removeStateInteractionAndAttributes = () => {

        this.states.forEach(state => {

            // Grab the corresponding state/container
            let stateContainerEl = document.getElementById(`${state}`);

            // Remove interaction for state/container
            stateContainerEl.removeEventListener('mouseenter', this.setActiveClassAndAttributes(stateContainerEl));
            stateContainerEl.removeEventListener('mouseleave', this.clearActiveClassAndAttributes(stateContainerEl));
        })
    };

    setActiveClassAndAttributes = (stateEl) => {

        return (event) => {

            // Set hover state to true - for class "hover"
            this.setState({hover: true});

            // Move element down to last position of parent node
            // Provides dom rendering precedence over all other elements and the hover overlay
            this.moveElementToLast(stateEl);

            // Add class and filter attributes
            stateEl.setAttribute("class", compStyles.active);
            stateEl.setAttribute("filter", 'url(#hoverShadow)')
        }
    };

    setStateInteractionAndAttributes = () => {
        this.states.forEach(state => {

            // Grab the corresponding state/container
            let stateContainerEl = document.getElementById(`${state}`);

            // Add interaction for state/container
            stateContainerEl.addEventListener('mouseenter', this.setActiveClassAndAttributes(stateContainerEl));
            stateContainerEl.addEventListener('mouseleave', this.clearActiveClassAndAttributes(stateContainerEl));
        })
    };

    render() {
        return (
            <DataLifecycle className={classNames(compStyles.dataLifecycle, {[compStyles.hover]: this.state.hover})}/>
        );
    }
}

export default DataLifecycleDiagram;
