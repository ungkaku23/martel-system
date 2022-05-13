import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  ButtonGroup,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge
} from "reactstrap";

import Autocomplete from "react-google-autocomplete";

import Widget from "../../../components/Widget/Widget";

import sTable from "../../../styles/Tables.module.scss";

import mock from "../mocks.js";

import { rentalSearchListing } from "../../../actions/rentals";

import NSpinner from "../../../components/NSpinner/NSpinner";

const Search = (props) => {

  const [searchOption, setSearchOption] = useState({
    site: 'Zillow',
    homeType: 'single-family-home',
    priceMin: -1,
    priceMax: -1,
    beds: 0,
    baths: 0
  });

  const [cityState, setCityState] = useState("");

  const homeTypeList = [{
    label: 'Houses',
    value: 'single-family-home',
  }, {
    label: 'Town Homes',
    value: 'townhome'
  },{
    label: 'Apartments',
    value: 'apartments'
  }];

  const siteList = ['Zillow', 'Realtor'];
  
  const [rentalSearchResults] = useState(mock.rentalSearchResults);
  const [currentPage, setCurrentPage] = useState(1);
  const updateCurrentPage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  }

  const doSearchListing = (e) => {
    e.preventDefault();
    props.dispatch(rentalSearchListing({
      ...searchOption,
      cityState,
      pageIndex: currentPage
    }));
  }

  return (
    <div className="s-main-content" style={{overflow: props.isFetching ? "hidden" : "auto"}}>
      {
        props.isFetching
        ? <NSpinner />
        : null
      }
      <Widget className="widget-p-lg">
        <div className="headline-2 text-muted">
          Search For Rent
        </div>
        <div className="mt-4">
          <Form>
            <FormGroup row>
              <Label
                htmlFor="origin-site"
                sm={2}
              >
                Origin Site
              </Label>
              <Col sm={10}>
                <ButtonGroup>
                  {
                    siteList.map((o, idx) => {
                      return <Button
                              key={idx}
                              color={searchOption.site === o ? 'primary' : 'secondary'}
                              onClick={() => {
                                setSearchOption({
                                  ...searchOption,
                                  site: o
                                });
                              }}
                            >
                              {o}
                            </Button>
                    })
                  }
                </ButtonGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                htmlFor="city"
                sm={2}
              >
                City
              </Label>
              <Col sm={10}>
                {/* <SearchLocationInput onChange={() => null} /> */}
                <Autocomplete
                  className="form-control"
                  apiKey={"AIzaSyDUJcZMahLqhK9vPGaiskdp-pfWtwTpySE"}
                  onPlaceSelected={(place) => {
                    let fAddrs = place.formatted_address.split(",");
                    setCityState(fAddrs[0] + ',' + fAddrs[1].replace(" ", ""));
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                htmlFor="city"
                sm={2}
              >
                Price
              </Label>
              <Col sm={10}>
                <div className="d-flex justify-content-between align-items-center">
                  <FormGroup>
                    <Label htmlFor="min">
                      Min
                    </Label>
                    <Input
                      id="min"
                      name="min"
                      type="number"
                      defaultValue={searchOption.priceMin === -1 ? 0 : searchOption.priceMin}
                      onChange={(e) => {
                        setSearchOption({
                          ...searchOption,
                          priceMin: parseInt(e.target.value)
                        });
                      }}
                    />
                  </FormGroup>
                  <div>To</div>
                  <FormGroup>
                    <Label htmlFor="max">
                      Max
                    </Label>
                    <Input
                      id="max"
                      name="max"
                      type="number"
                      defaultValue={searchOption.priceMax === -1 ? 0 : searchOption.priceMax}
                      onChange={(e) => {
                        setSearchOption({
                          ...searchOption,
                          priceMax: parseInt(e.target.value)
                        });
                      }}
                    />
                  </FormGroup>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label 
                htmlFor="bedrooms"
                sm={2}
              >
                Bedrooms
              </Label>
              <Col 
                className="d-flex algin-items-center" 
                sm={10}
              >
                <Input
                  id="bedrooms"
                  name="range"
                  type="range"
                  min="0" 
                  max="5" 
                  step="1"
                  className="primary"
                  defaultValue={searchOption.beds}
                  onChange={(e) => {
                    setSearchOption({
                      ...searchOption,
                      beds: parseInt(e.target.value)
                    });
                  }}
                />
                <div className="nv-boxshadow input-range-value">
                  {searchOption.beds}
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label 
                htmlFor="bathrooms"
                sm={2}
              >
                Bathrooms
              </Label>
              <Col 
                className="d-flex algin-items-center" 
                sm={10}
              >
                <Input
                  id="bathrooms"
                  name="range"
                  type="range"
                  min="0" 
                  max="5" 
                  step="1"
                  defaultValue={searchOption.baths}
                  onChange={(e) => {
                    setSearchOption({
                      ...searchOption,
                      baths: parseInt(e.target.value)
                    });
                  }}
                />
                <div className="nv-boxshadow input-range-value">
                  {searchOption.baths}
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label
                htmlFor="home-type"
                sm={2}
              >
                Home Type
              </Label>
              <Col sm={10}>
                <ButtonGroup>
                  {
                    homeTypeList.map((o, idx) => {
                      return <Button
                              key={idx}
                              color={searchOption.homeType === o.value ? 'primary' : 'secondary'}
                              onClick={() => {
                                setSearchOption({
                                  ...searchOption,
                                  homeType: o.value
                                });
                              }}
                            >
                              {o.label}
                            </Button>
                    })
                  }
                </ButtonGroup>
              </Col>
            </FormGroup>
            <FormGroup 
              row
              className="d-flex align-items-center justify-content-center mt-5"
            >
              <Button
                color="primary"
                onClick={(event) => doSearchListing(event)}
              >
                Search
              </Button>
            </FormGroup>
          </Form>
        </div>
      </Widget>
      <Widget className="widget-p-lg mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="headline-2 text-muted">Results</div>
          <Button
            color="primary"
            onClick={() => {
            }}
          >
            Add Multiples
          </Button>
        </div>
        <div className="widget-table-overflow mt-4">
          <Table 
            className={`table-striped table-borderless table-hover ${sTable.statesTable}`} 
            responsive
          >
            <thead>
            <tr>
              <th className={sTable.checkboxCol}>
                <div className="checkbox checkbox-primary">
                  <input
                    className="styled"
                    id="checkbox100"
                    type="checkbox"
                  />
                  <label htmlFor="checkbox100"/>
                </div>
              </th>
              <th className="w-20">ADDRESS</th>
              <th className="w-10">STATE</th>
              <th className="w-10">ZIP</th>
              <th className="w-15">PRICE</th>
              <th className="w-15">NAME</th>
              <th className="w-5">BEDS</th>
              <th className="w-5">BATHS</th>
              <th className="w-5">SQUARE</th>
              <th className="w-15">ACTIONS</th>
            </tr>
            </thead>
            <tbody>
            {
              props.rentalSearchResults
              .map((item, idx) => (
                <tr key={uuidv4()}>
                  <td>
                    <div className="checkbox checkbox-primary">
                      <input
                        id={idx}
                        className="styled"
                        type="checkbox"
                      />
                      <Label htmlFor={idx} />
                    </div>
                  </td>
                  <td>
                    <a href={item.link}>
                      {item.address}
                    </a>
                  </td>
                  <td>{item.state}</td>
                  <td>{item.zipcode}</td>
                  <td>{item.landlord_rent}</td>
                  <td>{item.landlord_name}</td>
                  <td>{item.beds}</td>
                  <td>{item.baths}</td>
                  <td>{item.square_footage}</td>
                  <td>
                    <Badge
                      color="success"
                      className={sTable.shortlist}>
                        Add To Shortlist
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              
            </div>
            <Pagination 
              className="pagination-borderless" 
              aria-label="Page navigation"
            >
              <PaginationItem 
                disabled={currentPage <= 0}
                className={sTable.currentPageCtrl} 
              >
                <PaginationLink
                  className="ml-0 px-1 text-center"
                  onClick={e => updateCurrentPage(e, currentPage - 1)}
                  previous
                  href="#"
                />
              </PaginationItem>
              <Input
                name="current"
                type="number"
                className={sTable.currentPage}
                defaultValue={currentPage}
              >
              </Input>
              <PaginationItem
                className={sTable.currentPageCtrl} 
                disabled={currentPage >= props.numberOfPages - 1}
              >
                <PaginationLink
                  className="ml-0 px-1 text-center"
                  onClick={e => updateCurrentPage(e, currentPage + 1)}
                  next
                  href="#"
                />
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </Widget>
    </div>
  );
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isFetching: state.rentals.isFetching,
    errorMessage: state.auth.errorMessage,
    rentalSearchResults: state.rentals.rentalSearchResults,
    numberOfPages: state.rentals.numberOfPages
  };
}

export default withRouter(connect(mapStateToProps)(Search));
