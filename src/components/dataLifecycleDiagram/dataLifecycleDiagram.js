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

let classNames = require("classnames");

class DataLifecycleDiagram extends React.Component {

    dataLifecycleStates = [
        {name: "stateAnalysisPortals", translateX: 421, translateY: 644, x: -44, y: 87, link: "/", text: "From the Data Portal, we link to a large variety of community portals and method and visualization packages enabling you to perform the most up-to-date and diverse types of data analyses. Any HCA community developer can submit their analysis method to be listed on the HCA Data Portal."},
        {name: "stateMatrixService", translateX: 317, translateY: 644, x: -1, y: 87, link: "/", text: "Lorem ipsum dolor sit amet."},
        {name: "stateCLIDataAccess", translateX: 176, translateY: 644, x: -1, y: 87, link: "/", text: "The CLI (Command Line Interface) enables programmatic interaction with the Data Storage System for downloading data files."},
        {name: "stateHCADataStorage", translateX: 35, translateY: 644, x: -1, y: 87, link: "/", text: "The interactive Data Browser allows you to search, filter, and read about projects to select the data you want. You can then download the list of datasets as a data manifest or download an expression matrix of the data.  The datasets listed in the file manifest can be downloaded using the CLI."},
        {name: "statePipelines", translateX: 358, translateY: 297, x: -1, y: 79, link: "/", text: "Data processing pipelines, approved by the HCA Analysis Working Group, process raw data from some single cell assays, producing matrices and QC metrics files. These pipelines identify genes, quantify transcripts, and assess data quality. Like raw data, processed data are put in the Data Storage System for access by the community."},
        {name: "stateStorage", translateX: 15, translateY: 365, x: -1, y: 147, link: "/", text: "Validated raw data and metadata files are submitted to the Data Storage System. Storage is provided in both Amazon Web Services (AWS) and Google Cloud Platform (GCP) environments, and data can be accessed from either."},
        {name: "stateValidation", translateX: 15, translateY: 274, x: -1, y: 79, link: "/", text: "Lorem ipsum dolor sit amet."},
        {name: "stateDataCurator", translateX: 27, translateY: 169, x: -1, y: 30, link: "/", text: "Submitters work with a Data Curator to upload the data and metadata and ensure it is well formatted and conforms to file format standards. Metadata is also validated as conforming to HCA metadata standards; errors are identified and corrected for re-uploading."},
        {name: "stateResearchData", translateX: 15, translateY: 0, x: -1, y: 79, link: "/", text: "Labs submit their single cell data and associated metadata."}
        ];

    constructor(props) {
        super(props);
        this.state = ({hover: false, dataLifecycle: null});
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

            // Set activeLifecycleState to null
            // Set hover state to false - for class "hover"
            this.setState({hover: false, dataLifecycle: null});

            // Remove class and filter attributes
            stateEl.removeAttribute("class");
            stateEl.removeAttribute("filter");
        }
    };

    getDataLifecycleStyles = (state) => {

        return {
            left: `${state.x}px`,
            opacity: 1,
            top: `${state.y}px`,
            transform: `translate(${state.translateX}px, ${state.translateY}px)`
        }

    };

    moveElementToLast = (stateEl) => {

        stateEl.parentNode.appendChild(stateEl);
    };

    moveElementUp = (stateEl) => {

        stateEl.parentNode.insertBefore(stateEl, stateEl.previousElementSibling);
    };

    removeStateInteractionAndAttributes = () => {

        this.dataLifecycleStates.forEach((state, i) => {

            // Grab the corresponding state/container
            let stateContainerEl = document.getElementById(`${state.name}`);

            // Remove interaction for state/container
            stateContainerEl.removeEventListener("mouseenter", this.setActiveClassAndAttributes(stateContainerEl, i));
            stateContainerEl.removeEventListener("mouseleave", this.clearActiveClassAndAttributes(stateContainerEl));
        })
    };

    setActiveClassAndAttributes = (stateEl, stateIndex) => {

        return (event) => {

            // Set dataLifecycle
            // Set hover state to true - for class "hover"
            this.setState({hover: true, dataLifecycle: this.dataLifecycleStates[stateIndex]});

            // Move element down to last position of parent node
            // Provides dom rendering precedence over all other elements and the hover overlay
            this.moveElementToLast(stateEl);

            // Add class and filter attributes
            stateEl.setAttribute("class", compStyles.active);
            stateEl.setAttribute("filter", "url(#hoverShadow)")
        }
    };

    setStateInteractionAndAttributes = () => {
        this.dataLifecycleStates.forEach((state, i) => {

            // Grab the corresponding state/container
            let stateContainerEl = document.getElementById(`${state.name}`);

            // Add interaction for state/container
            stateContainerEl.addEventListener("mouseenter", this.setActiveClassAndAttributes(stateContainerEl, i));
            stateContainerEl.addEventListener("mouseleave", this.clearActiveClassAndAttributes(stateContainerEl));
        })
    };

    render() {
        let dataLifecycleIndex = this.state.dataLifecycle;
        return (
            <div className={classNames(compStyles.dataLifecycle, {[compStyles.hover]: this.state.hover})}>
                {dataLifecycleIndex ? <div className={compStyles.dataLifecycleCard} style={this.getDataLifecycleStyles(dataLifecycleIndex)}>
                    <p>{dataLifecycleIndex.text}</p>
                    <a href={dataLifecycleIndex.link} target="_blank" rel="noopener noreferrer">Learn More</a>
                </div> : null}
                <DataLifecycle/>
            </div>
        );
    }
}

export default DataLifecycleDiagram;
